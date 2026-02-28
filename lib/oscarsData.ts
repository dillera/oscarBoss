export const CEREMONY = {
  name: "98th Academy Awards",
  date: "March 15, 2026",
  host: "Conan O'Brien",
};

export interface NomineeData {
  name: string;
  imageUrl: string;
  trailerUrl: string;
}

export interface CategoryData {
  name: string;
  sortOrder: number;
  info?: string;
  nominees: NomineeData[];
}

// Mock Kalshi/Polymarket odds (probability 0-100)
export const MOCK_ODDS: Record<string, Record<string, number>> = {
  "Best Picture": {
    "Sinners": 34, "Hamnet": 22, "One Battle After Another": 18,
    "Sentimental Value": 10, "Marty Supreme": 7, "Train Dreams": 4,
    "F1": 2, "Frankenstein": 1, "Bugonia": 1, "The Secret Agent": 1,
  },
  "Best Directing": {
    "Ryan Coogler (Sinners)": 38, "Paul Thomas Anderson (One Battle After Another)": 28,
    "Chloé Zhao (Hamnet)": 18, "Joachim Trier (Sentimental Value)": 10,
    "Josh Safdie (Marty Supreme)": 6,
  },
  "Best Actor in a Leading Role": {
    "Timothée Chalamet (Marty Supreme)": 42, "Michael B. Jordan (Sinners)": 30,
    "Leonardo DiCaprio (One Battle After Another)": 15,
    "Ethan Hawke (Blue Moon)": 8, "Wagner Moura (The Secret Agent)": 5,
  },
  "Best Actress in a Leading Role": {
    "Renate Reinsve (Sentimental Value)": 35, "Jessie Buckley (Hamnet)": 28,
    "Emma Stone (Bugonia)": 20, "Kate Hudson (Song Sung Blue)": 10,
    "Rose Byrne (If I Had Legs I'd Kick You)": 7,
  },
  "Best Actor in a Supporting Role": {
    "Delroy Lindo (Sinners)": 40, "Jacob Elordi (Frankenstein)": 25,
    "Benicio del Toro (One Battle After Another)": 18,
    "Stellan Skarsgård (Sentimental Value)": 10, "Sean Penn (One Battle After Another)": 7,
  },
  "Best Actress in a Supporting Role": {
    "Wunmi Mosaku (Sinners)": 38, "Elle Fanning (Sentimental Value)": 28,
    "Teyana Taylor (One Battle After Another)": 16,
    "Amy Madigan (Weapons)": 10, "Inga Ibsdotter Lilleaas (Sentimental Value)": 8,
  },
  "Best Original Screenplay": {
    "Sinners": 40, "Marty Supreme": 25, "Sentimental Value": 18,
    "Blue Moon": 10, "It Was Just an Accident": 7,
  },
  "Best Adapted Screenplay": {
    "Hamnet": 38, "One Battle After Another": 30, "Train Dreams": 15,
    "Frankenstein": 10, "Bugonia": 7,
  },
  "Best Casting": {
    "Sinners": 42, "One Battle After Another": 28, "Hamnet": 16,
    "Marty Supreme": 8, "The Secret Agent": 6,
  },
  "Best Animated Feature Film": {
    "Zootopia 2": 45, "Elio": 30, "KPop Demon Hunters": 12,
    "Little Amélie or The Character of Rain": 8, "Arco": 5,
  },
  "Best International Feature Film": {
    "Sentimental Value (Norway)": 35, "The Voice of Hind Rajab (Tunisia)": 28,
    "It Was Just an Accident (France)": 20,
    "The Secret Agent (Brazil)": 10, "Sirât (Spain)": 7,
  },
  "Best Documentary Feature Film": {
    "Mr. Nobody Against Putin": 32, "Come See Me in the Good Light": 25,
    "The Alabama Solution": 20, "Cutting Through Rocks": 14, "The Perfect Neighbor": 9,
  },
  "Best Documentary Short Film": {
    "Children No More": 30, "Armed Only With a Camera": 28,
    "The Devil Is Busy": 20, "All the Empty Rooms": 12, "Perfectly a Strangeness": 10,
  },
  "Best Live Action Short Film": {
    "Two People Exchanging Saliva": 32, "A Friend of Dorothy": 28,
    "Butcher's Stain": 18, "The Singers": 12, "Jane Austen's Period Drama": 10,
  },
  "Best Animated Short Film": {
    "The Girl Who Cried Pearls": 35, "Forevergreen": 28, "Butterfly": 18,
    "The Three Sisters": 12, "Retirement Plan": 7,
  },
  "Best Original Score": {
    "Sinners": 38, "Hamnet": 28, "Frankenstein": 18, "One Battle After Another": 10, "Bugonia": 6,
  },
  "Best Original Song": {
    "I Lied To You (Sinners)": 40, "Golden (KPop Demon Hunters)": 28,
    "Train Dreams (Train Dreams)": 15, "Dear Me (Diane Warren: Relentless)": 10,
    "Sweet Dreams of Joy (Viva Verdi!)": 7,
  },
  "Best Sound": {
    "Sinners": 38, "F1": 30, "One Battle After Another": 16, "Frankenstein": 10, "Sirât": 6,
  },
  "Best Production Design": {
    "Frankenstein": 35, "Hamnet": 28, "One Battle After Another": 18,
    "Sinners": 12, "Marty Supreme": 7,
  },
  "Best Cinematography": {
    "Sinners": 40, "One Battle After Another": 28, "Frankenstein": 16,
    "Train Dreams": 10, "Marty Supreme": 6,
  },
  "Best Makeup and Hairstyling": {
    "Frankenstein": 42, "Sinners": 28, "The Ugly Stepsister": 15,
    "The Smashing Machine": 9, "Kokuho": 6,
  },
  "Best Costume Design": {
    "Hamnet": 38, "Frankenstein": 28, "Sinners": 18,
    "Avatar: Fire and Ash": 10, "Marty Supreme": 6,
  },
  "Best Film Editing": {
    "Sinners": 38, "F1": 25, "One Battle After Another": 20,
    "Marty Supreme": 10, "Sentimental Value": 7,
  },
  "Best Visual Effects": {
    "Avatar: Fire and Ash": 42, "F1": 28, "Jurassic World Rebirth": 16,
    "Sinners": 9, "The Lost Bus": 5,
  },
};

