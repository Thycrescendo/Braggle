import { Loader } from 'cardano-serialization-lib-browser';

// Initialize the library
const loadCardano = async () => {
  await Loader.load();
};

export { loadCardano, Loader };
