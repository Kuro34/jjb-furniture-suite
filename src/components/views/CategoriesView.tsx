import { useState } from 'react';
import { Category } from '@/types/category';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus, Pencil, Trash2, Tag } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface CategoriesViewProps {
  categories: Category[];
  onAdd: (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdate: (id: string, updates: Partial<Category>) => void;
  onDelete: (id: string) => void;
}

const EMOJI_OPTIONS = ['🛋️', '📐', '💺', '❤️', '🛏️', '🪑', '🛒', '📦', '🏠', '✨', '🔲', '🎨'];

export function CategoriesView({ categories, onAdd, onUpdate, onDelete }: CategoriesViewProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: '', label: '', icon: '📦' });

  const handleOpenDialog = (category?: Category) => {
    if (category) {
      setEditCategory(category);
      setFormData({ name: category.name, label: category.label, icon: category.icon });
    } else {
      setEditCategory(null);
      setFormData({ name: '', label: '', icon: '📦' });
    }
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.label) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editCategory) {
      onUpdate(editCategory.id, formData);
      toast.success('Category updated');
    } else {
      onAdd(formData);
      toast.success('Category added');
    }
    setDialogOpen(false);
  };

  const confirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      toast.success('Category deleted');
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-foreground">Categories</h2>
          <p className="text-sm text-muted-foreground">Manage product categories</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category, index) => (
          <Card
            key={category.id}
            className="group animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <CardTitle className="text-base font-medium">{category.label}</CardTitle>
              </div>
              <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleOpenDialog(category)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => setDeleteId(category.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Tag className="h-3 w-3" />
                <span className="font-mono text-xs">{category.name}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editCategory ? 'Edit Category' : 'Add Category'}
            </DialogTitle>
            <DialogDescription>
              {editCategory ? 'Update category details.' : 'Create a new product category.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="label">Display Name *</Label>
              <Input
                id="label"
                placeholder="e.g., Corner Sofas"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Slug *</Label>
              <Input
                id="name"
                placeholder="e.g., corner-sofas"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                required
              />
              <p className="text-xs text-muted-foreground">Used for internal identification</p>
            </div>

            <div className="space-y-2">
              <Label>Icon</Label>
              <div className="flex flex-wrap gap-2">
                {EMOJI_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-lg border text-xl transition-colors',
                      formData.icon === emoji
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    )}
                    onClick={() => setFormData({ ...formData, icon: emoji })}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{editCategory ? 'Save Changes' : 'Add Category'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure? Products using this category won't be deleted but may need to be recategorized.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
