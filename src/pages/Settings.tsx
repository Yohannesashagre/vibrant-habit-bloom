
import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Database, Moon, Sun, Palette, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/hooks/useTheme';
import { MainHeader } from '@/components/MainHeader';
import { NavigationDropdown } from '@/components/NavigationDropdown';

interface Settings {
  notifications: boolean;
  reminderTime: string;
  dataBackup: boolean;
  soundEffects: boolean;
  weekStartsOn: string;
  defaultHabitType: string;
  privacyMode: boolean;
}

const Settings = () => {
  const [settings, setSettings] = useState<Settings>({
    notifications: true,
    reminderTime: '09:00',
    dataBackup: true,
    soundEffects: true,
    weekStartsOn: 'monday',
    defaultHabitType: 'daily',
    privacyMode: false
  });
  const { currentTheme, isDarkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const savedSettings = localStorage.getItem('habit_tracker_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const updateSetting = (key: keyof Settings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('habit_tracker_settings', JSON.stringify(newSettings));
  };

  const handleLogout = () => {
    localStorage.removeItem('habit_tracker_auth');
    localStorage.removeItem('habit_tracker_profile');
    window.location.href = '/';
  };

  const handleDataExport = () => {
    const data = {
      habits: JSON.parse(localStorage.getItem('habits') || '[]'),
      profile: JSON.parse(localStorage.getItem('habit_tracker_profile') || '{}'),
      settings: settings
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'habitflow-backup.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${currentTheme.background}`}>
      <MainHeader
        currentTheme={currentTheme}
        isDarkMode={isDarkMode}
        onThemeSelectorOpen={() => {}}
        onToggleDarkMode={toggleDarkMode}
        onLogout={handleLogout}
      />

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Navigation Dropdown */}
        <div className="mb-6">
          <NavigationDropdown
            currentView=""
            onViewChange={() => {}}
          />
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Customize your HabitFlow experience
          </p>
        </div>

        <div className="grid gap-6">
          {/* Notifications */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Enable Notifications</Label>
                <Switch
                  id="notifications"
                  checked={settings.notifications}
                  onCheckedChange={(checked) => updateSetting('notifications', checked)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reminder-time">Daily Reminder Time</Label>
                <Select
                  value={settings.reminderTime}
                  onValueChange={(value) => updateSetting('reminderTime', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="06:00">6:00 AM</SelectItem>
                    <SelectItem value="07:00">7:00 AM</SelectItem>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="18:00">6:00 PM</SelectItem>
                    <SelectItem value="19:00">7:00 PM</SelectItem>
                    <SelectItem value="20:00">8:00 PM</SelectItem>
                    <SelectItem value="21:00">9:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <Switch
                  id="dark-mode"
                  checked={isDarkMode}
                  onCheckedChange={toggleDarkMode}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sound-effects">Sound Effects</Label>
                <Switch
                  id="sound-effects"
                  checked={settings.soundEffects}
                  onCheckedChange={(checked) => updateSetting('soundEffects', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="week-starts">Week Starts On</Label>
                <Select
                  value={settings.weekStartsOn}
                  onValueChange={(value) => updateSetting('weekStartsOn', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sunday">Sunday</SelectItem>
                    <SelectItem value="monday">Monday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="default-habit">Default Habit Type</Label>
                <Select
                  value={settings.defaultHabitType}
                  onValueChange={(value) => updateSetting('defaultHabitType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Data */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy & Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="privacy-mode">Privacy Mode</Label>
                <Switch
                  id="privacy-mode"
                  checked={settings.privacyMode}
                  onCheckedChange={(checked) => updateSetting('privacyMode', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-backup">Auto Backup</Label>
                <Switch
                  id="auto-backup"
                  checked={settings.dataBackup}
                  onCheckedChange={(checked) => updateSetting('dataBackup', checked)}
                />
              </div>
              <Button onClick={handleDataExport} variant="outline" className="w-full">
                <Database className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;
