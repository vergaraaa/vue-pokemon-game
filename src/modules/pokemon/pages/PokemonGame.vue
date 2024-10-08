<template>
  <section
    v-if="loading || randomPokemon.id === null"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Please wait</h1>
    <h1 class="animate-pulse">Loading pokemons...</h1>
  </section>

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-5">Who is that pokemon?</h1>

    <div class="h-20">
      <button
        v-if="gameStatus !== GameStatus.Playing"
        @click="getNextRound()"
        class="bg-blue-500 transition-allresa p-2 rounded-md text-white hover:bg-blue-800"
      >
        Play again
      </button>
    </div>

    <!-- POKEMON IMGAE -->
    <PokemonImage
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />

    <!-- POKEMON OPTIONS -->
    <PokemonOptions
      :correct-answer="randomPokemon.id"
      :options="pokemonOptions"
      :block-selection="gameStatus !== GameStatus.Playing"
      @selected-option="checkAnswer"
    />
  </section>
</template>

<script setup lang="ts">
import PokemonImage from '../components/PokemonImage.vue';
import PokemonOptions from '../components/PokemonOptions.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const { gameStatus, randomPokemon, pokemonOptions, loading, checkAnswer, getNextRound } =
  usePokemonGame();
</script>

<style scoped></style>
