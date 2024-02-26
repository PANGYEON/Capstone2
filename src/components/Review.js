import React, { Component, useState } from 'react'
import { Button, Text, Heading, Box, VStack, FormControl, CheckIcon, Select } from 'native-base'
import Colors from '../styles/colors'
import Rating from './Rating';
import Message from './Notifications/Message';

export default function Review() {
    const [service, setService] = useState("");
    return (
        <Box my={9}>
            <Heading
                bold
                fontSize={15}
                mb={2}>
                리뷰
            </Heading>
            <Message
                color={Colors.black}
                bg={Colors.deepestGray}
                bold
                children={"리뷰 없음"} />
            {/* <Box
                p={3}
                bg={Colors.deepestGray}
                mt={5}
                rounded={5}>
                <Heading
                    fontSize={15}
                    color={Colors.black}>
                    User Jik
                </Heading>
                <Rating value={4} />
                <Text mb={2} fontSize={11}>2023년 04월 15일 토요일</Text>
                <Message
                    color={Colors.black}
                    bg={Colors.white}
                    size={12}
                    children={"안녕하세요 반갑습니다"} />
            </Box> */}
            <Box mt={6}>
                <VStack>
                <Heading
                    bold
                    fontSize={15}
                >
                    리뷰 작성
                </Heading>
                    <Button
                        bg={Colors.black}
                        color={Colors.white}
                        mt={3}
                    >
                        리뷰작성
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
}
