import React from 'react'
import { Box, Image, Flex, Pressable, ScrollView, Text, Heading } from 'native-base'
import products from '../data/Products'
import Colors from '../styles/colors'
import Rating from './Rating'


function HomeProduct() {
  return (
    <ScrollView flex={1} showsHorizontalScrollIndicator={false}>
      <Flex
        flexWrap="wrap"
        direction="row"
        justifyContent="space-between"
        px={6}
      >
        {products.map((product) => (
          <Pressable
            key={product._id}
            w="47%"
            bg={Colors.white}
            rounded="md"
            shadow={2}
            pt={0.3}
            my={3}
            pb={2}
            overflow="hidden"
          >
            <Image
              source={require("../assets/products/basketball1.jpeg")}
              alt={product.name}
              w="full"
              h={24}
              resizeMode="contain"
            />
            <Box px={4} pt={1}>
              <Heading size="sm" bold>
                {product.price}
              </Heading>
              <Text
                fontSize={12}
                mt={1}
                isTruncated
                w="full">
                {product.name}
              </Text>
              {/* <Rating /> */}
            </Box>
          </Pressable>
        ))}

      </Flex>
    </ScrollView>
  )
}
export default HomeProduct