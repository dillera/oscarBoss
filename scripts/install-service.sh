#!/usr/bin/env bash
# install-service.sh
#
# Builds the OscarBoss Next.js app and installs/updates the systemd service.
# Must be run as root (or with sudo) on an Ubuntu server.
#
# Usage:
#   sudo bash scripts/install-service.sh
#
# What it does:
#   1. Builds the Next.js app (npm run build)
#   2. Compares the repo's systemd unit file against the installed one (if any)
#   3. Installs or replaces the unit file only if it differs
#   4. Enables and (re)starts the service

set -euo pipefail

# ─── Config ──────────────────────────────────────────────────────────────────

SERVICE_NAME="oscarboss"
UNIT_FILE="/etc/systemd/system/${SERVICE_NAME}.service"
REPO_UNIT_FILE="$(cd "$(dirname "$0")" && pwd)/${SERVICE_NAME}.service"
APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
APP_USER="${SUDO_USER:-$(whoami)}"
NODE_BIN="$(command -v node)"
NPM_BIN="$(command -v npm)"

# ─── Helpers ─────────────────────────────────────────────────────────────────

info()    { echo -e "\033[0;34m[INFO]\033[0m  $*"; }
success() { echo -e "\033[0;32m[OK]\033[0m    $*"; }
warn()    { echo -e "\033[0;33m[WARN]\033[0m  $*"; }
error()   { echo -e "\033[0;31m[ERROR]\033[0m $*" >&2; exit 1; }

require_root() {
  if [[ $EUID -ne 0 ]]; then
    error "This script must be run as root. Try: sudo bash scripts/install-service.sh"
  fi
}

# ─── Generate the systemd unit file content ──────────────────────────────────

generate_unit() {
  cat <<EOF
[Unit]
Description=OscarBoss — 98th Academy Awards Prediction App
After=network.target

[Service]
Type=simple
User=${APP_USER}
WorkingDirectory=${APP_DIR}
ExecStart=${NPM_BIN} run start
Restart=on-failure
RestartSec=5
Environment=NODE_ENV=production
EnvironmentFile=-${APP_DIR}/.env.production

[Install]
WantedBy=multi-user.target
EOF
}

# ─── Main ────────────────────────────────────────────────────────────────────

require_root

info "OscarBoss service installer"
info "App directory : ${APP_DIR}"
info "Service user  : ${APP_USER}"
info "Node          : ${NODE_BIN}"
info "npm           : ${NPM_BIN}"
echo ""

# 1. Install dependencies
info "Installing npm dependencies..."
sudo -u "${APP_USER}" bash -c "cd '${APP_DIR}' && ${NPM_BIN} install"
success "Dependencies installed."
echo ""

# 2. Generate Prisma client
info "Generating Prisma client..."
sudo -u "${APP_USER}" bash -c "cd '${APP_DIR}' && ${NPM_BIN} exec prisma generate"
success "Prisma client generated."
echo ""

# 3. Run database migrations
info "Running database migrations..."
sudo -u "${APP_USER}" bash -c "cd '${APP_DIR}' && ${NPM_BIN} exec prisma migrate deploy"
success "Migrations applied."
echo ""

# 4. Seed the database (idempotent — upserts categories/nominees)
info "Seeding database..."
sudo -u "${APP_USER}" bash -c "cd '${APP_DIR}' && ${NPM_BIN} run seed"
success "Database seeded."
echo ""

# 5. Build the app (source env file first so NEXT_PUBLIC_* vars are available at build time)
info "Building Next.js app..."
if [[ -f "${APP_DIR}/.env.production" ]]; then
  info "Found ${APP_DIR}/.env.production — Next.js will auto-load it at build time."
else
  warn "No .env.production found at ${APP_DIR}/.env.production — building without environment overrides."
  warn "Run: cp .env.example .env.production and set NEXT_PUBLIC_BASE_PATH=/oscars"
fi
sudo -u "${APP_USER}" bash -c "cd '${APP_DIR}' && ${NPM_BIN} run build"
success "Build complete."
echo ""

# 2. Write the generated unit to a temp file in the repo scripts/ dir
generate_unit > "${REPO_UNIT_FILE}"
info "Generated unit file: ${REPO_UNIT_FILE}"

# 3. Compare with installed unit (if it exists)
INSTALL_NEEDED=false

if [[ ! -f "${UNIT_FILE}" ]]; then
  info "No existing systemd unit found — installing for the first time."
  INSTALL_NEEDED=true
else
  if diff -q "${REPO_UNIT_FILE}" "${UNIT_FILE}" > /dev/null 2>&1; then
    success "Installed unit file is identical to repo version — no update needed."
  else
    warn "Installed unit file differs from repo version — updating."
    INSTALL_NEEDED=true
  fi
fi

# 4. Install / replace the unit file if needed
if [[ "${INSTALL_NEEDED}" == true ]]; then
  cp "${REPO_UNIT_FILE}" "${UNIT_FILE}"
  chmod 644 "${UNIT_FILE}"
  systemctl daemon-reload
  success "Unit file installed to ${UNIT_FILE} and daemon reloaded."
fi

# 5. Enable the service (idempotent)
if ! systemctl is-enabled --quiet "${SERVICE_NAME}"; then
  systemctl enable "${SERVICE_NAME}"
  success "Service enabled (will start on boot)."
else
  info "Service already enabled."
fi

# 6. Start or restart the service
if systemctl is-active --quiet "${SERVICE_NAME}"; then
  info "Service is running — restarting to pick up new build..."
  systemctl restart "${SERVICE_NAME}"
  success "Service restarted."
else
  info "Service is not running — starting..."
  systemctl start "${SERVICE_NAME}"
  success "Service started."
fi

# 7. Show final status
echo ""
systemctl status "${SERVICE_NAME}" --no-pager --lines=10
echo ""
success "Done. OscarBoss is live on port 3510."
info "Logs: journalctl -u ${SERVICE_NAME} -f"
