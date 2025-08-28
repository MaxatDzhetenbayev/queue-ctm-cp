import { create } from "zustand";

interface ReceptionModalsState {
  // Состояние модальных окон
  isClientDetailOpen: boolean;
  isCompleteModalOpen: boolean;
  selectedClientId: string | null;
  selectedReceptionId: string | null;

  // Actions
  openClientDetail: (clientId: string) => void;
  closeClientDetail: () => void;
  openCompleteModal: (receptionId: string) => void;
  closeCompleteModal: () => void;
  resetModals: () => void;
}

export const useReceptionModalsStore = create<ReceptionModalsState>((set) => ({
  // Начальное состояние
  isClientDetailOpen: false,
  isCompleteModalOpen: false,
  selectedClientId: null,
  selectedReceptionId: null,

  // Actions
  openClientDetail: (clientId: string) =>
    set({
      isClientDetailOpen: true,
      selectedClientId: clientId,
    }),
  closeClientDetail: () =>
    set({
      isClientDetailOpen: false,
      selectedClientId: null,
    }),
  openCompleteModal: (receptionId: string) =>
    set({
      isCompleteModalOpen: true,
      selectedReceptionId: receptionId,
    }),
  closeCompleteModal: () =>
    set({
      isCompleteModalOpen: false,
      selectedReceptionId: null,
    }),
  resetModals: () =>
    set({
      isClientDetailOpen: false,
      isCompleteModalOpen: false,
      selectedClientId: null,
      selectedReceptionId: null,
    }),
}));
