import { create } from "zustand";

interface ReceptionFiltersState {
  // Состояние фильтров
  searchValue: string;
  selectedDate: string | null;
  selectedStatus: string | null;

  // Actions
  setSearchValue: (value: string) => void;
  setSelectedDate: (date: string | null) => void;
  setSelectedStatus: (status: string | null) => void;
  resetFilters: () => void;
}

export const useReceptionFiltersStore = create<ReceptionFiltersState>(
  (set) => ({
    // Начальное состояние
    searchValue: "",
    selectedDate: null,
    selectedStatus: null,

    // Actions
    setSearchValue: (value: string) => set({ searchValue: value }),
    setSelectedDate: (date: string | null) => set({ selectedDate: date }),
    setSelectedStatus: (status: string | null) =>
      set({ selectedStatus: status }),
    resetFilters: () =>
      set({
        searchValue: "",
        selectedDate: null,
        selectedStatus: null,
      }),
  })
);
