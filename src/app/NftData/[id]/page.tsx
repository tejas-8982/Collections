"use client"
import styles from '../../page.module.css'
import {useState,useEffect} from "react";
import Axios from "axios";
import NftCard from '../NftCard';
import Image from 'next/image';
import Tooltip from '@mui/material/Tooltip';

export default function NftPage({params}:any){
    const [collectionData,setCollectionData] = useState({});
    
    useEffect(() =>{
        async function fetchData() {
            const apiKey = "ba2c6614-394c-44c5-b25b-585508c18501";
            console.log("fetching data");
           Axios.get(`https://api.rarible.org/v0.1/collections/${params.id}`,{
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": apiKey,
              },
           }).then((res) =>{
                setCollectionData(res.data);
           }) 
        }
        fetchData();
    },[])
    return(
        <div>
            
            <div className={styles.bg}>
            {collectionData.meta?.content[0]?.url ? (
    <img src={collectionData.meta.content[0].url} alt={collectionData.name} />
  ) : (
   <Image src="/no_image.png" alt="Picture Not Available" width={20} height={20}/>
  )}
            </div>
           <div className={styles.container}>
            <h2 >{collectionData?.name}</h2>
            <div>
                <p>owner:{collectionData?.owner}</p>
            </div>
            <div className={styles.des}>
                <p>{collectionData.meta?.description}</p>  
            </div>

            </div>
           <NftCard tokenId={collectionData.id}/>
        </div>
    );
}