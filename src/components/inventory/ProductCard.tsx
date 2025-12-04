import { Product, CATEGORY_LABELS } from '@/types/inventory';
import { cn } from '@/lib/utils';
import { Package, Edit, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onUpdateStock: (id: string, quantity: number) => void;
  delay?: number;
}

export function ProductCard({ product, onEdit, onDelete, onUpdateStock, delay = 0 }: ProductCardProps) {
  const stockStatus = product.stockQuantity === 0 
    ? 'out-of-stock' 
    : product.stockQuantity <= product.minStockLevel 
      ? 'low-stock' 
      : 'in-stock';

  const statusStyles = {
    'in-stock': 'bg-success/10 text-success border-success/20',
    'low-stock': 'bg-warning/10 text-warning border-warning/20',
    'out-of-stock': 'bg-destructive/10 text-destructive border-destructive/20',
  };

  const statusLabels = {
    'in-stock': 'In Stock',
    'low-stock': 'Low Stock',
    'out-of-stock': 'Out of Stock',
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div 
      className="group overflow-hidden rounded-xl border border-border bg-card shadow-furniture-sm transition-all duration-300 hover:shadow-furniture-lg animate-scale-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Package className="h-12 w-12 text-muted-foreground/50" />
          </div>
        )}
        
        {/* Category Badge */}
        <Badge 
          variant="secondary" 
          className="absolute left-3 top-3 bg-card/90 backdrop-blur-sm"
        >
          {CATEGORY_LABELS[product.category]}
        </Badge>

        {/* Stock Status */}
        <Badge 
          className={cn(
            'absolute right-3 top-3 border',
            statusStyles[stockStatus]
          )}
        >
          {statusLabels[stockStatus]}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-display text-lg font-semibold text-foreground">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground">{product.sku}</p>
          </div>
          <p className="font-display text-lg font-semibold text-accent">
            {formatCurrency(product.price)}
          </p>
        </div>

        <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <span>{product.material}</span>
          <span>•</span>
          <span>{product.color}</span>
        </div>

        {/* Stock Control */}
        <div className="mt-4 flex items-center justify-between rounded-lg bg-secondary/50 p-3">
          <span className="text-sm font-medium text-muted-foreground">Stock</span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onUpdateStock(product.id, product.stockQuantity - 1)}
              disabled={product.stockQuantity === 0}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-12 text-center font-semibold text-foreground">
              {product.stockQuantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onUpdateStock(product.id, product.stockQuantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={() => onEdit(product)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
            onClick={() => onDelete(product.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
