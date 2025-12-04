import { useState, useEffect } from 'react';
import { Product } from '@/types/inventory';
import { Category } from '@/types/category';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ImageUpload } from '@/components/inventory/ImageUpload';
import { toast } from 'sonner';

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  editProduct?: Product | null;
  onUpdate?: (id: string, updates: Partial<Product>) => void;
  categories: Category[];
}

const getInitialFormData = (defaultCategory: string) => ({
  name: '',
  sku: '',
  category: defaultCategory,
  description: '',
  price: 0,
  costPrice: 0,
  stockQuantity: 0,
  minStockLevel: 5,
  imageUrl: '',
  dimensions: { width: 0, height: 0, depth: 0 },
  material: '',
  color: '',
});

export function AddProductDialog({ 
  open, 
  onOpenChange, 
  onAdd,
  editProduct,
  onUpdate,
  categories,
}: AddProductDialogProps) {
  const defaultCategory = categories[0]?.id || 'sofa';
  const [formData, setFormData] = useState(getInitialFormData(defaultCategory));

  const isEditing = !!editProduct;

  useEffect(() => {
    if (editProduct) {
      setFormData({
        name: editProduct.name,
        sku: editProduct.sku,
        category: editProduct.category,
        description: editProduct.description,
        price: editProduct.price,
        costPrice: editProduct.costPrice,
        stockQuantity: editProduct.stockQuantity,
        minStockLevel: editProduct.minStockLevel,
        imageUrl: editProduct.imageUrl || '',
        dimensions: editProduct.dimensions,
        material: editProduct.material,
        color: editProduct.color,
      });
    } else {
      setFormData(getInitialFormData(defaultCategory));
    }
  }, [editProduct, defaultCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.sku) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (isEditing && onUpdate) {
      onUpdate(editProduct.id, formData);
      toast.success('Product updated successfully');
    } else {
      onAdd(formData);
      toast.success('Product added successfully');
    }
    
    setFormData(getInitialFormData(defaultCategory));
    onOpenChange(false);
  };

  const handleClose = () => {
    setFormData(getInitialFormData(defaultCategory));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Update the product details below.' 
              : 'Fill in the details to add a new furniture item to your inventory.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Basic Information</h4>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Milano Leather Sofa"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU *</Label>
                <Input
                  id="sku"
                  placeholder="e.g., JJB-SOF-001"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value: string) => 
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.icon} {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the product..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Pricing & Stock</h4>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Selling Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="costPrice">Cost Price ($)</Label>
                <Input
                  id="costPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.costPrice}
                  onChange={(e) => setFormData({ ...formData, costPrice: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="stockQuantity">Stock Quantity</Label>
                <Input
                  id="stockQuantity"
                  type="number"
                  min="0"
                  value={formData.stockQuantity}
                  onChange={(e) => setFormData({ ...formData, stockQuantity: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minStockLevel">Min. Stock Level</Label>
                <Input
                  id="minStockLevel"
                  type="number"
                  min="0"
                  value={formData.minStockLevel}
                  onChange={(e) => setFormData({ ...formData, minStockLevel: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Product Details</h4>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="material">Material</Label>
                <Input
                  id="material"
                  placeholder="e.g., Italian Leather"
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  placeholder="e.g., Cognac Brown"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Dimensions (cm)</Label>
              <div className="grid gap-2 sm:grid-cols-3">
                <Input
                  type="number"
                  placeholder="Width"
                  min="0"
                  value={formData.dimensions.width || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    dimensions: { ...formData.dimensions, width: parseInt(e.target.value) || 0 } 
                  })}
                />
                <Input
                  type="number"
                  placeholder="Height"
                  min="0"
                  value={formData.dimensions.height || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    dimensions: { ...formData.dimensions, height: parseInt(e.target.value) || 0 } 
                  })}
                />
                <Input
                  type="number"
                  placeholder="Depth"
                  min="0"
                  value={formData.dimensions.depth || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    dimensions: { ...formData.dimensions, depth: parseInt(e.target.value) || 0 } 
                  })}
                />
              </div>
            </div>

            <ImageUpload
              value={formData.imageUrl}
              onChange={(url) => setFormData({ ...formData, imageUrl: url })}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? 'Save Changes' : 'Add Product'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
