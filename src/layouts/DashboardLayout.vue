<template>
    <div class="flex flex-col md:flex-row h-screen relative">
      <Sidebar :sidebarOpen="sidebarOpen" />
      <div v-if="sidebarOpen" class="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden" @click="sidebarOpen = false">
      </div>  
      <div class="flex flex-col flex-1">
        <Topbar @toggle-sidebar="sidebarOpen = !sidebarOpen" />
        <main class="p-6  bg-gray-100 h-full overflow-y-auto">
          <router-view />
        </main>
      </div>
    </div>
  </template>
  <script setup>
  import { ref } from 'vue'
  import Sidebar from '../components/Sidebar.vue'
  import Topbar from '../components/Topbar.vue'
  const sidebarOpen = ref(false)
  </script>
  