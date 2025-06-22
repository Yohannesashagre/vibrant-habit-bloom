
import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from '@/hooks/useTheme';
import { MainHeader } from '@/components/MainHeader';
import { NavigationDropdown } from '@/components/NavigationDropdown';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  avatar?: string;
  bio: string;
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    phone: '',
    location: '',
    joinDate: '',
    bio: ''
  });
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
  const { currentTheme, isDarkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    // Load user profile from localStorage
    const authData = localStorage.getItem('habit_tracker_auth');
    const savedProfile = localStorage.getItem('habit_tracker_profile');
    
    if (authData) {
      const auth = JSON.parse(authData);
      const defaultProfile = {
        name: auth.name || auth.email.split('@')[0],
        email: auth.email,
        phone: '',
        location: '',
        joinDate: new Date().toLocaleDateString(),
        bio: 'Welcome to your habit tracking journey!'
      };

      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setProfile({ ...defaultProfile, ...parsed });
      } else {
        setProfile(defaultProfile);
      }
    }
  }, []);

  useEffect(() => {
    setEditedProfile(profile);
  }, [profile]);

  const handleSave = () => {
    setProfile(editedProfile);
    localStorage.setItem('habit_tracker_profile', JSON.stringify(editedProfile));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('habit_tracker_auth');
    localStorage.removeItem('habit_tracker_profile');
    window.location.href = '/';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
            Profile Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your personal information and preferences
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Card */}
          <Card className="md:col-span-1 bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback className={`${currentTheme.primary} text-white text-xl`}>
                    {getInitials(profile.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-xl">{profile.name}</CardTitle>
              <p className="text-muted-foreground">{profile.email}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {profile.joinDate}</span>
                </div>
                {profile.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.phone}</span>
                  </div>
                )}
                {profile.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.location}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Profile Information */}
          <Card className="md:col-span-2 bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="hover:bg-primary/10"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    className="hover:bg-destructive/10"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    className={`${currentTheme.primary} text-white`}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={isEditing ? editedProfile.name : profile.name}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                    disabled={!isEditing}
                    className="bg-background/50 border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    disabled
                    className="bg-muted/50 border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={isEditing ? editedProfile.phone : profile.phone}
                    onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                    disabled={!isEditing}
                    className="bg-background/50 border-border/50"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={isEditing ? editedProfile.location : profile.location}
                    onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                    disabled={!isEditing}
                    className="bg-background/50 border-border/50"
                    placeholder="Enter your location"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  value={isEditing ? editedProfile.bio : profile.bio}
                  onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                  disabled={!isEditing}
                  className="w-full min-h-[100px] px-3 py-2 rounded-md border border-border/50 bg-background/50 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <Card className="mt-6 bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Account Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-background/50">
                <div className={`text-2xl font-bold ${currentTheme.primary} bg-clip-text text-transparent`}>
                  {JSON.parse(localStorage.getItem('habits') || '[]').length}
                </div>
                <p className="text-sm text-muted-foreground">Total Habits</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50">
                <div className={`text-2xl font-bold ${currentTheme.secondary} bg-clip-text text-transparent`}>
                  {Math.floor((Date.now() - new Date(profile.joinDate).getTime()) / (1000 * 60 * 60 * 24))}
                </div>
                <p className="text-sm text-muted-foreground">Days Active</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50">
                <div className={`text-2xl font-bold ${currentTheme.accent} bg-clip-text text-transparent`}>
                  {JSON.parse(localStorage.getItem('habits') || '[]').reduce((total: number, habit: any) => {
                    return total + (habit.completedDates?.length || 0);
                  }, 0)}
                </div>
                <p className="text-sm text-muted-foreground">Total Completions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;
