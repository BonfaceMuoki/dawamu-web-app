<script setup>
    import { onMounted, ref } from 'vue';
    import api from "../api"
    const props = defineProps({
     classId:{type:Number,default:0},
     examId:{type:Number,default:0}
    });
    onMounted(()=>{
        getAllExamSubjects();
        getAllExamEligibleStudents();
    })
    const getAllExamEligibleStudents = ()=>{
     const response = api.get(`/utilities/get-exam-eligible-students-by-class/${props.classId}/${props.examId}`);
    }
    const getAllExamSubjects = ()=>{
     const response = api.get(`/utilities/get-subjects-by-class/${props.classId}`);
    }

</script>

<template>
    <div>
      
    </div>
</template>

<style>
    
</style>