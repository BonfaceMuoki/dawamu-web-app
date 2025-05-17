<script setup>
import { ref, computed, watch, defineEmits, onMounted } from 'vue';
import { defineProps } from 'vue';
import FlowBitInput from './FlowBitInput.vue';
import { useScoreStore } from '../store/useScoreStore';
import api from "../api"

const { scoreMap, formattedScores, updateScore, getScores } = useScoreStore();

const props = defineProps({
  classStreams: { type: Array, default: () => [] },
  studentResults: { type: Array, default: () => [] },
  studentsData: { type: Array, default: () => [] },
  subjectsData: { type: Array, default: () => [] },
  columns: { type: Array, default: () => [] },
  totalPages: { type: Number, default: () => 1 },
  currentPage: { type: Number, default: () => 1 },
  itemsPerPage: { type: Number, default: () => 10 }
});
console.log(props.classStreams,"classStreams")

const emit = defineEmits(['update:currentPage', 'update:itemsPerPage', 'search']);

const searchQuery = ref('');
const hiddenSubjects=ref([]);

watch(searchQuery, (val) => {
  emit('search', val);
});
function filterStream(stream) {

}
function setPage(page) {
  emit('update:currentPage', page);
}

function nextPage() {
  if (props.currentPage < props.totalPages) {
    emit('update:currentPage', props.currentPage + 1);
  }
}

function prevPage() {
  if (props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1);
  }
}

function changePerPage(newPerPage) {
  emit('update:itemsPerPage', newPerPage);
  emit('update:currentPage', 1);
}

async function handleSubmit() {

  const response = await api.post("admin/update-student-exam-result",{results:getScores()});
  // You can replace this with a real API call or a store action
  console.log('Submitting scores:',response);
  // Optionally emit an event
  // emit('submit', scoreMap.value);
}
function getScore(event, id) {

  const inputValue = event.target.value;
  const score = Number(inputValue);
  if (!isNaN(score)) {
    updateScore(id, inputValue);
  } else {

    console.warn(`Invalid score entered for id ${id}`);

  }
}
function getScoreById(id) {
  return scoreMap[id];
  // const found = scoreMap.find(item => item.id === id);
  // return found ? found.score : '';
}
 function toogleSubject(event, subjectName) 
 {
    const isChecked = event.target.checked;

    if (!isChecked) {

      if (!hiddenSubjects.value.includes(subjectName)) {
        hiddenSubjects.value.push(subjectName);
      }
    } else {
  
      hiddenSubjects.value = this.hiddenSubjects.filter(subj => subj !== subjectName);
    }
  }

function isSubjectVisible(subjectName) {
    return !hiddenSubjects.value.includes(subjectName);
  }

watch(
  () => props.studentResults,
  (newVal) => {
    for (const result of newVal) {
      const subjects = result.student_school_exam_school_class_school_class_stream || [];
      for (const subjectEntry of subjects) {
        const id = subjectEntry.id;
        const existingScore = subjectEntry.score ?? '';

        // Only update if this ID is not yet in the scoreMap
        if (!(id in scoreMap)) {
          updateScore(id, existingScore);
        }
      }
    }
  },
  { immediate: true }
);




</script>

