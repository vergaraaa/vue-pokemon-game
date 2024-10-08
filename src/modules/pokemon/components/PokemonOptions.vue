<template>
  <section class="mt-5 flex flex-col">
    <button
      @click="$emit('selectedOption', id)"
      v-for="{ id, name } in options"
      :key="id"
      :class="[
        'capitalize disabled:shadow-none disabled:bg-gray-100',
        {
          correct: blockSelection && id === correctAnswer,
          incorrect: blockSelection && id !== correctAnswer,
        },
      ]"
      :disabled="blockSelection"
    >
      {{ name }}
    </button>
  </section>
</template>

<script setup lang="ts">
import type { Pokemon } from '../interfaces';

interface Props {
  correctAnswer: number;
  options: Pokemon[];
  blockSelection: boolean;
}

defineProps<Props>();

defineEmits<{
  selectedOption: [id: number];
}>();
</script>

<style scoped>
button {
  @apply bg-white shadow-md rounded-lg p-3 m-2 w-40 text-center transition-all hover:bg-gray-100;
}

.correct {
  @apply bg-blue-500 text-white;
}

.incorrect {
  @apply bg-red-400 opacity-70;
}
</style>
