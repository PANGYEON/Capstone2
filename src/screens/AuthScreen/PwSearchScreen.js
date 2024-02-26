import { View, Button, Heading, IconButton, Input, VStack, Icon, Text } from "native-base";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

//이메일 형식 정규식
const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

const emailCheck = (username) => {
  return emailRegEx.test(username);
}

function PwSearchScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  //비밀번호 찾는 함수
  const handleResetPassword = async () => {
    
    try {
      await sendPasswordResetEmail(getAuth(), email);
      navigation.navigate('PW_Result');
      // 여기에서 이메일이 전송되었음을 알리는 알림 또는 화면 전환 등을 수행
    } catch (error) {      
      console.log(error); 
      // 오류가 발생했을 때 적절한 처리를 수행
    }
  };

  //화면 렌더링
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView backgroundColor="white" flex={1}>
          <View flex={1}>
            <View flexDirection="row" alignItems="center">
              <IconButton
                backgroundColor="none"
                icon={
                  <Icon
                    as={MaterialIcons}
                    name="keyboard-backspace"
                    size="7"
                    color="black"
                  />
                }
                onPress={() => navigation.pop()}
              />
            </View>
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss();
              }}
            >
              <View flex={1} bg="white">
                <View
                  w="full"
                  h="full"
                  position="absolute"
                  top="0"
                  px="6"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Heading>비밀번호 찾기</Heading>
                  <VStack space={2} pt="6">
                    <Text>이메일</Text>
                    <Input
                      value={email}
                      onChangeText={(value) => setEmail(value)}
                      InputRightElement={
                        text.length > 0 ? (
                          <IconButton
                            backgroundColor="none"
                            onChangeText={
                              value => setData({ ...formData, name: value })
                            }
                            icon={
                              <MaterialIcons name="close" size={20} color="black" />
                            }
                            onPress={() => setEmail("")}
                          />
                        ) : null
                      }
                      variant="outline"
                      placeholder="이메일"
                      pl={2}
                      w="80%"
                      borderColor={(email.length == 0 || emailCheck(email) ? "gray.300" : "red.600")}
                      borderWidth={2}
                      _focus={{
                        backgroundColor: "none",
                        borderColor: email.length == 0 || emailCheck(email) ? "black" : "red.600",
                      }}
                    />
                    {email.length == 0 || emailCheck(email) ? null : <Text fontSize={12} color="red.600">이메일 형식이 맞지 않습니다.</Text>}
                  </VStack>
                  <Button
                    my={30}
                    w="40%"
                    rounded={5}
                    backgroundColor={(emailCheck(email)) ? "black" : "gray.400"}
                    disabled={(!emailCheck(email))}
                    onPress={handleResetPassword}
                  >
                    비밀번호 찾기
                  </Button>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

export default PwSearchScreen;
