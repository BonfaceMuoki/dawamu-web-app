<template>
  <div class="mb-4 border rounded">
    <div class="flex justify-between items-center bg-gray-300 p-3 font-bold">
      <select v-model="classData.class_name" class="bg-white p-2 rounded border" :disabled="!!classData.class_name">
        <option disabled value="">Select Streams You are Targeting</option>
        <option v-for="c in classOptions" :key="c.class_name">{{ c.class_name }}</option>
      </select> 
    </div>

    <div class="grid grid-cols-1 gap-4 items-center p-4 border-b">
      <div class="flex flex-row justify-start gap-2">
        <button
          @click="addStream"
          class="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
        >
          + Stream
        </button>
      </div>

      <div
        v-for="(stream, index) in classData.streams"
        :key="index"
        class="grid grid-cols-5 gap-4 items-center p-4 border-b"
      >
        <select
          v-model="stream.streamDetails"
          class="border p-2 rounded"
          :disabled="!!stream.streamDetails"
          @change="handleStreamChange(index)"
        >
          <option disabled value="">Select Stream</option>
          <option
            v-for="option in streamsOptions"
            :key="option.id"
            :value="option"
          >
            {{ option.stream_name }}
          </option>
        </select>

        <textarea
          placeholder="Stream Instructions"
          class="border p-2 rounded col-span-2"
          v-model="stream.streamNotes"
        ></textarea>

        <button @click="removeStream(index)" class="text-red-600 underline hover:text-red-800">
          Remove Stream
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import { useClassStore } from '../store/classStore';
import api from "../api";

const props = defineProps({
  classData: Object,
  classOptions: Array,
});

const emit = defineEmits(['remove']);
const classStore = useClassStore();
const streamsOptions = ref([]);

const addStream = () => {
  props.classData.streams.push({
    streamDetails: null,
    streamNotes: ''
  });
};

const removeStream = (index) => {
  props.classData.streams.splice(index, 1);
};

const handleStreamChange = (index) => {
  const selected = props.classData.streams[index].streamDetails;
  const duplicate = props.classData.streams.some(
    (s, i) =>
      i !== index &&
      s.streamDetails?.stream_name === selected?.stream_name
  );

  if (duplicate) {
    alert(`The stream "${selected?.stream_name}" is already selected.`);
    props.classData.streams[index].streamDetails = null;
  }
};

const getClassStreamsByClassId = async (classID) => {
  try {
    const response = await api.get(`utilities/get-streams-by-class/${classID}`);
    streamsOptions.value = response?.data?.streams?.data || [];
    console.log("Loaded streams:", streamsOptions.value);
  } catch (err) {
    console.error("Error fetching streams by class:", err);
  }
};

onMounted(() => {
  getClassStreamsByClassId(props.classData?.id || 1);
});
</script>
