"use client"
import Image from 'next/image';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';

import {useState, useEffect} from 'react';
type NFTData = {
  collection:number,
    id:string,
    name:number,
    symbol:string,
}
 
async function listAvailableTokens() {
    console.log('initializing');
    let response = await fetch('https://api.rarible.org/v0.1/collections/all');
    let tokenListJSON = await response.json();
    console.log('listing available tokens: ', tokenListJSON);
    return tokenListJSON.collections;
  }





export default function TableData() {
    const [tokenData,setTokenData] = useState([]);
    useEffect(() =>{
        async function fetchData() {
            const data =  await listAvailableTokens();
            setTokenData(data);
        }
        fetchData()
    },[]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>collection</TableCell>
            <TableCell >name</TableCell>
            <TableCell >symbol</TableCell>
            <TableCell>chain</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
       
          {tokenData.map((row,key) => (
            <Link key={row.key} href={`NftData/${row.id}`} passHref>
            <TableRow
              key={row.key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            > 
              <TableCell>{key+1}</TableCell>
             <TableCell >{row.name}</TableCell>
              <TableCell align="right" >{row.symbol}</TableCell>
              <TableCell align="right">{row.blockchain}</TableCell>
            
            </TableRow>
            <br/>
            </Link>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}




