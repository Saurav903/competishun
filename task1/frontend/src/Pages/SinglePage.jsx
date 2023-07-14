import { Box, Button, Card, CardBody, Heading, Image, Stack, Text, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Navbar from '../Components/Navbar';

const SinglePage = () => {
    const {id} = useParams();
    const [data,setData] = useState({});
    const toast = useToast()
    const getData = async(id)=>{
        let response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=2a4603c2f8e8f6c24e8db5289c101280`);
        setData(response.data);
    }
    const handleAlert = ()=>{
        toast({
            title: "Movie is Playing",
            status: 'success',
            isClosable: true,
          })
    }
    useEffect(()=>{
        getData(id);
    },[id]);
    console.log(data);
  return (
    <Box>
        <Box>
            <Navbar/>
        </Box>
        <Box pt="100px" pb="20px" display={"grid"} justifyContent={"center"} alignItems={"center"} bg="blackAlpha.800">
        <Card maxW='sm'>
            <CardBody>
                <Image
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt=''
                borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                <Heading size='md'>{data.title}</Heading>
                <Text>
                    {data.overview}
                </Text>
                <Text>
                    Release Date: {data.release_date}
                </Text>
                <Box display={"flex"} justifyContent={"space-between"}>
                    {data.genres?.map((el)=>(
                        <Button key={el.id} fontSize={"15px"} bg="none" border={"1px solid gray"}>{el.name}</Button>
                    ))}
                </Box>
                <Text fontSize={"20px"}>Ratings:</Text>
                <Box w="25%" margin={"auto"}>
                 <CircularProgressbar value={data.vote_average} maxValue={10} text={`${data.vote_average * 10}%`} />
                </Box>
                <Button onClick={handleAlert}>Play Now</Button>
                
                </Stack>
            </CardBody>
        </Card>
        </Box>
    </Box>
  )
}

export default SinglePage