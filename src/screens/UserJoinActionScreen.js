import React from 'react'
import { NativeBaseProvider } from 'native-base'
import JoinItemsForms from './JoinItemsForms';

function UserJoinActionScreen({ navigation }) {
  return (
    <NativeBaseProvider>      
      <JoinItemsForms navigation={navigation} />
    </NativeBaseProvider>
  )
}

export default UserJoinActionScreen