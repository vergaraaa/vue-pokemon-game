<template>
  <section v-if="false" class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-3xl">Please wait</h1>
    <h1 class="animate-pulse">Loading pokemons...</h1>
  </section>

  <section class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-5">Who is that pokemon?</h1>

    <!-- POKEMON IMGAE -->
    <PokemonImage />

    <!-- POKEMON OPTIONS -->
    <PokemonOptions />
  </section>
</template>

<script setup lang="ts">
import PokemonImage from '../components/PokemonImage.vue';
import PokemonOptions from '../components/PokemonOptions.vue';
import { usePokemonGame } from '../composables/usePokemonGame';

const { gameStatus } = usePokemonGame();
</script>

<style scoped></style>
