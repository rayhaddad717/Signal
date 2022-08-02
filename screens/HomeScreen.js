import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

const HomeScreen = () => {
  return (
    <View>
        <StatusBar style="light"/>
      <Text>This is home</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})