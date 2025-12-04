import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon, Link } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Product Image</Label>
        <div className="flex gap-1">
          <Button
            type="button"
            variant={mode === 'upload' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('upload')}
            className="h-7 px-2 text-xs"
          >
            <Upload className="mr-1 h-3 w-3" />
            Upload
          </Button>
          <Button
            type="button"
            variant={mode === 'url' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('url')}
            className="h-7 px-2 text-xs"
          >
            <Link className="mr-1 h-3 w-3" />
            URL
          </Button>
        </div>
      </div>

      {mode === 'upload' ? (
        <div className="space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          
          {value && value.startsWith('data:') ? (
            <div className="relative">
              <img
                src={value}
                alt="Product preview"
                className="h-40 w-full rounded-lg border border-border object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 h-7 w-7"
                onClick={handleRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                'flex h-40 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border',
                'bg-muted/30 transition-colors hover:border-primary hover:bg-muted/50'
              )}
            >
              <div className="rounded-full bg-muted p-3">
                <ImageIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">
                Click to upload an image
              </span>
              <span className="text-xs text-muted-foreground/70">
                PNG, JPG, WEBP up to 5MB
              </span>
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <Input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={value.startsWith('data:') ? '' : value}
            onChange={(e) => onChange(e.target.value)}
          />
          {value && !value.startsWith('data:') && (
            <div className="relative">
              <img
                src={value}
                alt="Product preview"
                className="h-40 w-full rounded-lg border border-border object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
