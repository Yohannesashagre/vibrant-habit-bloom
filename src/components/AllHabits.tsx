
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HabitCard } from '@/components/HabitCard';
import { Habit, Theme } from '@/types/habit';

interface AllHabitsProps {
  habits: Habit[];
  currentTheme: Theme;
  onToggleHabit: (id: string) => void;
  onDeleteHabit: (id: string) => void;
  getStreakCount: (id: string) => number;
}

export const AllHabits: React.FC<AllHabitsProps> = ({
  habits,
  currentTheme,
  onToggleHabit,
  onDeleteHabit,
  getStreakCount
}) => {
  return (
    <Card className="bg-card/50 border-0 shadow-lg">
      <CardHeader>
        <CardTitle>All Habits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {habits.map((habit) => (
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
      </CardContent>
    </Card>
  );
};
