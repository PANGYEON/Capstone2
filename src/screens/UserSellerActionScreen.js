import React from 'react'
import { NativeBaseProvider } from 'native-base'
import SellerItemsForm from './SellerItemsForms';

function UserSellerActionScreen({ navigation }) {
  return (
    <NativeBaseProvider>      
      <SellerItemsForm navigation={navigation} />      
    </NativeBaseProvider>
  )
}

export default UserSellerActionScreen