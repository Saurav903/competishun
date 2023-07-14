import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import Movie from './Movie';

const Home = () => {
    let details = JSON.parse(localStorage.getItem("details"));
    console.log(details);
    let navigate = useNavigate();

    if(!details){
        return navigate("/login");
    }else {
        return (
            <Box>
                <Movie/>
            </Box>
          )
    }
  
}

export default Home