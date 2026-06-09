export interface MenuItem {
  id: string;
  nameEn: string;
  nameAm: string;
  descriptionEn: string;
  descriptionAm: string;
  price: number;
  category: 'coffee' | 'main' | 'fast' | 'dessert';
  tags: string[];
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  tableNumber: number;
  items: {
    nameEn: string;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  paymentMethod: 'Telebirr' | 'CBE Birr' | 'HelloCash' | 'Cash';
  status: 'Received' | 'Preparing' | 'Delivered' | 'Paid';
  timestamp: string; // "H:MM AM/PM"
}

export interface TableStatus {
  number: number;
  capacity: number;
  status: 'Vacant' | 'Browsing' | 'Ordering' | 'Occupied' | 'Unpaid' | 'Paid';
  currentTotal?: number;
}

export interface QRRequestData {
  restaurantName: string;
  ownerName: string;
  phoneNumber: string;
  emailAddress: string;
  city: string;
  numberOfTables: number;
  restaurantType: string;
}
