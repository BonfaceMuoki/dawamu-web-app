<script setup>
import { onMounted, ref } from 'vue';
import api from "../api"
import ExamSettingsGen from './ExamSettingsGen.vue';
import ExamSettingClasses from './ExamSettingClasses.vue';
import ExamSettingClassStream from './ExamSettingClassStream.vue';
import { useClassStore } from '../store/classStore';
const activeTab = ref('summary');
const selectedOption = ref('')
const examOptions = [
    { value: 'US', label: 'Start Of Term' },
    { value: 'CA', label: 'Mid Term Close' },
    { value: 'FR', label: 'End of Terms' },
]
const selectedclass = ref('')
const classOptions = [
    { value: 'F1', label: 'Form One' },
    { value: 'F2', label: 'Form Two' },
    { value: 'F3', label: 'Form Three' },
]
const store = useClassStore();

function activateTab(tabName) {
    activeTab.value = tabName;
    console.log('Activated tab:', tabName);
}

function saveExamInfo() {
  const formData = new FormData();

  if (!store.examInfo || Object.keys(store.examInfo).length === 0) {
    throw new Error("Exam information is missing.");
  }

  formData.append('examinfo', JSON.stringify(store.examInfo));

  // Build classesConfigs array
  const classesConfigs = store.classes.map((cls, i) => {
    if (!cls.subjects || cls.subjects.length === 0) {
      throw new Error(`Class at index ${i} has no subjects.`);
    }

    if (!cls.streams || cls.streams.length === 0) {
      throw new Error(`Class at index ${i} has no streams.`);
    }

    cls.subjects.forEach((subject, j) => {
      if (!subject.subjectDetails) {
        throw new Error(`Subject at index ${j} in class ${i} is missing subjectDetails.`);
      }
    });

    cls.streams.forEach((stream, k) => {
      if (!stream.streamDetails) {
        throw new Error(`Stream at index ${k} in class ${i} is missing streamDetails.`);
      }
    });

    // Attach subject files
    cls.subjects.forEach((subject, j) => {
      if (subject.file instanceof File) {
        formData.append(`classesConfigs_files[${i}][${j}]`, subject.file);
      }
    });

    return {
      id: cls.id,
      class_name: cls.class_name,
      class_code: cls.class_code,
      class_description: cls.class_description,
      created_at: cls.created_at,
      updated_at: cls.updated_at,
      subjects: cls.subjects.map(({ file, ...rest }) => ({ ...rest })),
      streams: cls.streams.map(stream => ({ ...stream }))
    };
  });

  formData.append('classesConfigs', JSON.stringify(classesConfigs));

  api.post('admin/create-exam', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).catch(err => {
    console.error("Upload failed:", err);
  });
}



onMounted(() => {
    getAllSubjects()
})
async function getAllSubjects() {
    const response = await api.get(`/utilities/get-subjects`);
    subjectsData.value = response?.data?.subjects?.data || [];
    console.log(response?.data, "studentsData.value");
}

</script>

<template>
    <div class="overflow-x-auto shadow-md sm:rounded-lg p-10 w-full">
        <div class="mb-4 border-b border-gray-300 dark:border-gray-700">
            <ul class="flex flex-wrap w-full text-sm font-medium text-center border-b border-gray-200 dark:border-gray-700"
                role="tablist">
                <li class="flex-1" role="presentation">
                    <button @click="activateTab('summary')" class="w-full p-4 border-b-2 rounded-t-lg"
                        :class="{ 'border-blue-500 text-blue-600': activeTab === 'summary' }" type="button">
                        Exam Information
                    </button>
                </li>
                <li class="flex-1" role="presentation">
                    <button @click="activateTab('teachers')" class="w-full p-4 border-b-2 rounded-t-lg"
                        :class="{ 'border-blue-500 text-blue-600': activeTab === 'teachers' }" type="button">
                        Target Classes and Subjects
                    </button>
                </li>
                <li class="flex-1" role="presentation">
                    <button @click="activateTab('streams')" class="w-full p-4 border-b-2 rounded-t-lg"
                        :class="{ 'border-blue-500 text-blue-600': activeTab === 'streams' }" type="button">
                        Target Streams
                    </button>
                </li>
            </ul>

            <div class="pt-6">
                <!-- Summary Tab -->
                <div v-if="activeTab === 'summary'" class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div class="grid gap-4 max-w-4xl mx-auto">
                        <div class="bg-gray-100 p-4 rounded-lg space-y-4">
                            <ExamSettingsGen />
                            <!-- Navigation -->
                            <div class="flex justify-between">
                                <button @click="activateTab('teachers')"
                                    class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Next:
                                    Classes & Subjects</button>
                                <button @click="saveExamInfo"
                                    class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Teachers Tab -->
                <div v-if="activeTab === 'teachers'" class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 text-center">

                    <ExamSettingClasses />
                    <div class="mt-4 flex justify-between">
                        <button @click="activateTab('summary')"
                            class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Previous</button>
                        <button @click="activateTab('streams')"
                            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Next: Streams</button>
                    </div>
                </div>

                <!-- Streams Tab -->
                <div v-if="activeTab === 'streams'" class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 text-center">
                    <ExamSettingClassStream />
                    <div class="mt-4 flex justify-between">
                        <button @click="activateTab('teachers')"
                            class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Previous</button>
                        <button @click="saveExamInfo"
                            class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
