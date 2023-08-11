"use client"
import styles from '../../page.module.css'
import {useState,useEffect} from "react";
import Axios from "axios";
import NftCard from '../NftCard';
export default function NftPage({params}:any){
    const [collectionData,setCollectionData] = useState({});
    
    useEffect(() =>{
        async function fetchData() {
            console.log("fetching data");
           Axios.get(`https://api.rarible.org/v0.1/collections/${params.id}`).then((res) =>{
                setCollectionData(res.data);
           }) 
        }
        fetchData();
    },[])
    return(
        <div>
            
            <div className={styles.bg}>
            <img src={collectionData.meta?.content[0]?.url} alt={collectionData.name} />

            </div>
           <div className={styles.container}>
            <h2 >{collectionData.name}</h2>
            <div>
                <p>owner:{collectionData.owner}</p>
            </div>
            <div className={styles.des}>
                <p>{collectionData.meta?.description}</p>  
            </div>

            </div>
           <NftCard tokenId={collectionData.id}/>
        </div>
    );
}