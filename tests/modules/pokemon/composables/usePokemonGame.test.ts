import { flushPromises } from '@vue/test-utils';
import MockAdapter from 'axios-mock-adapter';

import { withSetup } from '../../../utils/with-setup';
import { GameStatus } from '@/modules/pokemon/interfaces';
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { pokemonsListFake } from '../../../data/fake-pokemons';

const mockPokemonApi = new MockAdapter(pokemonApi);

mockPokemonApi.onGet('?limit=151&offset=0').reply(200, {
  results: pokemonsListFake,
});

describe('usePokemonGame', () => {
  test('should initialize with correct default values', async () => {
    const [results, app] = withSetup(usePokemonGame);

    expect(results.gameStatus.value).toBe(GameStatus.Playing);
    expect(results.loading.value).toBe(true);
    expect(results.pokemonOptions.value).toEqual([]);
    expect(results.randomPokemon.value).toBe(undefined);

    await flushPromises();

    expect(results.loading.value).toBe(false);
    expect(results.pokemonOptions.value.length).toBe(4);
    expect(results.randomPokemon.value).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    });
  });
});
