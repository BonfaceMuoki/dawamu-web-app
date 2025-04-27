<script setup>
import { ref, onMounted } from 'vue';
import Datatable from '../components/Datatable.vue';
import api from '../api';
import { useRouter } from 'vue-router';
const props = defineProps({
    classId: { type: Number, default: () => 0 }
});

const apiData = ref([]);
const totalPages = ref(0);
const currentPage = ref(1);
const itemsPerPage = ref(3);
const search = ref('');

const columns = ref([
  { label: 'Subject Name', key: 'subject_name' },
  { label: 'Class Name', key: 'class_name' },
  { label: 'Date Created', key: 'created_at' }
]);
const navigate = useRouter();
const loadClasses = async () => {
  try {
    const response = await api.get(`/utilities/get-subjects-by-class/${props.classId}?page=${currentPage.value}&perPage=${itemsPerPage.value}&search=${search.value}`);
    apiData.value = response?.data?.subjects?.data || [];
    totalPages.value = Math.ceil(response?.data?.subjects?.total / response?.data?.subjects?.per_page);
  } catch (error) {
    console.error("Error loading classes:", error);
  }
};

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

onMounted(() => {
  loadClasses();
});

</script>

<template>
    <div class="w-full grid grid-cols-1 gap-6 p-4">
      <Datatable
        :data="apiData"
        :columns="columns"
        :totalPages="totalPages"
        :currentPage="currentPage"
        :itemsPerPage="itemsPerPage"
        @update:currentPage="fetchPage"
        @update:itemsPerPage="changeItemsPerPage"
        @search="searchApi"
      >
        <template #actions="{ row }">
          <div class="flex gap-2">
            <button @click="editRow(row)" class="text-green-600 hover:underline">Edit</button>
            <button @click="deleteRow(row)" class="text-red-600 hover:underline">Delete</button>
          </div>
        </template>
      </Datatable>
    </div>
  </template>
  