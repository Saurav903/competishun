
import { Box } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom';
import Hotels from './Hotels';

const Home = () => {
    let details = JSON.parse(localStorage.getItem("details"));
    console.log(details);
    return (
        <Box>
        {!details ? <Navigate to="/login"/>: <Hotels/>}
            
        </Box>
      )
  
}

export default Home