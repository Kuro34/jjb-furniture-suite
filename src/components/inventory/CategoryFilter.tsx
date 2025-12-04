import { ProductCategory, CATEGORY_LABELS, CATEGORY_ICONS } from '@/types/inventory';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  selected: ProductCategory | 'all';
  onSelect: (category: ProductCategory | 'all') => void;
  counts: Record<ProductCategory, number>;
}

export function CategoryFilter({ selected, onSelect, counts }: CategoryFilterProps) {
  const totalCount = Object.values(counts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="flex flex-wrap gap-2 animate-fade-in">
      <Button
        variant={selected === 'all' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onSelect('all')}
        className="gap-2"
      >
        📦 All Products
        <span className={cn(
          'rounded-full px-2 py-0.5 text-xs',
          selected === 'all' 
            ? 'bg-primary-foreground/20 text-primary-foreground' 
            : 'bg-muted text-muted-foreground'
        )}>
          {totalCount}
        </span>
      </Button>
      
      {(Object.keys(CATEGORY_LABELS) as ProductCategory[]).map((category) => {
        const count = counts[category] || 0;
        if (count === 0) return null;
        
        return (
          <Button
            key={category}
            variant={selected === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => onSelect(category)}
            className="gap-2"
          >
            {CATEGORY_ICONS[category]} {CATEGORY_LABELS[category]}
            <span className={cn(
              'rounded-full px-2 py-0.5 text-xs',
              selected === category 
                ? 'bg-primary-foreground/20 text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            )}>
              {count}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
