import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import { Avatar, Button, Text } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth, getDocs, collection, db, query, where,onSnapshot } from '../firebase';
import CustomListItem from '../components/customListItem';
import { useEffect, useLayoutEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowRightFromBracket';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { Chat } from '../interface/chat';
import { User } from '../interface/user';
const HomeScreen = ({ navigation }) => {
  const [myChats, setMyChats] = useState([])
  const signOut = () => {
    Alert.alert(
      "Signing Out",
      "Are You Sure?",
      [
        {
          text: "Yes",
          onPress: () => auth.signOut()
            .then(() => {
              navigation.replace('Login');
            }),
          style: "ok"
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
      ]
    );


  }
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: 'black',
      },
      headerLeft: () => <View style={{ marginLeft: 20 }}>
        <Avatar
          rounded
          source={{
            uri: auth?.currentUser?.photoURL
          }}
        />
      </View>,
      headerRight: () => <View style={{ marginRight: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', width: 100 }}>
        <View>
          <TouchableOpacity
            activeOpacity={0.5}>
            <AntDesign name='camerao' size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('AddChat')}
          >
            <SimpleLineIcons name='pencil' size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={signOut}>

            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </TouchableOpacity>
        </View>

      </View>

    })
  }, [navigation])

  useEffect(() => {
    const chatRef = collection(db, 'chats');
    const queryOwner = query(chatRef, where('ownerID', '==', auth.currentUser.uid));
    const unsubscribeOwnerChat = onSnapshot(queryOwner, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        User.getByID(change.doc.data().otherUserID).then(u=>{
          const imageURL = u ? u.imageURL: 'https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png';
          setUnique([...myChats,new Chat({ ...change.doc.data(), ID: change.doc.id,imageURL })])
        })
        .catch(e=>alert(e))
      });})
    
    const queryOther = query(chatRef, where('otherUserID', '==', auth.currentUser.uid));
   
    const unsubscribeOtherUser = onSnapshot(queryOther, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        setUnique([...myChats,new Chat({ ...change.doc.data(), ID: change.doc.id })])
      });
    });
    return ()=>{
      unsubscribeOtherUser();
      unsubscribeOwnerChat();
    }
  }, [])
  const setUnique=(chats)=>{
  chats.reverse()
   setMyChats(chats.filter((c, index) => 
       (chats.findIndex(ch=>ch.ID==c.ID) === index)
    ))
  }
  const enterChat = (ID,chatName,imageURL)=>{
    navigation.navigate('Chat',{
      ID,
      chatName,
      imageURL
    })
  }
  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <ScrollView style={styles.container}>
        {myChats.map(chat=>(
          <CustomListItem key={chat.ID} ID={chat.ID} chatName={chat.chatName} enterChat={enterChat} imageURL={chat.imageURL}/>

        ))}
      </ScrollView>

    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    height:'100%'
  }
})