export type Place = {
  id: string;
  name: string;
  category: string;
  address?: string;
  link?: string;
  dayIndex: number; // 0 for Day 1, 1 for Day 2...
  time?: string; // "HH:mm" format
  cost?: number;
  memo?: string;
  media?: string[]; // URLs or local blob URLs
  // Mock coordinates
  lat?: number;
  lng?: number;
};

export type Project = {
  id: string;
  name: string;
  duration: number; // Number of days (e.g., 3 nights 4 days = 4)
  places: Place[];
  startDate?: string;
};
