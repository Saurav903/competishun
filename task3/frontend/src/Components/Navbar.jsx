import { Avatar, Box, Button, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    let details = JSON.parse(localStorage.getItem("details"));
    const handleDelete = ()=>{
        localStorage.clear();
        navigate("/login");
      }
  return (
    <>
        <Box position={"fixed"} w="100%" zIndex={"1"} backgroundColor={"blue.900"} height={"75px"} display={"flex"} justifyContent={"space-around"} alignItems={"center"} boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"} >
            <Heading p={"20px"} color={"white"} textDecoration={"underline overline"} textUnderlineOffset={"8px"}>Movie App</Heading>


            <Box w="35%" display={"flex"} justifyContent={"space-around"} alignItems={"center"}>
                <Button bg="none" border={"1px solid white"} color={"white"} _hover={{bg:"gray.400",color:"black"}} onClick={()=>navigate("/")}>Recipe</Button>
                <Button bg="none" border={"1px solid white"} color={"white"} _hover={{bg:"gray.400",color:"black"}} onClick={()=>navigate("/calorie")}>Calorie</Button>
                <Button bg="none" border={"1px solid white"} color={"white"} _hover={{bg:"gray.400",color:"black"}} onClick={()=>navigate("/diet")}>Diet</Button>
                <Button bg="none" border={"1px solid white"} color={"white"} _hover={{bg:"gray.400",color:"black"}} onClick={handleDelete}>Logout</Button>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} w="16%">
                <Text color={"white"}>{details[2]}</Text>
                <Avatar src={details[3]} alt={details[1]}/>
            </Box>
        </Box>
    </>
  )
}

export default Navbar