import { computed, onMounted, ref } from 'vue';
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces';
import { pokemonApi } from '../api/pokemonApi';
import confetti from 'canvas-confetti';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);
  const pokemons = ref<Pokemon[]>([]);
  const pokemonOptions = ref<Pokemon[]>([]);

  const randomPokemon = computed(() => {
    const randomIndex = Math.floor(Math.random() * pokemonOptions.value.length);
    return pokemonOptions.value[randomIndex];
  });
  const loading = computed(() => pokemons.value.length === 0);

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>(`?limit=151&offset=0`);

    const pokemonsArray: Pokemon[] = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/');
      const id = urlParts[urlParts.length - 2] ?? 0;

      return {
        name: pokemon.name,
        id: +id,
      };
    });

    return pokemonsArray.sort(() => Math.random() - 0.5);
  };

  const getNextOptions = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing;
    pokemonOptions.value = pokemons.value.slice(0, howMany);
    pokemons.value = pokemons.value.slice(howMany);
  };

  const checkAnswer = (id: number) => {
    const hasWon = id === randomPokemon.value.id;
    if (hasWon) {
      gameStatus.value = GameStatus.Won;
      confetti({
        particleCount: 300,
        spread: 150,
        origin: { y: 0.6 },
      });
      return;
    }

    gameStatus.value = GameStatus.Lost;
  };

  onMounted(async () => {
    pokemons.value = await getPokemons();
    getNextOptions();
  });

  return {
    gameStatus,
    loading,
    randomPokemon,
    pokemonOptions,

    // Methods
    getNextOptions,
    checkAnswer,
  };
};
