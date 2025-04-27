<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '../api';
import ClassSummaryCards from '../components/ClassSummaryCards.vue';
import TeachersList from '../components/TeachersList.vue';
import ExamsList from '../components/ExamsList.vue';
import ClassStreamsList from '../components/ClassStreamsList.vue';
import SubjectsList from '../components/SubjectsList.vue';
const route = useRoute();
const id = route.params.id;


const activeTab = ref('summary');
const examsData = ref(null);


function activateTab(tabName) {
    activeTab.value = tabName;
    console.log('Activated tab:', tabName);
    if (tabName === 'exams') {
        loadClassDetails();
    }
}

async function loadClassDetails() {
    try {
        const response = await api.get(`utilities/get-exams-by-class/${id}`);
        examsData.value = response.data;
        console.log('Loaded Exams:', examsData.value);
    } catch (error) {
        console.error('Failed to load exams', error);
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
                        type="button">Summary</button>
                </li>
                <li class="flex-1" role="presentation">
                    <button @click="activateTab('streams')" class="w-full p-4 border-b-2 rounded-t-lg"
                        :class="{ 'border-blue-500 text-blue-600': activeTab === 'streams' }"
                        type="button">Streams</button>
                </li>
                <li class="flex-1" role="presentation">
                    <button @click="activateTab('exams')" class="w-full p-4 border-b-2 rounded-t-lg"
                        :class="{ 'border-blue-500 text-blue-600': activeTab === 'exams' }" type="button">Exams</button>
                </li>
                <li class="flex-1" role="presentation">
                    <button @click="activateTab('teachers')" class="w-full p-4 border-b-2 rounded-t-lg"
                        :class="{ 'border-blue-500 text-blue-600': activeTab === 'teachers' }"
                        type="button">Teachers</button>
                </li>
                <li class="flex-1" role="presentation">
                    <button @click="activateTab('subjects')" class="w-full p-4 border-b-2 rounded-t-lg"
                        :class="{ 'border-blue-500 text-blue-600': activeTab === 'subjects' }"
                        type="button">Subjects</button>
                </li>
            </ul>

        </div>

        <!-- Tab content -->
        <div>
            <div v-if="activeTab === 'summary'" class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                <ClassSummaryCards :classId="id" />
            </div>

            <div v-if="activeTab === 'streams'" class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                <ClassStreamsList :classId="id" />
            </div>

            <div v-if="activeTab === 'exams'" class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                <ExamsList :classId="id"  />
            </div>

            <div v-if="activeTab === 'teachers'" class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
               <TeachersList :classId="id"  />
            </div>

            <div v-if="activeTab === 'subjects'" class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
             <SubjectsList :classId="id"  />
            </div>
        </div>

    </div>
</template>

<style scoped></style>
