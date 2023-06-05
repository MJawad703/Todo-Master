import { persist } from "zustand/middleware";
import { create } from "zustand";

let store = (set) => ({
  token: "",
  userId: "",
  userName: "",
  setLogout: () =>
    set(() => ({
      token: "",
      userId: "",
      userName: "",
    })),
});

store = persist(store, { name: "tokenStore" });

const useTokenStore = create(store);

export default useTokenStore;
