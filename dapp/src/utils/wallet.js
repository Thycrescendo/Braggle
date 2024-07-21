import { Loader } from './cardanoClient';

export const generateWallet = async () => {
  await Loader.load();
  const entropy = Loader.Bip39Entropy.from_bytes(crypto.getRandomValues(new Uint8Array(32)));
  const rootKey = Loader.Bip32PrivateKey.from_bip39_entropy(entropy, '');
  const accountKey = rootKey.derive(0).derive(0);
  const publicKey = accountKey.to_public().to_bech32();
  const privateKey = accountKey.to_bech32();

  return { publicKey, privateKey };
};
