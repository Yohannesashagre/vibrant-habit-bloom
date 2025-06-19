
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from '@/hooks/useTheme';
import { Check } from 'lucide-react';

interface ThemeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  isOpen,
  onClose
}) => {
  const { themes, currentTheme, setTheme } = useTheme();

  const getThemeColorClass = (themeColor: string) => {
    if (themeColor.includes('blue')) return 'bg-blue-500';
    if (themeColor.includes('orange') || themeColor.includes('pink')) return 'bg-orange-500';
    if (themeColor.includes('green') || themeColor.includes('emerald')) return 'bg-green-500';
    if (themeColor.includes('purple') || themeColor.includes('violet')) return 'bg-purple-500';
    if (themeColor.includes('slate')) return 'bg-slate-600';
    return 'bg-blue-500';
  };

  const getSecondaryColorClass = (themeColor: string) => {
    if (themeColor.includes('cyan') || themeColor.includes('blue')) return 'bg-cyan-500';
    if (themeColor.includes('pink') || themeColor.includes('orange')) return 'bg-pink-500';
    if (themeColor.includes('emerald') || themeColor.includes('green')) return 'bg-emerald-500';
    if (themeColor.includes('violet') || themeColor.includes('purple')) return 'bg-violet-500';
    if (themeColor.includes('blue') && themeColor.includes('slate')) return 'bg-blue-500';
    return 'bg-purple-500';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card/95 backdrop-blur-sm border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Choose Your Theme
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {Object.entries(themes).map(([key, theme]) => (
            <Card 
              key={key}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                currentTheme.name === theme.name ? 'border-primary shadow-lg' : 'border-transparent'
              }`}
              onClick={() => setTheme(key)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div className={`w-4 h-4 rounded-full ${getThemeColorClass(theme.primary)}`}></div>
                      <div className={`w-4 h-4 rounded-full ${getSecondaryColorClass(theme.secondary)}`}></div>
                      <div className={`w-4 h-4 rounded-full ${getThemeColorClass(theme.accent)}`}></div>
                    </div>
                    <div>
                      <h3 className="font-semibold">{theme.name}</h3>
                      <p className="text-sm text-muted-foreground">{theme.description}</p>
                    </div>
                  </div>
                  {currentTheme.name === theme.name && (
                    <Check className="w-5 h-5 text-primary" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
        >
          Apply Theme
        </Button>
      </DialogContent>
    </Dialog>
  );
};
