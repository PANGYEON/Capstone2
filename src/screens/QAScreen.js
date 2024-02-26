import { Input, ScrollView, Text, View, VStack, IconButton, Icon, Button, useToast } from 'native-base'
import React, { useState } from 'react'
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Keyboard, TouchableWithoutFeedback, Dimensions } from "react-native";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp, getDoc,doc } from "firebase/firestore";

function QAScreen({ navigation }) {
   const toast = useToast();
   const windowWidth = Dimensions.get('window').width;
   const windowHeight = Dimensions.get('window').height;
   const [qnatitle, setQnatitle] = useState(""); // 글 제목
   const [qnadescription, setQnadescription] = useState(""); // 설명
   const [userInfo, setUserInfo] = React.useState(null);
   const auth = getAuth();
   const user = auth.currentUser;
 
   React.useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const firestore = getFirestore();
          const userDocRef = doc(firestore, 'Users', user.uid); // 사용자ID에는 실제 사용자의 ID를 넣어야 합니다.
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setUserInfo(userData);
          }
        } catch (error) {
          // 오류 처리
        }
      };
    
      fetchUserInfo();
    }, []);
   const handleQnA = async () => {
      try {
         // Firestore에서 현재 사용자 정보 가져오기
         const currentUser = auth.currentUser;
         const { email } = currentUser;

         // Firestore에 문의 데이터 추가
         const firestore = getFirestore();
         await addDoc(collection(firestore, 'QnA'), {
            qnatitle,
            qnadescription,
            name: userInfo && userInfo.name,
            email,
            QnA_Time: serverTimestamp()
         });

         // 문의 데이터 추가 후 동작할 코드 작성
         // ...

         // 문의 데이터 추가 후 화면 이동
         toast.show({
            duration: 2000,
            description: "문의 답변은 메일로 보내드립니다."
          })
         navigation.goBack();
      } catch (error) {
         //console.log("Error adding QnA: ", error);
      }
   };

   return (

      <SafeAreaProvider>
         <SafeAreaView backgroundColor="white" flex={1}>
            <View flex={1}>
               <View py={1} bg="gray.600" flexDirection="row" alignItems="center">
                  <IconButton  _pressed={{bg:"gray.500"}} icon={<Icon as={Ionicons} name="chevron-back" size="7" color="white" />}
                     onPress={() => navigation.pop()} />
                  <Text fontSize={20} color="white" bold>설정</Text>
               </View>               
               <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                     <View
                        bg="white"
                        padding={3}
                        w={windowWidth - 20}>
                        <VStack>
                           <Input
                              value={qnatitle}
                              onChangeText={setQnatitle}
                              bg="white"
                              variant="unstyled"
                              placeholder="제목"
                              fontSize={16}
                              _focus={{
                                 backgroundColor: "gray.100",
                                 borderColor: "none",
                              }}
                           />
                           <View mt={4} mb={4} style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                           </View>
                           <Input
                              value={qnadescription}
                              onChange={(e) => {
                                 setQnadescription(e.nativeEvent.text);
                              }}
                              multiline={true}
                              onChangeText={setQnadescription}
                              placeholderTextColor="grey"
                              numberOfLines={10}
                              scrollEnabled
                              bg="white"
                              variant="unstyled"
                              placeholder="문의할 내용을 작성해 주세요."
                              _focus={{
                                 backgroundColor: "gray.100",
                                 borderColor: "none",
                              }}
                           />
                           <View
                              mt={4}
                              mb={4}
                              style={{ flexDirection: "row", alignItems: "center" }}
                           >
                              <View
                                 style={{ flex: 1, height: 1, backgroundColor: "black" }}
                              />
                           </View>
                           <Button
                              bg="black"
                              backgroundColor={ (qnatitle.length > 0 && qnadescription.length > 0) ? "black" : "gray.300"}
                              disabled={!(qnatitle.length > 0 && qnadescription.length > 0)}
                              onPress={() => {
                                 handleQnA();
                              }}>
                              문의하기
                           </Button>
                        </VStack>
                     </View>
                  </ScrollView>
               </TouchableWithoutFeedback>
            </View>
         </SafeAreaView>
      </SafeAreaProvider>
   )
}

export default QAScreen