import React, { useEffect, useState } from 'react'
import DemoNFT from '../image/demo.png'
import Image from 'next/image'
export default function ShowCase(
    {_name , _bgcolor  , _image , _owner}:{_name: string, _bgcolor:string  , _image:string, _owner:string}
    ) {
    type ImgURLState = string;
    console.log("元件ShowCase接收_name:",_name);
    console.log("元件ShowCase接收_bgcolor:",_bgcolor);
    console.log("元件ShowCase接收_image:",_image);
    console.log("元件ShowCase接收_owner:",_owner);
    const [ImgURL, setImgURL] = useState<ImgURLState>("");

    useEffect(() => {
        if (_image) {setImgURL(_image.toString())}
    }, [_image]
    )
    //<Image src={ImgURL} width={500} height={500} alt={'demoNFT'} className='shadow-lg '></Image>

    function AddressAbbreviation(address:string) {
        if (address && address.length >= 10) {
          const abbreviatedAddress = `${address.substring(0, 6)} ... ${address.substring(address.length - 4)}`;
          return <span>{abbreviatedAddress}</span>;
        }
        return <span>{address}</span>;
      }
    
    const formatOwner = AddressAbbreviation(_owner);
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-2xl bg-gray-400 rounded-xl mx-20 my-10">
            <img src={_image} alt="NFTimage" className="transform hover:scale-150"/>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">編號:{_name}</div>
                <p className="text-gray-700 text-base">
                    持有人:
                    <a className='hover:bg-slate-200' href={`https://goerli.etherscan.io/address/${_owner}`}>{formatOwner }</a>
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">bgcolor:{_bgcolor}</span>

            </div>
        </div>
    )
}
