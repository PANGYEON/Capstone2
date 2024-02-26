import React from 'react'
import { SwipeListView } from 'react-native-swipe-list-view'
import { Image, Box, Text, Center, HStack, Pressable } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'

import Colors from '../styles/colors'
import products from '../data/Products'

const Swiper = () => (
    <SwipeListView
        rightOpenValue={-50}
        previewRowKey={0}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        data={products.slice(0, 2)}
        renderHiddenItem={renderHiddenItems}
        renderItem={renderItems}
        showVerticalScrollIndicator={false}             
    />
)

const renderItems = (data) => {
    <Pressable>
        <Box ml={6} mb={3}>
            <HStack
                alignItems="center"
                bg={Colors.white}
                shadow={1}
                rounded={10}
                overflow="hidden">
                <Center w="25%" bg={Colors.deepestGray}>
                    <Image
                    source={require("../assets/products/notebook1.jpg")}
                    alt={"notebook"}
                    w="full"
                    h={24}

                    />

                </Center>
            </HStack>
        </Box>
    </Pressable>
}

const renderHiddenItems = () => {
    <Pressable
        w={50}
        roundedTopRight={10}
        roundedBottomRight={10}
        h="88%"
        ml="auto"
        justifyContent="center"
        bg={Colors.red}
    >
        <Center alignItems="center" space={2}>
            <FontAwesome name="trash" size={24} color={Colors.white} />
        </Center>
    </Pressable>
}
const CartItems = () => {
    return (
        <Box mr={6}>
            <Swiper />            
        </Box>
    )
}

export default CartItems