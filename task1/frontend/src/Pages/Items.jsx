import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Text, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Items = ({el}) => {
    let details = JSON.parse(localStorage.getItem("details"));
    const navigate = useNavigate();
    const toast = useToast()
    const handlefav = async()=>{
        let value = {
            data:el,
            access:details[2]
        }
        let res = await axios.post("http://localhost:3001/favourite",value);
        console.log(res.data);
        navigate(`/favourite`)
        toast({
            title: "Added to your favourite",
            status: 'success',
            isClosable: true,
          });
    }
    const handlewatch = async()=>{
        let value = {
            data:el,
            access:details[2]
        }
        let res = await axios.post("http://localhost:3001/watchlist",value);
        console.log(res.data);
        toast({
            title: "Added to your watchlist",
            status: 'success',
            isClosable: true,
          });
    }
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} transition={"transform .2s"} _hover={{transform:"scale(1.05)"}}>
        <Card maxW='sm'>
            <CardBody>
                <Image
                src={`https://image.tmdb.org/t/p/w500${el.poster_path}`}
                alt='Green double couch with wooden legs'
                borderRadius='lg'
                verticalAlign={"center"}
                onClick={()=>navigate(`/singlepage/${el.id}`)}
                />
                <Stack mt='6' spacing='3'>
                <Heading size='md'>{el.original_title}</Heading>
                <Text fontSize={"20px"}>
                    Release Date: {el.release_date}
                </Text>
                </Stack>
            </CardBody>
            <CardFooter display={"flex"} justifyContent={"space-around"} alignItems={"center"}>
                <ButtonGroup spacing='5'>
                <Button border={"1px solid grey"} bg="none" onClick={handlefav}>
                    Favourite
                </Button>
                <Button border={"1px solid grey"} bg="none" onClick={handlewatch}>
                    WatchList
                </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    </Box>
  )
}

export default Items