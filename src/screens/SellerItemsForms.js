
import React, { useEffect, useState } from 'react';
import { Dimensions, useWindowDimensions, RefreshControl } from 'react-native';
import { Spinner, Fab, View, Icon, IconButton, Center, ScrollView, VStack, Pressable, Box, HStack, Image, Text, Spacer, Row } from 'native-base';
import { getFirestore, collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from '@react-navigation/native';
import {  AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

function JoinItemsForms({ navigation }) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const width = useWindowDimensions().width;
  const [refreshing, setRefreshing] = useState(false);
  const [buttonData, setButtonData] = useState([]);
  const screenFocus = useIsFocused();
  const [btnStyle, setBtn] = useState(true); 
  const [ loading, setLoading ] = useState(true);

  useEffect(()=>{
    let timer = setTimeout(()=>{ setLoading(false) }, 2000);
  });
  const TextTime = (remainingTime) => {
    var day = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    var hour = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    var min = Math.floor((remainingTime / (1000 * 60)) % 60);
    var sec = Math.floor((remainingTime / 1000) % 60);
    return day + "일 " + hour + "시간 " + min + "분 " + sec + "초";
  }
  // 
  const calculateRemainingTime = (order) => {
    const orderDate = order.toDate();
    const now = new Date().getTime();
    const remainingTime = Math.max(0, orderDate.getTime() - now);

    var day = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    var hour = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    var min = Math.floor((remainingTime / (1000 * 60)) % 60);
    var sec = Math.floor((remainingTime / 1000) % 60);

    // const plzTime = day + "일 " + hour + "시간 " + min + "분 " + sec + "초";
    // return plzTime;
    return remainingTime;
  };
  const formatDateTime = (remainingTime) => {
    let now = new Date().getTime();
    const gap = remainingTime - now;

    var day = Math.floor(gap / (1000 * 60 * 60 * 24));
    var hour = Math.floor((gap / (1000 * 60 * 60)) % 24);
    var min = Math.floor((gap / (1000 * 60)) % 60);
    var sec = Math.floor((gap / 1000) % 60);

    const formattedDateTime = day + "일 " + hour + "시간 " + min + "분 " + sec + "초";
    return formattedDateTime;
  };
  const calculateUpdatedPrice = (maxMoney) => {
    const currentPrice = parseInt(maxMoney);
    const increment = 1000; // Increment value
    if (isNaN(currentPrice)) {
      return maxMoney;
    }
    const updatedPrice = currentPrice;

    return updatedPrice;
  }; 
  const sanitizeString = (value) => {
    return value.replace(/[\\/\.]/g, '').trim();
  };
  useEffect(() => {
    const fetchData = async () => {
      const firestore = getFirestore();
      const auth = getAuth();
      const currentUser = auth.currentUser;

      const querySnapshot = await getDocs(
        query(collection(firestore, 'Items'), where('email', '==', currentUser.email))
      );
      const data = querySnapshot.docs.map((doc) => {
        const buttonData = doc.data();
        const remainingTime = calculateRemainingTime(buttonData.order);
        const formattedDateTime = formatDateTime(remainingTime);        
        const imageList = [];
        for (let i = 1; i <= 5; i++) {
          const imageLink = buttonData[`image${i}`];
          if (imageLink) {
            imageList.push(imageLink);
          }
        }
        return {
          ...buttonData,
          imageList: imageList,
          remainingTime: remainingTime,
          formattedDateTime: formattedDateTime,
        };
      });

      setButtonData(data);
    };
    if (screenFocus) {
      fetchData();
    }
  }, [screenFocus]);
  useEffect(() => {
    const interval = setInterval(() => {
      setButtonData((prevData) => {
        const newData = prevData.map((button) => {
          const remainingTime = calculateRemainingTime(button.order);
          const updatedPrice = calculateUpdatedPrice(button.max_money);
  
          return {
            ...button,
            remainingTime: remainingTime,
            updatedPrice: updatedPrice,
          };
        });
        return newData;
      });
    }, 1000);
  
    return () => clearInterval(interval);
  }, [buttonData]);

  return (
    <SafeAreaProvider>
      <SafeAreaView flex={1}>
        <View flex={1}>
          <View py={1} bg="white" alignItems="center" justifyContent="space-between"  flexDirection="row">          
          <IconButton _pressed={{ bg: "gray.100" }} icon={<Icon as={Ionicons} name="chevron-back" size="7" color="black" />}
              onPress={() => navigation.pop()} />
              <View>
            <Text fontSize={20} color="black" bold>
              판매 리스트
            </Text>
            </View>
            <IconButton disabled icon={<Icon as={Ionicons} name="chevron-back" size="7" color="white" />}
               />
          </View>
          <View bg="gray.200" h={0.5} w="full" />
          {loading ? <Center flex={1}><Spinner size='lg' color="black"></Spinner></Center> : buttonData.length == 0 ? <Center flex={1}><Text fontSize={22}>판매 중인 물품이 없습니다.</Text></Center> :
          <ScrollView
            mt={0}
            onScroll={(e) => {
              e.nativeEvent.contentOffset.y > 0 ? setBtn(false) : setBtn(true);
            }}
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
          >
           
            <View flex={1} justifyContent="center" alignItems="center">
              <VStack>
                {buttonData.map((button, index) => {
                    const updatedPrice = calculateUpdatedPrice(button.max_money);
                    const firestore = getFirestore();
                    return (
                      <Pressable
                        key={index}
                        width={windowWidth}
                        onPress={async () => {                          
                          if (button.remainingTime <= 0) {
                            const itemRef = doc(firestore, "Items", button.id);
                            await setDoc(itemRef, { onoff: false }, { merge: true });
                          }
                          navigation.navigate('Single', {
                            title: button.title,
                            nickname: button.nickname,
                            category: button.category,
                            order: button.order,
                            time: button.time,
                            description: button.description,
                            start_money: button.start_money,
                            imageList: button.imageList,
                            max_money: button.max_money,
                            start_money: button.start_money,
                            email: button.email,
                            uptime: button.uptime,
                            onoff: button.onoff,
                          });
                        }}
                      >
                        {({ isHovered, isPressed }) => (
                          <View
                            m={0}
                            bg={
                              isPressed
                                ? 'coolGray.100'
                                : isHovered
                                ? 'coolGray.100'
                                : 'white'
                            }
                            pt={4}
                            pb={4}
                            pl={3}
                            pr={3}
                            borderTopColor="white"
                            borderBottomColor="coolGray.300"
                            borderBottomWidth={1}
                            borderColor="coolGray.300"
                          >
                            <HStack space={3}>
                              <Image
                                source={{ uri: button.image1 }}
                                w="120"
                                h="120"
                                borderRadius={8}
                                borderWidth={1}
                                borderColor="gray.300"
                                alt="image"
                              />
                              <VStack>
                                <Text fontWeight="medium" color="black" fontSize="18">
                                  {button.title}
                                </Text>
                                {button.method === "blind" ? (
                                  <Text bold fontSize="18" color="black">
                                  Blind Auction
                                </Text>
                              ) : (
                                <>
                                  <Text bold fontSize="18" color="black">
                                    현재 최고가: {updatedPrice}원
                                  </Text>
                                  <Text mt="2" fontSize="sm" color="coolGray.700">
                                    경매 시작가: {button.start_money}원
                                  </Text>
                                </>
                              )}
                                <Text fontSize="sm" color="coolGray.700">
                                  남은 시간: {TextTime(button.remainingTime)} 
                                </Text>
                              </VStack>
                            </HStack>
                            <Spacer />
                          </View>
                        )}
                      </Pressable>
                    );
                  })}
                <View m={2}></View>
              </VStack>
            </View>
          </ScrollView>
        }
        {screenFocus ? (
            <Box position="relative" w="100%">
              <Fab
                onPress={() => navigation.navigate('ProductR')}
                _pressed={{ bg: 'gray.600' }}
                p={4}
                mb={buttonData.length == 0 ? 0 : windowHeight / 15}
                bg="gray.800"
                shadow={0}
                position="absolute"
                size="sm"
                icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
                label={
                  btnStyle ? (
                    <Text color="white" fontSize="sm">
                      물품 등록
                    </Text>
                  ) : null
                }
              />
            </Box>
          ) : null}
          
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default JoinItemsForms;