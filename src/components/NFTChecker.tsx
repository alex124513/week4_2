import React, { useEffect, useState } from 'react'
import ShowCase from './ShowCase';
import { CONFIG } from '../../config';
import nftABI from '../abis/nftABI.json'
import { useContractRead } from 'wagmi';
export default function NFTChecker({ _Minted, _MaxSupply , _index }: { _Minted: string; _MaxSupply: string; _index:string }) {
    console.log("NFTChecker接收:Minted->", _Minted, "  MaxSupply->", _MaxSupply);
    const [N1, setN1] = useState("");
    const [N2, setN2] = useState("");
    const [N3, setN3] = useState("");
    const [N4, setN4] = useState("");
    const [TempL, setTempL] = useState({id:-1,name:"demo",bgcolor:"GGG",image:"loading"});
    const [tokenData, settokenData] = useState<string>("tokenData_Loading");
    const { data: _tokenData, isError, isLoading } = useContractRead({
        address: CONFIG.NFT_CONTRACT_ADDRESS,
        abi: nftABI,
        functionName: 'tokenURI',
        args: [(_index)],
    })

    useEffect(() => {
        if (_tokenData) { settokenData(_tokenData.toString()) }
    }, [_tokenData]
    )



    const { data: _owner } = useContractRead({
        address: CONFIG.NFT_CONTRACT_ADDRESS,
        abi: nftABI,
        functionName: 'ownerOf',
        args: [(_index)],
    })
    useEffect(() => {
        if (_owner) { setN4(_owner.toString()) }
    }, [_owner]
    )

    console.log(tokenData);
    const CID = tokenData.replace("ipfs://", "");
    console.log(CID);


    async function parseJsonFromCID(cid: string) {
        console.log("parseJsonFromCID接收:",cid);
        try {
            const response = await fetch('https://ipfs.io/ipfs/'+cid);
            console.log("debug0:",response);
            if (!response.ok) {
                throw new Error('抓不到json data');
            }
            const jsonData = await response.json();
            const { name, bgcolor, description, image } = jsonData;
            console.log("debug1:",image);
            const httpsImageUrl = image.replace('ipfs://', 'https://ipfs.io/ipfs/');
            setN1(name);
            setN2(bgcolor);
            setN3(httpsImageUrl.toString());
            return { name, bgcolor, description, image: httpsImageUrl };
        } catch (error) {
            console.error('解不了json:', error);
            return null;
        }
    }

    type ShowCaseData = {
        name: string;
        bgcolor: string;
        image: string;
      };

      let x: ShowCaseData = {
        name: "Example Name",
        bgcolor: "Example Background Color",
        image: "",
      };
      let test = 10;
    parseJsonFromCID(CID).then(data => {
        if (data) {
            // console.log('Name:', data.name);
            // console.log('Background Color:', data.bgcolor);
            // console.log('Description:', data.description);
            // console.log('Image URL:', data.image);
            x.name = data.name;
            x.bgcolor = data.bgcolor;

            x.image = data.image;
            test = 12;
            console.log('parseJsonFromCID準備發送Name:', x.name);
            console.log('parseJsonFromCID準備發送Background Color:', x.bgcolor);
            console.log('parseJsonFromCID準備發送Image URL:', x.image);
        }
        console.log("parseJsonFromCID",x);
    });
    function t(){
        console.log("againname",x.name);
        console.log("againbgcolor",x.bgcolor);
        console.log("againimage",x.image);
        console.log("test",test);
    }
    t();
    return (
        <>
           
            <ShowCase _name={N1} _bgcolor={N2}  _image={N3} _owner={N4}/>
            
        </>
    )
}
