import { defineStore } from "pinia";

export const authStore = defineStore("auth", {
    state: () => ({
        user: null,
        token: null
    }),
    getters: {
        isAuthenticated: () => (state.token) ? true : false,
        loggedUser: () => state.user
    },
    actions: {
        login({ user, token }) {
            this.user = user
            this.token = token

        },
        logout() {
            this.user = null
            this.token = null
        }

    }
})

