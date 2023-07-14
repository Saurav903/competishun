import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Favourite from '../Pages/Favourite'
import WatchList from '../Pages/WatchList'
import Login from '../Pages/Login'
import SinglePage from '../Pages/SinglePage'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/favourite' element={<Favourite/>}/>
        <Route path='/watchlist' element={<WatchList/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/singlepage/:id' element={<SinglePage/>}/>
    </Routes>
  )
}

export default AllRoutes