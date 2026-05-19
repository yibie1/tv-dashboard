import { create } from 'zustand';

export type NavItem =
  | 'home'
  | 'calendar'
  | 'music'
  | 'radio'
  | 'video'
  | 'bible'
  | 'news'
  | 'weather'
  | 'gallery'
  | 'favorites'
  | 'settings';

interface AppState {
  activeNav: NavItem;
  sidebarExpanded: boolean;
  isAmbientMode: boolean;
  currentTime: Date;

  // Music
  isPlaying: boolean;
  currentTrack: { title: string; artist: string; album: string } | null;

  // Weather
  weather: { temp: number; condition: string; city: string } | null;

  // Actions
  setActiveNav: (nav: NavItem) => void;
  setSidebarExpanded: (v: boolean) => void;
  setAmbientMode: (v: boolean) => void;
  setCurrentTime: (d: Date) => void;
  setPlaying: (v: boolean) => void;
  setCurrentTrack: (t: AppState['currentTrack']) => void;
  setWeather: (w: AppState['weather']) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeNav: 'home',
  sidebarExpanded: false,
  isAmbientMode: false,
  currentTime: new Date(),
  isPlaying: false,
  currentTrack: null,
  weather: { temp: 22, condition: 'Partly Cloudy', city: 'Addis Ababa' },

  setActiveNav: (nav) => set({ activeNav: nav }),
  setSidebarExpanded: (v) => set({ sidebarExpanded: v }),
  setAmbientMode: (v) => set({ isAmbientMode: v }),
  setCurrentTime: (d) => set({ currentTime: d }),
  setPlaying: (v) => set({ isPlaying: v }),
  setCurrentTrack: (t) => set({ currentTrack: t }),
  setWeather: (w) => set({ weather: w }),
}));
