<script setup>
      const props = defineProps({
     btnLabel:{type:String,default:"BTN"},
    });
</script>

<template>
   <button class=" p-4 border-b-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        :class="{ 'border-blue-500 text-blue-600': activeTab === 'streams' }" type="button">
                        {{ props.btnLabel }}
                    </button>
</template>

<style>
    
</style>