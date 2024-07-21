import { useState } from 'react';
import Head from 'next/head';
import Blog from '../src/containers/Blog/Blog';
import Category from '../src/containers/Category/Category';
import CryptoCoins from '../src/containers/CryptoCoins/CryptoCoins';
import Footer from '../src/containers/Footer/Footer';
import GenerationOnlineShopping from '../src/containers/GenerationOnlineShopping/GenerationOnlineShopping';
import Mailing from '../src/containers/Mailing/Mailing';
import MainPage from '../src/containers/MainPage/MainPage';

export default function Home() {
  const [metadata, setMetadata] = useState('');
  const [result, setResult] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/mint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ metadata }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data.result);
      setWallet(data.wallet);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-screen-4xl w-screen-lg m-auto">
      <MainPage />
      <GenerationOnlineShopping />
      <Blog />
      <Category />
      <CryptoCoins />
      <Mailing />
      <Footer />

      <div>
        <h1>Mint NFT on Cardano</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={metadata}
            onChange={(e) => setMetadata(e.target.value)}
            placeholder="Enter NFT Metadata"
            required
          />
          <button type="submit">Mint NFT</button>
        </form>
        {result && (
          <div>
            <h2>NFT Minted!</h2>
            <p>Transaction Result: {JSON.stringify(result)}</p>
            <p>Wallet Address: {wallet.publicKey}</p>
            <p>Wallet Seed: {wallet.privateKey}</p>
          </div>
        )}
        {error && <p>Error: {error}</p>}
      </div>
    </div>
  );
}
