import { useState, useMemo, useCallback } from 'react';
import { Product, InventoryStats, StockAlert } from '@/types/inventory';
import { Category } from '@/types/category';
import { mockProducts } from '@/data/mockProducts';

export function useInventory(categories: Category[]) {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');

  const stats: InventoryStats = useMemo(() => {
    const categoryCounts: Record<string, number> = {};
    categories.forEach((cat) => {
      categoryCounts[cat.id] = 0;
    });

    let totalValue = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;

    products.forEach((product) => {
      categoryCounts[product.category]++;
      totalValue += product.price * product.stockQuantity;
      
      if (product.stockQuantity === 0) {
        outOfStockCount++;
      } else if (product.stockQuantity <= product.minStockLevel) {
        lowStockCount++;
      }
    });

    return {
      totalProducts: products.length,
      totalValue,
      lowStockCount,
      outOfStockCount,
      categoryCounts,
    };
  }, [products, categories]);

  const stockAlerts: StockAlert[] = useMemo(() => {
    return products
      .filter((p) => p.stockQuantity <= p.minStockLevel)
      .map((p) => ({
        productId: p.id,
        productName: p.name,
        currentStock: p.stockQuantity,
        minStockLevel: p.minStockLevel,
        severity: (p.stockQuantity === 0 ? 'critical' : 'warning') as 'critical' | 'warning',
      }))
      .sort((a, b) => a.currentStock - b.currentStock);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.material.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const addProduct = useCallback((product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setProducts((prev) => [...prev, newProduct]);
    return newProduct;
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, ...updates, updatedAt: new Date() }
          : p
      )
    );
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateStock = useCallback((id: string, quantity: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, stockQuantity: Math.max(0, quantity), updatedAt: new Date() }
          : p
      )
    );
  }, []);

  return {
    products: filteredProducts,
    allProducts: products,
    stats,
    stockAlerts,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
  };
}
