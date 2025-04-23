<template>
  <header class="flex items-center justify-between px-4 py-3 bg-white shadow">  
    <div>
      <button @click="$emit('toggle-sidebar')" class="text-gray-600 md:hidden">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
    <div class="relative">
      <button
        id="dropdownUserAvatarButton"
        data-dropdown-toggle="dropdownAvatar"
        type="button"
        class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open user menu</span>
        <img class="w-8 h-8 rounded-full" src="/logo.png" alt="user photo" />
      </button>

      <div
        id="dropdownAvatar"
        class="absolute right-0 z-50 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
      >
        <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>{{ `${auth?.user?.first_name}  ${auth?.user?.middle_name}` }}</div>
          <div class="font-medium truncate">{{ auth?.role }}</div>
        </div>
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
          <li>
           <router-link to="/dashboard" class="block px-4 py-2 rounded" >Dashboard</router-link>
          </li>
          <li>
           <router-link to="/dashboard" class="block px-4 py-2 rounded" >Settings</router-link>
          </li>
        </ul>
        <div class="py-2">
        <a href="#" @click.prevent="handleLogout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
  Sign out
</a>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
import { onMounted } from 'vue'
import { initDropdowns } from 'flowbite'
import {authStore} from '../store/authStore'

import {useRouter} from 'vue-router'
import {logOutUser} from '../services/authService'
const router = useRouter();
// const route = useRoute();
const auth = authStore();


const handleLogout = async ()=> {
  // await logOutUser()
  auth.logout()
  router.push("/auth/login")
}
onMounted(() => {
  initDropdowns()
})
</script>
