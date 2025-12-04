export interface Category {
  id: string;
  name: string;
  label: string;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'sofa', name: 'sofa', label: 'Sofas', icon: '🛋️', createdAt: new Date(), updatedAt: new Date() },
  { id: 'sectional', name: 'sectional', label: 'Sectionals', icon: '📐', createdAt: new Date(), updatedAt: new Date() },
  { id: 'recliner', name: 'recliner', label: 'Recliners', icon: '💺', createdAt: new Date(), updatedAt: new Date() },
  { id: 'loveseat', name: 'loveseat', label: 'Loveseats', icon: '❤️', createdAt: new Date(), updatedAt: new Date() },
  { id: 'sleeper', name: 'sleeper', label: 'Sleeper Sofas', icon: '🛏️', createdAt: new Date(), updatedAt: new Date() },
  { id: 'ottoman', name: 'ottoman', label: 'Ottomans', icon: '🪑', createdAt: new Date(), updatedAt: new Date() },
  { id: 'accent-chair', name: 'accent-chair', label: 'Accent Chairs', icon: '🪑', createdAt: new Date(), updatedAt: new Date() },
];
