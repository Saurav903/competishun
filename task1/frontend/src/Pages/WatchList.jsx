import { Box, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import ItemsReused from '../Components/ItemsReused'

const WatchList = () => {
  let details = JSON.parse(localStorage.getItem("details"));
  const [datas,setData] = useState([]);
  const getData = async()=>{
    let resp = await axios.get(`https://gleaming-dog-necklace.cyclic.app/watchlist?q=${details[2]}`);
    setData(resp.data);
  }
  useEffect(()=>{
    getData();
  },[]);
  console.log(datas);
  return (
    <>
      <Box>
        <Navbar/>
      </Box>
      <Box>
        <Heading pt="100px" textAlign={"center"}>Watch List</Heading>
      </Box>
      <Box pt="40px" display={"grid"} gridTemplateColumns={"repeat(3,1fr)"} gap="20px">
        {datas?.map((el)=>(
          <ItemsReused key={el.id} el={el.data}/>
        ))}
      </Box>
    </>
  )
}

export default WatchList