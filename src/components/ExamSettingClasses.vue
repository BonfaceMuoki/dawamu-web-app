<template>
  <div>
    <div class="flex justify-between items-center bg-gray-300 p-3">
      <h2 class="text-lg font-semibold">Class Settings</h2>

      <div class="flex items-center gap-2">
        <select v-model="selectedClass" @change="addClass" class="bg-white p-2 rounded border">
          <option disabled value="">Select Class to Add</option>
          <option
            v-for="option in availableClasses"
            :key="option.id"
            :value="option"
          >
            {{ option.class_name }}
          </option>
        </select>
      </div>
    </div>

    <br><br>

    <ExxamClassSetting
      v-for="(cls, index) in classes"
      :key="cls.id"
      :class-data="cls"
      :class-options="classOptions"
      @remove="removeClass(cls.class_name)"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ExxamClassSetting from './ExxamClassSetting.vue';
import { useClassStore } from '../store/classStore';
import api from "../api";

const classStore = useClassStore();

const classOptions = ref([]);

const selectedClass = ref(null);

const classes = computed(() => classStore.classes);
const availableClasses = computed(() => {
  const selectedIds = classStore.classes.map((cls) => cls.id);
  return classOptions.value.filter((c) => !selectedIds.includes(c.id));
});

const addClass = () => {
  if (!selectedClass.value) return;

  const exists = classStore.classes.some((cls) => cls.id === selectedClass.value.id);
  if (exists) {
    alert(`Class "${selectedClass.value.class_name}" has already been added.`);
    selectedClass.value = null; 
    return;
  }

  classStore.addClass({
    ...selectedClass.value,
    subjects: [{ subjectDetails: null, file: null, score: '' }],
    streams: [{ streamDetails: null, streamID: 0 }]
  });

  selectedClass.value = null;
};

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

onMounted(() => {
  getAllClasses();
});
</script>
