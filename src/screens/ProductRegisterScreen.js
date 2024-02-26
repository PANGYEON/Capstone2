import { Modal, Content, Item, CheckIcon, Select, Radio, ScrollView, Box, Icon, NativeBaseProvider, Button, Heading, HStack, IconButton, Image, Input, Pressable, Text, View, VStack, Center, FormControl, useToast, toast } from "native-base";
import React, { useState, useEffect } from 'react'

import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Keyboard, TouchableWithoutFeedback, Dimensions, ImageBackground } from "react-native";
import { getFirestore, doc, setDoc, addDoc, serverTimestamp, getDoc, collection, Timestamp } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { getStorage, ref, uploadString, uploadBytes, getDownloadURL } from "firebase/storage";
import { ToggleButton, } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const MAX_IMAGES = 5; //사진 최대 개수

function ProductRegisterScreen({ navigation }) {

   const [title, setTitle] = useState(""); // 글 제목
   const [description, setDescription] = useState(""); // 설명
   const [category, setCategory] = React.useState(""); // 경매 카테고리
   const [time, setTime] = useState(""); //경매 기간
   const [start_money, setStart_money] = useState("");
   const [clickedId, setClickId] = useState("blind");
   const [clickColor1, setColor1] = useState("black");
   const [clickColor2, setColor2] = useState("white");

   const [images, setImages] = useState([]);
   const [fixvalue, setfixValue] = useState("");

   const handleFixValue = (value) => {
      const str = value.replace(/,/g, "");      
      const temp = str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");    
      setfixValue(temp);
      setStart_money((parseFloat(value) * 1000).toFixed(0));
   }

   const handleButton = (newButton) => {
      setClickId(newButton);
   };

   const [inputValue, setInputValue] = useState('');

   const handleInputChange = (value) => {
      setInputValue(value);
   };

   const getPermission = async () => {
      const {
         status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
         alert('게시글을 업로드하려면 사진첩 권한이 필요합니다.');
         return false;
      }
      return true;
   }
   const pickImage = async () => {
      if (images.length >= MAX_IMAGES) {
         console.log(`이미지는 최대 ${MAX_IMAGES}개까지 선택할 수 있습니다.`);
         return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
         setImages([...images, result.uri]);
         //uploadImages(); // 이미지 선택 후에 업로드 함수 호출
      }
   };

   const filmImage = async () => {
      if (images.length >= MAX_IMAGES) {
         console.log(`이미지는 최대 ${MAX_IMAGES}개까지 선택할 수 있습니다.`);
         return;
      }
      const result = await ImagePicker.launchCameraAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
         setImages([...images, result.uri]);
      }
   };
   const uploadImages = async (images) => {
      if (images.length === 0) {
         console.log('이미지가 선택되지 않았습니다.');
         return;
      }
      const storage = getStorage();
      const uploadPromises = images.map(async (image, index) => {
         const response = await fetch(image);
         const blob = await response.blob();
         const filename = image.substring(image.lastIndexOf('/') + 1);
         const storageRef = ref(storage, `images/${filename}`);
         const snapshot = await uploadBytes(storageRef, blob);
         const downloadURL = await getDownloadURL(snapshot.ref);
         const fieldName = `image${index + 1}`;
         //downloadURLs[fieldName] = downloadURL;
         images[index].downloadURL = downloadURL;
         console.log(`이미지 ${index + 1} 업로드 완료:`, downloadURL);
      });

      await Promise.all(uploadPromises);
   };


   const [showModal, setShowModal] = useState(false);

   const [userInfo, setUserInfo] = useState(null);
   const auth = getAuth();
   const user = auth.currentUser;

   useEffect(() => {      
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
   const sanitizeString = (value) => {
      return value.replace(/[\\/\.]/g, '').trim();
   };
   
   const handleRegister = async () => {
      const firestore = getFirestore();

      if (!userInfo) {
         // User is not logged in, handle accordingly
         return;
      }
      if (images.length === 0) {
         console.log('이미지가 선택되지 않았습니다.');
         return;
      }

      if (!title || !category || !time || !description) {
         console.log('모든 필드를 채워주세요.');
         return;
      }
      const orderDate = new Date();
      const updatedYear = orderDate.getFullYear();
      const updatedMonth = orderDate.getMonth() + 1;
      const updatedDay = orderDate.getDate();
      const updatedHours = orderDate.getHours();
      const updatedMinutes = orderDate.getMinutes();
      const updatedSeconds = orderDate.getSeconds();
      const formattedDate = `${updatedYear}${updatedMonth}${updatedDay}${updatedHours}${updatedMinutes}${updatedSeconds}`;
      let DownDate
      if (time === '24') {
         const newDay = updatedDay + 1;
         DownDate = Timestamp.fromDate(new Date(updatedYear, updatedMonth - 1, newDay, updatedHours, updatedMinutes, updatedSeconds));
       } else if (time === '48') {
         const newDay = updatedDay + 2;
         DownDate = Timestamp.fromDate(new Date(updatedYear, updatedMonth - 1, newDay, updatedHours, updatedMinutes, updatedSeconds));
       } else if (time === '72') {
         const newDay = updatedDay + 3;
         DownDate = Timestamp.fromDate(new Date(updatedYear, updatedMonth - 1, newDay, updatedHours, updatedMinutes, updatedSeconds));
       }
       
      try {
         const storage = getStorage();
         const downloadURLs = {};
         const docName = sanitizeString(userInfo.email) + sanitizeString(formattedDate);
         const collectionRef = collection(firestore, "Items");
         const docData = {
            title: title,
            description: description,
            category: category,
            time: time,
            method: clickedId,
            start_money: clickedId === "blind" ? 0 : start_money,
            order: DownDate,
            uptime:formattedDate,
            nickname: userInfo.nickname,
            email: userInfo.email,
            max_money: clickedId === "blind" ? parseInt(0) : parseInt(start_money),
            downtime: serverTimestamp(),
            onoff: true,
         };
         await Promise.all(
            images.map(async (image, index) => {
               const response = await fetch(image);
               const blob = await response.blob();
               const filename = image.substring(image.lastIndexOf('/') + 1);

               const storageRef = ref(storage, `images/${filename}`);
               const snapshot = await uploadBytes(storageRef, blob);

               const downloadURL = await getDownloadURL(snapshot.ref);

               // 필드 이름 생성 (image1, image2, image3, ...)
               const fieldName = `image${index + 1}`;
               downloadURLs[fieldName] = downloadURL; // 이미지의 다운로드 URL 추가

               //console.log(`이미지 ${index + 1} 업로드 완료:`, downloadURL);
            })
         );

         // 이미지의 다운로드 URL을 docData에 추가
         const docDataWithImages = {
            ...docData,
            ...downloadURLs,
         };

         //await addDoc(collectionRef, docDataWithImages);
         await setDoc(doc(collectionRef, docName), docDataWithImages);
         await uploadImages(images);
         console.log("저장 성공");
         // 저장에 성공한 후에 필드 값 초기화
         setTitle("");
         setDescription("");
         setCategory("");
         setTime("");
         setStart_money("");
         setClickId("blind");
         setColor1("black");
         setColor2("white");
         setImages([]);
         setfixValue("");

         navigation.pop();
      } catch (err) {
         console.log("저장 실패", err);
      }
   }
   
   const removeImage = (index) => {
      const updatedImages = [...images];
      updatedImages.splice(index, 1);
      setImages(updatedImages);
   };
   return (
      <>
         <NativeBaseProvider>
            <SafeAreaProvider>
               <SafeAreaView flex={1} alignItems="center">
               <VStack>
                  <HStack bg="white" px="1" py="2" w="100%">
                     <HStack alignItems="center">
                        <IconButton
                        _pressed={{bg:"gray.200"}}
                           icon={
                              <Icon as={Ionicons} name="chevron-back-outline" size="7" color="black" />
                           }
                           onPress={() => navigation.pop()} />
                        <Text pl={3} color="black" fontSize="20" fontWeight="bold">
                           경매 물품 등록
                        </Text>
                     </HStack>
                     <HStack flex={1} mr={3} alignItems="center" justifyContent="flex-end">
                        <Button                           
                           bg={!(!title || !category || !time || !description ||images.length === 0) ? "black" : "gray.400"}
                           _pressed={{bg:"gray.600"}}
                           onPress={handleRegister}
                           disabled={(!title || !category || !time || !description || images.length === 0)}
                           
                           >
                           완료
                        </Button>
                     </HStack>                     
                  </HStack>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                 <View style={{ flex: 1, height: 1, backgroundColor: 'grey' }} />
                              </View>
                  </VStack>                  
                  <TouchableWithoutFeedback
                     onPress={() => {
                        Keyboard.dismiss();
                     }}
                  >
                     <ScrollView bg="white" showsVerticalScrollIndicator={false}>
                        <View
                           bg="white"
                           pl={5}
                           pr={5}
                           mt={3}
                           w={windowWidth}
                        >
                           <VStack>
                              <HStack space={3}>
                                 <Pressable
                                    onPress={() => setShowModal(true)}
                                 >
                                    <View w="100" h="100"
                                       bg="gray.200"
                                       justifyContent="center"
                                       alignItems="center"
                                       pt={3}
                                       borderRadius={3}
                                       borderWidth={1}
                                    >
                                       <MaterialIcons name="photo-camera" size={24} color="black" />
                                       <Text mt={1}>{images.length}/5</Text>
                                    </View>
                                 </Pressable>
                                 <ScrollView
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={true}>
                                    {images.map((image, index) => (
                                       <View key={index} mr={2}>
                                          <ImageBackground
                                             source={{ uri: image }}
                                             style={{ width: 100, height: 100 }}>
                                             <IconButton
                                                alignSelf="flex-end"
                                                size={5}
                                                borderRadius={10}
                                                backgroundColor="black"
                                                opacity={1}
                                                icon={
                                                   <Icon as={MaterialIcons} name="close" size="5" color="white" />
                                                }
                                                onPress={() => removeImage(index)} />
                                          </ImageBackground>
                                       </View>
                                    ))}
                                 </ScrollView>

                                 <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                    <Modal.Content maxWidth="400px">
                                       <Modal.CloseButton />
                                       <Modal.Header>사진 가져오기</Modal.Header>
                                       <Modal.Body padding={0} borderBottomWidth="0.8" borderBottomColor="light.400">
                                          <Pressable
                                             onPress={filmImage}
                                             onPressOut={() => setShowModal(false)}
                                          >
                                             <View>
                                                <Text bg="blue" margin={5}>
                                                   직접 촬영
                                                </Text>
                                             </View>
                                          </Pressable>
                                       </Modal.Body>
                                       <Modal.Body padding={0} justifyContent="flex-start" >
                                          <Pressable
                                             onPress={pickImage}
                                             onPressOut={() => setShowModal(false)}
                                          >
                                             <View>
                                                <Text margin={5}>
                                                   갤러리에서 가져오기
                                                </Text>
                                             </View>
                                          </Pressable>
                                       </Modal.Body>
                                       <Modal.Footer>
                                          <Button
                                             bg="black"
                                             onPress={() => {
                                                setShowModal(false);
                                             }}>
                                             취소
                                          </Button>

                                       </Modal.Footer>
                                    </Modal.Content>
                                 </Modal>
                              </HStack>
                              <View mt={4} mb={4} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                 <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                              </View>
                              <Input
                                 value={title}
                                 onChangeText={setTitle}
                                 bg="white"
                                 variant="unstyled"
                                 placeholder="글 제목"
                                 fontSize={16}
                                 _focus={{
                                    backgroundColor: "gray.100",
                                    borderColor: "none",
                                 }}
                              />
                              <View mt={4} mb={4} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                 <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                              </View>
                              <View zIndex={1} w="full">
                                 <HStack alignItems="center" justifyContent="space-between">
                                    <Text fontSize={18}>카테고리</Text>
                                    <Select
                                       mt={1}
                                       showsVerticalScrollIndicator="false"
                                       bg="white"
                                       fontSize={14}
                                       selectedValue={category} w="270"
                                       accessibilityLabel="Choose Service"
                                       placeholder="카테고리 선택"
                                       _selectedItem={{
                                          endIcon: <CheckIcon size="5" />
                                       }}
                                       onValueChange={selectedValue => setCategory(selectedValue)}>
                                       <Select.Item label="의류" value="의류" />
                                       <Select.Item label="도서" value="도서" />
                                       <Select.Item label="뷰티" value="뷰티" />
                                       <Select.Item label="전자기기" value="전자기기" />
                                       <Select.Item label="악세서리" value="악세서리" />
                                       <Select.Item label="미술품" value="미술품" />
                                       <Select.Item label="부동산" value="부동산" />
                                       <Select.Item label="차량" value="차량" />
                                       <Select.Item label="악기" value="악기" />
                                       <Select.Item label="기타" value="기타" />
                                    </Select>
                                 </HStack>
                              </View>
                              <View mt={4} mb={4} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                 <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                              </View>
                              <View width="full">
                                 <HStack space={2}
                                    alignItems="center"
                                    justifyContent="space-between"
                                 >
                                    <Text fontSize={18} textAlign="center">경매 방식</Text>
                                    <ToggleButton.Group
                                       onChange={(value) => {
                                          handleButton
                                       }}
                                       onValueChange={value => {
                                          setClickId(value)
                                          if (value == "blind") {
                                             setColor1("black");
                                             setColor2("white");
                                          }
                                          else {

                                             setColor1("white");
                                             setColor2("black");
                                          }
                                       }}
                                       value={clickedId}>
                                       <ToggleButton
                                          style={{ width: 130, backgroundColor: clickColor1 }}
                                          icon={() => <View><Text fontSize={20} color={clickColor2}>블라인드</Text></View>}
                                          value="blind"

                                       />
                                       <View margin={1} />
                                       <ToggleButton
                                          style={{ width: 130, backgroundColor: clickColor2 }}
                                          icon={() => <View><Text fontSize={20} color={clickColor1}>최저가</Text></View>}
                                          value="low"

                                       />
                                    </ToggleButton.Group>
                                 </HStack>
                              </View>
                              {clickedId == "low" ?
                                 <View>
                                    <View
                                       mt={4}
                                       mb={4}
                                       style={{ flexDirection: "row", alignItems: "center" }}
                                    >
                                       <View
                                          style={{ flex: 1, height: 1, backgroundColor: "black" }}
                                       />
                                    </View>
                                    <Input
                                       fontSize={15}
                                       selection={{
                                          
                                       }}
                                       onChangeText={(text) => { handleFixValue(text) }}
                                       value={fixvalue}
                                       textAlign="right"
                                       bg="white"
                                       variant="unstyled"
                                       keyboardType="numeric"
                                       _focus={{
                                          backgroundColor: "gray.100",
                                          borderColor: "none",
                                       }}
                                       pr={0}

                                       InputRightElement={
                                          <Text
                                             padding={0}
                                             fontSize={15}
                                             mb={0.2}
                                             mr={3}
                                          >
                                             ,000 원
                                          </Text>
                                       }
                                    /></View> : null}

                              <View
                                 mt={4}
                                 mb={4}
                                 style={{ flexDirection: "row", alignItems: "center" }}
                              >
                                 <View
                                    style={{ flex: 1, height: 1, backgroundColor: "black" }}
                                 />
                              </View>
                              <View>
                                 <HStack alignItems="center"
                                    justifyContent="space-between">
                                    <Text fontSize={18}>경매 기간</Text>
                                    <Radio.Group
                                       name="timeRadio"
                                       value={time}
                                       onChange={(value) => {
                                          setTime(value);
                                       }}
                                    >
                                       <HStack
                                          space={3}
                                       >
                                          <Radio colorScheme="black" value="24">
                                             24시간
                                          </Radio>
                                          <Radio colorScheme="black" value="48">
                                             48시간
                                          </Radio>
                                          <Radio colorScheme="black" value="72">
                                             72시간
                                          </Radio>
                                       </HStack>
                                    </Radio.Group>
                                 </HStack>
                              </View>
                              <View mt={4} mb={4} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                 <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                              </View>
                              <Input
                                 value={description}
                                 onChange={(e) => {
                                    setDescription(e.nativeEvent.text);
                                 }}
                                 multiline={true}
                                 onChangeText={setDescription}
                                 placeholderTextColor="grey"
                                 numberOfLines={10}
                                 scrollEnabled
                                 bg="white"
                                 variant="unstyled"
                                 placeholder="경매할 물품의 내용을 작성해 주세요"
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
                              <View mt={3}/>
                           </VStack>
                        </View>
                     </ScrollView>
                  </TouchableWithoutFeedback>
               </SafeAreaView>
            </SafeAreaProvider>
         </NativeBaseProvider>
      </>
   );
}

export default ProductRegisterScreen;