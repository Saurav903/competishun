import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, CircularProgress, CircularProgressLabel, Divider, Heading, Image, Stack, Text, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Items = ({el}) => {
    let details = JSON.parse(localStorage.getItem("details"));
    const navigate = useNavigate();
    const toast = useToast()
    const handleAlert = ()=>{
        toast({
            title: "Order Placed",
            status: 'success',
            isClosable: true,
          })
    }
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} transition={"transform .2s"} _hover={{transform:"scale(1.05)"}}>
        <Card maxW='sm'>
            <CardBody>
                <Image
                src={el.recipe.image}
                alt='Green double couch with wooden legs'
                borderRadius='lg'
                verticalAlign={"center"}
                onClick={()=>navigate(`/singlepage/${Math.floor(el.recipe.calories)}`)}
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
                <Button onClick={handleAlert}>Order Now</Button>
                </Stack>
            </CardBody>
        </Card>
    </Box>
  )
}

export default Items