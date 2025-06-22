
import React from 'react';
import { ChevronDown, TrendingUp, BarChart3, Calendar, Settings, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavigationDropdownProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const NavigationDropdown: React.FC<NavigationDropdownProps> = ({
  currentView,
  onViewChange
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getViewLabel = (view: string) => {
    if (location.pathname === '/profile') return 'Profile';
    if (location.pathname === '/settings') return 'Settings';
    
    switch (view) {
      case 'habits': return 'Habits';
      case 'analytics': return 'Analytics';
      case 'calendar': return 'Calendar';
      default: return 'Habits';
    }
  };

  const getViewIcon = (view: string) => {
    if (location.pathname === '/profile') return <User className="w-4 h-4" />;
    if (location.pathname === '/settings') return <Settings className="w-4 h-4" />;
    
    switch (view) {
      case 'habits': return <TrendingUp className="w-4 h-4" />;
      case 'analytics': return <BarChart3 className="w-4 h-4" />;
      case 'calendar': return <Calendar className="w-4 h-4" />;
      default: return <TrendingUp className="w-4 h-4" />;
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleHomeClick = (view: string) => {
    navigate('/');
    onViewChange(view);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="min-w-[140px] justify-between bg-card/80 backdrop-blur-sm border-border/50">
          <div className="flex items-center gap-2">
            {getViewIcon(currentView)}
            {getViewLabel(currentView)}
          </div>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48 bg-popover/95 backdrop-blur-sm border-border/50 z-50">
        <DropdownMenuItem 
          onClick={() => handleHomeClick('habits')}
          className={currentView === 'habits' && location.pathname === '/' ? 'bg-accent' : ''}
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          Habits
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleHomeClick('analytics')}
          className={currentView === 'analytics' && location.pathname === '/' ? 'bg-accent' : ''}
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          Analytics
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleHomeClick('calendar')}
          className={currentView === 'calendar' && location.pathname === '/' ? 'bg-accent' : ''}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Calendar
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleProfileClick}
          className={location.pathname === '/profile' ? 'bg-accent' : ''}
        >
          <User className="w-4 h-4 mr-2" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleSettingsClick}
          className={location.pathname === '/settings' ? 'bg-accent' : ''}
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
