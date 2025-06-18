
import { useState, useEffect } from 'react';
import { Habit } from '@/types/habit';

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);

  const saveHabits = (newHabits: Habit[]) => {
    setHabits(newHabits);
    localStorage.setItem('habits', JSON.stringify(newHabits));
  };

  const addHabit = (habitData: Omit<Habit, 'id' | 'createdAt' | 'completedDates'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: Date.now().toString(),
      createdAt: new Date(),
      completedDates: []
    };
    saveHabits([...habits, newHabit]);
  };

  const toggleHabit = (id: string) => {
    const today = new Date().toDateString();
    const updatedHabits = habits.map(habit => {
      if (habit.id === id) {
        const isCompleted = habit.completedDates.includes(today);
        const completedDates = isCompleted
          ? habit.completedDates.filter(date => date !== today)
          : [...habit.completedDates, today];
        
        return { ...habit, completedDates };
      }
      return habit;
    });
    saveHabits(updatedHabits);
  };

  const deleteHabit = (id: string) => {
    const updatedHabits = habits.filter(habit => habit.id !== id);
    saveHabits(updatedHabits);
  };

  const getStreakCount = (id: string): number => {
    const habit = habits.find(h => h.id === id);
    if (!habit || habit.completedDates.length === 0) return 0;

    const sortedDates = habit.completedDates
      .map(date => new Date(date))
      .sort((a, b) => b.getTime() - a.getTime());

    let streak = 0;
    let currentDate = new Date();
    
    for (const completedDate of sortedDates) {
      const daysDiff = Math.floor((currentDate.getTime() - completedDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
      } else if (daysDiff === streak + 1 && streak === 0) {
        streak = 1;
      } else {
        break;
      }
    }

    return streak;
  };

  return {
    habits,
    addHabit,
    toggleHabit,
    deleteHabit,
    getStreakCount
  };
};
