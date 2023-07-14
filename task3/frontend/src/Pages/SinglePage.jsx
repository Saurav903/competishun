import { Box, Button, Card, CardBody, CircularProgress, CircularProgressLabel, Heading, Image, Menu, MenuButton, MenuItem, MenuList, Stack, Text, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import 'react-circular-progressbar/dist/styles.css';
import Navbar from '../Components/Navbar';
import { AiOutlineDown } from "react-icons/ai";
const SinglePage = () => {
    const {id} = useParams();
    const [data,setData] = useState({});
    const [cuType,setCuType] = useState("Indian");
    const getData = async(id,cuType)=>{
        let value = Math.floor(id);
        let response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&app_id=e22a45ca&app_key=241e9ff308c8c78227db3224ead0f9a7&cuisineType=${cuType}&calories=${value}&from=0&to=5`);
        setData(response.data);
    }
    
    useEffect(()=>{
        getData(id,cuType);
    },[id,cuType]);
    console.log(data);
  return (
    <Box>
        <Box>
            <Navbar/>
        </Box>
        <Box pt="100px" paddingLeft={"20px"} bg="blackAlpha.800">
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
        <Box pt="100px" pb="20px" display={"grid"} gridTemplateColumns={"repeat(3,1fr)"}  gap="20px" bg="blackAlpha.800">
        {data.hits?.map((el)=>(
            <Box key={el} display={"flex"} justifyContent={"center"} alignItems={"center"} >
                <Card maxW='sm'>
                <CardBody>
                    <Image
                    src={el.recipe.image}
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                    verticalAlign={"center"}
                    />
                    <Stack mt='6' spacing='3'>
                    <Heading size='sm' textAlign={"center"}>{el.recipe.label}</Heading>
                    <Box display={"flex"} justifyContent={"space-around"}>
                        <Box>
                            <CircularProgress value={Math.round(el.recipe.digest[2].total)} color='green.400'>
                                <CircularProgressLabel>{Math.round(el.recipe.digest[2].total)}%</CircularProgressLabel>
                            </CircularProgress>
                            <label>Protein</label>
                        </Box>
                        <Box>
                            <CircularProgress value={Math.round(el.recipe.digest[0].total)} color='green.400'>
                                <CircularProgressLabel>{Math.round(el.recipe.digest[0].total)}%</CircularProgressLabel>
                            </CircularProgress>
                            <label>Fat</label>
                        </Box>
                    </Box>
                    </Stack>
                </CardBody>
            </Card>
            </Box>
        ))}
        </Box>
    </Box>
  )
}

export default SinglePage