<template>
  <aside :class="[
    'bg-white shadow-md z-40 md:relative md:translate-x-0 md:flex md:flex-col md:w-64',
    sidebarOpen ? 'fixed inset-y-0 left-0 w-64' : 'hidden md:block'
  ]">
    <div class="p-5 text-xl flex justify-center font-bold text-green-600 border-b-2 border-solid border-gray-200">
      <img src="/logo.png"   class="w-full sm:w-1/2 md:w-1/10 lg:w-1/2 object-cover  shadow-md"/>
    </div>

    <nav class="flex-1 px-4 space-y-2 mt-5">
      <router-link to="/dashboard" class="block px-4 py-2 rounded" :class="navLinkClass('/dashboard')">
        <i class="fas fa-home"></i> Dashboard
      </router-link>

      <router-link to="/classes" class="block px-4 py-2 rounded" :class="navLinkClass('/classes')">
        <i class="fas fa-graduation-cap"></i> Classes
      </router-link>

      <router-link to="/notice-board" class="block px-4 py-2 rounded" :class="navLinkClass('/notices')">
        <i class="fas fa-bell"></i> Notice Board
      </router-link>

      <router-link to="/exams" class="block px-4 py-2 rounded" :class="navLinkClass('/exams')">
        <i class="fas fa-pen-to-square"></i> Exams
      </router-link>

      <div>
        <button @click="isClassesOpen = !isClassesOpen"
          class="flex items-center justify-between w-full px-4 py-2 rounded "
          :class="navLinkClass('/security')">
          <span class="flex items-center gap-2">
            <i class="fas fa-gear w-4"></i> Security
          </span>
          <i :class="isClassesOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
        </button>

        <div v-if="isClassesOpen" class="pl-10 space-y-1">
          <router-link to="/roles" class="block py-1 px-2 rounded "  :class="navLinkClass('/roles')"
            >
            <i class="fas fa-user-shield"></i> Roles
          </router-link>
          <router-link to="/permissions" class="block py-1 px-2 rounded "  :class="navLinkClass('/permissions')"
            >
            <i class="fas fa-key"></i> Permissions
          </router-link>
          <router-link to="/users" class="block py-1 px-2 rounded "  :class="navLinkClass('/users')"
          >
            <i class="fas fa-user-group"></i> User Management
          </router-link>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

defineProps({
  sidebarOpen: Boolean
})

const isClassesOpen = ref(false)
const route = useRoute()
const navLinkClass = (path) => {
  return route.path === path
    ? 'bg-green-600 text-white font-semibold hover:bg-green-600'
    : 'bg-white-600 text-black hover:bg-green-100'
}
</script>
