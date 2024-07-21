import { Loader } from './cardanoClient';

export const mintNFT = async (wallet, metadata) => {
  await Loader.load();

  // Example transaction to mint NFT
  const txBuilder = Loader.TransactionBuilder.new(
    Loader.LinearFee.new(
      Loader.BigNum.from_str('44'), // min_fee_a
      Loader.BigNum.from_str('155381') // min_fee_b
    ),
    Loader.BigNum.from_str('1000000'), // pool deposit
    Loader.BigNum.from_str('5000000'), // key deposit
    Loader.BigNum.from_str('1000000'), // min UTXO value
    5000, // max tx size
    Loader.BigNum.from_str('2000000') // max value size
  );

  const utxos = await wallet.getUtxos();
  utxos.forEach((utxo) => {
    txBuilder.add_input(utxo.output().address(), utxo.input(), utxo.output().amount());
  });

  const changeAddress = Loader.Address.from_bech32(wallet.changeAddress);
  txBuilder.add_change_if_needed(changeAddress);

  const txBody = txBuilder.build();
  const txHash = Loader.hash_transaction(txBody);
  const witnesses = Loader.TransactionWitnessSet.new();
  const vkeyWitnesses = Loader.Vkeywitnesses.new();

  const vkey = wallet.getPublicKey().derive(0).to_raw_key();
  const skey = Loader.PrivateKey.from_bech32(wallet.privateKey);

  const witness = Loader.Vkeywitness.new(
    Loader.Vkey.new(vkey),
    skey.sign(txHash)
  );

  vkeyWitnesses.add(witness);
  witnesses.set_vkeys(vkeyWitnesses);

  const signedTx = Loader.Transaction.new(txBody, witnesses);
  const txHex = signedTx.to_hex();

  // Submit transaction to the network (this part requires an API endpoint for submission)
  const response = await fetch('https://api.cardano.testnet.iohkdev.io/tx/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/cbor' },
    body: Buffer.from(txHex, 'hex')
  });

  if (!response.ok) {
    throw new Error(`Transaction failed: ${response.statusText}`);
  }

  return response.json();
};
