import { StockAlert } from '@/types/inventory';
import { AlertTriangle, AlertCircle, Package, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AlertsViewProps {
  alerts: StockAlert[];
  onNavigateToProduct?: (productId: string) => void;
}

export function AlertsView({ alerts, onNavigateToProduct }: AlertsViewProps) {
  const criticalAlerts = alerts.filter(a => a.severity === 'critical');
  const warningAlerts = alerts.filter(a => a.severity === 'warning');

  if (alerts.length === 0) {
    return (
      <div className="p-4 md:p-6">
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-success/30 bg-success/5 py-16">
          <div className="rounded-full bg-success/10 p-4">
            <AlertCircle className="h-10 w-10 text-success" />
          </div>
          <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
            All Clear!
          </h3>
          <p className="mt-2 text-center text-muted-foreground">
            All your products are well-stocked. <br />
            No items require immediate attention.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6">
      {/* Summary */}
      <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2">
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 md:p-6 animate-slide-up">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-destructive/10 p-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Critical (Out of Stock)</p>
              <p className="font-display text-2xl font-semibold text-foreground">
                {criticalAlerts.length} items
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-warning/20 bg-warning/5 p-4 md:p-6 animate-slide-up" style={{ animationDelay: '50ms' }}>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-warning/10 p-2">
              <AlertCircle className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Warning (Low Stock)</p>
              <p className="font-display text-2xl font-semibold text-foreground">
                {warningAlerts.length} items
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      {criticalAlerts.length > 0 && (
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Out of Stock - Immediate Action Required
          </h3>
          <div className="space-y-2">
            {criticalAlerts.map((alert, index) => (
              <AlertRow 
                key={alert.productId} 
                alert={alert} 
                onNavigate={onNavigateToProduct}
                delay={150 + index * 30}
              />
            ))}
          </div>
        </div>
      )}

      {/* Warning Alerts */}
      {warningAlerts.length > 0 && (
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
            <AlertCircle className="h-5 w-5 text-warning" />
            Low Stock - Restock Soon
          </h3>
          <div className="space-y-2">
            {warningAlerts.map((alert, index) => (
              <AlertRow 
                key={alert.productId} 
                alert={alert} 
                onNavigate={onNavigateToProduct}
                delay={250 + index * 30}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AlertRow({ 
  alert, 
  onNavigate,
  delay 
}: { 
  alert: StockAlert; 
  onNavigate?: (id: string) => void;
  delay: number;
}) {
  return (
    <div 
      className={cn(
        'flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 rounded-lg border p-3 md:p-4 transition-all duration-200 hover:shadow-furniture-sm animate-fade-in',
        alert.severity === 'critical'
          ? 'border-destructive/20 bg-card'
          : 'border-warning/20 bg-card'
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={cn(
        'rounded-lg p-2',
        alert.severity === 'critical' ? 'bg-destructive/10' : 'bg-warning/10'
      )}>
        <Package className={cn(
          'h-5 w-5',
          alert.severity === 'critical' ? 'text-destructive' : 'text-warning'
        )} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">{alert.productName}</p>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant={alert.severity === 'critical' ? 'destructive' : 'secondary'}>
            {alert.currentStock} in stock
          </Badge>
          <span className="text-sm text-muted-foreground">
            Minimum: {alert.minStockLevel}
          </span>
        </div>
      </div>

      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onNavigate?.(alert.productId)}
        className="gap-1 w-full sm:w-auto"
      >
        View
        <ArrowRight className="h-3 w-3" />
      </Button>
    </div>
  );
}
