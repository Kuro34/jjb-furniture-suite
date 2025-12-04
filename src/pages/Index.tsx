import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { DashboardView } from '@/components/views/DashboardView';
import { InventoryView } from '@/components/views/InventoryView';
import { AlertsView } from '@/components/views/AlertsView';
import { SettingsView } from '@/components/views/SettingsView';
import { useInventory } from '@/hooks/useInventory';
import { cn } from '@/lib/utils';

const viewTitles: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Overview of your inventory' },
  inventory: { title: 'Inventory', subtitle: 'Manage your product catalog' },
  alerts: { title: 'Stock Alerts', subtitle: 'Items requiring attention' },
  settings: { title: 'Settings', subtitle: 'Configure your preferences' },
};

const Index = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const {
    products,
    stats,
    stockAlerts,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
  } = useInventory();

  const handleAddProduct = () => {
    setIsAddDialogOpen(true);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView stats={stats} alerts={stockAlerts} />;
      case 'inventory':
        return (
          <InventoryView
            products={products}
            stats={stats}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onUpdateStock={updateStock}
            onAddProduct={addProduct}
            onUpdateProduct={updateProduct}
            onDeleteProduct={deleteProduct}
            isAddDialogOpen={isAddDialogOpen}
            setIsAddDialogOpen={setIsAddDialogOpen}
          />
        );
      case 'alerts':
        return <AlertsView alerts={stockAlerts} />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView stats={stats} alerts={stockAlerts} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className={cn(
        'transition-all duration-300',
        'ml-64' // Default sidebar width, will be handled by sidebar state
      )}>
        <Header
          title={viewTitles[currentView]?.title || 'Dashboard'}
          subtitle={viewTitles[currentView]?.subtitle}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          alertCount={stockAlerts.length}
          onAddProduct={handleAddProduct}
        />
        
        {renderView()}
      </main>
    </div>
  );
};

export default Index;
