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

    <!-- POKEMON IMGAE -->
    <PokemonImage
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />

    <!-- POKEMON OPTIONS -->
    <PokemonOptions :options="pokemonOptions" @selected-option="onSelectedOption" />
  </section>
</template>

<script setup lang="ts">
import PokemonImage from '../components/PokemonImage.vue';
import PokemonOptions from '../components/PokemonOptions.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const { gameStatus, randomPokemon, pokemonOptions, loading } = usePokemonGame();

const onSelectedOption = (id: number) => {
  console.log(id);
};
</script>

<style scoped></style>
