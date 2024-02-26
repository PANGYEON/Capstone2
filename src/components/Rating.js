import { HStack } from 'native-base'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '../styles/colors'
function Rating({value, text}) {
    const size = 8;
    const color = Colors.orange;
  return (
    <HStack space={0.4} mt={1} alignItems="center">
        <FontAwesome name="star" color={color} size={size}/>
    </HStack>
  )
}

export default Rating