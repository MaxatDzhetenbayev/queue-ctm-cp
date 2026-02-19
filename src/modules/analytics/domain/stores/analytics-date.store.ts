import { create } from "zustand";

interface AnalyticsDateState {
  selectedDate: string | null;
  centerId: string | null;
  setSelectedDate: (date: string | null) => void;
  setCenterId: (id: string | null) => void;
  clearDate: () => void;
  clearCenterId: () => void;
}

export const useAnalyticsDateStore = create<AnalyticsDateState>((set) => ({
  selectedDate: null,
  centerId: null,
  setSelectedDate: (date: string | null) => set({ selectedDate: date }),
  setCenterId: (id: string | null) => set({ centerId: id }),
  clearDate: () => set({ selectedDate: null }),
  clearCenterId: () => set({ centerId: null }),
}));