<template>
  <div class="overflow-x-auto shadow-md sm:rounded-lg p-10 w-full">
    <table class="w-full">
              <tr
          class="text-xs bg-gray-200 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b dark:border-gray-700 border-gray-200 w-full">
          <th class="p-3 text-left uppercase text-xs text-gray-500"></th>
          <template v-for="(col, index) in subjectsData" :key="index">
            <th  :class="[' p-3 text-left uppercase text-xs text-gray-500 hidden sm:table-cell', col.school_class_school_subject.subject_details.id]">
              <div class="mb-4 flex flex-wrap gap-4">
                <div> {{ col.school_class_school_subject.subject_details.subject_name }}</div>
                <div> <input type="checkbox" class="accent-blue-600" @change="toogleSubject($event,col.school_class_school_subject.subject_details.subject_name)" /></div>
              </div>

            </th>
          </template>         
        </tr>
    </table>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead>
        <tr class="bg-white dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
          <th :colspan="subjectsData.length + 2" class="p-4">
            <div class="flex flex-col sm:flex-row justify-between gap-2">
              <div class="relative w-full max-w-sm">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <div class="flex flex-col sm:flex-row justify-between gap-4">
                  <input type="search" id="search" v-model="searchQuery"
                    class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search..." />
                  <select id="perPage" @change="filterStream(+$event.target.value)"
                    class="border p-1 rounded text-sm dark:bg-gray-700 dark:text-white">
                    <option :value="0">Select Stream</option>

                    <option v-for="option in classStreams" :key="option.id" :value="option.school_class_stream.id">
                      {{ option.school_class_stream.stream_name }}</option>
                  </select>
                </div>

              </div>

              <div class="flex items-center gap-2">
                <select id="perPage" :value="itemsPerPage" @change="changePerPage(+$event.target.value)"
                  class="border p-3 rounded text-sm dark:bg-gray-700 dark:text-white">
                  <option :value="1">1</option>
                  <option :value="2">2</option>
                  <option :value="3">3</option>
                  <option :value="4">4</option>
                  <option :value="5">5</option>
                  <option :value="6">6</option>
                  <option :value="7">7</option>
                  <option :value="8">8</option>
                  <option :value="9">9</option>
                  <option :value="10">10</option>
                  <option :value="15">15</option>
                  <option :value="20">20</option>
                  <option :value="25">25</option>
                  <option :value="30">30</option>
                </select>
                <label for="perPage" class="text-sm text-gray-600 dark:text-gray-300">Rows per page:</label>
              </div>
            </div>
          </th>
        </tr>

        <tr
          class="text-xs bg-gray-200 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b dark:border-gray-700 border-gray-200">
          <th class="px-6 py-3 text-left uppercase text-xs text-gray-500">Student ADM No</th>
          <th class="px-6 py-3 text-left uppercase text-xs text-gray-500 sm:hidden">Details</th>
          <template v-for="(col, index) in subjectsData" :key="index">
            <th   v-if="isSubjectVisible(col.school_class_school_subject.subject_details.subject_name)" :class="['px-6 py-3 text-left uppercase text-xs text-gray-500 hidden sm:table-cell', col.school_class_school_subject.subject_details.id]">
              <div class="mb-4 flex flex-wrap gap-4">
                <div> {{ col.school_class_school_subject.subject_details.subject_name }}</div>
                <!-- <div> <input type="checkbox" class="accent-blue-600" @change="toogleSubject($event,col.school_class_school_subject.subject_details.subject_name)" /></div> -->
              </div>

            </th>
          </template>
          <th class="px-6 py-3 text-left uppercase text-xs text-gray-500">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(sdt, index) in studentResults" :key="index"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
          <td class="px-6 py-4">
            {{ sdt.user.first_name }} {{ sdt.user.last_name }}<br>
            {{ sdt.student_admission_number }}

          </td>
     <template v-for="(subdata, index2) in sdt.student_school_exam_school_class_school_class_stream" :key="index2">
  <td
    v-if="isSubjectVisible(subdata.school_exam_school_class_subject.school_class_school_subject.subject_details.subject_name)"
    :class="['px-6 py-4 hidden sm:table-cell', subdata.school_exam_school_class_subject.school_class_school_subject.subject_details.subject_name]">
    
                  <input type="text" :value="getScoreById(subdata.id)" @keyup="getScore($event, subdata.id)"
                class="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white" />

            </td>
          </template>
          <td class="px-6 py-4 table-cell">
            <slot name="actions" :row="sdt" />
          </td>
        </tr>
        <tr v-if="props.totalPages === 0">
          <td colspan="5" class="text-center py-4 text-gray-500 dark:text-gray-400">
            No results found.
          </td>
        </tr>
      </tbody>
    </table>

    <nav aria-label="Page navigation example" class="mt-6">
      <ul class="inline-flex -space-x-px text-sm">
        <li>
          <button @click="prevPage" :disabled="currentPage === 1"
            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50">
            Previous
          </button>
        </li>

        <li v-for="page in totalPages" :key="page">
          <button @click="setPage(page)"
            :class="['flex items-center justify-center px-3 h-8 leading-tight border', page === currentPage ? 'text-blue-600 border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white']">
            {{ page }}
          </button>
        </li>

        <li>
          <button @click="nextPage" :disabled="currentPage === totalPages"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50">
            Next
          </button>
        </li>
      </ul>
    </nav>
  </div>
  <div class="mt-6 flex justify-end">
    <button @click="handleSubmit"
      class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
      Submit Scores
    </button>
  </div>
</template>

<style></style>