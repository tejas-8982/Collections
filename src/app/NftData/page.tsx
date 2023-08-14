"use client"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useState,useEffect} from 'react';
import Link from 'next/link';
import styles from '../page.module.css'
type NFTData = {
  collection:number,
  id:string,
  name:number,
  symbol:string,
}

async function listAvailableTokens() {
  console.log('initializing');
  const apiKey = "ba2c6614-394c-44c5-b25b-585508c18501";
  let response = await fetch('https://api.rarible.org/v0.1/collections/all',{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
    },

  });
  let tokenListJSON = await response.json();
  console.log('listing available tokens: ', tokenListJSON);
  return tokenListJSON.collections;
}

export default function BasicTable() {
  const [tokenData,setTokenData] = useState([]);
  useEffect(() =>{
    async function fetchData() {
      const data =  await listAvailableTokens();
      setTokenData(data);
    }
    fetchData();
  },[])
   
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell>collection</TableCell>
            <TableCell >Name</TableCell>
            <TableCell align="right">Symbol</TableCell>
            <TableCell align="right">Blockchain</TableCell>
            <TableCell align="right">Structure</TableCell>
          </TableRow>
        </TableHead>

        <TableBody className={styles.tablebody}>    
          {tokenData?.map((row,key) => (
            <TableRow
              key={row?.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {key+1}
              </TableCell>
              <Link key={row.key} href={`NftData/${row.id}`} passHref className={styles.linkStyle}><TableCell >{row?.name}</TableCell></Link>
              <TableCell align="right">{row?.symbol}</TableCell>
              <TableCell align="right">{row?.blockchain}</TableCell>
              <TableCell align="right">{row?.structure}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}