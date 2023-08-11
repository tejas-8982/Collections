import { useEffect, useState } from 'react'
import styles from '../page.module.css'


async function listofNft(tokenId:string) {
  const response = await fetch(`https://api.rarible.org/v0.1/items/byCollection?collection=${tokenId}`);
  const nftDataJSON = await response.json();
  return nftDataJSON.items; 
}

const NftCard: React.FC = (props:any) => {
  
    const tokenId = props.tokenId;
    console.log(tokenId)
    console.log(typeof tokenId)

  const [nftList,setNftList] = useState<any[]>([]);
  useEffect(() =>{
    async function fetchData() {
      const nftData = await listofNft(tokenId);
      setNftList(nftData);
      console.log(nftList);
    }
    fetchData();
  },[])

  return (
    <div className={styles.container2}>
    <div className={styles.cardContainer}>
      {
        nftList?.map((nft, key) => (
          <div className={styles.card} key={key}>
            <div className={styles.image}>
              
            </div>
          </div>
        ))
      }
    </div>
  </div>
  )
}

export default NftCard
