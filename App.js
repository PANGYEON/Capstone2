import { NativeBaseProvider, StatusBar } from "native-base";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//회원 인증
import LoginScreen from "./src/screens/AuthScreen/LoginScreen";
import RegisterScreen from "./src/screens/AuthScreen/RegisterScreen";
import IdSearchScreen from "./src/screens/AuthScreen/IdSearchScreen";
import IdResultScreen from "./src/screens/AuthScreen/IdResultScreen";
import PwSearchScreen from "./src/screens/AuthScreen/PwSearchScreen";
import PwResultScreen from "./src/screens/AuthScreen/PwResultScreen";

import ProfileScreen from "./src/screens/ProfileScreen";
import SingleProductScreen from "./src/screens/SingleProductScreen";
import BoardScreen from "./src/screens/BoardScreen";
import Bottom_Navi from "./src/screens/BottomNavi";
import ProductRegisterScreen from "./src/screens/ProductRegisterScreen";
import SetItemsForms from "./src/screens/SetItemsForms";
import SettingScreen from "./src/screens/SettingScreen";
import QAScreen from "./src/screens/QAScreen";
import MoneyScreen from "./src/screens/MoneyScreen";
import MoneyOutScreen from "./src/screens/MoneyOutScreen";
import UserJoinActionScreen from "./src/screens/UserJoinActionScreen";
import UserSellerActionScreen from "./src/screens/UserSellerActionScreen";
import SplashScreen from "./src/screens/SplashScreen";

const Stack = createNativeStackNavigator()

export default function App() {
  const [splash, setSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => { setSplash(false) }, 3000);
  }, []);

  return (
    <>      
        <NativeBaseProvider>
        {splash ? <SplashScreen /> :
          <NavigationContainer>
            <StatusBar hidden={false} />
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="ID_Search" component={IdSearchScreen} />
              <Stack.Screen name="ID_Result" component={IdResultScreen} />
              <Stack.Screen name="PW_Search" component={PwSearchScreen} />
              <Stack.Screen name="PW_Result" component={PwResultScreen} />

              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="Board" component={BoardScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Single" component={SingleProductScreen} />
              <Stack.Screen name="Bottom_Navi" component={Bottom_Navi} />
              <Stack.Screen name="SetItem" component={SetItemsForms} />
              <Stack.Screen name="Setting" component={SettingScreen} />
              <Stack.Screen name="QA" component={QAScreen} />
              <Stack.Screen name="Money" component={MoneyScreen} />
              <Stack.Screen name="MoneyOut" component={MoneyOutScreen} />
              <Stack.Screen name="ProductR" component={ProductRegisterScreen} />
              <Stack.Screen name="UserSeller" component={UserSellerActionScreen} />
              <Stack.Screen name="UserJoin" component={UserJoinActionScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        }
        </NativeBaseProvider>
      
    </>
  );
}
