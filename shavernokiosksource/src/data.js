// ===== MENU DATA =====
// Each category / product may carry an optional `img` (photo URL). When empty,
// the UI falls back to the `icon` emoji — these are the "photo slots" the
// operator fills with real product photography.

export const CATS = [
  { id: 'shawarma',  icon: '🌯', img: '', ru: 'Шаверма',   en: 'Shawarma',    zh: '沙威玛',     de: 'Schawarma',  tr: 'Dürüm' },
  { id: 'signature', icon: '⭐', img: '', ru: 'Фирменная', en: 'Signature',   zh: '招牌',       de: 'Spezial',    tr: 'Özel' },
  { id: 'doner',     icon: '🥙', img: '', ru: 'Донеры',    en: 'Doner',       zh: '土耳其烤肉', de: 'Döner',      tr: 'Döner' },
  { id: 'rolls',     icon: '🍙', img: '', ru: 'Роллы',     en: 'Rolls',       zh: '卷饼',       de: 'Rolls',      tr: 'Rulo' },
  { id: 'hot',       icon: '🍖', img: '', ru: 'Горячее',   en: 'Hot dishes',  zh: '热菜',       de: 'Warme',      tr: 'Sıcak' },
  { id: 'salad',     icon: '🥗', img: '', ru: 'Салаты',    en: 'Salads',      zh: '沙拉',       de: 'Salate',     tr: 'Salata' },
  { id: 'snack',     icon: '🍟', img: '', ru: 'Закуски',   en: 'Snacks',      zh: '小吃',       de: 'Snacks',     tr: 'Atıştırma' },
  { id: 'sauce',     icon: '🥫', img: '', ru: 'Соусы',     en: 'Sauces',      zh: '酱料',       de: 'Soßen',      tr: 'Soslar' },
  { id: 'cold',      icon: '🥤', img: '', ru: 'Напитки',   en: 'Cold drinks', zh: '冷饮',       de: 'Kalt',       tr: 'Soğuk' },
  { id: 'hotdrink',  icon: '☕', img: '', ru: 'Горячие',   en: 'Hot drinks',  zh: '热饮',       de: 'Heiß',       tr: 'Sıcak içecek' },
  { id: 'breakfast', icon: '🍳', img: '', ru: 'Завтраки',  en: 'Breakfast',   zh: '早餐',       de: 'Frühstück',  tr: 'Kahvaltı' }
]

