import { Button, Heading, HStack, IconButton, Input, Text, View, VStack, useToast } from "native-base";
import React, { useState } from 'react'
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../../../firebaseConfig";

function LoginScreen({ navigation }) {
  const [show, setShow] = React.useState(false);
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/

  const emailCheck = (username) => {
    return emailRegEx.test(username);
  }

  const passwordCheck = (password) => {
    return passwordRegEx.test(password);
  }

  const handleClick = () => setShow(!show);
  const validate = () => {
    if (formData.name === undefined) {
      setErrors({ ...errors, name: "Name is required" });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({ ...errors, name: "Name is too short" });
      return false;
    }

    return true;
  };

  const handleLogin = () => {
    if (!email || !password) {
      toast.show({
        duration: 2000,
        description: "아이디와 비밀번호를 모두 입력해주세요."
      })
      return;
    }
    // const auth = getAuth();    

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.show({
          duration: 2000,
          description: "환영합니다"
        })
        navigation.navigate("Bottom_Navi");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        toast.show({
          duration: 2000,
          description: "아이디 또는 비밀번호가 일치하지 않습니다."
        })
      });
  };

  const onSubmit = () => {
    validate() ? console.log("Submitted") : console.log("Validation Failed");
  };

  return (
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
          <Heading>로그인</Heading>
          <VStack space={2} pt="6">
            <Text>이메일</Text>
            <Input
              value={email}
              onChangeText={(value) => setEmail(value)}
              InputRightElement={
                email.length > 0 ? (
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
              keyboardType="email-address"
              pl={2}
              w="80%"
              borderWidth={2}
              _focus={{
                backgroundColor: "none",
                borderColor: (email.length == 0 || emailCheck(email) ? "black" : "red.600"),
              }}
            />
            {email.length == 0 || emailCheck(email) ? null : <Text fontSize={12} color="red.600">이메일 형식이 맞지 않습니다.</Text>}
            <Text>비밀번호</Text>
            <Input
              InputRightElement={
                <IconButton
                  backgroundColor="none"
                  icon={
                    show ? (
                      <Ionicons name="eye" size={20} color="grey" />
                    ) : (
                      <Ionicons name="eye-off" size={20} color="grey" />
                    )
                  }
                  onPress={handleClick}
                />
              }
              type={show ? "text" : "password"}
              w="80%"
              py="0"
              placeholder="비밀번호"
              borderWidth={2}
              value={password}
              onChangeText={(value) => setPassword(value)}
              _focus={{
                backgroundColor: "none",
                borderColor: "black",
              }}
            />

          </VStack>
          <Button
            my={30}
            w="80%"
            rounded={5}
            backgroundColor={(email.length > 0 && password.length > 7) ? "black" : "gray.400"}
            disabled={!(email.length > 0 && password.length > 7)}
            onPress={() => { handleLogin(), Keyboard.dismiss() }}
          >
            로그인
          </Button>
          <VStack>
            <HStack space={3}>
              <Text onPress={() => navigation.navigate("ID_Search")}>
                아이디 찾기
              </Text>
              <View height="100%" width={0.5} backgroundColor="#909090"></View>
              <Text onPress={() => navigation.navigate("PW_Search")}>
                비밀번호 찾기
              </Text>
              <View height="100%" width={0.5} backgroundColor="#909090"></View>
              <Text onPress={() => navigation.navigate("Register")}>
                회원가입
              </Text>
            </HStack>
          </VStack>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default LoginScreen;
