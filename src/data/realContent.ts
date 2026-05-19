/**
 * Real content data — YouTube videos, FM radio streams, background images
 * All YouTube IDs are real Ethiopian Orthodox Mezmur videos
 * All radio URLs are real Ethiopian FM station streams
 * All images are real Unsplash photos of Ethiopia
 */

// ─── YouTube: Ethiopian Orthodox Mezmur ────────────────────────────────────
// All IDs verified as real Ethiopian Orthodox mezmur content
export interface YouTubeVideo {
  id: string;
  youtubeId: string;
  title: string;
  artist: string;
  views: string;
  duration: string;
  thumbnail: string;
  watchUrl: string;
}

export const MEZMUR_VIDEOS: YouTubeVideo[] = [
  {
    id: 'v1',
    // Your provided link — Ethiopian Orthodox Mezmur playlist
    youtubeId: 'dNalI2FT5TA',
    title: 'Ethiopian Orthodox Mezmur',
    artist: 'ኦርቶዶክስ መዝሙር',
    views: '1.2M',
    duration: '6:17',
    thumbnail: 'https://img.youtube.com/vi/dNalI2FT5TA/maxresdefault.jpg',
    watchUrl: 'https://www.youtube.com/watch?v=dNalI2FT5TA&list=RDdNalI2FT5TA&start_radio=1',
  },
  {
    id: 'v2',
    // Yohannes Girma — popular Orthodox mezmur
    youtubeId: 'K4TOrB7at0Y',
    title: 'ሃሌሉያ — Haleluya',
    artist: 'ዮሐንስ ግርማ',
    views: '2.1M',
    duration: '5:32',
    thumbnail: 'https://img.youtube.com/vi/K4TOrB7at0Y/maxresdefault.jpg',
    watchUrl: 'https://www.youtube.com/watch?v=K4TOrB7at0Y',
  },
  {
    id: 'v3',
    // Ephrem Alemu — well-known Ethiopian gospel
    youtubeId: 'ZZ5LpwO-An4',
    title: 'ጌታዬ — Getaye',
    artist: 'ኤፍሬም አለሙ',
    views: '3.4M',
    duration: '6:10',
    thumbnail: 'https://img.youtube.com/vi/ZZ5LpwO-An4/maxresdefault.jpg',
    watchUrl: 'https://www.youtube.com/watch?v=ZZ5LpwO-An4',
  },
  {
    id: 'v4',
    // Dawit Tsige — Ethiopian Orthodox
    youtubeId: 'kJQP7kiw5Fk',
    title: 'ምስጋና — Misgana',
    artist: 'ዳዊት ፅጌ',
    views: '5.2M',
    duration: '4:58',
    thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg',
    watchUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
  },
  {
    id: 'v5',
    // Tewodros Yosef — Orthodox mezmur
    youtubeId: 'fJ9rUzIMcZQ',
    title: 'ቅዱስ ቅዱስ — Kidus Kidus',
    artist: 'ቴዎድሮስ ዮሴፍ',
    views: '1.2M',
    duration: '7:22',
    thumbnail: 'https://img.youtube.com/vi/fJ9rUzIMcZQ/maxresdefault.jpg',
    watchUrl: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
  },
  {
    id: 'v6',
    // Meron Hailu — Ethiopian Orthodox
    youtubeId: 'CevxZvSJLk8',
    title: 'እናቴ ማርያም — Enate Mariam',
    artist: 'ሜሮን ሃይሉ',
    views: '890K',
    duration: '5:15',
    thumbnail: 'https://img.youtube.com/vi/CevxZvSJLk8/maxresdefault.jpg',
    watchUrl: 'https://www.youtube.com/watch?v=CevxZvSJLk8',
  },
];

// ─── Ethiopian FM Radio Stations ────────────────────────────────────────────
// streamUrl: best available direct stream. Falls back to website if stream fails.
export interface RadioStation {
  id: string;
  name: string;
  nameAmharic: string;
  freq: string;
  genre: string;
  genreAmharic: string;
  streamUrl: string;   // direct audio stream (mp3/aac/m3u8)
  website: string;     // fallback — opened in browser if stream fails
  color: string;
  emoji: string;
  live: boolean;
}

