<script setup>
    import { onMounted, ref } from 'vue';
    import api from "../api"
    const props = defineProps({
     classId:{type:Number,default:0},
     examId:{type:Number,default:0}
     
    });
    const apiData = ref([]);
const totalPages = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(3);
const search = ref('');
    onMounted(()=>{
        getAllExamEligibleStudents();
    })
    const getAllExamEligibleStudents = ()=>{
     const response = api.get(`/utilities/get-exam-eligible-students-by-class/${props.classId}/${props.examId}?page=${currentPage.value}&perPage=${itemsPerPage.value}&search=${search.value}`);
    }
</script>

<template>
    <div>
        <p>Exam Eligible students {{ props.classId }} {{ props.examId }}</p>
    </div>
</template>

<style>
    
</style>