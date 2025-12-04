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
        'rounded-xl border p-6 shadow-furniture-sm transition-all duration-300 hover:shadow-furniture-md animate-slide-up',
        variants[variant]
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 font-display text-3xl font-semibold text-foreground">
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
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
          'rounded-lg p-3',
          iconVariants[variant]
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
