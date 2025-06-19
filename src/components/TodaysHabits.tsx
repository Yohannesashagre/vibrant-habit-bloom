
import React from 'react';
import { Plus, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HabitCard } from '@/components/HabitCard';
import { Habit, Theme } from '@/types/habit';

interface TodaysHabitsProps {
  todayHabits: Habit[];
  completedToday: number;
  currentTheme: Theme;
  onToggleHabit: (id: string) => void;
  onDeleteHabit: (id: string) => void;
  onAddHabit: () => void;
  getStreakCount: (id: string) => number;
}

export const TodaysHabits: React.FC<TodaysHabitsProps> = ({
  todayHabits,
  completedToday,
  currentTheme,
  onToggleHabit,
  onDeleteHabit,
  onAddHabit,
  getStreakCount
}) => {
  return (
    <Card className="bg-gradient-to-r from-card to-card/50 border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Today's Habits</span>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {completedToday}/{todayHabits.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {todayHabits.length === 0 ? (
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No habits yet</h3>
            <p className="text-muted-foreground mb-6">
              Start building better habits today!
            </p>
            <Button 
              onClick={onAddHabit}
              className={currentTheme.primary}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Habit
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {todayHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggle={onToggleHabit}
                onDelete={onDeleteHabit}
                streak={getStreakCount(habit.id)}
                theme={currentTheme}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
