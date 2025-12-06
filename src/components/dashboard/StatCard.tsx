import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'warning' | 'success' | 'accent';
  delay?: number;
}

export function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  variant = 'default',
  delay = 0
}: StatCardProps) {
  const variants = {
    default: 'bg-card border-border',
    warning: 'bg-warning/10 border-warning/30',
    success: 'bg-success/10 border-success/30',
    accent: 'bg-accent/10 border-accent/30',
  };

  const iconVariants = {
    default: 'bg-secondary text-foreground',
    warning: 'bg-warning/20 text-warning',
    success: 'bg-success/20 text-success',
    accent: 'bg-accent/20 text-accent',
  };

  return (
    <div 
      className={cn(
        'rounded-xl border p-4 md:p-6 shadow-furniture-sm transition-all duration-300 hover:shadow-furniture-md animate-slide-up',
        variants[variant]
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs md:text-sm font-medium text-muted-foreground truncate">{title}</p>
          <p className="mt-1 md:mt-2 font-display text-xl md:text-3xl font-semibold text-foreground truncate">
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-xs md:text-sm text-muted-foreground hidden sm:block">{subtitle}</p>
          )}
          {trend && (
            <p className={cn(
              'mt-2 text-sm font-medium',
              trend.isPositive ? 'text-success' : 'text-destructive'
            )}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% from last month
            </p>
          )}
        </div>
        <div className={cn(
          'rounded-lg p-2 md:p-3 flex-shrink-0',
          iconVariants[variant]
        )}>
          <Icon className="h-4 w-4 md:h-6 md:w-6" />
        </div>
      </div>
    </div>
  );
}