// Movie/person images from Unsplash & TMDB-style placeholders
// Using Unsplash for thematic images
export const CATEGORIES: CategoryData[] = [
  {
    name: "Best Picture",
    sortOrder: 1,
    nominees: [
      { name: "Sinners", imageUrl: "https://image.tmdb.org/t/p/w500/qTvFWCGeGXgBRaINLY1zqgTPSpn.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Sinners+2025+movie+trailer" },
      { name: "Hamnet", imageUrl: "https://image.tmdb.org/t/p/w500/vbeyOZm2bvBXcbgPD3v6o94epPX.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Hamnet+2025+movie+trailer" },
      { name: "One Battle After Another", imageUrl: "https://image.tmdb.org/t/p/w500/lbBWwxBht4JFP5PsuJ5onpMqugW.jpg", trailerUrl: "https://www.youtube.com/results?search_query=One+Battle+After+Another+2025+trailer" },
      { name: "Sentimental Value", imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Sentimental+Value+2025+movie+trailer" },
      { name: "Marty Supreme", imageUrl: "https://image.tmdb.org/t/p/w500/lYWEXbQgRTR4ZQleSXAgRbxAjvq.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Marty+Supreme+2025+movie+trailer" },
      { name: "Train Dreams", imageUrl: "https://image.tmdb.org/t/p/w500/wfzYOVdafdbD1d3SxNqiBtV2Yhx.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Train+Dreams+2025+movie+trailer" },
      { name: "F1", imageUrl: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=F1+2025+movie+trailer+Brad+Pitt" },
      { name: "Frankenstein", imageUrl: "https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Frankenstein+2025+movie+trailer" },
      { name: "Bugonia", imageUrl: "https://image.tmdb.org/t/p/w500/rSdOua3wKMEaFWDcKAYWRjXQWOt.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Bugonia+2025+movie+trailer" },
      { name: "The Secret Agent", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=The+Secret+Agent+2025+movie+trailer" },
    ],
  },
  {
    name: "Best Directing",
    sortOrder: 2,
    nominees: [
      { name: "Ryan Coogler (Sinners)", imageUrl: "https://image.tmdb.org/t/p/w500/dux4DCDaL6c639DTXGiV7nm1wcN.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Sinners+2025+Ryan+Coogler+trailer" },
      { name: "Paul Thomas Anderson (One Battle After Another)", imageUrl: "https://image.tmdb.org/t/p/w500/wKAs2LtLYSUzt3ZZ8pnxMwuEWuR.jpg", trailerUrl: "https://www.youtube.com/results?search_query=One+Battle+After+Another+PTA+trailer" },
      { name: "Chloé Zhao (Hamnet)", imageUrl: "https://image.tmdb.org/t/p/w500/r8DmTdOqHbDUydCOVb277rncPTK.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Hamnet+Chloe+Zhao+2025+trailer" },
      { name: "Joachim Trier (Sentimental Value)", imageUrl: "https://image.tmdb.org/t/p/w500/o5KXJRWbzyGYSxDhXsBqbCiZnqU.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Sentimental+Value+Joachim+Trier+trailer" },
      { name: "Josh Safdie (Marty Supreme)", imageUrl: "https://image.tmdb.org/t/p/w500/bNYM97KLLVoICe3fZt6bKbvXV8d.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Marty+Supreme+Josh+Safdie+2025+trailer" },
    ],
  },
  {
    name: "Best Actor in a Leading Role",
    sortOrder: 3,
    nominees: [
      { name: "Timothée Chalamet (Marty Supreme)", imageUrl: "https://image.tmdb.org/t/p/w500/dFxpwRpmzpVfP1zjluH68DeQhyj.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Timothee+Chalamet+Marty+Supreme+trailer" },
      { name: "Michael B. Jordan (Sinners)", imageUrl: "https://image.tmdb.org/t/p/w500/515xNvaMC6xOEOlo0sFqW69ZqUH.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Michael+B+Jordan+Sinners+2025+trailer" },
      { name: "Leonardo DiCaprio (One Battle After Another)", imageUrl: "https://image.tmdb.org/t/p/w500/vo4fltT9zZ1kH8nhLetz8MED6jp.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Leonardo+DiCaprio+One+Battle+After+Another+trailer" },
      { name: "Ethan Hawke (Blue Moon)", imageUrl: "https://image.tmdb.org/t/p/w500/2LoTr6x0TEM7L5em4kSx1VmGDgG.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Ethan+Hawke+Blue+Moon+2025+trailer" },
      { name: "Wagner Moura (The Secret Agent)", imageUrl: "https://image.tmdb.org/t/p/w500/6gcfwvOueJKhDpTP9KLGuWz0Hk4.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Wagner+Moura+The+Secret+Agent+2025+trailer" },
    ],
  },
  {
    name: "Best Actress in a Leading Role",
    sortOrder: 4,
    nominees: [
      { name: "Renate Reinsve (Sentimental Value)", imageUrl: "https://image.tmdb.org/t/p/w500/eepHWTjtKRdGcrtchFb3axdp2eL.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Renate+Reinsve+Sentimental+Value+2025+trailer" },
      { name: "Jessie Buckley (Hamnet)", imageUrl: "https://image.tmdb.org/t/p/w500/i8IlkFbZqKUgkypZKpdhrw00uqw.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Jessie+Buckley+Hamnet+2025+trailer" },
      { name: "Emma Stone (Bugonia)", imageUrl: "https://image.tmdb.org/t/p/w500/tWoSlj6TaZU5sfHYiXvexZUL5Nv.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Emma+Stone+Bugonia+2025+trailer" },
      { name: "Kate Hudson (Song Sung Blue)", imageUrl: "https://image.tmdb.org/t/p/w500/s79lH1QzEg2fkXULKBxRmU9aNr8.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Kate+Hudson+Song+Sung+Blue+2025+trailer" },
      { name: "Rose Byrne (If I Had Legs I'd Kick You)", imageUrl: "https://image.tmdb.org/t/p/w500/6YauDiiTBwRGC1xnwspPmNvPWUu.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Rose+Byrne+If+I+Had+Legs+2025+trailer" },
    ],
  },
  {
    name: "Best Actor in a Supporting Role",
    sortOrder: 5,
    nominees: [
      { name: "Delroy Lindo (Sinners)", imageUrl: "https://image.tmdb.org/t/p/w500/kLwUBBmEIdchrLqwsYzgLB2B6q5.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Delroy+Lindo+Sinners+2025+trailer" },
      { name: "Jacob Elordi (Frankenstein)", imageUrl: "https://image.tmdb.org/t/p/w500/qZNRPWCP2c5d0YaYLTzHXU9Rdoe.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Jacob+Elordi+Frankenstein+2025+trailer" },
      { name: "Benicio del Toro (One Battle After Another)", imageUrl: "https://image.tmdb.org/t/p/w500/aYomJWx0B2B8ra6Rmgt8lr0XCrw.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Benicio+del+Toro+One+Battle+After+Another+trailer" },
      { name: "Stellan Skarsgård (Sentimental Value)", imageUrl: "https://image.tmdb.org/t/p/w500/x78BtYHElirO7Iw8bL4m8CnzRDc.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Stellan+Skarsgard+Sentimental+Value+2025+trailer" },
      { name: "Sean Penn (One Battle After Another)", imageUrl: "https://image.tmdb.org/t/p/w500/9glqNTVpFpdN1nFklKaHPUyCwR6.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Sean+Penn+One+Battle+After+Another+trailer" },
    ],
  },
  {
    name: "Best Actress in a Supporting Role",
    sortOrder: 6,
    nominees: [
      { name: "Wunmi Mosaku (Sinners)", imageUrl: "https://image.tmdb.org/t/p/w500/yWM19CjCv66MqNkwHBp6Dpvtn9x.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Wunmi+Mosaku+Sinners+2025+trailer" },
      { name: "Elle Fanning (Sentimental Value)", imageUrl: "https://image.tmdb.org/t/p/w500/e8CUyxQSE99y5IOfzSLtHC0B0Ch.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Elle+Fanning+Sentimental+Value+2025+trailer" },
      { name: "Teyana Taylor (One Battle After Another)", imageUrl: "https://image.tmdb.org/t/p/w500/5b2dAuTsBejBsdm9SkWX4F7jG9w.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Teyana+Taylor+One+Battle+After+Another+trailer" },
      { name: "Amy Madigan (Weapons)", imageUrl: "https://image.tmdb.org/t/p/w500/xgtQOuPAmQZXWUO2PXetNpXm08A.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Amy+Madigan+Weapons+2025+trailer" },
      { name: "Inga Ibsdotter Lilleaas (Sentimental Value)", imageUrl: "https://image.tmdb.org/t/p/w500/wlZPIgnXMpK3Nvvhg0bZzmWxZDH.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Sentimental+Value+2025+trailer" },
    ],
  },
  {
    name: "Best Original Screenplay",
    sortOrder: 7,
    nominees: [
      { name: "Sinners", imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Sinners+2025+movie+trailer" },
      { name: "Sentimental Value", imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Sentimental+Value+2025+movie+trailer" },
      { name: "Marty Supreme", imageUrl: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Marty+Supreme+2025+movie+trailer" },
      { name: "Blue Moon", imageUrl: "https://image.tmdb.org/t/p/w500/nij3i5ziQdqfiK29gb4rX1bkmVy.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Blue+Moon+2025+movie+trailer" },
      { name: "It Was Just an Accident", imageUrl: "https://image.tmdb.org/t/p/w500/eNYGj2DG3n8OrVPTfYunpPW9uas.jpg", trailerUrl: "https://www.youtube.com/results?search_query=It+Was+Just+an+Accident+2025+movie+trailer" },
    ],
  },
  {
    name: "Best Adapted Screenplay",
    sortOrder: 8,
    nominees: [
      { name: "Hamnet", imageUrl: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Hamnet+2025+movie+trailer" },
      { name: "One Battle After Another", imageUrl: "https://images.unsplash.com/photo-1548613053-22087dd8edb8?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=One+Battle+After+Another+2025+trailer" },
      { name: "Frankenstein", imageUrl: "https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Frankenstein+2025+movie+trailer" },
      { name: "Bugonia", imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Bugonia+2025+movie+trailer" },
      { name: "Train Dreams", imageUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Train+Dreams+2025+movie+trailer" },
    ],
  },
  {
    name: "Best Casting",
    sortOrder: 9,
    info: "Inaugural Category",
    nominees: [
      { name: "Sinners", imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Sinners+2025+movie+trailer" },
      { name: "Hamnet", imageUrl: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Hamnet+2025+movie+trailer" },
      { name: "One Battle After Another", imageUrl: "https://images.unsplash.com/photo-1548613053-22087dd8edb8?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=One+Battle+After+Another+2025+trailer" },
      { name: "The Secret Agent", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=The+Secret+Agent+2025+movie+trailer" },
      { name: "Marty Supreme", imageUrl: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Marty+Supreme+2025+movie+trailer" },
    ],
  },
  {
    name: "Best Animated Feature Film",
    sortOrder: 10,
    nominees: [
      { name: "Zootopia 2", imageUrl: "https://image.tmdb.org/t/p/w500/oJ7g2CifqpStmoYQyaLQgEU32qO.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Zootopia+2+trailer+2025" },
      { name: "Elio", imageUrl: "https://image.tmdb.org/t/p/w500/7z8jDiTZZco9moIKpTUImFtTy7o.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Elio+Pixar+2025+trailer" },
      { name: "KPop Demon Hunters", imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=KPop+Demon+Hunters+2025+trailer" },
      { name: "Little Amélie or The Character of Rain", imageUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Little+Amelie+Character+of+Rain+2025+trailer" },
      { name: "Arco", imageUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Arco+animated+film+2025+trailer" },
    ],
  },
  {
    name: "Best International Feature Film",
    sortOrder: 11,
    nominees: [
      { name: "The Secret Agent (Brazil)", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=The+Secret+Agent+Brazil+2025+trailer" },
      { name: "It Was Just an Accident (France)", imageUrl: "https://image.tmdb.org/t/p/w500/eNYGj2DG3n8OrVPTfYunpPW9uas.jpg", trailerUrl: "https://www.youtube.com/results?search_query=It+Was+Just+an+Accident+France+2025+trailer" },
      { name: "Sentimental Value (Norway)", imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Sentimental+Value+Norway+2025+trailer" },
      { name: "Sirât (Spain)", imageUrl: "https://image.tmdb.org/t/p/w500/bzBtsLi17rK4G6kDvOXfUZfAhca.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Sirat+Spain+2025+trailer" },
      { name: "The Voice of Hind Rajab (Tunisia)", imageUrl: "https://image.tmdb.org/t/p/w500/q7M8kQB46T11vmDMD6E239jsqTz.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Voice+of+Hind+Rajab+Tunisia+2025+trailer" },
    ],
  },
  {
    name: "Best Documentary Feature Film",
    sortOrder: 12,
    nominees: [
      { name: "The Alabama Solution", imageUrl: "https://image.tmdb.org/t/p/w500/gultnK0rYs4xLLYhxQ9ZnvPfVAn.jpg", trailerUrl: "https://www.youtube.com/results?search_query=The+Alabama+Solution+documentary+2025" },
      { name: "Come See Me in the Good Light", imageUrl: "https://image.tmdb.org/t/p/w500/5AFbcDGT78cLZTyHTSDBohczjuO.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Come+See+Me+in+the+Good+Light+2025+documentary" },
      { name: "Cutting Through Rocks", imageUrl: "https://image.tmdb.org/t/p/w500/qefjf5TeM0uRzrFU2c4xYt6ew9z.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Cutting+Through+Rocks+documentary+2025" },
      { name: "Mr. Nobody Against Putin", imageUrl: "https://image.tmdb.org/t/p/w500/aXCEnrqecvPXohuptN0JRgIvkDj.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Mr+Nobody+Against+Putin+documentary+2025" },
      { name: "The Perfect Neighbor", imageUrl: "https://image.tmdb.org/t/p/w500/2NE7yN45zo19o4LJr6JFxDWmh2b.jpg", trailerUrl: "https://www.youtube.com/results?search_query=The+Perfect+Neighbor+documentary+2025" },
    ],
  },
  {
    name: "Best Documentary Short Film",
    sortOrder: 13,
    nominees: [
      { name: "All the Empty Rooms", imageUrl: "https://image.tmdb.org/t/p/w500/38odJEJiluUBLI58tO6oTmv5wZl.jpg", trailerUrl: "https://www.youtube.com/results?search_query=All+the+Empty+Rooms+short+documentary+2025" },
      { name: "Armed Only With a Camera", imageUrl: "https://image.tmdb.org/t/p/w500/1vG68YrQGAEnCQooXrEvJ2eparK.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Armed+Only+With+a+Camera+short+documentary+2025" },
      { name: "Children No More", imageUrl: "https://image.tmdb.org/t/p/w500/e5FPUMkTd2aHXtpSd5UZR3jAHHk.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Children+No+More+short+documentary+2025" },
      { name: "The Devil Is Busy", imageUrl: "https://image.tmdb.org/t/p/w500/75GH49xL5kEzyYeXGiOPy2FIZGe.jpg", trailerUrl: "https://www.youtube.com/results?search_query=The+Devil+Is+Busy+short+documentary+2025" },
      { name: "Perfectly a Strangeness", imageUrl: "https://image.tmdb.org/t/p/w500/biPnnMyECGRhtUj5zGg7T7XSCk7.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Perfectly+a+Strangeness+short+documentary+2025" },
    ],
  },
  {
    name: "Best Live Action Short Film",
    sortOrder: 14,
    nominees: [
      { name: "Butcher's Stain", imageUrl: "https://image.tmdb.org/t/p/w500/lAcOUxQUFP6lruP8e8nZSFBFjZ1.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Butcher%27s+Stain+short+film+2025" },
      { name: "A Friend of Dorothy", imageUrl: "https://image.tmdb.org/t/p/w500/5YjFZoCfBJ2G40SHPa5CFy60jdC.jpg", trailerUrl: "https://www.youtube.com/results?search_query=A+Friend+of+Dorothy+short+film+2025" },
      { name: "Jane Austen's Period Drama", imageUrl: "https://image.tmdb.org/t/p/w500/tlQfsrxKLdrpQBlWUrUlpTamOBy.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Jane+Austen+Period+Drama+short+film+2025" },
      { name: "The Singers", imageUrl: "https://image.tmdb.org/t/p/w500/tJ3gevIkQWDXtYj6FvfFilnCfmv.jpg", trailerUrl: "https://www.youtube.com/results?search_query=The+Singers+short+film+2025" },
      { name: "Two People Exchanging Saliva", imageUrl: "https://image.tmdb.org/t/p/w500/1Hi01LzZFpopWzNRlPBGsAdmoBI.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Two+People+Exchanging+Saliva+short+film+2025" },
    ],
  },
  {
    name: "Best Animated Short Film",
    sortOrder: 15,
    nominees: [
      { name: "Butterfly", imageUrl: "https://images.unsplash.com/photo-1444927714506-8492d94b4e3d?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Butterfly+animated+short+film+2025" },
      { name: "Forevergreen", imageUrl: "https://image.tmdb.org/t/p/w500/bYmb2SzWZjQvyuBItB3wcO8RAWy.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Forevergreen+animated+short+film+2025" },
      { name: "The Girl Who Cried Pearls", imageUrl: "https://image.tmdb.org/t/p/w500/sqdqvstmM2vOBnb5beVT8lOQ4Oi.jpg", trailerUrl: "https://www.youtube.com/results?search_query=The+Girl+Who+Cried+Pearls+animated+short+2025" },
      { name: "Retirement Plan", imageUrl: "https://image.tmdb.org/t/p/w500/lRkotrMJJNyOXBZE4i4s8vfXPTh.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Retirement+Plan+animated+short+film+2025" },
      { name: "The Three Sisters", imageUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=The+Three+Sisters+animated+short+film+2025" },
    ],
  },
  {
    name: "Best Original Score",
    sortOrder: 16,
    nominees: [
      { name: "Sinners", imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Sinners+2025+movie+trailer" },
      { name: "Hamnet", imageUrl: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Hamnet+2025+movie+trailer" },
      { name: "Frankenstein", imageUrl: "https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Frankenstein+2025+movie+trailer" },
      { name: "One Battle After Another", imageUrl: "https://images.unsplash.com/photo-1548613053-22087dd8edb8?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=One+Battle+After+Another+2025+trailer" },
      { name: "Bugonia", imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Bugonia+2025+movie+trailer" },
    ],
  },
  {
    name: "Best Original Song",
    sortOrder: 17,
    nominees: [
      { name: "I Lied To You (Sinners)", imageUrl: "https://image.tmdb.org/t/p/w500/qTvFWCGeGXgBRaINLY1zqgTPSpn.jpg", trailerUrl: "https://www.youtube.com/results?search_query=I+Lied+To+You+Sinners+2025" },
      { name: "Golden (KPop Demon Hunters)", imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Golden+KPop+Demon+Hunters+2025" },
      { name: "Dear Me (Diane Warren: Relentless)", imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Dear+Me+Diane+Warren+Relentless+2025" },
      { name: "Sweet Dreams of Joy (Viva Verdi!)", imageUrl: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Sweet+Dreams+of+Joy+Viva+Verdi+2025" },
      { name: "Train Dreams (Train Dreams)", imageUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Train+Dreams+song+2025" },
    ],
  },
  {
    name: "Best Sound",
    sortOrder: 18,
    nominees: [
      { name: "Sinners", imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Sinners+2025+movie+trailer" },
      { name: "F1", imageUrl: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=F1+2025+movie+trailer" },
      { name: "One Battle After Another", imageUrl: "https://images.unsplash.com/photo-1548613053-22087dd8edb8?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=One+Battle+After+Another+2025+trailer" },
      { name: "Frankenstein", imageUrl: "https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Frankenstein+2025+movie+trailer" },
      { name: "Sirât", imageUrl: "https://image.tmdb.org/t/p/w500/bzBtsLi17rK4G6kDvOXfUZfAhca.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Sirat+film+2025+trailer" },
    ],
  },
  {
    name: "Best Production Design",
    sortOrder: 19,
    nominees: [
      { name: "Frankenstein", imageUrl: "https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Frankenstein+2025+movie+trailer" },
      { name: "Hamnet", imageUrl: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Hamnet+2025+movie+trailer" },
      { name: "One Battle After Another", imageUrl: "https://images.unsplash.com/photo-1548613053-22087dd8edb8?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=One+Battle+After+Another+2025+trailer" },
      { name: "Sinners", imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Sinners+2025+movie+trailer" },
      { name: "Marty Supreme", imageUrl: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Marty+Supreme+2025+movie+trailer" },
    ],
  },
  {
    name: "Best Cinematography",
    sortOrder: 20,
    nominees: [
      { name: "Sinners", imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Sinners+2025+movie+trailer" },
      { name: "Frankenstein", imageUrl: "https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Frankenstein+2025+movie+trailer" },
      { name: "One Battle After Another", imageUrl: "https://images.unsplash.com/photo-1548613053-22087dd8edb8?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=One+Battle+After+Another+2025+trailer" },
      { name: "Marty Supreme", imageUrl: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Marty+Supreme+2025+movie+trailer" },
      { name: "Train Dreams", imageUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Train+Dreams+2025+movie+trailer" },
    ],
  },
  {
    name: "Best Makeup and Hairstyling",
    sortOrder: 21,
    nominees: [
      { name: "Frankenstein", imageUrl: "https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Frankenstein+2025+movie+trailer" },
      { name: "Sinners", imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Sinners+2025+movie+trailer" },
      { name: "Kokuho", imageUrl: "https://image.tmdb.org/t/p/w500/egDmNUBcSvu6aqQPCfyd1UneCYr.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Kokuho+2025+movie+trailer" },
      { name: "The Smashing Machine", imageUrl: "https://image.tmdb.org/t/p/w500/mPuBDGrVIBGOymBxR6rO3iIvBSe.jpg", trailerUrl: "https://www.youtube.com/results?search_query=The+Smashing+Machine+2025+movie+trailer" },
      { name: "The Ugly Stepsister", imageUrl: "https://image.tmdb.org/t/p/w500/rayAREIKtSinuov10GvrZHyXfXH.jpg", trailerUrl: "https://www.youtube.com/results?search_query=The+Ugly+Stepsister+2025+movie+trailer" },
    ],
  },
  {
    name: "Best Costume Design",
    sortOrder: 22,
    nominees: [
      { name: "Hamnet", imageUrl: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Hamnet+2025+movie+trailer" },
      { name: "Frankenstein", imageUrl: "https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Frankenstein+2025+movie+trailer" },
      { name: "Sinners", imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Sinners+2025+movie+trailer" },
      { name: "Marty Supreme", imageUrl: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Marty+Supreme+2025+movie+trailer" },
      { name: "Avatar: Fire and Ash", imageUrl: "https://image.tmdb.org/t/p/w500/bRBeSHfGHwkEpImlhxPmOcUsaeg.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Avatar+Fire+and+Ash+2025+trailer" },
    ],
  },
  {
    name: "Best Film Editing",
    sortOrder: 23,
    nominees: [
      { name: "Sinners", imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Sinners+2025+movie+trailer" },
      { name: "One Battle After Another", imageUrl: "https://images.unsplash.com/photo-1548613053-22087dd8edb8?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=One+Battle+After+Another+2025+trailer" },
      { name: "F1", imageUrl: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=F1+2025+movie+trailer" },
      { name: "Marty Supreme", imageUrl: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Marty+Supreme+2025+movie+trailer" },
      { name: "Sentimental Value", imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Sentimental+Value+2025+movie+trailer" },
    ],
  },
  {
    name: "Best Visual Effects",
    sortOrder: 24,
    nominees: [
      { name: "Avatar: Fire and Ash", imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Avatar+Fire+and+Ash+2025+trailer" },
      { name: "F1", imageUrl: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=F1+2025+movie+trailer" },
      { name: "Jurassic World Rebirth", imageUrl: "https://image.tmdb.org/t/p/w500/1RICxzeoNCAO5NpcRMIgg1XT6fm.jpg", trailerUrl: "https://www.youtube.com/results?search_query=Jurassic+World+Rebirth+2025+trailer" },
      { name: "Sinners", imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80", trailerUrl: "https://www.youtube.com/results?search_query=Sinners+2025+movie+trailer" },
      { name: "The Lost Bus", imageUrl: "https://image.tmdb.org/t/p/w500/zpygCOYY1DPBkeUsrrznLRN5js5.jpg", trailerUrl: "https://www.youtube.com/results?search_query=The+Lost+Bus+2025+movie+trailer" },
    ],
  },
];
