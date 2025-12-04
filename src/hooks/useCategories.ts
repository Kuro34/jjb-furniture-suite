import { useState, useCallback, useMemo } from 'react';
import { Category, DEFAULT_CATEGORIES } from '@/types/category';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);

  const categoryLabels = useMemo(() => {
    return categories.reduce((acc, cat) => {
      acc[cat.id] = cat.label;
      return acc;
    }, {} as Record<string, string>);
  }, [categories]);

  const categoryIcons = useMemo(() => {
    return categories.reduce((acc, cat) => {
      acc[cat.id] = cat.icon;
      return acc;
    }, {} as Record<string, string>);
  }, [categories]);

  const addCategory = useCallback((category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCategory: Category = {
      ...category,
      id: category.name.toLowerCase().replace(/\s+/g, '-'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setCategories((prev) => [...prev, newCategory]);
    return newCategory;
  }, []);

  const updateCategory = useCallback((id: string, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, ...updates, updatedAt: new Date() } : cat
      )
    );
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  }, []);

  return {
    categories,
    categoryLabels,
    categoryIcons,
    addCategory,
    updateCategory,
    deleteCategory,
  };
}
