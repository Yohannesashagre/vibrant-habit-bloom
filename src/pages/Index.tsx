
import React, { useState, useEffect } from 'react';
import { Plus, Calendar, TrendingUp, Settings, Moon, Sun, Palette, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HabitCard } from '@/components/HabitCard';
import { AddHabitDialog } from '@/components/AddHabitDialog';
import { StatsOverview } from '@/components/StatsOverview';
import { ThemeSelector } from '@/components/ThemeSelector';
import { AuthDialog } from '@/components/AuthDialog';
import { Analytics } from '@/components/Analytics';
import { CalendarView } from '@/components/CalendarView';
import { useHabits } from '@/hooks/useHabits';
import { useTheme } from '@/hooks/useTheme';

const Index = () => {
  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('habits');
  const { habits, addHabit, toggleHabit, deleteHabit, getStreakCount } = useHabits();
  const { currentTheme, isDarkMode, toggleDarkMode } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status
  useEffect(() => {
    const auth = localStorage.getItem('habit_tracker_auth');
    setIsAuthenticated(!!auth);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('habit_tracker_auth');
    setIsAuthenticated(false);
  };

  const todayHabits = habits.filter(habit => habit.isActive);
  const completedToday = todayHabits.filter(habit => {
    const today = new Date().toDateString();
    return habit.completedDates.includes(today);
  }).length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-card/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <TrendingUp className="w-10 h-10 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                HabitFlow
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Transform your life, one habit at a time
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">Welcome to HabitFlow</h3>
              <p className="text-sm text-muted-foreground">
                Track your habits, build streaks, and achieve your goals with our beautiful and intuitive habit tracker.
              </p>
            </div>
            <Button 
              onClick={() => setIsAuthOpen(true)}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300"
              size="lg"
            >
              Get Started
            </Button>
          </CardContent>
        </Card>
        <AuthDialog 
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLogin={handleLogin}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${currentTheme.background}`}>
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
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
                onClick={() => setIsThemeSelectorOpen(true)}
                className="hover:bg-primary/10"
              >
                <Palette className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="hover:bg-primary/10"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-foreground"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="mb-8">
          <StatsOverview 
            totalHabits={habits.length}
            completedToday={completedToday}
            totalToday={todayHabits.length}
            longestStreak={Math.max(...habits.map(h => getStreakCount(h.id)), 0)}
          />
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="habits" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Habits
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Calendar
            </TabsTrigger>
          </TabsList>

          {/* Habits Tab */}
          <TabsContent value="habits" className="space-y-6">
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => setIsAddHabitOpen(true)}
                className={`${currentTheme.primary} hover:scale-105 transition-all duration-300 shadow-lg`}
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Habit
              </Button>
            </div>

            {/* Today's Progress */}
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
                      onClick={() => setIsAddHabitOpen(true)}
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
                        onToggle={toggleHabit}
                        onDelete={deleteHabit}
                        streak={getStreakCount(habit.id)}
                        theme={currentTheme}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* All Habits */}
            {habits.length > todayHabits.length && (
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
                        onToggle={toggleHabit}
                        onDelete={deleteHabit}
                        streak={getStreakCount(habit.id)}
                        theme={currentTheme}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Analytics 
              habits={habits}
              getStreakCount={getStreakCount}
              theme={currentTheme}
            />
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar">
            <CalendarView 
              habits={habits}
              theme={currentTheme}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* Dialogs */}
      <AddHabitDialog
        isOpen={isAddHabitOpen}
        onClose={() => setIsAddHabitOpen(false)}
        onAdd={addHabit}
      />
      
      <ThemeSelector
        isOpen={isThemeSelectorOpen}
        onClose={() => setIsThemeSelectorOpen(false)}
      />
    </div>
  );
};

export default Index;
