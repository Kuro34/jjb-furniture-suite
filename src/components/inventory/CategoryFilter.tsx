import { Category } from '@/types/category';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  selected: string | 'all';
  onSelect: (category: string | 'all') => void;
  counts: Record<string, number>;
  categories: Category[];
}

export function CategoryFilter({ selected, onSelect, counts, categories }: CategoryFilterProps) {
  const totalCount = Object.values(counts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="flex flex-wrap gap-2 animate-fade-in overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
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
      
      {categories.map((category) => {
        const count = counts[category.id] || 0;
        if (count === 0) return null;
        
        return (
          <Button
            key={category.id}
            variant={selected === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => onSelect(category.id)}
            className="gap-2"
          >
            {category.icon} {category.label}
            <span className={cn(
              'rounded-full px-2 py-0.5 text-xs',
              selected === category.id 
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
