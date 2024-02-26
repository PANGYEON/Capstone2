import {
   Text, Box, StatusBar, Center, NativeBaseProvider,
   Icon, IconButton, HStack, Pressable, Spacer, Badge, Flex, VStack,
} from 'native-base'
import React from 'react'
import { SliderBox } from 'react-native-image-slider-box';
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View, } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from './RegisterScreen';
import {Colors } from '../styles/colors';



function sliderTouch(index) {
   alert(index);
}

function AppBar() {
   return <>
      <StatusBar bg="#5A5A5A" barStyle="light-content" />
      <Box safeAreaTop bg="#5A5A5A" />
      <HStack bg="#5A5A5A" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" >
         <HStack alignItems="center">
            <Text px="5" color="white" fontSize="20" fontWeight="bold">
               Title
            </Text>
         </HStack>
         <HStack>
            <IconButton icon={<Icon as={MaterialIcons} name="search" size="7" color="white" />} />

         </HStack>
      </HStack>
   </>
}

function SildeImage() {
   return (
      <View>
         <SliderBox
            sliderBoxHeight={250}
            images={[
               "https://source.unsplash.com/1024x768/?nature",
               "https://source.unsplash.com/1024x768/?water",
               "https://source.unsplash.com/1024x768/?tree",
            ]}
            onCurrentImagePressed={
               index => {
                  console.log('image pressed index : ' + index);
                  sliderTouch(index);
               }
            }
            autoplay
            circleLoop />
      </View>
   )
}

function MainScreen() {
   return (
      <>
         <AppBar />
         <SildeImage />
         <NativeBaseProvider>
            <Center margin="10">
               <VStack space="3">
               <HStack space="3">
                  <Pressable >
                     {({isHovered, isPressed}) => {
                        return <Box bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"}
                           style={{
                              transform: [{
                                 scale: isPressed ? 0.96 : 1
                              }]
                           }}
                           p="5"
                           rounded="8"
                           shadow={3}
                           borderWidth="1"
                           borderColor="coolGray.300"
                           alignItems='center'
                        >
                           <MaterialCommunityIcons name="hanger" size={40} color="black" />
                           <Text color="coolGray.800" fontWeight="bold" fontSize="20">
                              상의
                           </Text>
                        </Box>
                     }}
                  </Pressable>
                  <Pressable >
                     {({isHovered, isPressed}) => {
                        return <Box bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"}
                           style={{
                              transform: [{
                                 scale: isPressed ? 0.96 : 1
                              }]
                           }}
                           p="5"
                           rounded="8"
                           shadow={3}
                           borderWidth="1"
                           borderColor="coolGray.300"
                           alignItems='center'
                        >
                           <MaterialCommunityIcons name="hanger" size={40} color="black" />
                           <Text color="coolGray.800" fontWeight="bold" fontSize="20">
                              하의
                           </Text>
                        </Box>
                     }}
                  </Pressable>
                  <Pressable >
                     {({isHovered, isPressed}) => {
                        return <Box bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"}
                           style={{
                              transform: [{
                                 scale: isPressed ? 0.96 : 1
                              }]
                           }}
                           p="5"
                           rounded="8"
                           shadow={3}
                           borderWidth="1"
                           borderColor="coolGray.300"
                           alignItems='center'
                        >
                           <MaterialCommunityIcons name="hanger" size={40} color="black" />
                           <Text color="coolGray.800" fontWeight="bold" fontSize="20">
                              모자
                           </Text>
                        </Box>
                     }}
                  </Pressable>
                  <Pressable >
                     {({isHovered, isPressed}) => {
                        return <Box bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"}
                           style={{
                              transform: [{
                                 scale: isPressed ? 0.96 : 1
                              }]
                           }}
                           p="5"
                           rounded="8"
                           shadow={3}
                           borderWidth="1"
                           borderColor="coolGray.300"
                           alignItems='center'
                        >
                           <MaterialCommunityIcons name="hanger" size={40} color="black" />
                           <Text color="coolGray.800" fontWeight="bold" fontSize="20">
                              신발
                           </Text>
                        </Box>
                     }}
                  </Pressable>
               </HStack> 
               </VStack>
            </Center>
            
         </NativeBaseProvider>
         
      </>
   )
}

export default MainScreen