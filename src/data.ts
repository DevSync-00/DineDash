import { MenuItem, Order, TableStatus } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    nameEn: 'Ethiopian Macchiato',
    nameAm: 'ማኪያቶ',
    descriptionEn: 'Rich, layered double espresso with steamed froth, a national favorite.',
    descriptionAm: 'ድርብ ኤስፕሬሶ ከተመጠነ ወተት አረፋ ጋር የተዘጋጀ ምርጥ ማኪያቶ።',
    price: 45,
    category: 'coffee',
    tags: ['Popular', 'Hot']
  },
  {
    id: 'm2',
    nameEn: 'Traditional Buna (Brewed)',
    nameAm: 'ባህላዊ ጅብና ቡና',
    descriptionEn: 'Freshly roasted clay pot brewed organic Sidama coffee.',
    descriptionAm: 'በባህላዊ ጄበና የፈላ የሲዳማ ቡና ከዕጣን መዓዛ ጋር።',
    price: 35,
    category: 'coffee',
    tags: ['Organic', 'Classic']
  },
  {
    id: 'm3',
    nameEn: 'Special Kitfo',
    nameAm: 'ልዩ ክትፎ',
    descriptionEn: 'Finely minced extra lean beef seasoned with mitmita and warm niter kibbeh.',
    descriptionAm: 'ለስላሳ ከብት ሥጋ በሚጥሚጣ እና በቅመም ቅቤ የተዘጋጀ።',
    price: 380,
    category: 'main',
    tags: ['Popular', 'Spicy']
  },
  {
    id: 'm4',
    nameEn: 'Special Beyaynetu',
    nameAm: 'ልዩ በያይነቱ',
    descriptionEn: 'Colorful platter of split peas, lentils, collard greens, and shiro on injera.',
    descriptionAm: 'የተለያዩ የእህል እና የአትክልት ወጦች በዕንጀራ ላይ የተደረደሩበት የጾም በያይነቱ።',
    price: 180,
    category: 'main',
    tags: ['Vegan', 'Classic']
  },
  {
    id: 'm5',
    nameEn: 'Tegabino Shiro',
    nameAm: 'ተጋቢኖ ሽሮ',
    descriptionEn: 'Sizzling clay-plate seasoned chickpea stew served bubbling hot.',
    descriptionAm: 'በሸክላ ድስት ፈልቶ የሚቀርብ የተመረጠ ሽሮ።',
    price: 120,
    category: 'main',
    tags: ['Vegan', 'Hot']
  },
  {
    id: 'm6',
    nameEn: 'Injera Beef Firfir',
    nameAm: 'የስጋ ፍርፍር',
    descriptionEn: 'Lemony torn injera soaked in spiced berbere beef stew.',
    descriptionAm: 'በበርበሬ እና በስጋ ወጥ የተፈተፈተ የሚጣፍጥ በላተኛ።',
    price: 190,
    category: 'breakfast' as any,
    tags: ['Classic']
  },
  {
    id: 'm7',
    nameEn: 'Avocado Spriss Juice',
    nameAm: 'አቮካዶ ስፕሪስ',
    descriptionEn: 'Thick, fresh squeezed pureed avocado and mango layers.',
    descriptionAm: 'እርጥብ አቮካዶ እና የማንጎ ጭማቂ የተደራረበበት ተወዳጅ ስፕሪስ።',
    price: 75,
    category: 'dessert',
    tags: ['Fresh', 'Sweet']
  },
  {
    id: 'm8',
    nameEn: 'Sambusa (Lentil/Beef)',
    nameAm: 'ሳምቡሳ',
    descriptionEn: 'Crispy pastry triangle filled with spiced green lentils (2 pcs).',
    descriptionAm: 'በቅመም ምስር የተሞላ ተወዳጅና ጥርት ያለ ሳምቡሳ (2 ፍሬ)።',
    price: 40,
    category: 'fast',
    tags: ['Vegan', 'Crispy']
  }
];

export const INITIAL_TABLES: TableStatus[] = [
  { number: 1, capacity: 2, status: 'Occupied', currentTotal: 220 },
  { number: 2, capacity: 4, status: 'Vacant' },
  { number: 3, capacity: 6, status: 'Paid', currentTotal: 760 },
  { number: 4, capacity: 2, status: 'Browsing' },
  { number: 5, capacity: 4, status: 'Vacant' }, // We will use Table 5 for our simulator!
  { number: 6, capacity: 8, status: 'Occupied', currentTotal: 1250 },
  { number: 7, capacity: 4, status: 'Unpaid', currentTotal: 460 },
  { number: 8, capacity: 2, status: 'Vacant' },
  { number: 9, capacity: 4, status: 'Ordering' },
  { number: 10, capacity: 6, status: 'Occupied', currentTotal: 840 },
  { number: 12, capacity: 4, status: 'Vacant' }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'DD-4029',
    tableNumber: 3,
    items: [
      { nameEn: 'Special Kitfo', quantity: 2, price: 380 }
    ],
    totalPrice: 760,
    paymentMethod: 'Telebirr',
    status: 'Paid',
    timestamp: '09:42 AM'
  },
  {
    id: 'DD-4028',
    tableNumber: 7,
    items: [
      { nameEn: 'Special Beyaynetu', quantity: 2, price: 180 },
      { nameEn: 'Sambusa (Lentil/Beef)', quantity: 2, price: 40 },
      { nameEn: 'Traditional Buna (Brewed)', quantity: 2, price: 35 }
    ],
    totalPrice: 460,
    paymentMethod: 'CBE Birr',
    status: 'Received',
    timestamp: '09:51 AM'
  },
  {
    id: 'DD-4027',
    tableNumber: 10,
    items: [
      { nameEn: 'Tegabino Shiro', quantity: 4, price: 120 },
      { nameEn: 'Avocado Spriss Juice', quantity: 4, price: 75 },
      { nameEn: 'Ethiopian Macchiato', quantity: 2, price: 45 }
    ],
    totalPrice: 840,
    paymentMethod: 'HelloCash',
    status: 'Preparing',
    timestamp: '09:35 AM'
  },
  {
    id: 'DD-4026',
    tableNumber: 1,
    items: [
      { nameEn: 'Special Beyaynetu', quantity: 1, price: 180 },
      { nameEn: 'Sambusa (Lentil/Beef)', quantity: 1, price: 40 }
    ],
    totalPrice: 220,
    paymentMethod: 'Cash',
    status: 'Delivered',
    timestamp: '09:12 AM'
  }
];
