import confetti from 'canvas-confetti';
import MockAdapter from 'axios-mock-adapter';
import { flushPromises } from '@vue/test-utils';

import { withSetup } from '../../../utils/with-setup';
import { GameStatus } from '@/modules/pokemon/interfaces';
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi';
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { pokemonsListFake } from '../../../data/fake-pokemons';

const mockPokemonApi = new MockAdapter(pokemonApi);

mockPokemonApi.onGet('?limit=151&offset=0').reply(200, {
  results: pokemonsListFake,
});

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('usePokemonGame', () => {
  test('should initialize with correct default values', async () => {
    const [results] = withSetup(usePokemonGame);

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

  test('should correclty handle getNextRound', async () => {
    const nextRoundCount = 5;
    const [results] = withSetup(usePokemonGame);

    await flushPromises();

    results.gameStatus.value = GameStatus.Won;

    results.getNextRound(nextRoundCount);
    await flushPromises();

    expect(results.gameStatus.value).toBe(GameStatus.Playing);
    expect(results.pokemonOptions.value).toHaveLength(nextRoundCount);
  });

  test('should correclty handle getNextRound and return different pokemons', async () => {
    const nextRoundCount = 4;
    const [results] = withSetup(usePokemonGame);
    results.gameStatus.value = GameStatus.Won;

    await flushPromises();

    const firstOptions = [...results.pokemonOptions.value].map((p) => p.name);

    results.getNextRound(nextRoundCount);

    const secondOptions = [...results.pokemonOptions.value];

    secondOptions.forEach((pokemon) => {
      expect(firstOptions).not.toContain(pokemon.name);
    });
  });

  test('should correctly handle an incorrect answer', async () => {
    const [results] = withSetup(usePokemonGame);
    await flushPromises();

    const { checkAnswer, gameStatus } = results;

    expect(gameStatus.value).toBe(GameStatus.Playing);

    checkAnswer(-1);

    expect(gameStatus.value).toBe(GameStatus.Lost);
  });

  test('should correctly handle a correct answer', async () => {
    const [results] = withSetup(usePokemonGame);
    await flushPromises();

    const { checkAnswer, gameStatus, randomPokemon } = results;

    expect(gameStatus.value).toBe(GameStatus.Playing);

    checkAnswer(randomPokemon.value.id);

    expect(confetti).toHaveBeenCalledWith({
      particleCount: 300,
      spread: 150,
      origin: { y: 0.6 },
    });
    expect(gameStatus.value).toBe(GameStatus.Won);
  });
});
