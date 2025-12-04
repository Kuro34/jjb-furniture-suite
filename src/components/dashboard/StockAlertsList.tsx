import { StockAlert } from '@/types/inventory';
import { AlertTriangle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface StockAlertsListProps {
  alerts: StockAlert[];
  onViewProduct?: (productId: string) => void;
}

export function StockAlertsList({ alerts, onViewProduct }: StockAlertsListProps) {
  if (alerts.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 shadow-furniture-sm animate-slide-up" style={{ animationDelay: '300ms' }}>
        <h3 className="font-display text-lg font-semibold text-foreground">
          Stock Alerts
        </h3>
        <div className="mt-6 flex flex-col items-center justify-center py-8 text-center">
          <div className="rounded-full bg-success/10 p-4">
            <AlertCircle className="h-8 w-8 text-success" />
          </div>
          <p className="mt-4 font-medium text-foreground">All stock levels healthy</p>
          <p className="text-sm text-muted-foreground">No items require attention</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-furniture-sm animate-slide-up" style={{ animationDelay: '300ms' }}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            Stock Alerts
          </h3>
          <p className="text-sm text-muted-foreground">
            {alerts.length} item{alerts.length !== 1 ? 's' : ''} need attention
          </p>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>

      <div className="mt-4 space-y-3">
        {alerts.slice(0, 5).map((alert, index) => (
          <div
            key={alert.productId}
            className={cn(
              'flex items-center gap-4 rounded-lg p-3 transition-all duration-200 hover:scale-[1.01]',
              alert.severity === 'critical' 
                ? 'bg-destructive/10 border border-destructive/20' 
                : 'bg-warning/10 border border-warning/20'
            )}
            style={{ animationDelay: `${400 + index * 50}ms` }}
          >
            <div className={cn(
              'rounded-lg p-2',
              alert.severity === 'critical' ? 'bg-destructive/20' : 'bg-warning/20'
            )}>
              <AlertTriangle className={cn(
                'h-4 w-4',
                alert.severity === 'critical' ? 'text-destructive' : 'text-warning'
              )} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate font-medium text-foreground">
                {alert.productName}
              </p>
              <p className="text-sm text-muted-foreground">
                {alert.currentStock === 0 
                  ? 'Out of stock' 
                  : `${alert.currentStock} left (min: ${alert.minStockLevel})`
                }
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewProduct?.(alert.productId)}
            >
              Restock
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
