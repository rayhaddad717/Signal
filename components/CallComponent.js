import { View, Text } from 'react-native'
import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
const CallComponent = () => {
    registerGlobals();
    const streams = useSelector(state=>state.userMedia);
  return (
    <View>
        {/* {streams.localMediaStream && 
    <RTCView
	mirror={true}
	objectFit={'cover'}
	streamURL={streams.localMediaStream.toURL()}
	zOrder={0}
/>} */}
<Text>Hi</Text>
    </View>
  )
}

export default CallComponent