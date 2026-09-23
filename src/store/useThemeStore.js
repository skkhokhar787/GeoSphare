import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create()(
  persist(
    (set) => ({
      theme: "dark",
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "dark" ? "light" : "dark",
        })),
    }),
    {
      name: "geosphere_theme",
    }
  )
);

const applyTheme = (theme) => {
  const root = document.documentElement;
  root.classList.toggle("light", theme === "light");
  root.classList.toggle("dark", theme !== "light");
};

applyTheme(useThemeStore.getState().theme);
useThemeStore.subscribe((state) => applyTheme(state.theme));

export default useThemeStore;