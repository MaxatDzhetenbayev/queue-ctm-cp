import { create } from "zustand";

interface AnalyticsDateState {
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  clearDate: () => void;
}

export const useAnalyticsDateStore = create<AnalyticsDateState>((set) => ({
  selectedDate: null,
  setSelectedDate: (date: string | null) => set({ selectedDate: date }),
  clearDate: () => set({ selectedDate: null }),
}));
