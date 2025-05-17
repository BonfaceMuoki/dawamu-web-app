<script setup>
import { useClassStore } from '../store/classStore'
import FlowbiteSelect from './FlowbiteSelect.vue'
import FlowBitInput from './FlowBitInput.vue'

const classStore = useClassStore()

const examOptions = [
  { label: 'Midterm', value: 'midterm' },
  { label: 'Final', value: 'final' },
  { label: 'Quiz', value: 'quiz' }
]
</script>

<template>
  <div class="p-4 space-y-4">
    <!-- Exam Label -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-white">Exam Label</label>
      <FlowBitInput v-model="classStore.examInfo.examName" />
    </div>

    <!-- Exam Type -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-white">Exam Type</label>
      <FlowbiteSelect v-model="classStore.examInfo.examTYpe" :options="examOptions" />
    </div>

    <!-- Date Picker -->
    <div class="flex items-center gap-4">
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700 dark:text-white">Start Date</label>
        <input
          type="date"
          v-model="classStore.examInfo.startDate"
          class="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700 dark:text-white">End Date</label>
        <input
          type="date"
          v-model="classStore.examInfo.endDate"
          class="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        />
      </div>
    </div>

    <!-- Year and Term -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-white">Exam Year</label>
        <FlowBitInput v-model="classStore.examInfo.examYear" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-white">Exam Term</label>
        <FlowBitInput v-model="classStore.examInfo.term" />
      </div>
    </div>

    <!-- Notes -->
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-white">Notes | Instructions</label>
      <textarea
        rows="4"
        v-model="classStore.examInfo.notes"
        class="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
        placeholder="Write your thoughts here..."
      ></textarea>
    </div>
  </div>
</template>
