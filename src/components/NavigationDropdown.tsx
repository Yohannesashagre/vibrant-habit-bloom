
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
    switch (view) {
      case 'habits': return 'Habits';
      case 'analytics': return 'Analytics';
      case 'calendar': return 'Calendar';
      default: return 'Habits';
    }
  };

  const getViewIcon = (view: string) => {
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="min-w-[140px] justify-between bg-card/80 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            {getViewIcon(currentView)}
            {getViewLabel(currentView)}
          </div>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48 bg-popover/95 backdrop-blur-sm">
        <DropdownMenuItem 
          onClick={() => onViewChange('habits')}
          className={currentView === 'habits' ? 'bg-accent' : ''}
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          Habits
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onViewChange('analytics')}
          className={currentView === 'analytics' ? 'bg-accent' : ''}
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          Analytics
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onViewChange('calendar')}
          className={currentView === 'calendar' ? 'bg-accent' : ''}
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
