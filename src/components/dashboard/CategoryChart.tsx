import { ProductCategory, CATEGORY_LABELS, CATEGORY_ICONS } from '@/types/inventory';
import { cn } from '@/lib/utils';

interface CategoryChartProps {
  data: Record<ProductCategory, number>;
}

export function CategoryChart({ data }: CategoryChartProps) {
  const total = Object.values(data).reduce((sum, count) => sum + count, 0);
  const sortedCategories = Object.entries(data)
    .sort(([, a], [, b]) => b - a)
    .filter(([, count]) => count > 0);

  const colors = [
    'bg-primary',
    'bg-accent',
    'bg-success',
    'bg-warning',
    'bg-destructive',
    'bg-muted-foreground',
    'bg-secondary-foreground',
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-furniture-sm animate-slide-up" style={{ animationDelay: '200ms' }}>
      <h3 className="font-display text-lg font-semibold text-foreground">
        Products by Category
      </h3>
      <p className="text-sm text-muted-foreground">Distribution of inventory items</p>

      {/* Bar representation */}
      <div className="mt-6 h-4 overflow-hidden rounded-full bg-secondary">
        <div className="flex h-full">
          {sortedCategories.map(([category, count], index) => {
            const percentage = (count / total) * 100;
            return (
              <div
                key={category}
                className={cn('h-full transition-all duration-500', colors[index % colors.length])}
                style={{ width: `${percentage}%` }}
              />
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        {sortedCategories.map(([category, count], index) => {
          const percentage = Math.round((count / total) * 100);
          return (
            <div key={category} className="flex items-center gap-2">
              <div className={cn('h-3 w-3 rounded-full', colors[index % colors.length])} />
              <span className="text-sm text-muted-foreground">
                {CATEGORY_ICONS[category as ProductCategory]} {CATEGORY_LABELS[category as ProductCategory]}
              </span>
              <span className="ml-auto text-sm font-medium text-foreground">
                {count} ({percentage}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
