import React, { useRef, useEffect } from 'react'
import { Center, Image, Text, View } from 'native-base';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function SplashScreen() {

   return (
      <>
         <SafeAreaProvider>
            <SafeAreaView flex={1} >
               <View flex={1} justifyContent="center" alignItems="center">
                  <Center>
                     <Image
                        source={require("../assets/splashImage.png")}
                        alt="splash"
                        w={48}
                        h={48}                        
                     />
                  </Center>
               </View>
            </SafeAreaView>
         </SafeAreaProvider>
      </>
   )
}

export default SplashScreen