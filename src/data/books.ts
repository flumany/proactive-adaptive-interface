
export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  price: number;
  rating: number;
  categories: string[];
  description: string;
  publishDate: string;
  pageCount: number;
  progress?: number; // 0-100
  isOwned?: boolean;
  isFavorite?: boolean;
}

export const popularBooks: Book[] = [
  {
    id: 'book1',
    title: '鬼滅の刃 22巻',
    author: '吾峠呼世晴',
    coverImage: 'https://placehold.co/200x300/BF0000/FFFFFF?text=鬼滅の刃+22',
    price: 484,
    rating: 4.8,
    categories: ['少年漫画', 'アクション'],
    description: '鬼と化した妹を人間に戻すため、主人公・炭治郎が鬼と戦う姿を描いた人気漫画シリーズ。',
    publishDate: '2022-01-01',
    pageCount: 192,
    isOwned: true,
    progress: 75
  },
  {
    id: 'book2',
    title: 'チェンソーマン 12巻',
    author: '藤本タツキ',
    coverImage: 'https://placehold.co/200x300/1A1A1A/FFFFFF?text=チェンソーマン+12',
    price: 484,
    rating: 4.7,
    categories: ['少年漫画', 'ダークファンタジー'],
    description: '悪魔と契約し、"チェンソーの悪魔"となった少年が繰り広げる壮絶なバトルと人間ドラマ。',
    publishDate: '2022-03-15',
    pageCount: 192,
    isOwned: true,
    progress: 30
  },
  {
    id: 'book3',
    title: '呪術廻戦 19巻',
    author: '芥見下々',
    coverImage: 'https://placehold.co/200x300/222222/FFFFFF?text=呪術廻戦+19',
    price: 484,
    rating: 4.6,
    categories: ['少年漫画', 'ファンタジー'],
    description: '呪いを祓う術師たちの活躍を描いたダークファンタジー作品。',
    publishDate: '2022-04-20',
    pageCount: 192,
    isOwned: false
  },
  {
    id: 'book4',
    title: '東京タラレバ娘 10巻',
    author: '東村アキコ',
    coverImage: 'https://placehold.co/200x300/FF3333/FFFFFF?text=東京タラレバ娘+10',
    price: 660,
    rating: 4.5,
    categories: ['女性漫画', '恋愛'],
    description: 'アラサー女子の恋と仕事の物語。「タラレバ」を言い続ける女性たちの成長を描く。',
    publishDate: '2021-11-10',
    pageCount: 176,
    isOwned: true,
    progress: 100,
    isFavorite: true
  },
  {
    id: 'book5',
    title: '沈黙のパレード',
    author: '東野圭吾',
    coverImage: 'https://placehold.co/200x300/333333/FFFFFF?text=沈黙のパレード',
    price: 1760,
    rating: 4.4,
    categories: ['ミステリー', '小説'],
    description: '人気ミステリー作家・東野圭吾による、ガリレオシリーズ最新作。',
    publishDate: '2021-09-05',
    pageCount: 432,
    isOwned: true,
    progress: 50
  },
  {
    id: 'book6',
    title: '52ヘルツのクジラたち',
    author: '町田そのこ',
    coverImage: 'https://placehold.co/200x300/0066CC/FFFFFF?text=52ヘルツの+クジラたち',
    price: 1650,
    rating: 4.3,
    categories: ['小説', '文学'],
    description: '周波数52ヘルツで鳴くという孤独なクジラにちなみ、様々な孤独を抱えた人々の物語。',
    publishDate: '2021-07-15',
    pageCount: 344,
    isOwned: false
  },
  {
    id: 'book7',
    title: 'クラウドファースト',
    author: '星野佑介',
    coverImage: 'https://placehold.co/200x300/008844/FFFFFF?text=クラウド+ファースト',
    price: 3080,
    rating: 4.2,
    categories: ['ビジネス', 'IT'],
    description: 'クラウドファーストの時代に企業がどのようにDXを進めるべきかを解説した一冊。',
    publishDate: '2021-05-20',
    pageCount: 288,
    isOwned: true,
    progress: 10
  },
  {
    id: 'book8',
    title: '推し、燃ゆ',
    author: '宇佐見りん',
    coverImage: 'https://placehold.co/200x300/884488/FFFFFF?text=推し、燃ゆ',
    price: 1430,
    rating: 4.1,
    categories: ['小説', '文学'],
    description: 'アイドルを"推す"ことで生きる意味を見出した少女の物語。芥川賞受賞作。',
    publishDate: '2021-03-12',
    pageCount: 224,
    isOwned: false
  }
];

