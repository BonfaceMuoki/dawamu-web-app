<script setup>
import { onMounted, ref } from 'vue';
import api from "../api"
import ExamResultsDatatable from './ExamResultsDatatable.vue';
const props = defineProps({
  classId: { type: Number, default: 0 },
  examId: { type: Number, default: 0 }
});
const studentsData = ref([])
const subjectsData = ref([])
const studentResults = ref([])
const classStreams = ref([]);
const apiData = ref([]);
const totalPages = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(3);
const search = ref('');
onMounted(() => {
  getAllExamSubjects()
  getAllExamEligibleStudents()
  getAllExamResults()
  getAllExamStreams()
})
const getAllExamEligibleStudents = async () => {
  const response = await api.get(`/utilities/get-exam-eligible-students-by-class/${props.classId}/${props.examId}`);
  studentsData.value = response?.data?.students?.data || [];
  //  console.log(response?.data,"studentsData.value");
  totalPages.value = Math.ceil(response?.data?.students?.total / response?.data?.students?.per_page);
}
const getAllExamSubjects = async () => {
  const response = await api.get(`/utilities/get-exam-subjects?class=${props.classId}&exam=${props.examId}`);

  subjectsData.value = response?.data?.subjects?.data || [];
  console.log(response?.data, "subjectsData.value");
}

const getAllExamResults = async () => {
  const response = await api.get(`/utilities/get-student-exam-subjects?class=${props.classId}&exam=${props.examId}`);
  studentResults.value = response?.data?.results?.data || [];
}

const getAllExamStreams = async ()=>{
  const response = await api.get(`/utilities/get-exam-streams?class=${props.classId}&exam=${props.examId}`);
  classStreams.value = response?.data?.streams?.data || [];
}
function fetchPage(newPage) {
  currentPage.value = newPage;
  loadClasses();
}

function changeItemsPerPage(newPerPage) {
  itemsPerPage.value = newPerPage;
  currentPage.value = 1;
  loadClasses();
}

function searchApi(query) {
  search.value = query;
  currentPage.value = 1;
  loadClasses();
}

function editRow(row) {
  console.log('Edit', row);
  navigate.push(`class-details/${row.id}`)
}

function deleteRow(row) {
  console.log('Delete', row);
}

</script>

<template>
  <div>
    <ExamResultsDatatable :studentsData="studentsData" :subjectsData="subjectsData" :classStreams="classStreams" :studentResults="studentResults"
      :totalPages="totalPages" :currentPage="currentPage" :itemsPerPage="itemsPerPage" @update:currentPage="fetchPage"
      @update:itemsPerPage="changeItemsPerPage" @search="searchApi">

    </ExamResultsDatatable>
  </div>
</template>

<style></style>