import { Image, Center, Heading, Text, View, VStack, Pressable, Box, IconButton, Icon, HStack, ScrollView } from 'native-base'
import React from 'react'
import { MaterialIcons, Ionicons, Entypo, SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ProfileScreen({ navigation }) {

  const [userInfo, setUserInfo] = React.useState(null);
  const auth = getAuth();
  const user = auth.currentUser;

  React.useEffect(() => {
    const fetchUserInfo = async () => {
      const firestore = getFirestore();
      const userDocRef = doc(firestore, 'Users', user.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        setUserInfo(userData);
      }
    };
  
    fetchUserInfo();
  }, [userInfo]);

  return (
    <SafeAreaProvider>
      <SafeAreaView flex={1} backgroundColor="white" >
        <View flex={1}>
          <View bg="gray.600" flexDirection="row" justifyContent="flex-end">
            <IconButton _pressed={{ bg: "gray.500" }} icon={<Icon as={MaterialIcons} name="settings" size="7" color="white" alignSelf="flex-end" />}
              onPress={() => navigation.navigate("Setting")} />
          </View>

          <Center bg="gray.600" pt={3} pb={6}>
            <Image
              source={require("../assets/icons/avatar.png")}
              alt="profile"
              w={24}
              h={24}
              resizeMode="cover"
            />
            <Heading bold fontSize={20} isTruncated my={2} color="white">
              {userInfo && userInfo.name}
            </Heading>
            <VStack>
              <Text fontSize={17} color="white">닉네임 : {userInfo && userInfo.nickname} {/* 사용자의 닉네임 표시 */}</Text>
              <Text fontSize={15} color="white">이메일 : {userInfo && userInfo.email} {/* 사용자의 이메일 표시 */}</Text>
            </VStack>
            <Text mt={2} fontSize={20} color="white">현재 소지금 : {userInfo && userInfo.cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
          </Center>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View mt={5} ml={5} mr={5}  >
              <VStack space={5}>
                <Box borderWidth={1} padding={3} borderRadius={8} borderColor="gray.400">
                  <VStack space={2}>
                    <Text fontSize="14">충전 이후 경매 이용 가능합니다.</Text>
                    <HStack justifyContent="space-between" space={2} alignItems="center">
                      <View >
                        <HStack>
                          <Pressable
                            onPress={() => navigation.navigate("Money")}>
                            {({ isHovered, isPressed, }) => {
                              return <Box bg={isPressed ? "coolGray.400" : isHovered ? "coolGray.400" : "coolGray.200"}
                                style={{
                                  transform: [{
                                    scale: isPressed ? 0.96 : 1
                                  }]
                                }}
                                p="2"
                                rounded="8"
                                alignItems='center'
                                w={windowWidth / 2 - 40}
                              >
                                <HStack space={1} alignItems="center">
                                  <Entypo name="plus" size={20} color="black" />
                                  <Text pb={0.5} color="coolGray.800" fontWeight="bold" fontSize="14">
                                    금액 충전
                                  </Text>
                                </HStack>
                              </Box>
                            }}
                          </Pressable>
                        </HStack>
                      </View>
                      <Pressable
                        onPress={() => navigation.navigate("MoneyOut")}>
                        {({ isHovered, isPressed, }) => {
                          return <Box bg={isPressed ? "coolGray.400" : isHovered ? "coolGray.400" : "coolGray.200"}
                            style={{
                              transform: [{
                                scale: isPressed ? 0.96 : 1
                              }]
                            }}
                            p="2"
                            rounded="8"
                            alignItems='center'
                            w={windowWidth / 2 - 40}
                          >
                            <HStack space={1} alignItems="center">
                              <AntDesign name="creditcard" size={16} color="black" />
                              <Text pb={0.5} color="coolGray.800" fontWeight="bold" fontSize="14">
                                금액 송금
                              </Text>
                            </HStack>
                          </Box>
                        }}
                      </Pressable>
                    </HStack>
                  </VStack>
                </Box>
              </VStack>
            </View>
            <View mt={5}>
              <View ml={5}>
                <VStack space={2}>
                  <Text bold fontSize={16}>나의 거래</Text>
                </VStack>
              </View>
              <View mt={2}>
                <Pressable
                  onPress={() => navigation.navigate("UserSeller")}>
                  {({ isHovered, isPressed, }) => {
                    return <Box bg={isPressed ? "coolGray.100" : isHovered ? "coolGray.100" : "white"}
                      p="2"
                      alignItems='center'
                      w="full"
                    >
                      <View w="full" ml={5}>
                        <HStack space={2.5} alignItems="center">
                          <Ionicons name="md-document-text-outline" size={19} color="black" />
                          <Text pb={0.5} color="black" fontSize="17">
                            판매 내역
                          </Text>
                        </HStack>
                      </View>
                    </Box>
                  }}
                </Pressable>
                <Pressable
                  onPress={() => navigation.navigate("UserJoin")}>
                  {({ isHovered, isPressed, }) => {
                    return <Box bg={isPressed ? "coolGray.100" : isHovered ? "coolGray.100" : "white"}
                      p="2"
                      alignItems='center'
                      w="full"
                    >
                      <View w="full" ml={5}>
                        <HStack space={2.5} alignItems="center" >
                          <SimpleLineIcons name="handbag" size={19} color="black" />
                          <Text pb={0.5} color="black" fontSize="17">
                            참여 내역
                          </Text>
                        </HStack>
                      </View>
                    </Box>
                  }}
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default ProfileScreen