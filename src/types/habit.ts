
export interface Habit {
  id: string;
  name: string;
  description?: string;
  category?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  targetValue?: number;
  unit?: string;
  isActive: boolean;
  createdAt: Date;
  completedDates: string[];
}

export interface Theme {
  name: string;
  description: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}
