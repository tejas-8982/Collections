import { useEffect, useState } from 'react'
import styles from '../page.module.css'


async function listofNft(tokenId:string) {
  const apiKey = "ba2c6614-394c-44c5-b25b-585508c18501";
  const response = await fetch(`https://api.rarible.org/v0.1/items/byCollection?collection=${tokenId}`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
    },
  });
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
  },[tokenId])

  return (
    <div className={styles.container2}>
    <div className={styles.cardContainer}>
      {
        nftList?.map((nft, key) => (
          <div className={styles.card} key={key}>
            <div className={styles.imageContainer}>
              <img src={nft.meta?.content[0]?.url} alt={nft.meta?.name}/>
            </div>
            <div className={styles.metaData}>
            <p>{nft.meta?.name}</p>
            </div>
            
          </div>
        ))
      }
    </div>
  </div>
  )
}

export default NftCard
