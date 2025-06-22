
import React, { useState, useEffect } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { MainHeader } from '@/components/MainHeader';
import { NavigationDropdown } from '@/components/NavigationDropdown';
import { QuickActions } from '@/components/QuickActions';
import { TodaysHabits } from '@/components/TodaysHabits';
import { AllHabits } from '@/components/AllHabits';
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
  const [activeView, setActiveView] = useState('habits');
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
      <>
        <LandingPage onGetStarted={() => setIsAuthOpen(true)} />
        <AuthDialog 
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLogin={handleLogin}
        />
      </>
    );
  }

  const renderContent = () => {
    switch (activeView) {
      case 'habits':
        return (
          <div className="space-y-6">
            <QuickActions
              currentTheme={currentTheme}
              onAddHabit={() => setIsAddHabitOpen(true)}
            />

            <TodaysHabits
              todayHabits={todayHabits}
              completedToday={completedToday}
              currentTheme={currentTheme}
              onToggleHabit={toggleHabit}
              onDeleteHabit={deleteHabit}
              onAddHabit={() => setIsAddHabitOpen(true)}
              getStreakCount={getStreakCount}
            />

            {habits.length > todayHabits.length && (
              <AllHabits
                habits={habits}
                currentTheme={currentTheme}
                onToggleHabit={toggleHabit}
                onDeleteHabit={deleteHabit}
                getStreakCount={getStreakCount}
              />
            )}
          </div>
        );
      case 'analytics':
        return (
          <Analytics 
            habits={habits}
            getStreakCount={getStreakCount}
            theme={currentTheme}
          />
        );
      case 'calendar':
        return (
          <CalendarView 
            habits={habits}
            theme={currentTheme}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${currentTheme.background}`}>
      <MainHeader
        currentTheme={currentTheme}
        isDarkMode={isDarkMode}
        onThemeSelectorOpen={() => setIsThemeSelectorOpen(true)}
        onToggleDarkMode={toggleDarkMode}
        onLogout={handleLogout}
      />

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

        {/* Navigation Dropdown */}
        <div className="mb-6">
          <NavigationDropdown
            currentView={activeView}
            onViewChange={setActiveView}
          />
        </div>

        {/* Content */}
        {renderContent()}
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
