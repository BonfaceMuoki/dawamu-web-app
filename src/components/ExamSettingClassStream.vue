<template>
  <div>
    <div class="flex justify-between items-center bg-gray-300 p-3">
      <h2 class="text-lg font-semibold">Class Streams Settings</h2>

      <div class="flex items-center gap-2">
        <!-- <select v-model="selectedClass" @change="addClass" class="bg-white p-2 rounded border">
          <option disabled value="">Select Class to Add</option>
          <option
            v-for="option in availableClasses"
            :key="option.id"
            :value="option"
          >
            {{ option.class_name }}
          </option>
        </select> -->
      </div>
    </div>

    <br><br>

    <ExxamClassSettingStream
      v-for="(cls, index) in classes"
      :key="cls.id"
      :class-data="cls"
      :subject-options="subjectOptions"
      :class-options="classOptions"
      @remove="removeClass(cls.class_name)"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ExxamClassSettingStream from './ExxamClassSettingStream.vue';
import { useClassStore } from '../store/classStore';
import api from "../api";
const classStore = useClassStore();
const classOptions = ref([]); 
const classes = computed(() => classStore.classes);


const getAllClasses = async () => {
  try {
    const response = await api.get("utilities/get-classes");
    classOptions.value = response?.data?.classes?.data || [];
  } catch (error) {
    console.error("Failed to fetch classes:", error);
  }
};

const removeClass = (className) => {
  classStore.removeClassByName(className);
};

onMounted(()=>{
  getAllClasses()
})
</script>
