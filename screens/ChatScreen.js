import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useLayoutEffect, useState, useRef, useEffect } from 'react'
import { Avatar } from 'react-native-elements'
import { db, serverTimestamp, query, addDoc, auth, collection, doc, collectionGroup, orderBy, where, onSnapshot } from '../firebase'
import { StatusBar } from 'expo-status-bar'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone';
import { faVideoCamera } from '@fortawesome/free-solid-svg-icons/faVideoCamera';
import { Ionicons } from '@expo/vector-icons'
import {setRemoteMediaStream, store,updateCallStatus} from '../store'
import {call as callAPI} from '../api/calling.js';
import { useSelector, useDispatch } from 'react-redux';
export default function ChatScreen({ navigation, route }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [otherUserID,setOtherUserID]=useState(route.params.otherUserID);
  const callStatus=useSelector(state=>state.callStatus);
  const dispatch = useDispatch();

  const messageScrollView = useRef(null);
    const call =  isVideo =>{
    callAPI({otherUserID,callerUserID:auth.currentUser.uid,callerName:auth.currentUser.displayName,isVideo});
    dispatch(updateCallStatus({...callStatus,isCalling:true, callerName:route.params.chatName,
    callerID:route.params.otherUserID}));
    navigation.navigate('Call');
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.chatName,
      headerTitleAlign: 'left',
      headerBackTitleVisible: false,
      headerTitle:
        () => (<View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          <StatusBar style='light' />
          <Avatar
            rounded
            source={{ uri: route.params.imageURL }}
          />
          <Text
            style={{ color: 'white', marginLeft: 10, fontWeight: '700' }}>
            {route.params.chatName}
          </Text>
        </View>),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 70,
            marginRight: 20
          }}>
          <TouchableOpacity  onPress={()=>{call(false);}}>
            <FontAwesomeIcon icon={faPhone} size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>call(true)}>
            <FontAwesomeIcon icon={faVideoCamera} size={20} color="white" />
          </TouchableOpacity>
        </View>
      )

    })
  }, [])

useEffect(()=>{
  setMessages(store.getState().messages.messages[route.params.ID]||[]);
  return store.subscribe(() => setMessages(store.getState().messages.messages[route.params.ID]))
},[])
  useEffect(() => {
    messageScrollView.current.scrollToEnd();
  }, [messages])
  const sendMessage = async () => {
    if(input.trim()=='') {setInput('');return;}
    setInput('')
    const messageRef = doc(db, "chats", route.params.ID);
    try {
      await addDoc(collection(messageRef, 'messages'), {
        timestamp: new Date().getTime(),
        message: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
        chatID: route.params.ID
      });
    }

    catch (e) { console.log("Error sending message", e) }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style='light' />
      <KeyboardAvoidingView
        // behavior={(Platform.OS!==undefined && Platform.OS === "ios") ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <>
            <ScrollView ref={messageScrollView} contentContainerStyle={{ paddingBottom: 10 }}>
              {messages.map(({ id, data }) => (
                data.email === auth.currentUser.email ?
                  <View key={id} style={styles.sender}><Text style={styles.senderText}>{data.message}</Text></View>
                  :
                  <View key={id} style={styles.receiver}><Text style={styles.receiverText}>{data.message}</Text></View>
              ))}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput onSubmitEditing={sendMessage} placeholder='Message' style={styles.textInput} value={input} onChangeText={text => setInput(text)} />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" size={24} color="#2b68e6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: '#ececec',
    padding: 10,
    color: "gray",
    borderRadius: 30
  },
  sender: {
    padding: 15,
    backgroundColor: '#ececec',
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginRight: 15,
    marginTop: 10,
    maxWidth: '80%',
    position: 'relative'
  },
  receiver: {
    padding: 15,
    backgroundColor: '#2868e6',
    alignSelf: 'flex-start',
    borderRadius: 20,
    marginLeft: 15,
    marginTop: 10,
    maxWidth: '80%',
    position: 'relative',
    color: 'white'
  }
})