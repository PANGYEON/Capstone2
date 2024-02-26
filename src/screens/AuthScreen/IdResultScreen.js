import React from 'react'
import { Box, Heading, Button, Text } from 'native-base'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

//아이디 찾기의 결과를 보여주는 화면
function IdResultScreen({ route, navigation }) {
  const { foundID } = route.params;
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView backgroundColor="white" flex={1} alignItems="center" justifyContent="center">
          <Text mb={5} fontSize={20}>가입하신 이메일 입니다.</Text>
          <Heading fontSize={25}>{foundID[0]}</Heading>
          <Box h={5} />
          <Button
            my={30}
            w="40%"
            rounded={5}
            backgroundColor="black"
            onPress={() => navigation.navigate("Login")}
          >
            로그인
          </Button>
          <Button
            w="40%"
            rounded={5}
            backgroundColor="black"
            onPress={() => navigation.navigate("PW_Search")}
          >
            비밀번호 찾기
          </Button>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  )
}

export default IdResultScreen