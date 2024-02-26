import React, { useState } from 'react'
import { Keyboard, TouchableWithoutFeedback, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Modal, Icon, Button, HStack, IconButton, Input, Text, View, VStack } from "native-base";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function MoneyOutScreen({ navigation }) {
   const [showModal, setShowModal] = useState(false);
   const [money, setMoney] = useState(null);
   const [fixvalue, setfixValue] = useState("");

   const handleButton = (newButton) => {
      setClickId(newButton);
   };

   const [userInfo, setUserInfo] = React.useState(null);
   const auth = getAuth();
   const user = auth.currentUser;

   React.useEffect(() => {
      const fetchUserInfo = async () => {
         const firestore = getFirestore();
         const userDocRef = doc(firestore, 'Users', user.uid); // 사용자ID에는 실제 사용자의 ID를 넣어야 합니다.
         const userDocSnapshot = await getDoc(userDocRef);
         if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setUserInfo(userData);
         }
      };
      fetchUserInfo();
   }, []);

   const handleSend = async () => {
      const money = fixvalue.replace(/,/g, "");
      const auth = getAuth();
      const currentUser = auth.currentUser;
      const uid = currentUser.uid;
      const oneMoney = parseInt(userInfo.cash);
      const db = getFirestore();
      const moneyRef = doc(db, "Users", uid);
      try {
         await setDoc(moneyRef, { cash: oneMoney - parseInt(money) }, { merge: true });
         setfixValue(oneMoney - parseInt(money));
         console.log("money updated successfully!");
      } catch (error) {
         console.error("Error updating money:", error);
      }
   }


   const handleFixValue = (value) => {
      const str = value.replace(/,/g, "");
      const temp = str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setfixValue(temp);
   }

   return (
      <SafeAreaProvider>
         <SafeAreaView backgroundColor="white" flex={1} alignItems="center">
            <HStack bg="gray.600" px="1" py="2" w="100%">
               <HStack alignItems="center">
                  <IconButton
                     _pressed={{ bg: "gray.500" }}
                     icon={
                        <Icon as={Ionicons} name="chevron-back" size="7" color="white" />
                     }
                     onPress={() => navigation.pop()} />
                  <Text pl={3} color="white" fontSize="20" fontWeight="bold">
                     금액 송금
                  </Text>
               </HStack>
            </HStack>
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
               <View
                  minHeight={Math.round(windowHeight - 100)}
                  w={windowWidth - 40}
                  justifyContent="center"
                  padding={3}
               >
                  <VStack h={windowHeight - 200}>
                     <View mt={4}>
                        <Text fontSize={20} bold>송금 금액을 입력해주세요.</Text>
                        <Text mt={1} fontSize={15} color="gray.700">보유중인 금액 {userInfo && userInfo.cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                     </View>
                     <Input
                        mt={6}
                        mb={4}
                        w={windowWidth - 60}
                        fontSize={15}
                        value={fixvalue}
                        onChangeText={(text) => { handleFixValue(text) }}
                        bg="white"
                        variant="outline"
                        placeholder="송금 금액"
                        keyboardType="numeric"
                        _focus={{
                           backgroundColor: "white",
                           borderColor: "black",
                           borderWidth: 2
                        }}
                     />
                     <Button
                        bg={fixvalue.length > 0 ? "black" : "gray.300"}
                        disabled={!fixvalue.length > 0}
                        _pressed={{ bg: "gray.600" }}
                        onPress={() => {
                           setShowModal(true)
                        }}>
                        송금하기
                     </Button>
                  </VStack>
                  <VStack>
                     <View>
                        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                           <Modal.Content maxWidth="400px">
                              <Modal.CloseButton />
                              <Modal.Header>송금</Modal.Header>
                              <Modal.Body padding={6} justifyContent="flex-start" >
                                 <Text fontSize={16}>송금 하시겠습니까?</Text>
                              </Modal.Body>
                              <Modal.Footer>
                                 <Button
                                    bg="white"
                                    _pressed={{ bg: "gray.200" }}
                                    onPress={() => { setShowModal(false); }}>
                                    <Text color="black">
                                       취소
                                    </Text>
                                 </Button>
                                 <Button
                                    ml={5}
                                    bg="black"
                                    _pressed={{ bg: "gray.600" }}
                                    onPress={() => { setShowModal(false); handleSend(); navigation.pop() }}>
                                    송금하기
                                 </Button>
                              </Modal.Footer>
                           </Modal.Content>
                        </Modal>
                     </View>
                  </VStack>
               </View>
            </TouchableWithoutFeedback>
         </SafeAreaView>
      </SafeAreaProvider>
   )
}

export default MoneyOutScreen