import React from 'react'
import { Box, Image, Center, VStack } from 'native-base'
import Colors from "../styles/colors"
import Buttone from '../components/Buttone'

function NotVerfiyScreen() {
  return (
    <Box flex={1} bg="gray.500" safeAreaTop>
      <Center w="full" h={250}>
        <Image
          source={require("../assets/favicon.png")}
          alt="Logo"
          size="lg"
        />
      </Center>
      <VStack space={6} px={5} alignItems="center">
        <Buttone bg="black" color="white">회원가입</Buttone>
        <Buttone bg="white" color="black">로그인</Buttone>
      </VStack>
    </Box>
  )
}

export default NotVerfiyScreen