import { mintNFT } from '../../utils/mintNFT';
import { generateWallet } from '../../utils/wallet';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { metadata } = req.body;
    const wallet = await generateWallet();

    try {
      const result = await mintNFT(wallet, metadata);
      res.status(200).json({ result, wallet });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
