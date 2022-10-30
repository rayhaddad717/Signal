import { useState } from "react";
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
// import {RTCView } from "react-native-webrtc";
import { useSelector } from 'react-redux';
function CallComponent({ navigation, route }) {
  const userMedia = useSelector(state=>state.userMedia);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        {/* {userMedia.localMediaStream && <RTCView streamURL={userMedia.localMediaStream.toURL()} style={{ flex: 1 }} />} */}
      </View>
    </SafeAreaView>
  );
}

export default CallComponent;