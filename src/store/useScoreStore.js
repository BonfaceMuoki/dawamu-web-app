import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useScoreStore = defineStore('scoreStore', () => {
  const scoreMap = ref({});

  const formattedScores = computed(() => {
    return Object.entries(scoreMap.value).map(([id, score]) => ({
      id: Number(id),
      score: score || 0
    }));
  });

  function updateScore(id, score) {
    scoreMap.value[id] = score; 
  }

  function getScores() {
    return scoreMap.value;
  }

  function resetScores() {
    scoreMap.value = {};
  }

  return {
    scoreMap,
    formattedScores,
    updateScore,
    resetScores,
    getScores
  };
});
