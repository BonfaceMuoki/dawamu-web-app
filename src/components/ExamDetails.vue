<script setup>
import { ref } from 'vue';
import ExamEligibleStudents from './ExamEligibleStudents.vue';
import ExamResults from './ExamResults.vue';
import ExamTargetStreams from './ExamTargetStreams.vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
const navigator = useRouter();
const route = useRoute();
const classId=route.params.classId;
const examId=route.params.examId;
const activeTab = ref('summary');
const examsData = ref(null);
function activateTab(tabName) {
    activeTab.value = tabName;
    console.log('Activated tab:', tabName);
    if (tabName === 'exams') {
        loadClassDetails();
    }
}

</script>

<template>
    <div class="overflow-x-auto shadow-md sm:rounded-lg p-10 w-full">

        <!-- Tabs -->
        <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul class="flex flex-wrap w-full text-sm font-medium text-center border-b border-gray-200 dark:border-gray-700"
                role="tablist">
                <li class="flex-1" role="presentation">
                    <button @click="activateTab('summary')" class="w-full p-4 border-b-2 rounded-t-lg"
                        :class="{ 'border-blue-500 text-blue-600': activeTab === 'summary' }"
                        type="button">Eligible</button>
                </li>
                <li class="flex-1" role="presentation">
                    <button @click="activateTab('streams')" class="w-full p-4 border-b-2 rounded-t-lg"
                        :class="{ 'border-blue-500 text-blue-600': activeTab === 'streams' }" type="button">Target
                        Streams </button>
                </li>
                <li class="flex-1" role="presentation">
                    <button @click="activateTab('teachers')" class="w-full p-4 border-b-2 rounded-t-lg"
                        :class="{ 'border-blue-500 text-blue-600': activeTab === 'teachers' }" type="button">Exam
                        Results
                    </button>
                </li>

            </ul>

        </div>
        <div>
            <div v-if="activeTab === 'summary'" class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
               <ExamEligibleStudents :classId="classId" :examId="examId"/>
            </div>
            <div v-if="activeTab === 'streams'" class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
               <ExamTargetStreams :classId="classId" :examId="examId"/>
            </div>
            <div v-if="activeTab === 'teachers'" class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                <ExamResults :classId="classId" :examId="examId"/>
            </div>
        </div>

    </div>
</template>

<style></style>