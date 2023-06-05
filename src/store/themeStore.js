import { create } from "zustand";
import { persist } from "zustand/middleware";

let store = (set) => ({
  isDarkTheme: true,
  toggleDarkTheme: () =>
    set((state) => ({
      isDarkTheme: !state.isDarkTheme,
    })),
});

store = persist(store, { name: "themeStore" });

// const useThemeToggle = create((set) => ({
//   isDarkTheme: true,
//   toggleDarkTheme: () =>
//     set((state) => ({
//       isDarkTheme: !state.isDarkTheme,
//     })),
// }));

const useThemeToggle = create(store);

export default useThemeToggle;