export const PRODUCTS = {
  shawarma: [
    { id: 'sh_cl', ru: 'Шаверма Классик', en: 'Classic Shawarma', vol: '330 г', price: 320, badge: 'hit', icon: '🌯', img: '' },
    { id: 'sh_xl', ru: 'Шаверма XL',      en: 'Shawarma XL',      vol: '450 г', price: 420, icon: '🌯', img: '' },
    { id: 'sh_ch', ru: 'Шаверма Чикен',   en: 'Chicken Shawarma', vol: '320 г', price: 300, icon: '🌯', img: '' },
    { id: 'sh_sp', ru: 'Шаверма Острая',  en: 'Spicy Shawarma',   vol: '330 г', price: 340, badge: 'new', icon: '🌶️', img: '' },
    { id: 'sh_vg', ru: 'Вегетарианская',  en: 'Veggie Shawarma',  vol: '300 г', price: 290, icon: '🥬', img: '' }
  ],
  signature: [
    { id: 'sg_fr', ru: 'Шаверно Фирменная', en: 'Signature Shawarma', vol: '480 г', price: 480, badge: 'hit', icon: '⭐', img: '' },
    { id: 'sg_db', ru: 'Двойное мясо',      en: 'Double Meat',        vol: '520 г', price: 520, icon: '🥩', img: '' },
    { id: 'sg_ch', ru: 'Сырная бомба',      en: 'Cheese Bomb',        vol: '460 г', price: 460, badge: 'new', icon: '🧀', img: '' },
    { id: 'sg_fl', ru: 'Фалафель Премиум',  en: 'Premium Falafel',    vol: '380 г', price: 380, icon: '🧆', img: '' }
  ],
  doner: [
    { id: 'dn_cl', ru: 'Донер Классик',      en: 'Classic Doner', vol: '330 г', price: 330, icon: '🥙', img: '' },
    { id: 'dn_xl', ru: 'Донер XL',           en: 'Doner XL',      vol: '450 г', price: 430, badge: 'hit', icon: '🥙', img: '' },
    { id: 'dn_bx', ru: 'Донер в коробочке',  en: 'Doner Box',     vol: '400 г', price: 360, icon: '🍱', img: '' },
    { id: 'dn_pl', ru: 'Кебаб-плейт',        en: 'Kebab Plate',   vol: '500 г', price: 450, icon: '🍢', img: '' }
  ],
  rolls: [
    { id: 'rl_ch', ru: 'Ролл с курицей',   en: 'Chicken Roll', vol: '280 г', price: 280, icon: '🍙', img: '' },
    { id: 'rl_bf', ru: 'Ролл с говядиной', en: 'Beef Roll',    vol: '290 г', price: 320, badge: 'hit', icon: '🍙', img: '' },
    { id: 'rl_fl', ru: 'Ролл фалафель',    en: 'Falafel Roll', vol: '270 г', price: 260, icon: '🧆', img: '' },
    { id: 'rl_cz', ru: 'Цезарь-ролл',      en: 'Caesar Roll',  vol: '290 г', price: 300, badge: 'new', icon: '🥬', img: '' }
  ],
  hot: [
    { id: 'ht_wg', ru: 'Куриные крылья',          en: 'Chicken Wings',   vol: '8 шт',  price: 360, badge: 'hit', icon: '🍗', img: '' },
    { id: 'ht_ng', ru: 'Наггетсы',                en: 'Nuggets',         vol: '9 шт',  price: 280, icon: '🍗', img: '' },
    { id: 'ht_pt', ru: 'Картофель по-деревенски', en: 'Country Potatoes',vol: '200 г', price: 220, icon: '🥔', img: '' },
    { id: 'ht_lk', ru: 'Люля-кебаб',              en: 'Lula Kebab',      vol: '250 г', price: 420, icon: '🍢', img: '' }
  ],
  salad: [
    { id: 'sl_cz', ru: 'Цезарь',    en: 'Caesar', vol: '220 г', price: 320, badge: 'hit', icon: '🥗', img: '' },
    { id: 'sl_gr', ru: 'Греческий', en: 'Greek',  vol: '220 г', price: 300, icon: '🥗', img: '' },
    { id: 'sl_vg', ru: 'Овощной',   en: 'Veggie', vol: '200 г', price: 220, icon: '🥗', img: '' }
  ],
  snack: [
    { id: 'sn_fr', ru: 'Картофель фри',  en: 'Fries',        vol: '150 г', price: 150, badge: 'hit', icon: '🍟', img: '' },
    { id: 'sn_cs', ru: 'Сырные палочки', en: 'Cheese Sticks',vol: '6 шт',  price: 240, icon: '🧀', img: '' },
    { id: 'sn_or', ru: 'Луковые кольца', en: 'Onion Rings',  vol: '8 шт',  price: 220, icon: '🧅', img: '' },
    { id: 'sn_ng', ru: 'Наггетсы',       en: 'Nuggets',      vol: '6 шт',  price: 260, icon: '🍗', img: '' }
  ],
  sauce: [
    { id: 'sc_gr',  ru: 'Чесночный', en: 'Garlic',  vol: '50 г', price: 50, badge: 'hit', icon: '🧄', img: '' },
    { id: 'sc_sp',  ru: 'Острый',    en: 'Spicy',   vol: '50 г', price: 50, icon: '🌶️', img: '' },
    { id: 'sc_bbq', ru: 'Барбекю',   en: 'BBQ',     vol: '50 г', price: 50, icon: '🍖', img: '' },
    { id: 'sc_ch',  ru: 'Сырный',    en: 'Cheese',  vol: '50 г', price: 70, icon: '🧀', img: '' },
    { id: 'sc_kt',  ru: 'Кетчуп',    en: 'Ketchup', vol: '50 г', price: 40, icon: '🥫', img: '' }
  ],
  cold: [
    { id: 'cd_co', ru: 'Кола',     en: 'Cola',       vol: '0,5 л', price: 150, icon: '🥤', img: '' },
    { id: 'cd_lm', ru: 'Лимонад',  en: 'Lemonade',   vol: '0,4 л', price: 200, badge: 'hit', icon: '🍋', img: '' },
    { id: 'cd_mo', ru: 'Морс',     en: 'Berry Drink',vol: '0,4 л', price: 160, icon: '🧃', img: '' },
    { id: 'cd_ay', ru: 'Айран',    en: 'Ayran',      vol: '0,3 л', price: 140, icon: '🥛', img: '' },
    { id: 'cd_wt', ru: 'Вода',     en: 'Water',      vol: '0,5 л', price: 90,  icon: '💧', img: '' }
  ],
  hotdrink: [
    { id: 'hd_cf', ru: 'Кофе',     en: 'Coffee',     vol: '0,3 л', price: 150, icon: '☕', img: '' },
    { id: 'hd_cp', ru: 'Капучино', en: 'Cappuccino', vol: '0,3 л', price: 220, badge: 'hit', icon: '☕', img: '' },
    { id: 'hd_te', ru: 'Чай',      en: 'Tea',        vol: '0,4 л', price: 120, icon: '🍵', img: '' },
    { id: 'hd_cc', ru: 'Какао',    en: 'Cocoa',      vol: '0,3 л', price: 190, icon: '☕', img: '' }
  ],
  breakfast: [
    { id: 'bf_sh', ru: 'Шаверма-завтрак', en: 'Breakfast Shawarma', vol: '280 г', price: 260, badge: 'hit', icon: '🌯', img: '' },
    { id: 'bf_om', ru: 'Омлет-ролл',      en: 'Omelette Roll',      vol: '250 г', price: 240, icon: '🍳', img: '' },
    { id: 'bf_sy', ru: 'Сырники',         en: 'Cheese Pancakes',    vol: '200 г', price: 280, icon: '🥞', img: '' },
    { id: 'bf_ka', ru: 'Каша',            en: 'Porridge',           vol: '250 г', price: 180, icon: '🥣', img: '' }
  ]
}