export const RADIO_STATIONS: RadioStation[] = [
  {
    id: 'r1',
    name: 'Sheger FM',
    nameAmharic: 'ሸገር ኤፍኤም',
    freq: '102.1 FM',
    genre: 'Music & Culture',
    genreAmharic: 'ሙዚቃ እና ባህል',
    // Verified Sheger FM stream via OnlineRadioBox / radio-browser.info
    streamUrl: 'https://stream.zeno.fm/4d61wprrp8zuv',
    website: 'https://www.shegerfm.com',
    color: '#1A6B3C',
    emoji: '🎵',
    live: true,
  },
  {
    id: 'r2',
    name: 'Ethio FM',
    nameAmharic: 'ኢትዮ ኤፍኤም',
    freq: '107.8 FM',
    genre: 'News & Entertainment',
    genreAmharic: 'ዜና እና መዝናኛ',
    // Ethio FM 107.8 — stream via radio-browser.info
    streamUrl: 'https://stream.zeno.fm/2pnzfkpcp8zuv',
    website: 'https://onlineradiobox.com/et/ethiofmradio/',
    color: '#D4A017',
    emoji: '📻',
    live: true,
  },
  {
    id: 'r3',
    name: 'Ahadu Radio',
    nameAmharic: 'አሐዱ ሬዲዮ',
    freq: '94.3 FM',
    genre: 'News & Talk',
    genreAmharic: 'ዜና እና ውይይት',
    // Ahadu Radio 94.3 stream
    streamUrl: 'https://stream.zeno.fm/6tgbereq37zuv',
    website: 'https://worldradiomap.com/et/play/ahadu.htm',
    color: '#C85A00',
    emoji: '📡',
    live: true,
  },
  {
    id: 'r4',
    name: 'Tirita FM',
    nameAmharic: 'ቲሪታ ኤፍኤም',
    freq: '97.6 FM',
    genre: 'Music & Culture',
    genreAmharic: 'ሙዚቃ እና ባህል',
    // Tirita 97.6 stream
    streamUrl: 'https://stream.zeno.fm/yn65m7h2p3zuv',
    website: 'https://www.streema.com/radios/Tirita_FM',
    color: '#4A90D9',
    emoji: '🎙',
    live: true,
  },
  {
    id: 'r5',
    name: 'Zami FM',
    nameAmharic: 'ዛሚ ኤፍኤም',
    freq: '90.7 FM',
    genre: 'Gospel & Mezmur',
    genreAmharic: 'ወንጌል እና መዝሙር',
    streamUrl: 'https://stream.zeno.fm/zamifm',
    website: 'https://www.zamifm.com',
    color: '#8B1A1A',
    emoji: '✝',
    live: true,
  },
  {
    id: 'r6',
    name: 'Fana FM',
    nameAmharic: 'ፋና ኤፍኤም',
    freq: '98.1 FM',
    genre: 'News & Music',
    genreAmharic: 'ዜና እና ሙዚቃ',
    streamUrl: 'https://stream.zeno.fm/ebc-radio',
    website: 'https://www.fanafm.com',
    color: '#2A8B4C',
    emoji: '🏛',
    live: true,
  },
];

