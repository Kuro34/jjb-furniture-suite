export type ProductCategory = 
  | 'sofa'
  | 'sectional'
  | 'recliner'
  | 'loveseat'
  | 'sleeper'
  | 'ottoman'
  | 'accent-chair';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  description: string;
  price: number;
  costPrice: number;
  stockQuantity: number;
  minStockLevel: number;
  imageUrl?: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  material: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StockAlert {
  productId: string;
  productName: string;
  currentStock: number;
  minStockLevel: number;
  severity: 'warning' | 'critical';
}

export interface InventoryStats {
  totalProducts: number;
  totalValue: number;
  lowStockCount: number;
  outOfStockCount: number;
  categoryCounts: Record<ProductCategory, number>;
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  'sofa': 'Sofas',
  'sectional': 'Sectionals',
  'recliner': 'Recliners',
  'loveseat': 'Loveseats',
  'sleeper': 'Sleeper Sofas',
  'ottoman': 'Ottomans',
  'accent-chair': 'Accent Chairs',
};

export const CATEGORY_ICONS: Record<ProductCategory, string> = {
  'sofa': '🛋️',
  'sectional': '📐',
  'recliner': '💺',
  'loveseat': '❤️',
  'sleeper': '🛏️',
  'ottoman': '🪑',
  'accent-chair': '🪑',
};
