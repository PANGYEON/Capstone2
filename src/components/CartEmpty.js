
import { Box, Button, Center, Text, View } from 'native-base'
import Colors from '../styles/colors'
import { FontAwesome } from '@expo/vector-icons'
import Buttone from './Buttone'


const CartEmpty = () => {
  return (
    <Box flex={1}>
      <Center h="90%">
        <Center w={200} h={200} bg={Colors.white} rounded="full">
          <FontAwesome name="shopping-basket" size={64} color={Colors.main} />
        </Center>
        <Text color={Colors.main} bold mt={5}>
          장바구니가 비었습니다.
        </Text>
      </Center>
      <Button          
          rounded={50}
           bg={Colors.black}
           color={Colors.white}>
        쇼핑하러가기
      </Button>
    </Box>
  )
}

export default CartEmpty