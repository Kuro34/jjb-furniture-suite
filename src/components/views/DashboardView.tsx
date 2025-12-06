import { InventoryStats, StockAlert } from '@/types/inventory';
import { StatCard } from '@/components/dashboard/StatCard';
import { CategoryChart } from '@/components/dashboard/CategoryChart';
import { StockAlertsList } from '@/components/dashboard/StockAlertsList';
import { Package, DollarSign, AlertTriangle, XCircle } from 'lucide-react';

interface DashboardViewProps {
  stats: InventoryStats;
  alerts: StockAlert[];
}

export function DashboardView({ stats, alerts }: DashboardViewProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6">
      {/* Welcome Section */}
      <div className="animate-fade-in">
        <h1 className="font-display text-xl md:text-2xl font-semibold text-foreground">
          Welcome back
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Here's what's happening with your inventory today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          subtitle="Active items in catalog"
          icon={Package}
          delay={0}
        />
        <StatCard
          title="Inventory Value"
          value={formatCurrency(stats.totalValue)}
          subtitle="Total stock value"
          icon={DollarSign}
          variant="accent"
          delay={50}
        />
        <StatCard
          title="Low Stock Items"
          value={stats.lowStockCount}
          subtitle="Needs restocking"
          icon={AlertTriangle}
          variant={stats.lowStockCount > 0 ? 'warning' : 'default'}
          delay={100}
        />
        <StatCard
          title="Out of Stock"
          value={stats.outOfStockCount}
          subtitle="Unavailable items"
          icon={XCircle}
          variant={stats.outOfStockCount > 0 ? 'warning' : 'success'}
          delay={150}
        />
      </div>

      {/* Charts & Alerts */}
      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        <CategoryChart data={stats.categoryCounts} />
        <StockAlertsList alerts={alerts} />
      </div>
    </div>
  );
}
