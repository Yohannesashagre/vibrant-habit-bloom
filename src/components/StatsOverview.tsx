
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Target, Flame, Calendar } from 'lucide-react';

interface StatsOverviewProps {
  totalHabits: number;
  completedToday: number;
  totalToday: number;
  longestStreak: number;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  totalHabits,
  completedToday,
  totalToday,
  longestStreak
}) => {
  const completionRate = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;

  const stats = [
    {
      title: 'Total Habits',
      value: totalHabits,
      icon: Target,
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Completed Today',
      value: `${completedToday}/${totalToday}`,
      icon: Calendar,
      color: 'bg-green-500',
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'Completion Rate',
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Longest Streak',
      value: `${longestStreak} days`,
      icon: Flame,
      color: 'bg-orange-500',
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={stat.title} className="border-0 shadow-lg bg-card/80 backdrop-blur-sm hover:scale-105 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold">
                  {stat.value}
                </p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
