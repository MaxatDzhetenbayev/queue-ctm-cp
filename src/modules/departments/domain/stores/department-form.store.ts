import { create } from "zustand";

import { CreateDepartmentType } from "../schemas";

interface DepartmentFormState {
  // Состояние формы
  departmentFeatures: { [key: string]: string };
  startTime: string;
  endTime: string;
  isShowDepartment: boolean;
  isLetterDepartment: boolean;

  // Actions
  setDepartmentFeatures: (features: { [key: string]: string }) => void;
  setStartTime: (time: string) => void;
  setEndTime: (time: string) => void;
  setIsShowDepartment: (show: boolean) => void;
  setIsLetterDepartment: (letter: boolean) => void;
  updateTimeFeature: (startTime: string, endTime: string) => void;
  updateShowFeature: (show: boolean) => void;
  updateLetterFeature: (letter: boolean) => void;
  resetForm: () => void;
  getFormData: () => Partial<CreateDepartmentType>;
}

export const useDepartmentFormStore = create<DepartmentFormState>(
  (set, get) => ({
    // Начальное состояние
    departmentFeatures: {},
    startTime: "09:00",
    endTime: "",
    isShowDepartment: false,
    isLetterDepartment: false,

    // Actions
    setDepartmentFeatures: (features) => set({ departmentFeatures: features }),
    setStartTime: (time) => set({ startTime: time }),
    setEndTime: (time) => set({ endTime: time }),
    setIsShowDepartment: (show) => set({ isShowDepartment: show }),
    setIsLetterDepartment: (letter) => set({ isLetterDepartment: letter }),

    updateTimeFeature: (startTime, endTime) => {
      const { departmentFeatures } = get();
      const time = `${startTime}-${endTime}`;
      set({
        departmentFeatures: { ...departmentFeatures, TIME: time },
        startTime,
        endTime,
      });
    },

    updateShowFeature: (show) => {
      const { departmentFeatures } = get();
      set({
        departmentFeatures: { ...departmentFeatures, SHOW: String(show) },
        isShowDepartment: show,
      });
    },

    updateLetterFeature: (letter) => {
      const { departmentFeatures } = get();
      set({
        departmentFeatures: { ...departmentFeatures, LETTER: String(letter) },
        isLetterDepartment: letter,
      });
    },

    resetForm: () =>
      set({
        departmentFeatures: {},
        startTime: "09:00",
        endTime: "",
        isShowDepartment: false,
        isLetterDepartment: false,
      }),

    getFormData: () => {
      const { departmentFeatures } = get();
      return {
        departmentFeatures,
      };
    },
  })
);
