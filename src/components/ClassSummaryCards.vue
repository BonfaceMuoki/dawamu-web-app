<template lang="">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 p-4">
      <!-- Total Students -->
      <div class="w-full bg-white border border-gray-200 rounded-lg shadow p-5">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Total Students</h5>
        <p class="font-normal text-gray-700 text-3xl">1,200 {{classId}}</p>
      </div>
  
      <!-- Total Teachers -->
      <div class="w-full bg-white border border-gray-200 rounded-lg shadow p-5">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Total Teachers</h5>
        <p class="font-normal text-gray-700 text-3xl">75</p>
      </div>
  
      <!-- Fees Collected -->
      <div class="w-full bg-white border border-gray-200 rounded-lg shadow p-5">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">All Subjects</h5>
        <p class="font-normal text-gray-700 text-3xl">KES 3.2M</p>
      </div>
  
      <!-- Attendance Today -->
      <div class="w-full bg-white border border-gray-200 rounded-lg shadow p-5">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Compulsory Subjects</h5>
        <p class="font-normal text-gray-700 text-lg">Students: 1,100 / 1,200</p>
        <p class="font-normal text-gray-700 text-lg">Teachers: 72 / 75</p>
      </div>   
    </div>
</template>
<script setup>

const props = defineProps({
    classId: { type: Number, default: () => 0 }
});

</script>
<style lang="">
    
</style>