<script setup>
import { ref, computed, watch, defineEmits } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
    data: { type: Array, default: () => [] },
    columns: { type: Array, default: () => [] },
    totalPages: { type: Number, default: () => 1 },
    currentPage: { type: Number, default: () => 1 },
    itemsPerPage: { type: Number, default: () => 10 }
});

const emit = defineEmits(['update:currentPage', 'update:itemsPerPage', 'search']);

const searchQuery = ref('');


watch(searchQuery, (val) => {
    emit('search', val);
});


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
</script>

<template>

    <div class="overflow-x-auto shadow-md sm:rounded-lg p-10 w-full">

        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead>
              
                <tr class="bg-white dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                    <th colspan="5" class="p-4">
                        <div class="flex flex-col sm:flex-row justify-between gap-4">
                        
                            <div class="relative w-full max-w-sm">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="search" id="search"
                                    class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search..." v-model="searchQuery" />
                            </div>

                         
                            <div class="flex items-center gap-2">
                                <select id="perPage" :value="itemsPerPage" @change="changePerPage(+$event.target.value)"
                                    class="border p-1 rounded text-sm dark:bg-gray-700 dark:text-white">
                                    <option :value="1">1</option>
                                    <option :value="2">2</option>
                                    <option :value="3">3</option>
                                    <option :value="4">4</option>
                                    <option :value="5">5</option>
                                    <option :value="6">6</option>
                                    <option :value="7">7</option>
                                    <option :value="8">9</option>
                                    <option :value="9">9</option>
                                    <option :value="10">10</option>
                                    <option :value="10">15</option>
                                    <option :value="10">20</option>
                                    <option :value="10">25</option>
                                    <option :value="10">30</option>
                                </select>
                                <label for="perPage" class="text-sm text-gray-600 dark:text-gray-300">Rows per
                                    page:</label>
                            </div>
                        </div>
                    </th>
                </tr>


                <tr
                    class="text-xs bg-gray-200 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b dark:border-gray-700 border-gray-200">


                    <th class="px-6 py-3 text-left uppercase text-xs text-gray-500">
                        {{ columns[0].label }}
                    </th>

                    <th class="px-6 py-3 text-left uppercase text-xs text-gray-500 sm:hidden">
                        Details
                    </th>

                    <template v-for="(col, index) in columns.slice(1)" :key="index">
                        <th class="px-6 py-3 text-left uppercase text-xs text-gray-500 hidden sm:table-cell">
                            {{ col.label }}
                        </th>
                    </template>
                    <th class="px-6 py-3 text-left uppercase text-xs text-gray-500 ">
                        Actions
                    </th>
                </tr>

            </thead>
            <tbody>
                <tr v-for="(dt, index) in props.data" :key="index"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">

                    <td class="px-6 py-4">{{ dt[columns[0].key] }}</td>

                    <td class="px-6 py-4 sm:hidden">
                        <div class="flex flex-col text-sm text-gray-600 dark:text-gray-300">
                            <div v-for="(col, i) in columns.slice(1)" :key="i">
                                <strong>{{ col.label }}:</strong> {{ dt[col.key] }}
                            </div>
                        </div>
                    </td>

                    <template v-for="(col2, index2) in columns.slice(1)" :key="index2">
                        <td class="px-6 py-4 hidden sm:table-cell">
                            {{ dt[col2.key] }}
                        </td>
                    </template>

                    <td class="px-6 py-4 table-cell">
                        <slot name="actions" :row="dt" />
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
                    <button @click="setPage(page)" :class="[
                        'flex items-center justify-center px-3 h-8 leading-tight border',
                        page === currentPage
                            ? 'text-blue-600 border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                            : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    ]">
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

</template>





<style></style>