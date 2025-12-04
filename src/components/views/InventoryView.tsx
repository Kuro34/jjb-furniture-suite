import { useState } from 'react';
import { Product, ProductCategory, InventoryStats } from '@/types/inventory';
import { ProductCard } from '@/components/inventory/ProductCard';
import { CategoryFilter } from '@/components/inventory/CategoryFilter';
import { AddProductDialog } from '@/components/inventory/AddProductDialog';
import { Package } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface InventoryViewProps {
  products: Product[];
  stats: InventoryStats;
  selectedCategory: ProductCategory | 'all';
  onCategoryChange: (category: ProductCategory | 'all') => void;
  onUpdateStock: (id: string, quantity: number) => void;
  onAddProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateProduct: (id: string, updates: Partial<Product>) => void;
  onDeleteProduct: (id: string) => void;
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
}

export function InventoryView({
  products,
  stats,
  selectedCategory,
  onCategoryChange,
  onUpdateStock,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  isAddDialogOpen,
  setIsAddDialogOpen,
}: InventoryViewProps) {
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteProductId(id);
  };

  const confirmDelete = () => {
    if (deleteProductId) {
      onDeleteProduct(deleteProductId);
      toast.success('Product deleted successfully');
      setDeleteProductId(null);
    }
  };

  const handleDialogClose = (open: boolean) => {
    setIsAddDialogOpen(open);
    if (!open) {
      setEditProduct(null);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Category Filter */}
      <CategoryFilter
        selected={selectedCategory}
        onSelect={onCategoryChange}
        counts={stats.categoryCounts}
      />

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16">
          <div className="rounded-full bg-muted p-4">
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
            No products found
          </h3>
          <p className="text-sm text-muted-foreground">
            {selectedCategory === 'all' 
              ? 'Add your first product to get started'
              : 'No products in this category'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onUpdateStock={onUpdateStock}
              delay={index * 50}
            />
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <AddProductDialog
        open={isAddDialogOpen}
        onOpenChange={handleDialogClose}
        onAdd={onAddProduct}
        editProduct={editProduct}
        onUpdate={onUpdateProduct}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteProductId} onOpenChange={() => setDeleteProductId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
