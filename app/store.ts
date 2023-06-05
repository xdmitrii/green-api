import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { GreenApiState } from '@/types';

const createGreenApiSlice = persist<GreenApiState>(
  (set) => ({
    instanceId: '',
    token: '',
    chatList: [],
    notifications: [],
    messageHistory: Object.create(null),
  }),
  {
    name: 'green-api-storage',
    storage: createJSONStorage(() => sessionStorage),
  }
);

const useStore = create<GreenApiState>()((...a) => ({
  ...createGreenApiSlice(...a),
}));

export default useStore;
