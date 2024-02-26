import { Button, Heading, IconButton, Input, View, VStack, Icon, Text, useToast} from "native-base";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function IdSearchScreen({ navigation }) {

  const [name, setName] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [foundID, setFoundID] = useState([]);
  const toast = useToast();
  //아이디를 찾는 함수 
  const handleIdSearch = async () => {
    try {
      const firestore = getFirestore();
      const usersRef = collection(firestore, 'Users');
      const q = query(usersRef, where('name', '==', name), where('phonenumber', '==', phonenumber));
      const querySnapshot = await getDocs(q);
      const foundID = querySnapshot.docs
        .filter(doc => doc.exists() && doc.data()) // 유효한 문서인지 확인
        .map(doc => doc.data().email); // email 필드를 가져옴
      setFoundID(foundID);
    } catch (error) {
      console.error('Error searching for ID:', error);
    }
    if (foundID.length > 0) {
      navigation.navigate('ID_Result', { foundID });
    }
    else{
      toast.show({
        duration:2000,
        description: "입력된 정보가 잘못되었습니다."
      })
    }    
  };

  //화면 렌더링
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView backgroundColor="white" flex={1}>
          <View flex={1}>
            <View flexDirection="row" alignItems="center">
              <IconButton
                backgroundColor="none"
                icon={
                  <Icon
                    as={MaterialIcons}
                    name="keyboard-backspace"
                    size="7"
                    color="black"
                  />
                }
                onPress={() => navigation.pop()}
              />
            </View>
            <TouchableWithoutFeedback //다른 영역 터치시 키보드를 내리기 위함
              onPress={() => {
                Keyboard.dismiss();
              }}
            >
              <View
                w="full"
                h="full"
                justifyContent="center"
                alignItems="center"
                pb={10}
              >
                <Heading>이메일 찾기</Heading>
                <VStack space={2} pt="6">
                  <Text>이름</Text>
                  <Input
                    value={name}
                    onChangeText={(value) => setName(value)}
                    variant="outline"
                    placeholder="이름"
                    w="70%"
                    borderWidth={2}
                    _focus={{
                      backgroundColor: "none",
                      borderColor: "black",
                    }}
                  />
                  <Text>휴대 전화 번호</Text>
                  <Input
                    value={phonenumber}
                    onChangeText={(value) => setPhonenumber(value)}
                    keyboardType="numeric"
                    variant="outline"
                    placeholder="'-' 없이"
                    w="70%"
                    borderWidth={2}
                    _focus={{
                      backgroundColor: "none",
                      borderColor: "black",
                    }}
                  />
                </VStack>
                <Button
                  my={30}
                  w="40%"
                  rounded={5}
                  backgroundColor={(phonenumber.length > 10 && name.length > 0) ? "black" : "gray.400"}
                  disabled={!(phonenumber.length > 10 && name.length > 0)}
                  onPress={() => { handleIdSearch(), Keyboard.dismiss() }}
                >
                  아이디 찾기
                </Button>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

export default IdSearchScreen;