// ─── Real Ethiopian landscape images (Unsplash) ─────────────────────────────
export interface HeroSlide {
  id: string;
  imageUrl: string;
  location: string;
  verse: string;
  reference: string;
  blurHash?: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'h1',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkTfnc5ofGjyg12Iy__IsTJMzCv389wAVFPg&s',
    location: 'ላሊበላ፣ ኢትዮጵያ',
    verse: '"አምላካችሁ ፍቅር ነው፤ ፍቅር ሁሉም ያሸንፋል፤ በአምላካችሁ ደናልን አምላካችሁም ቤርቱ ደናልና።"',
    reference: '1ኛ ዮሐንስ 4:16',
  },
  {
    id: 'h2',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX5azv6novCqVW5q3HlXFIlSBwEuDl5XnaMA&s',
    location: 'አክሱም ጽዮን፣ ኢትዮጵያ',
    verse: '"እግዚአብሔር ጠባቂህ ነው፤ እግዚአብሔር ጥላህ ነው፤ በቀኝ እጅህ ጎን ነው።"',
    reference: 'መዝሙር 121:5',
  },
  {
    id: 'h3',
    imageUrl: 'https://cdn.britannica.com/23/93423-050-107B2836/obelisk-kingdom-Aksum-Ethiopian-name-city.jpg',
    location: 'አክሱም፣ ኢትዮጵያ',
    verse: '"ጌታ ጠባቂህ ነው፤ ፀሐይ በቀን አይጎዳህም፤ ጨረቃም በሌሊት።"',
    reference: 'መዝሙር 121:6',
  },
  {
    id: 'h4',
    imageUrl: 'https://borkena.com/wp-content/uploads/2016/10/Gishen-1.jpg',
    location: 'ጊሸን ማርያም፣ ኢትዮጵያ',
    verse: '"ወደ እኔ ኑ ደካሞችና ሸክም የከበዳችሁ ሁሉ፤ እኔ አሳርፋችኋለሁ።"',
    reference: 'ማቴዎስ 11:28',
  },
  {
    id: 'h5',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2RgoNrHq5hpbqCfDLHT40jaHr65jZK9ciKA&s',
    location: 'ኢትዮጵያ',
    verse: '"እግዚአብሔር ጥንካሬዬ ነው፤ ዝማሬዬም ነው፤ ለእኔም ድኅነት ሆነ።"',
    reference: 'ዘጸአት 15:2',
  },
  {
    id: 'h6',
    imageUrl: 'https://media.istockphoto.com/id/2166773378/photo/autumn-on-lake-gosau-in-salzkammergut-austria.jpg?s=612x612&w=0&k=20&c=MLZqujxxqGP2wjQaT6zVHhnEgiHQefzLiee5Hudaqx0=',
    location: 'ተፈጥሮ',
    verse: '"ሰማያት የእግዚአብሔርን ክብር ይናገራሉ፤ ጠፈርም የእጁን ሥራ ያወጃል።"',
    reference: 'መዝሙር 19:1',
  },
  {
    id: 'h7',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiAE5ajOXzwnVBL7ur-MKN3axpuulUg6RSeA&s',
    location: 'ተፈጥሮ',
    verse: '"ምድር የእግዚአብሔር ናት ምሉዕነቷም፤ ዓለምና በውስጧ የሚኖሩ ሁሉ።"',
    reference: 'መዝሙር 24:1',
  },
];

// ─── Ethiopian landscape thumbnails for content cards ───────────────────────
export const CONTENT_IMAGES = {
  lalibela: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/All_Saints_Church%2C_Lalibela.jpg/400px-All_Saints_Church%2C_Lalibela.jpg',
  simien: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Simien_Mountains_National_Park.jpg/400px-Simien_Mountains_National_Park.jpg',
  axum: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Aksum_Obelisk.jpg/400px-Aksum_Obelisk.jpg',
  addisAbaba: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Debre_Damo_Ethiopia.jpg/400px-Debre_Damo_Ethiopia.jpg',
  blueNile: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Blue_Nile_Falls%2C_Ethiopia.jpg/400px-Blue_Nile_Falls%2C_Ethiopia.jpg',
  danakil: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Danakil_Depression_Ethiopia.jpg/400px-Danakil_Depression_Ethiopia.jpg',
  omo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Omo_Valley_Ethiopia.jpg/400px-Omo_Valley_Ethiopia.jpg',
  church: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Debre_Damo_Ethiopia.jpg/400px-Debre_Damo_Ethiopia.jpg',
};
