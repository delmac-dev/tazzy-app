import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getItem, setItem, deleteItemAsync } from "expo-secure-store"

type UserState = {
    loggedIn: boolean,
    isOnboarded: boolean,
    setLoggedIn: ( state: boolean ) => void,
    completeOnboarding: () => void,
    resetOnboarding: () => void
};

export const useUserStore = create(
    persist<UserState>((set) => ({
        loggedIn: false,
        isOnboarded: false,
        setLoggedIn: (state) => set((prevState) => ({ ...prevState, loggedIn: state })),
        completeOnboarding: () => set((state) => ({ ...state, isOnboarded: true})),
        resetOnboarding: () => set((state) => ({ ...state, isOnboarded: false}))
    }), {
        name: "auth-store",
        storage: createJSONStorage(() => ({getItem, setItem, removeItem: deleteItemAsync}))
    })
);