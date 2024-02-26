import { Box, Button, Heading, Image, Input, Pressable, Text, View, VStack } from 'native-base'
import React from 'react'
import Colors from '../styles/colors'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

function LoginScreen({navigation}) {
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
        <Heading>로그인</Heading>
        <VStack space={8} pt="6">
          <Input
            InputLeftElement={
              <MaterialIcons name="email" size={20} color="black" />

            }
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
        </VStack>
        <Button          
          my={30} 
          w="40%" 
          rounded={50} 
                
        >
          로그인
        </Button>
        <Button
          w="40%" 
          rounded={50} 
          onPress={() => navigation.navigate("Register")}

        >
          회원가입
        </Button>   
      </Box>
    </Box>

  );
}

export default LoginScreen;