import { defineStore } from "pinia";

export const authStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    role: null,
    permissions: {},
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    loggedUser: (state) => state.user,
    getRole: (state) => state.role,
    getPermissions: (state) => state.permissions,
  },
  actions: {
    login({ user, token,role,permissions }) {
      this.user = user;
      this.token = token;
      this.role=role;
      this.permissions=permissions;
    },
    logout() {
    this.user = null;
    this.token = null;
    }
  }, 
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'auth',
        storage: localStorage, 
      },
    ],
  },
})
