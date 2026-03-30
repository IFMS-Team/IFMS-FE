import { create } from 'zustand';

interface ModalState {
  id: string;
  data?: unknown;
}

interface UIStore {
  isLoading: boolean;
  isSidebarOpen: boolean;
  activeModal: ModalState | null;

  setLoading: (loading: boolean) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  openModal: (id: string, data?: unknown) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  isLoading: false,
  isSidebarOpen: true,
  activeModal: null,

  setLoading: (loading) => set({ isLoading: loading }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  openModal: (id, data) => set({ activeModal: { id, data } }),
  closeModal: () => set({ activeModal: null }),
}));
