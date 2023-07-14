import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Heading, Input, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Items from './Items';
import { useNavigate } from 'react-router-dom';
import style from "../css/navbar.module.css"
import { FaBars } from "react-icons/fa";
import { AiOutlineDown } from "react-icons/ai";
const Movie = () => {
    const [data,setData] = useState([]);
    const [page,setPage] = useState(1);
    const [search,setSearch] = useState("");
    const [cuType,setCuType] = useState("Indian");
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()
    let details = JSON.parse(localStorage.getItem("details"));
  const getData = async(page,search,cuType)=>{
    if(search==""){
      let res = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&app_id=e22a45ca&app_key=241e9ff308c8c78227db3224ead0f9a7&cuisineType=${cuType}&from=0&to=5`);
      setData(res.data);
    }else{
      let res = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&app_id=e22a45ca&app_key=241e9ff308c8c78227db3224ead0f9a7&cuisineType=${cuType}&q=${search}&from=0&to=5`);
    setData(res.data);
    }
    
  }
  const handleChanges = (e)=>{
    setTimeout(()=>{
      setSearch(e.target.value)
    },2000)
  }
  const handleDelete = ()=>{
    localStorage.clear();
    navigate("/login");
  }
  const handleClick = () => {
    onOpen()
  }
  useEffect(()=>{
    getData(page,search,cuType)
  },[page,search,cuType]);

  console.log(data);
  return (
    <>
      <Box className={style.mainnav}>
        <Box className={style.mainnavfix}>
            <Button
              onClick={() => handleClick()}
              key={"full"}
              m={4}
              display={{sm:"block",lg:"none"}}
              bg="none"
              border={"1px solid white"}
            ><FaBars color='white'/></Button>
            <Heading p={"20px"} color={"white"} textDecoration={"underline overline"} textUnderlineOffset={"8px"} textAlign={{sm:"center"}}>Recipe App</Heading>

            <Input type="text" placeholder='Search Recipe' htmlSize={"30"} width='auto' bg={"white"} onChange={handleChanges} display={{sm:"none",lg:"block"}}/>


            <Box className={style.navbutton} display={{sm:"none",lg:"flex"}}>
                <Button onClick={()=>navigate("/")}>Recipe</Button>
                <Button onClick={()=>navigate("/calorie")}>Calorie</Button>
                <Button onClick={()=>navigate("/diet")}>Diet</Button>
                <Button onClick={handleDelete}>Logout</Button>
            </Box>
            <Box className={style.emailName} display={{sm:"none",lg:"flex"}}>
                <Text color={"white"}>{details[2]}</Text>
                <Avatar src={details[3]} alt={details[1]}/>
            </Box>
        </Box>
        <Box pt="100px" paddingLeft={"20px"}>
          <Menu>
            <MenuButton as={Button} rightIcon={<AiOutlineDown />}>
              Curise Type: {cuType}
            </MenuButton>
            <MenuList onClick={(e)=>setCuType(e.target.value)}>
              <MenuItem value={"Indian"}>Indian</MenuItem>
              <MenuItem value={"Chinese"}>Chinese</MenuItem>
              <MenuItem value={"French"}>French</MenuItem>
              <MenuItem value={"Mexican"}>Mexican</MenuItem>
              <MenuItem value={"Asian"}>Asian</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Box pt="50px" w="95%" margin={"auto"} display={"grid"} gridTemplateColumns={{sm:"repeat(1,1fr)",md:"repeat(2,1fr)",lg:"repeat(3,1fr)"}} gap="30px">
            {data.hits?.map((el,i)=>(
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
            <DrawerHeader textAlign={"center"} fontSize={"30px"} textDecoration={"underline overline"} textUnderlineOffset={"8px"}>{`Recipe App`}</DrawerHeader>
            <DrawerBody>
              <Box display={"grid"} justifyContent={"center"} alignItems={"center"} gap="30px">
                  <Box display={"flex"} justifyContent={"center"}>
                  <Avatar src={details[3]} alt={details[1]} size='2xl'/>
                  </Box>
                  <Text color={"balck"} fontSize={"20px"}>{details[2]}</Text>
              </Box>
              <Input mt="50px" type="text" placeholder='Search Recipe' bg={"white"} onChange={(e)=>setSearch(e.target.value)}/>
              <Box w="100%" mt="50px" display={"flex"} justifyContent={"space-around"}>
                  <Button onClick={()=>navigate("/")}>Recipe</Button>
                  <Button onClick={()=>navigate("/calorie")}>Calorie</Button>
                  <Button onClick={()=>navigate("/diet")}>Diet</Button>
                  <Button onClick={handleDelete}>Logout</Button>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
    </Box>  
    </>
  )
}

export default Movie