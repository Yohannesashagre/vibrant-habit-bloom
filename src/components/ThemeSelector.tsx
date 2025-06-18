
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
                      <div className={`w-4 h-4 rounded-full ${theme.primary.replace('bg-gradient-to-r', 'bg-blue-500')}`}></div>
                      <div className={`w-4 h-4 rounded-full ${theme.secondary.replace('bg-gradient-to-r', 'bg-purple-500')}`}></div>
                      <div className={`w-4 h-4 rounded-full ${theme.accent.replace('bg-gradient-to-r', 'bg-pink-500')}`}></div>
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
