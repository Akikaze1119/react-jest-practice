import { create } from 'zustand';

type TFilterState = {
  filter: 'all' | 'completed' | 'incomplete';
  setFilter: (filter: 'all' | 'completed' | 'incomplete') => void;
};

export const useFilterStore = create<TFilterState>((set) => ({
  filter: 'all',
  setFilter: (filter) => set({ filter }),
}));