// Cross-sell / upsell items
export const CROSS = [
  { id: 'fri',    ru: 'Картофель фри',  en: 'Fries',         price: 150, icon: '🍟' },
  { id: 'sauce',  ru: 'Соус',           en: 'Sauce',         price: 50,  icon: '🥫' },
  { id: 'cola',   ru: 'Кола',           en: 'Cola',          price: 150, icon: '🥤' },
  { id: 'nug',    ru: 'Наггетсы',       en: 'Nuggets',       price: 280, icon: '🍗' },
  { id: 'cstick', ru: 'Сырные палочки', en: 'Cheese sticks', price: 240, icon: '🧀' }
]

// "Meat" modifier group (required)
export const MILK = [
  { id: 'chk',  ru: 'Курица',    en: 'Chicken',  icon: '🍗', price: 0 },
  { id: 'beef', ru: 'Говядина',  en: 'Beef',     icon: '🥩', price: 60 },
  { id: 'lamb', ru: 'Баранина',  en: 'Lamb',     icon: '🐑', price: 90 },
  { id: 'fal',  ru: 'Фалафель',  en: 'Falafel',  icon: '🧆', price: 0 }
]

export const ADDONS = [
  { id: 'cheese', ru: 'Сыр',          en: 'Cheese',      icon: '🧀', price: 50 },
  { id: 'jal',    ru: 'Халапеньо',    en: 'Jalapeño',    icon: '🌶️', price: 40 },
  { id: 'dbl',    ru: 'Двойное мясо', en: 'Double meat', icon: '🥩', price: 120 },
  { id: 'veg',    ru: 'Гриль-овощи',  en: 'Grilled veg', icon: '🫑', price: 60 }
]

