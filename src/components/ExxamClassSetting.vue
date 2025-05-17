<template>
  <div class="mb-4 border rounded">
    <div class="flex justify-between items-center bg-gray-300 p-3 font-bold">
      <select
        v-model="classData.class_name"
        class="bg-white p-2 rounded border"
        :disabled="!!classData.class_name"
      >
        <option disabled value="">Select Class</option>
        <option v-for="c in classOptions" :key="c.class_name" :value="c.class_name">
          {{ c.class_name }}
        </option>
      </select>

      <button @click="removeClass" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
        X
      </button>
    </div>

    <div class="grid grid-cols-1 gap-4 items-center p-4 border-b">
      <div class="flex flex-row justify-start gap-2">
        <button
          @click="addSubject"
          class="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
        >
          + Subject
        </button>
      </div>

      <div
        v-for="(subject, index) in classData.subjects"
        :key="index"
        class="grid grid-cols-5 gap-4 items-center p-4 border-b"
      >
        <select
          v-model="subject.subjectDetails"
          class="border p-2 rounded"
          :disabled="!!subject.subjectDetails"
          @change="handleSubjectChange(subject.subjectDetails, index)"
        >
          <option disabled value="">Select Subject</option>
          <option
            v-for="option in subjectOpts"
            :key="option.id"
            :value="option"
          >
            {{ option.subject_name }}
          </option>
        </select>

        <input
          type="file"
          class="border p-2 rounded col-span-2"
          @change="onFileChange($event, index)"
        />

        <input
          type="text"
          placeholder="Total Score"
          class="border p-2 rounded"
          v-model="subject.score"
        />

        <button @click="removeSubject(index)" class="text-red-600 underline hover:text-red-800">
          Remove Subject
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import { useClassStore } from '../store/classStore';
import api from '../api';

const props = defineProps({
  classData: Object,
  subjectOptions: Array,
  classOptions: Array,
});

const emit = defineEmits(['remove']);
const subjectOpts = ref([]);
const classStore = useClassStore();

const addSubject = () => {
  const newSubject = { subjectDetails: null, file: null, score: '' };
  props.classData.subjects.push(newSubject);
};

const removeSubject = (index) => {
  props.classData.subjects.splice(index, 1);
};

const onFileChange = (e, index) => {
  const file = e.target.files[0];
  props.classData.subjects[index].file = file;
};

const handleSubjectChange = (selected, index) => {
  const alreadyExists = props.classData.subjects.some(
    (s, i) => s.subjectDetails?.subject_name === selected?.subject_name && i !== index
  );

  if (alreadyExists) {
    alert(`The subject "${selected.subject_name}" is already selected.`);
    props.classData.subjects[index].subjectDetails = null;
    return;
  }

  props.classData.subjects[index].subjectDetails = selected;
};

const removeClass = () => {
  emit('remove');
};

const getClassSubjectsByClassId = async (classID) => {
  try {
    const response = await api.get(`utilities/get-subjects-by-class/${classID}`);
    subjectOpts.value = response?.data?.subjects?.data || [];
  } catch (err) {
    console.error("Error fetching subjects by class:", err);
  }
};

onMounted(() => {
  getClassSubjectsByClassId(props.classData?.id || 1);
});
</script>
