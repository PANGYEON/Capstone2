import React, { useEffect, useState } from 'react';
import { Dimensions, useWindowDimensions, RefreshControl } from 'react-native';
import { Spinner, Fab, View, Icon, IconButton, Center, ScrollView, VStack, Pressable, Box, HStack, Image, Text, Spacer } from 'native-base';
import { getFirestore, collection, getDocs, deleteDoc, doc, setDoc, addDoc, where, query } from 'firebase/firestore';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useIsFocused } from '@react-navigation/native';

function SetItemsForms({ navigation }) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const width = useWindowDimensions().width;

  const [buttonData, setButtonData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [btnStyle, setBtn] = useState(true);
  const screenFocus = useIsFocused();
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

    // const plzTime = day + "일 " + hour + "시간 " + min + "분 " + sec + "초";
    // return plzTime;
    return remainingTime;
  };

  const calculateUpdatedPrice = (maxMoney) => {
    const currentPrice = parseInt(maxMoney);
    if (isNaN(currentPrice)) {
      return maxMoney;
    }
    const updatedPrice = currentPrice;
    return updatedPrice;
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
  useEffect(() => {
    const fetchData = async () => {
      const firestore = getFirestore();
      const querySnapshot = await getDocs(
        query(collection(firestore, "Items"), where("onoff", "==", true))
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
          id: doc.id, // Include the document ID
          onoff: buttonData.onoff,
        };
      });

      const expiredItems = data.filter((item) => item.remainingTime <= 0);
      for (const item of expiredItems) {
        // Set onoff to false for expired items
        const itemRef = doc(firestore, "Items", item.id);
        await setDoc(itemRef, { onoff: false }, { merge: true });

        const itemSnapshot = await getDoc(itemRef);
        const actionEmail = itemSnapshot.id;
        const joinMoney = itemSnapshot.get("join_money");

        const userSnapshot = await getDocs(doc(firestore, "Users"));
        userSnapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData.email === actionEmail) {
            userData.cash = userData.cash + joinMoney;
          }
        });
      }

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

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView flex={1}>
        <View flex={1}>
          <View bg="white" alignItems="center" justifyContent="center">
            <Text mt={4} fontSize={20} color="black" bold>
              경매 리스트
            </Text>
            <View mt={4} bg="gray.200" h={0.5} w="full" />
          </View>
          {loading ? <Center flex={1}><Spinner size="lg" color="black" /></Center> :
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
};

export default SetItemsForms;