import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Building2, Bell, Database, Shield } from 'lucide-react';

export function SettingsView() {
  return (
    <div className="max-w-2xl space-y-8 p-6">
      {/* Business Info */}
      <section className="space-y-4 animate-slide-up">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              Business Information
            </h3>
            <p className="text-sm text-muted-foreground">
              Update your company details
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input id="businessName" defaultValue="JJB Furniture" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="contact@jjbfurniture.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" defaultValue="123 Furniture Lane, Design District" />
          </div>
        </div>
      </section>

      <Separator />

      {/* Notifications */}
      <section className="space-y-4 animate-slide-up" style={{ animationDelay: '50ms' }}>
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-accent/10 p-2">
            <Bell className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              Notifications
            </h3>
            <p className="text-sm text-muted-foreground">
              Configure alert preferences
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Low Stock Alerts</p>
              <p className="text-sm text-muted-foreground">
                Notify when items fall below minimum level
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Out of Stock Alerts</p>
              <p className="text-sm text-muted-foreground">
                Immediate notification when items run out
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Daily Summary</p>
              <p className="text-sm text-muted-foreground">
                Receive a daily inventory report
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </section>

      <Separator />

      {/* Data Management */}
      <section className="space-y-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-success/10 p-2">
            <Database className="h-5 w-5 text-success" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              Data Management
            </h3>
            <p className="text-sm text-muted-foreground">
              Export and backup your inventory data
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Export Inventory</p>
              <p className="text-sm text-muted-foreground">
                Download as CSV or Excel file
              </p>
            </div>
            <Button variant="outline" size="sm">Export</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Import Products</p>
              <p className="text-sm text-muted-foreground">
                Bulk import from spreadsheet
              </p>
            </div>
            <Button variant="outline" size="sm">Import</Button>
          </div>
        </div>
      </section>

      <Separator />

      {/* Security Notice */}
      <section className="animate-slide-up" style={{ animationDelay: '150ms' }}>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Connect to Cloud</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Enable Lovable Cloud to persist your data, add user authentication, 
                and unlock advanced features like reports and multi-location support.
              </p>
              <Button className="mt-4" size="sm">
                Enable Cloud Storage
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
