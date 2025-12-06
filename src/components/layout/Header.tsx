import { Bell, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MobileMenuTrigger } from '@/components/layout/Sidebar';

interface HeaderProps {
  title: string;
  subtitle?: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  alertCount: number;
  onAddProduct: () => void;
  onMobileMenuOpen: () => void;
}

export function Header({ 
  title, 
  subtitle, 
  searchQuery, 
  onSearchChange, 
  alertCount,
  onAddProduct,
  onMobileMenuOpen,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 md:h-16 items-center justify-between px-4 md:px-6 gap-2">
        {/* Left section with mobile menu and title */}
        <div className="flex items-center gap-3 min-w-0">
          <MobileMenuTrigger onClick={onMobileMenuOpen} />
          <div className="animate-slide-in-right min-w-0">
            <h2 className="font-display text-lg md:text-xl font-semibold text-foreground truncate">{title}</h2>
            {subtitle && (
              <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Right section with search and actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Search - Hidden on mobile, visible on md+ */}
          <div className="relative w-48 lg:w-64 hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 bg-secondary/50 border-border focus:bg-card"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative h-9 w-9 md:h-10 md:w-10">
            <Bell className="h-5 w-5" />
            {alertCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
              >
                {alertCount}
              </Badge>
            )}
          </Button>

          {/* Add Product - Icon only on mobile */}
          <Button onClick={onAddProduct} className="gap-2 h-9 md:h-10 px-3 md:px-4">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Product</span>
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="px-4 pb-3 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-secondary/50 border-border focus:bg-card"
          />
        </div>
      </div>
    </header>
  );
}
