
import React, { useEffect, useState } from 'react';
import { Dimensions, useWindowDimensions } from 'react-native';
import { Spinner, View, Icon, IconButton, Center, ScrollView, VStack, Pressable, HStack, Image, Text, Spacer } from 'native-base';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from '@react-navigation/native';

import { Ionicons } from "@expo/vector-icons";

function JoinItemsForms({ navigation }) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const width = useWindowDimensions().width;
  const [buttonData, setButtonData] = useState([]);
  const screenFocus = useIsFocused();
  const [btnStyle, setBtn] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => { setLoading(false) }, 2000);
  });
  const TextTime = (remainingTime) => {
    var day = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    var hour = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    var min = Math.floor((remainingTime / (1000 * 60)) % 60);
    var sec = Math.floor((remainingTime / 1000) % 60);
    return day + "일 " + hour + "시간 " + min + "분 " + sec + "초";
  }

  const calculateRemainingTime = (order) => {
    const orderDate = order.toDate();
    const now = new Date().getTime();
    const remainingTime = Math.max(0, orderDate.getTime() - now);

    var day = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    var hour = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    var min = Math.floor((remainingTime / (1000 * 60)) % 60);
    var sec = Math.floor((remainingTime / 1000) % 60);

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
    const increment = 1000;
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
    const fetchUserInfo = async () => {
      const firestore = getFirestore();
      const auth = getAuth();
      const currentUser = auth.currentUser;
      const sanitizedEmail = sanitizeString(currentUser.email);
      const itemData = [];

      const querySnapshot = await getDocs(collection(firestore, 'Items'));

      for (const itemDoc of querySnapshot.docs) {
        const actionQuerySnapshot = await getDocs(collection(firestore, 'Items', itemDoc.id, 'Action'));

        actionQuerySnapshot.forEach(actionDoc => {
          if (actionDoc.id === sanitizedEmail) {
            console.log('Action 문서 데이터:', actionDoc.data());
            const buttonData = itemDoc.data();
            const imageList = [];
            for (let i = 1; i <= 5; i++) {
              const imageLink = buttonData[`image${i}`];
              if (imageLink) {
                imageList.push(imageLink);
              }
            }
            const remainingTime = calculateRemainingTime(buttonData.order);
            const formattedDateTime = formatDateTime(remainingTime);

            const item = {
              ...buttonData,
              imageList: imageList,
              remainingTime: remainingTime,
              formattedDateTime: formattedDateTime,
            };
            itemData.push(item);
          }
        });
      }
      setButtonData(itemData);
    };
    fetchUserInfo();
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
          <View py={1} bg="white" alignItems="center" justifyContent="space-between" flexDirection="row">
            <IconButton _pressed={{ bg: "gray.100" }} icon={<Icon as={Ionicons} name="chevron-back" size="7" color="black" />}
              onPress={() => navigation.pop()} />
            <View>
              <Text fontSize={20} color="black" bold>
                참여 리스트
              </Text>
            </View>
            <IconButton disabled icon={<Icon as={Ionicons} name="chevron-back" size="7" color="white" />}
            />
          </View>
          <View bg="gray.200" h={0.5} w="full" />

          {loading ? <Center flex={1}><Spinner size="lg" color="black" /></Center> :
            buttonData.length == 0 ? <Center flex={1}><Text fontSize={22}>참여 중인 경매가 없습니다.</Text></Center> :
              <ScrollView
                mt={0}
                onScroll={(e) => {
                  e.nativeEvent.contentOffset.y > 0 ? setBtn(false) : setBtn(true);
                }}             
              >

                <View flex={1} justifyContent="center" alignItems="center">
                  <VStack>
                    {buttonData.map((button, index) => {
                      const updatedPrice = calculateUpdatedPrice(button.max_money);
                      tore = getFirestore();
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
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default JoinItemsForms;