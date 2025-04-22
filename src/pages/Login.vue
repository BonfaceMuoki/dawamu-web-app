<template>
 <div class="h-screen  p-15 flex flex-col justify-center items-center ">
  <div class="p-5 uppercase">
  Login &nbsp;&nbsp; To &nbsp;Access   &nbsp;&nbsp;Your   &nbsp;&nbsp;Account
 
  </div>
  <form @submit.prevent="handleLogin" class="w-full" >
    <div class="card w-full p-3 min-h-[400px] flex flex-col justify-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
        <input type="email"   v-model="email"
          
            id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
          </div> 
    <div class="mb-6">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input  v-model="password"
            type="password"
            id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
            
          </div>    
   
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
 
  </div>

  </form>
</div>
  </template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser } from '../services/authService'
import { authStore } from '../store/authStore'

const email = ref('')
const password = ref('')
const agree = ref(false)
const errors = ref({})

const router = useRouter()
const store = authStore()

const validateForm = () => {
  const newErrors = {}
  if (!email.value) {
    newErrors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    newErrors.email = 'Invalid email format'
  }

  if (!password.value) {
    newErrors.password = 'Password is required'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}
const handleLogin = async () => {
  if (!validateForm()) return
  try {
    const res = await loginUser({ email: email.value, password: password.value })
    store.login({
      user: res.data.user,
      token: res.data.token,
      role:res.data.role,
      permissions:res.data.permissions
    })
    router.push('/')
  } catch (error) {
    console.log(error);
    alert('Login failed')
  }
}
</script>
  