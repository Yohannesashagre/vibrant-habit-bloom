
import React from 'react';
import { TrendingUp, Palette, Moon, Sun, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Theme } from '@/types/habit';
import { useNavigate } from 'react-router-dom';

interface MainHeaderProps {
  currentTheme: Theme;
  isDarkMode: boolean;
  onThemeSelectorOpen: () => void;
  onToggleDarkMode: () => void;
  onLogout: () => void;
}

export const MainHeader: React.FC<MainHeaderProps> = ({
  currentTheme,
  isDarkMode,
  onThemeSelectorOpen,
  onToggleDarkMode,
  onLogout
}) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 glass-strong">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-premium">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight font-['Outfit'] text-gradient">
              HabitFlow
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={onThemeSelectorOpen} className="rounded-xl h-9 w-9 hover:bg-primary/10">
              <Palette className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onToggleDarkMode} className="rounded-xl h-9 w-9 hover:bg-primary/10">
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={onLogout} className="rounded-xl h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
