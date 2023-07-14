
import { Box } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom';
import Movie from './Movie';

const Home = () => {
    let details = JSON.parse(localStorage.getItem("details"));
    console.log(details);

    return (
        <Box>
            {!details ? <Navigate to="/login" /> : <Movie/>}
        </Box>
      )
  
}

export default Home