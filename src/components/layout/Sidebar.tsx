import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Package, 
  AlertTriangle, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Armchair,
  Tags,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'categories', label: 'Categories', icon: Tags },
  { id: 'alerts', label: 'Stock Alerts', icon: AlertTriangle },
  { id: 'settings', label: 'Settings', icon: Settings },
];

function SidebarContent({ 
  currentView, 
  onViewChange, 
  collapsed,
  onCollapsedChange,
  isMobile = false,
  onMobileClose,
}: {
  currentView: string;
  onViewChange: (view: string) => void;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  isMobile?: boolean;
  onMobileClose?: () => void;
}) {
  const handleNavClick = (id: string) => {
    onViewChange(id);
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className={cn(
        'flex items-center gap-3 border-b border-sidebar-border px-4 py-6',
        collapsed && !isMobile && 'justify-center px-2'
      )}>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
          <Armchair className="h-6 w-6 text-sidebar-primary-foreground" />
        </div>
        {(!collapsed || isMobile) && (
          <div className="animate-fade-in">
            <h1 className="font-display text-lg font-semibold text-sidebar-foreground">
              JJB Furniture
            </h1>
            <p className="text-xs text-sidebar-foreground/60">Inventory System</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200',
                collapsed && !isMobile && 'justify-center px-2',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-primary'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
            >
              <Icon className={cn('h-5 w-5 flex-shrink-0', isActive && 'text-sidebar-primary')} />
              {(!collapsed || isMobile) && (
                <span className="animate-fade-in">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse Toggle - Only on desktop */}
      {!isMobile && (
        <div className="border-t border-sidebar-border p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCollapsedChange(!collapsed)}
            className={cn(
              'w-full text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground',
              collapsed && 'px-2'
            )}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" />
                <span>Collapse</span>
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

export function Sidebar({ 
  currentView, 
  onViewChange, 
  collapsed,
  onCollapsedChange,
  mobileOpen,
  onMobileOpenChange,
}: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 ease-in-out hidden md:block',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        <SidebarContent
          currentView={currentView}
          onViewChange={onViewChange}
          collapsed={collapsed}
          onCollapsedChange={onCollapsedChange}
        />
      </aside>

      {/* Mobile Sheet */}
      <Sheet open={mobileOpen} onOpenChange={onMobileOpenChange}>
        <SheetContent side="left" className="w-72 p-0 bg-sidebar border-sidebar-border">
          <SidebarContent
            currentView={currentView}
            onViewChange={onViewChange}
            collapsed={false}
            onCollapsedChange={onCollapsedChange}
            isMobile={true}
            onMobileClose={() => onMobileOpenChange(false)}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}

// Mobile menu trigger button component
export function MobileMenuTrigger({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden"
      onClick={onClick}
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
}
