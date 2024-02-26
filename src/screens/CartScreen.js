import React from 'react'
import { Box, Center, ScrollView, Text, View } from 'native-base'
import Colors from '../styles/colors'
import CartEmpty from '../components/CartEmpty'
import CartItems from '../components/CartItems'

function CartScreen() {
  return (
    <Box flex={1} safeAreaTop bg={Colors.subGreen}>

      <Center w="full" py={5}>
        <Text color={Colors.black} fontSize={20} bold>
          장바구니
        </Text>
      </Center>
      {/* <CartEmpty /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <CartItems /> */}
      </ScrollView>
    </Box>
  )
}

export default CartScreen