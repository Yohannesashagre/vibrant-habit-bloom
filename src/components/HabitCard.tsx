
import React from 'react';
import { Check, Flame, Trash2, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Habit } from '@/types/habit';

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  streak: number;
  theme: any;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onToggle,
  onDelete,
  streak,
  theme
}) => {
  const today = new Date().toDateString();
  const isCompletedToday = habit.completedDates.includes(today);
  
  return (
    <Card className={`group hover:scale-105 transition-all duration-300 border-0 shadow-lg ${
      isCompletedToday ? 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20' : 'bg-card/90'
    }`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${theme.accent}`}></div>
              <h3 className="font-semibold text-lg">{habit.name}</h3>
              {isCompletedToday && (
                <Badge className="bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30">
                  <Check className="w-3 h-3 mr-1" />
                  Done
                </Badge>
              )}
            </div>
            {habit.description && (
              <p className="text-sm text-muted-foreground mb-3">{habit.description}</p>
            )}
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>{streak} day streak</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{habit.frequency}</span>
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(habit.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className={habit.category ? `${theme.secondary} border-0` : ''}>
              {habit.category || 'General'}
            </Badge>
            {habit.targetValue && (
              <Badge variant="outline">
                Target: {habit.targetValue} {habit.unit}
              </Badge>
            )}
          </div>
          
          <Button
            onClick={() => onToggle(habit.id)}
            className={`${
              isCompletedToday 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : theme.primary
            } transition-all duration-300 shadow-lg hover:shadow-xl`}
            size="sm"
          >
            {isCompletedToday ? (
              <>
                <Check className="w-4 h-4 mr-1" />
                Completed
              </>
            ) : (
              'Mark Done'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
