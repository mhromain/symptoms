// src/store/auth.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  username: string;
}

interface AuthState {
  isAuthed: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthed: false,
      user: null,
      login: (user) => set({ isAuthed: true, user }),
      logout: () => set({ isAuthed: false, user: null }),
    }),
    { name: "auth" }
  )
);
