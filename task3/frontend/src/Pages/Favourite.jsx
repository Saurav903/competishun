import { Box, Button, Card, CardBody, CircularProgress, CircularProgressLabel, Heading, Image, Menu, MenuButton, MenuItem, MenuList, Stack } from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from 'react'
import 'react-circular-progressbar/dist/styles.css';
import Navbar from '../Components/Navbar';
import { AiOutlineDown } from "react-icons/ai";

const Favourite = () => {
    const [data,setData] = useState({});
    const [cuType,setCuType] = useState("Indian");
    const [value,setVal] = useState(100);
    const getData = async(value,cuType)=>{
        let response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&app_id=e22a45ca&app_key=241e9ff308c8c78227db3224ead0f9a7&cuisineType=${cuType}&calories=${value}&from=0&to=5`);
        setData(response.data);
    }
    
    useEffect(()=>{
        getData(value,cuType);
    },[value,cuType]);
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
        <Box pt="10px" paddingLeft={"20px"} bg="blackAlpha.800">
          <Menu>
            <MenuButton as={Button} rightIcon={<AiOutlineDown />}>
              Calories Selection: {value}
            </MenuButton>
            <MenuList onClick={(e)=>setVal(e.target.value)}>
              <MenuItem value={"100-300"}>100-300</MenuItem>
              <MenuItem value={"301-500"}>301-500</MenuItem>
              <MenuItem value={"501-600"}>501-600</MenuItem>
              <MenuItem value={"601-700"}>601-700</MenuItem>
              <MenuItem value={"701-800"}>701-800</MenuItem>
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

export default Favourite