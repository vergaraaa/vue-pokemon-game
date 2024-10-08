import { onMounted, ref } from 'vue';
import { GameStatus, type PokemonListResponse } from '../interfaces';
import { pokemonApi } from '../api/pokemonApi';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing);

  const getPokemons = async () => {
    const res = await pokemonApi.get<PokemonListResponse>(`?limit=151&offset=0`);

    console.log(res.data);
  };

  onMounted(() => {
    getPokemons();
  });

  return {
    gameStatus,
  };
};
