import React from 'react'
import { Button, Text } from 'native-base'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

//아이디 찾기의 결과를 보여주는 화면
function PwResultScreen({ navigation }) {
   return (
      <>
         <SafeAreaProvider>
            <SafeAreaView backgroundColor="white" flex={1} alignItems="center" justifyContent="center">
               <Text mb={1} fontSize={20}>입력하신 이메일의</Text>
               <Text mb={5} fontSize={20}>메일을 확인해 주세요.</Text>
               <Button
                  my={30}
                  w="40%"
                  rounded={5}
                  backgroundColor="black"
                  onPress={() => navigation.navigate("Login")}
               >
                  로그인
               </Button>
            </SafeAreaView>
         </SafeAreaProvider>
      </>
   )
}

export default PwResultScreen