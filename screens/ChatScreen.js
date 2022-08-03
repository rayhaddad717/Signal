import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Avatar } from 'react-native-elements'
import { db } from '../firebase'
import { StatusBar } from 'expo-status-bar'
export default function ChatScreen({navigation,route}) {
  useLayoutEffect(()=>{
    navigation.setOptions({
      headerTitle:route.params.chatName,
      headerTitleAlign:'left',
      headerBackTitleVisible:false,
      headerTitle:
        ()=>(<View
        style={{flexDirection:'row',
        alignItems:'center'}}>
          <StatusBar style='light'/>
          <Avatar 
          rounded
          source={{uri:route.params.imageURL}}
          />
          <Text
          style={{color:'white',marginLeft:10,fontWeight:'700'}}>
            {route.params.chatName}
            </Text>
          </View>)
      
    })
  },[])
  return (
    <View>
      <Text>ChatScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})