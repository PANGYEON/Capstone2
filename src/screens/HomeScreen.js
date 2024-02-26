import { Text, Box } from 'native-base'
import React from 'react'
import HomeProduct from '../components/HomeProduct'
import HomeSearch from '../components/HomeSearch'

function HomeScreen() {
  return (
    <Box flex={1} bg="green.100">
        <HomeSearch />
        <HomeProduct />
    </Box>
  )
}

export default HomeScreen