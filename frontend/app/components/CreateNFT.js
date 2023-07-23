import * as React from 'react'
import contractABI from '../../contract-abi.json'

import { usePrepareContractWrite, useContractWrite } from 'wagmi'

const CreateNFT = () => {
  const [tokenURI, setTokenURI] = React.useState('');
  const [price, setPrice] = React.useState('');

  const { config, error } = usePrepareContractWrite({
    address: '0xD9FE224B595F619259d7991ba1e5E16965540e67', 
    abi: contractABI.abi,
    functionName: 'createToken',
    args: [tokenURI, parseInt(price), parseInt(rent), parseInt(leaseDuration)],
    enabled: Boolean(price && rent && leaseDuration),
    value: parseInt('0.1'),
  })

  const { write } = useContractWrite(config)

  const handleSubmit = (e) => {
    e.preventDefault();
    // Appeler la fonction write pour mint le NFT
    if (write) {
      write().then((receipt) => {
        console.log('Transaction successful:', receipt)
      }).catch((err) => {
        console.error('Transaction failed:', err)
      })
    }
  }


  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="tokenURI">Token URI</label>
      <input id="tokenURI" value={tokenURI} onChange={(e) => setTokenURI(e.target.value)} placeholder="Token URI" />

      <label htmlFor="price">Price</label>
      <input id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />

      <label htmlFor="rent">Rent</label>
      <input id="rent" value={rent} onChange={(e) => setRent(e.target.value)} placeholder="Rent" />

      <label htmlFor="leaseDuration">Lease Duration</label>
      <input id="leaseDuration" value={leaseDuration} onChange={(e) => setLeaseDuration(e.target.value)} placeholder="Lease Duration" />

      <button type="submit" disabled={!write}>Mint</button>
      {error && (
        <div>An error occurred preparing the transaction: {error.message}</div>
      )}
    </form>
  )
}

export default CreateNFT