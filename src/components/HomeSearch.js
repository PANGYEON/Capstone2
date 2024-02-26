import { HStack, Input, Icon, Text, Pressable, Box } from 'native-base'
import React from 'react'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'

function HomeSearch() {
    return (
        <HStack
            space={3}
            w="full"
            px={6}
            bg="gray.500"
            py={4}
            alignItems="center"
            safeAreaTop
        >
            <Input
                placeholder="Search"
                variant="filled"
                w="85%"
                borderRadius="10"
                type="text"
                py="1"
                px="2"
                InputLeftElement={
                    <Icon
                        ml="2"
                        size="4"
                        color="gray.400"
                        as={
                            <Ionicons name="ios-search" />
                        } />
                }
                _focus={{
                    bg: "#ffffff"
                }}
            />
            <Pressable ml={3}>
                <FontAwesome5
                    name="shopping-basket"
                    size={24}
                    color="white"
                />
                <Box
                    px={1}
                    rounded="full"
                    position="absolute"
                    top={-13}
                    left={2}
                    bg="red.500"
                    _text={{
                        color: "#ffffff",
                        fontSize: "11px",
                    }}
                >
                    5
                </Box>
            </Pressable>
        </HStack>
    )
}

export default HomeSearch