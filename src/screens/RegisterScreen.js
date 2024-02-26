import { Box, Button, Heading, Image, Input, Text, View, VStack } from 'native-base'
import React from 'react'
import Colors from '../styles/colors'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { Alert } from "react-native";
import { signIn, signUp } from 'shopping_app/node_modules/react-native/node_modules/promise/lib/auth.js';
//import firebase from '@react-native-firebase/app';
//import * as firebase from "firebase";
//import "firebase/firestore";
//import Firebase from "../Firebase";
//import firebase from 'firebase'

function RegisterScreen({navigation}) {
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const signUpSubmit = async () => {
        const { email, password } = form;
        const info = { email, password };
        try {
          const { user } = await signUp(info);
          console.log(user);
        } catch (e) {
          Alert.alert("회원가입에 실패하였습니다.");
        }
      };
      const signInSubmit = async () => {
          const { email, password } = form;
          const info = { email, password };
          try {
            const { user } = await signIn(info);
            console.log(user);
          } catch (e) {
            Alert.alert("로그인에 실패하였습니다.");
          }
        };
  return (
    <Box flex={1} bg={Colors.white}>
      {/* <Image flex={1} alt="Logo"
        resizeMode="cover"
        size="lg"
        w="full"
        source={require("../assets/cover.png")}
      /> */}
      <Box
        w="full"
        h="full"
        position="absolute"
        top="0"
        px="6"
        justifyContent="center"
      >
        <Heading>회원가입</Heading>
        <VStack space={8} pt="6">
          <Input
            InputLeftElement={
              <MaterialIcons name="email" size={20} color="black" />
            }
            onChangeText={(email) => this.setState({ email })}
            variant="underlined"
            placeholder="ID"
            pl={2}
            w="70%"
            color={Colors.main}
            borderBottomColor={Colors.underline} />            
          <Input
            InputLeftElement={
              <Ionicons name="eye" size={20} color="black" />
            }
            variant="underlined"
            placeholder="Password"
            pl={2}
            w="70%"
            type="password"
            color={Colors.main}
            borderBottomColor={Colors.underline} />
            <Input
            InputLeftElement={
              <MaterialIcons name="supervised-user-circle" size={20} color="black" />
            }
            variant="underlined"
            placeholder="이름"
            pl={2}
            w="70%"
            color={Colors.main}
            borderBottomColor={Colors.underline} />
            <Input           
            variant="underlined"
            placeholder="닉네임"
            pl={2}
            w="70%"
            color={Colors.main}
            borderBottomColor={Colors.underline} />
            <Input           
            variant="underlined"
            placeholder="생년월일 ex)20230415"
            pl={2}
            w="70%"
            color={Colors.main}
            borderBottomColor={Colors.underline} />
        </VStack>
        <Button          
          my={30} 
          w="40%" 
          rounded={50} 
          onPress={() => navigation.navigate("Login")}        
        >
          회원가입
        </Button>  
      </Box>
    </Box>

  )
}

export default RegisterScreen