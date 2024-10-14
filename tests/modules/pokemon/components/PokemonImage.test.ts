import { mount } from '@vue/test-utils';
import PokemonImage from '@/modules/pokemon/components/PokemonImage.vue';

describe('<PokemonImage />', () => {
  test('should render the hidden image when showPokemon props is false', () => {
    const pokemonId = 25;
    const imgSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;

    const wrapper = mount(PokemonImage, {
      props: { pokemonId, showPokemon: false },
    });

    const image = wrapper.find('img');
    const attributes = image.attributes();

    expect(attributes).toEqual(
      expect.objectContaining({
        class: 'brightness-0 h-[200px]',
        src: imgSource,
      }),
    );
  });

  test('should render the image when showPokemon props is true', () => {
    const pokemonId = 25;
    const imgSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;

    const wrapper = mount(PokemonImage, {
      props: { pokemonId, showPokemon: true },
    });

    const image = wrapper.find('img');
    const attributes = image.attributes();

    expect(attributes).toEqual(
      expect.objectContaining({
        class: 'h-[200px] fade-in',
        src: imgSource,
      }),
    );
  });
});
