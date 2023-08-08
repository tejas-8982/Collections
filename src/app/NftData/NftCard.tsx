import { useEffect, useState } from 'react'
import styles from '../page.module.css'
import Axios from 'axios';

const NftCard = (props:any) => {
    const [listOfNft,setListOfNft] = useState([]);
    useEffect(() =>{
        async function fetchData() {
            Axios.get(`https://api.rarible.org/v0.1/items/byCollection?collection=${props.id}`).then((res) =>{
                setListOfNft(res.data);
            })
        }
        fetchData();
    },[])
  return (
    <div>
        {
            listOfNft.map((currNft,key) =>(
        <div className={styles.card}>
        <div className={styles.img}>
                
      </div>
      </div>
            ))
        }
    </div>
  )
}

export default NftCard
