
import React from 'react';
import { TrendingUp, Palette, Moon, Sun } from 'lucide-react';
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

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={handleHomeClick}>
            <div className={`w-10 h-10 ${currentTheme.accent} rounded-xl flex items-center justify-center`}>
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                HabitFlow
              </h1>
              <p className="text-sm text-muted-foreground">Track your progress</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onThemeSelectorOpen}
              className="hover:bg-primary/10"
            >
              <Palette className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleDarkMode}
              className="hover:bg-primary/10"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
