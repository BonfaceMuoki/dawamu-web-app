<script setup>
const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
  />
</template>
