
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Theme } from '@/types/habit';

interface QuickActionsProps {
  currentTheme: Theme;
  onAddHabit: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  currentTheme,
  onAddHabit
}) => {
  return (
    <div className="flex flex-wrap gap-4">
      <Button 
        onClick={onAddHabit}
        className={`${currentTheme.primary} hover:scale-105 transition-all duration-300 shadow-lg`}
        size="lg"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add New Habit
      </Button>
    </div>
  );
};