export const newReleases: Book[] = [
  {
    id: 'new1',
    title: 'SPY×FAMILY 11巻',
    author: '遠藤達哉',
    coverImage: 'https://placehold.co/200x300/444444/FFFFFF?text=SPY×FAMILY+11',
    price: 484,
    rating: 4.9,
    categories: ['少年漫画', 'コメディ'],
    description: 'スパイ、殺し屋、超能力者からなる偽装家族のコミカルな日常と任務を描く人気作。',
    publishDate: '2023-04-01',
    pageCount: 192,
    isOwned: false
  },
  {
    id: 'new2',
    title: '三体',
    author: '劉慈欣',
    coverImage: 'https://placehold.co/200x300/003366/FFFFFF?text=三体',
    price: 1980,
    rating: 4.8,
    categories: ['SF', '小説'],
    description: '中国発の壮大なSF。宇宙文明との接触から始まる人類の存亡をかけた物語。',
    publishDate: '2023-03-20',
    pageCount: 512,
    isOwned: false
  },
  {
    id: 'new3',
    title: 'ブルーピリオド 13巻',
    author: '山口つばさ',
    coverImage: 'https://placehold.co/200x300/0088CC/FFFFFF?text=ブルーピリオド+13',
    price: 715,
    rating: 4.7,
    categories: ['青年漫画', '芸術'],
    description: '美大を目指す高校生の成長と芸術への情熱を描いた作品。',
    publishDate: '2023-03-15',
    pageCount: 208,
    isOwned: false
  },
  {
    id: 'new4',
    title: '億男',
    author: '川村元気',
    coverImage: 'https://placehold.co/200x300/8A9597/FFFFFF?text=億男',
    price: 1540,
    rating: 4.5,
    categories: ['小説', 'ヒューマンドラマ'],
    description: '突然3億円を手にした男の人生の変化を描いた物語。お金と幸せの関係を問う。',
    publishDate: '2023-03-05',
    pageCount: 368,
    isOwned: false
  }
];

export const recommendations: Book[] = [
  {
    id: 'rec1',
    title: 'ファーストラヴ',
    author: '島本理生',
    coverImage: 'https://placehold.co/200x300/CC0066/FFFFFF?text=ファーストラヴ',
    price: 1760,
    rating: 4.4,
    categories: ['小説', 'ミステリー'],
    description: '女性の死の謎を追う姪と、彼女を取り巻く人々の複雑な人間関係を描いた小説。',
    publishDate: '2021-10-05',
    pageCount: 392,
    isOwned: false
  },
  {
    id: 'rec2',
    title: 'かがみの孤城',
    author: '辻村深月',
    coverImage: 'https://placehold.co/200x300/663366/FFFFFF?text=かがみの孤城',
    price: 1870,
    rating: 4.7,
    categories: ['小説', 'ファンタジー'],
    description: '不登校の中学生たちが鏡の中の城に招かれ、様々な試練を乗り越えていく物語。',
    publishDate: '2021-09-10',
    pageCount: 456,
    isOwned: false
  },
  {
    id: 'rec3',
    title: 'Python実践入門',
    author: '鈴木たかのり',
    coverImage: 'https://placehold.co/200x300/3366CC/FFFFFF?text=Python実践入門',
    price: 3080,
    rating: 4.6,
    categories: ['プログラミング', 'IT'],
    description: 'Pythonプログラミングを基礎から応用まで学べる実践的な入門書。',
    publishDate: '2022-01-15',
    pageCount: 384,
    isOwned: false
  },
  {
    id: 'rec4',
    title: '1日5分間瞑想法',
    author: '安藤俊介',
    coverImage: 'https://placehold.co/200x300/669900/FFFFFF?text=1日5分間瞑想法',
    price: 1430,
    rating: 4.2,
    categories: ['自己啓発', '健康'],
    description: '忙しい現代人でも続けられる、シンプルで効果的な瞑想法を紹介。',
    publishDate: '2022-02-20',
    pageCount: 216,
    isOwned: false
  }
];

export const myBooks: Book[] = popularBooks
  .filter(book => book.isOwned)
  .sort((a, b) => {
    // 進行中の本を先に表示
    if ((a.progress || 0) < 100 && (b.progress || 0) === 100) return -1;
    if ((a.progress || 0) === 100 && (b.progress || 0) < 100) return 1;
    // 進行度の高い順
    return (b.progress || 0) - (a.progress || 0);
  });

export function getBookById(id: string): Book | undefined {
  return [...popularBooks, ...newReleases, ...recommendations].find(book => book.id === id);
}

// ジャンル別の本のリスト
export const categories = [
  { id: 'manga', name: '漫画', count: 15 },
  { id: 'novel', name: '小説', count: 23 },
  { id: 'business', name: 'ビジネス', count: 18 },
  { id: 'selfhelp', name: '自己啓発', count: 11 },
  { id: 'science', name: '科学・技術', count: 9 },
  { id: 'history', name: '歴史', count: 7 },
  { id: 'travel', name: '旅行', count: 5 },
  { id: 'cooking', name: '料理', count: 8 },
  { id: 'art', name: '芸術・デザイン', count: 6 }
];
