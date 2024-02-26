import React from 'react'
import SetItemsForm from "../screens/SetItemsForms";
import { NativeBaseProvider } from 'native-base';

function BoardScreen({ navigation }) {
  
  return (
    <>
    <NativeBaseProvider>
      <SetItemsForm navigation={navigation} />
      </NativeBaseProvider>
    </>
  )
}

export default BoardScreen