export const COMBO = {
  main:  [ { id: 'shawarma', ru: 'Шаверма', en: 'Shawarma', icon: '🌯', price: 0 }, { id: 'doner', ru: 'Донер', en: 'Doner', icon: '🥙', price: 0 }, { id: 'roll', ru: 'Ролл', en: 'Roll', icon: '🍙', price: 30 } ],
  side:  [ { id: 'fries', ru: 'Фри', en: 'Fries', icon: '🍟', price: 0 }, { id: 'rings', ru: 'Кольца', en: 'Rings', icon: '🧅', price: 60 }, { id: 'nug', ru: 'Наггетсы', en: 'Nuggets', icon: '🍗', price: 90 } ],
  drink: [ { id: 'cola', ru: 'Кола', en: 'Cola', icon: '🥤', price: 0 }, { id: 'lemon', ru: 'Лимонад', en: 'Lemonade', icon: '🍋', price: 0 }, { id: 'ayran', ru: 'Айран', en: 'Ayran', icon: '🥛', price: 0 } ],
  sauce: [ { id: 'garlic', ru: 'Чесночный', en: 'Garlic', icon: '🧄', price: 0 }, { id: 'spicy', ru: 'Острый', en: 'Spicy', icon: '🌶️', price: 0 }, { id: 'bbq', ru: 'Барбекю', en: 'BBQ', icon: '🍖', price: 0 } ]
}

export const COMBO_STEP_META = [
  { g: 'main',  ru: 'Основное', en: 'Main',  zh: '主食', de: 'Hauptgericht', tr: 'Ana yemek' },
  { g: 'side',  ru: 'Гарнир',   en: 'Side',  zh: '配菜', de: 'Beilage',      tr: 'Garnitür' },
  { g: 'drink', ru: 'Напиток',  en: 'Drink', zh: '饮料', de: 'Getränk',      tr: 'İçecek' },
  { g: 'sauce', ru: 'Соус',     en: 'Sauce', zh: '酱料', de: 'Soße',         tr: 'Sos' }
]

// Per-category nutrition (kcal / protein / fat / carbs)
export const KCAL = {
  shawarma:  { k: 560, p: 30, f: 28, c: 46 },
  signature: { k: 680, p: 38, f: 36, c: 50 },
  doner:     { k: 590, p: 32, f: 30, c: 48 },
  rolls:     { k: 420, p: 22, f: 18, c: 40 },
  hot:       { k: 340, p: 18, f: 20, c: 22 },
  salad:     { k: 210, p: 9,  f: 14, c: 12 },
  snack:     { k: 330, p: 6,  f: 18, c: 36 },
  sauce:     { k: 90,  p: 1,  f: 9,  c: 3 },
  cold:      { k: 120, p: 0,  f: 0,  c: 30 },
  hotdrink:  { k: 110, p: 4,  f: 4,  c: 14 },
  breakfast: { k: 380, p: 16, f: 18, c: 34 }
}

// Looping video used on the lock screen and as the menu header banner.
export const DEFAULT_VIDEO = 'https://storage.yandexcloud.net/prod-genereativeimg/org/designconfig/videos/545d2fd7-e514-44c9-a721-f02c0383670f_b5969b6a1079d45a.webm'
export const BANNER_VIDEO  = 'https://storage.yandexcloud.net/prod-genereativeimg/org/designconfig/videos/545d2fd7-e514-44c9-a721-f02c0383670f_d38c46e2d3e76c78.webm'

// Combo pricing
export const COMBO_BASE_PRICE = 450
export const COMBO_DISCOUNT = 160
