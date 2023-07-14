import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Heading, Input, Text, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Items from './Items';
import { useNavigate } from 'react-router-dom';
import style from "../css/navbar.module.css"
import { FaBars } from "react-icons/fa";
const Hotels = () => {
    const [data,setData] = useState([]);
    const [page,setPage] = useState(1);
    const [search,setSearch] = useState("");
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()
    let details = JSON.parse(localStorage.getItem("details"));
  const getData = async(page,search)=>{
    if(search===""){
        let res = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=2a4603c2f8e8f6c24e8db5289c101280&page=${page}&query=${search}`);
    setData(res.data);
    }else {
        let res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=2a4603c2f8e8f6c24e8db5289c101280&page=${page}&query=${search}`);
    setData(res.data);
    }
  }
  const handleDelete = ()=>{
    localStorage.clear();
    navigate("/login");
  }
  const handleClick = () => {
    onOpen()
  }
  useEffect(()=>{
    getData(page,search)
  },[page,search]);

  console.log(data);
  return (
    <>
      <Box className={style.mainnav} >
        <Box className={style.mainnavfix}>
            <Button
              onClick={() => handleClick()}
              key={"full"}
              m={4}
              display={{sm:"block",lg:"none"}}
              bg="none"
              border={"1px solid white"}
            ><FaBars color='white'/></Button>
            <Heading p={"20px"} color={"white"} textDecoration={"underline overline"} textUnderlineOffset={"8px"} textAlign={{sm:"center"}}>Hotel App</Heading>

            <Input type="text" placeholder='Search hotels' htmlSize={"30"} width='auto' bg={"white"} onChange={(e)=>setSearch(e.target.value)} display={{sm:"none",lg:"block"}}/>


            <Box className={style.emailName} display={{sm:"none",lg:"flex"}} >
                <Text color={"white"}>{details[2]}</Text>
                <Avatar src={details[3]} alt={details[1]}/>
            </Box>
            <Box className={style.navbutton} display={{sm:"none",lg:"flex"}} >
                <Button onClick={handleDelete}>Logout</Button>
            </Box>
        </Box>
        <Box pt="100px" w="95%" margin={"auto"} display={"grid"} gridTemplateColumns={{sm:"repeat(1,1fr)",md:"repeat(2,1fr)",lg:"repeat(3,1fr)"}} gap="30px">
            {data.results?.map((el,i)=>(
                <Items key={i} el={el}/>
            ))}   
        </Box>
        <Box display={"flex"} justifyContent={"space-around"} alignItems={"center"}  w="30%" margin="auto" mt="30px">
            <Button isDisabled={page===1} onClick={()=>setPage(page-1)}>Prev</Button>
            <Button>{page}</Button>
            <Button isDisabled={data.total_results===page} onClick={()=>setPage(page+1)}>Next</Button>
        </Box>
    </Box>
    <Box>
      <Drawer onClose={onClose} isOpen={isOpen} size={'full'} placement='top'>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader textAlign={"center"} fontSize={"30px"} textDecoration={"underline overline"} textUnderlineOffset={"8px"}>{`Movie App`}</DrawerHeader>
            <DrawerBody>
              <Box display={"grid"} justifyContent={"center"} alignItems={"center"} gap="30px">
                  <Box display={"flex"} justifyContent={"center"}>
                  <Avatar src={details[3]} alt={details[1]} size='2xl'/>
                  </Box>
                  <Text color={"balck"} fontSize={"20px"}>{details[2]}</Text>
              </Box>
              <Input mt="50px" type="text" placeholder='Search movies' bg={"white"} onChange={(e)=>setSearch(e.target.value)}/>
              <Box w="100%" mt="50px" display={"flex"} justifyContent={"space-around"}>
                  <Button onClick={()=>navigate("/")}>Movies</Button>
                  <Button onClick={handleDelete}>Logout</Button>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
    </Box>  
    </>
  )
}

export default Hotels;