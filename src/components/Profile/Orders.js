import { Text, Box, HStack, Pressable, ScrollView, Button } from 'native-base'
import React from 'react'
import Colors from '../../styles/colors'

const Orders = () => {
    return (
        <Box h="full" bg={Colors.white} pt={5}>
            {/* <ScrollView showsVerticalScrollIndicator={false}>

                <Pressable>
                    <HStack
                        space={4}
                        justifyContent="space-between"
                        alignItems="center"
                        bg={Colors.deepestGray}
                        py={5}
                        px={2}
                    >
                        <Text fontSize={9} color={Colors.blue} isTruncated>
                            3465365334345
                        </Text>
                        <Text fontSize={12} bold color={Colors.black} isTruncated>
                            PAID
                        </Text>
                        <Text fontSize={11} italic color={Colors.blue} isTruncated>
                            Dec 12 2022
                        </Text>
                        <Button px={7} py={1.5} rounded={50} bg={Colors.main}
                            _text={{
                                color: Colors.white
                            }}
                            _pressed={{
                                bg: Colors.main,
                            }}>
                            5,000원
                        </Button>
                    </HStack>
                </Pressable>


                <Pressable>
                    <HStack
                        space={4}
                        justifyContent="space-between"
                        alignItems="center"
                        py={5}
                        px={2}
                    >
                        <Text fontSize={9} color={Colors.blue} isTruncated>
                            3465365334345
                        </Text>
                        <Text fontSize={12} bold color={Colors.black} isTruncated>
                            NOT PAID
                        </Text>
                        <Text fontSize={11} italic color={Colors.blue} isTruncated>
                            Jan 12 2021
                        </Text>
                        <Button
                            px={7}
                            py={1.5}
                            rounded={50}
                            bg={Colors.red}
                            _text={{
                                color: Colors.white
                            }}
                            _pressed={{
                                bg: Colors.red,
                            }}>
                            5,500원
                        </Button>
                    </HStack>
                </Pressable>
            </ScrollView> */}
            <Text>Orders</Text>
        </Box>
    )
}

export default Orders