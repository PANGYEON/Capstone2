import { Modal, Text, View, VStack, IconButton, Icon, Button } from 'native-base'
import React, { useState } from 'react'
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { getAuth } from 'firebase/auth'


function SettingScreen({ navigation }) {
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    const auth = getAuth();
    auth()
    .signOut()
    .then(() => console.log('User signed out!'));
  }  
 
  return (
    <SafeAreaProvider>
      <SafeAreaView flex={1} >
        <View flex={1}>
          <View py={1} bg="gray.600" flexDirection="row" alignItems="center">
            <IconButton _pressed={{ bg: "gray.500" }} icon={<Icon as={Ionicons} name="chevron-back" size="7" color="white" />}
              onPress={() => navigation.pop()} />
            <Text fontSize={20} color="white" bold>설정</Text>
          </View>
          <VStack mt={4} space={5}>
            <View>
              <Text ml={4} onPress={() => navigation.navigate("QA")} fontSize={19}>1:1 문의</Text>
              <View mt={4} mb={4} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'grey' }} />
              </View>
              <Text ml={4} onPress={() => setShowModal(true)} fontSize={19}>로그아웃</Text>
              <View mt={4} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'grey' }} />
              </View>
              <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                  <Modal.CloseButton />
                  <Modal.Header>로그아웃</Modal.Header>
                  <Modal.Body>
                    <Text>로그아웃 하시겠습니까?</Text>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      bg="white"
                      _pressed={{ bg: "gray.200" }}
                      onPress={() => { setShowModal(false); }}>
                      <Text>취소</Text>
                    </Button>
                    <Button
                      ml={3}
                      bg="black"
                      _pressed={{ bg: "gray.600" }}
                      onPress={() => { setShowModal(false); navigation.navigate("Login") }}>
                      로그아웃
                    </Button>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>
            </View>
          </VStack>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default SettingScreen