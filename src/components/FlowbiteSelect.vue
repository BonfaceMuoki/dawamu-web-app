<script setup>
const props = defineProps({
  modelValue: String,
  options: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <select
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
    class="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
  >
    <option disabled value="">Select an option</option>
    <option v-for="opt in options" :key="opt.value" :value="opt.value">
      {{ opt.label }}
    </option>
  </select>
</template>
