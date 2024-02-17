import React, { useEffect, useState } from 'react'
import DemoNFT from '../image/demo.png'
import Image from 'next/image'
import { usePrepareContractWrite, useContractWrite, useContractRead } from 'wagmi'
import { CONFIG } from '../../config'
import nftABI from '../abis/nftABI.json'
import NFTChecker from './NFTChecker'

export default function MintCard() {
  const { config } = usePrepareContractWrite({
    address: CONFIG.NFT_CONTRACT_ADDRESS,
    abi: nftABI,
    functionName: 'mintNFT',
    args: [(1)],
  })
  const { write } = useContractWrite(config)

  const [Minted, setMinted] = useState<string>("Loading");
  const { data: _Minted, isError, isLoading } = useContractRead({
    address: CONFIG.NFT_CONTRACT_ADDRESS,
    abi: nftABI,
    functionName: 'Minted',
  })
  useEffect(() => {
    if (_Minted) { setMinted(_Minted.toString()) }
  }, [_Minted]
  )

  const [maxSupply, setmaxSupply] = useState<string>("Loading");
  const { data: _maxSupply } = useContractRead({
    address: CONFIG.NFT_CONTRACT_ADDRESS,
    abi: nftABI,
    functionName: 'maxSupply',
  })
  useEffect(() => {
    if (_maxSupply) { setmaxSupply(_maxSupply.toString()) }
  }, [_maxSupply]
  )
  //setNFTMaxSup(_maxSupply);
  console.log("=================");
  console.log("_Minted :", _Minted);
  console.log("_maxSupply :", _maxSupply);
  console.log("Minted :", Minted);
  console.log("maxSupply :", maxSupply);

  const renderNFTCheckers = () => {
    const nftCheckers = [];
    for (let i = 0; i < parseInt(Minted); i++) {
      nftCheckers.push(<NFTChecker key={i} _Minted={Minted} _MaxSupply={maxSupply} _index={i.toString()} />);
    }
    return nftCheckers;
  };
  return (
    <div className='flex flex-col w-full justify-center items-center py-2 '>
      <div className='flex flex-wrap justify-center ' >
      {renderNFTCheckers()}


      </div>
      <div style={{ flexShrink: 0 }}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          disabled={!write}
          onClick={() => write?.()}
        >
          Mint
        </button>
      </div>
      <h4>Minted : {Minted}</h4>
      <h4>MaxSupply : {maxSupply}</h4>
    </div>

  )
}
