import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import { Avatar, Button, Text } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth, getDocs, collection, db, query, where, onSnapshot,collectionGroup,orderBy } from '../firebase';
import CustomListItem from '../components/customListItem';
import { useEffect, useLayoutEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowRightFromBracket';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { Chat } from '../interface/chat';
import { User } from '../interface/user';
import {store,update} from '../store'
const HomeScreen = ({ navigation }) => {
  const [myChats, setMyChats] = useState([]);
  const [theirChats, setTheirChats] = useState([]);
  const [allChats, setAllChats] = useState([]);

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
    const unsubscribeOwnerChat = onSnapshot(queryOwner, async(snapshot) => {
  
      const newChats = [...myChats];
      await Promise.all(snapshot.docChanges().map(async(change) => {
        const u = await User.getByID(change.doc.data().otherUserID);
        const displayName = u.FullName;
        const imageURL = u ? u.imageURL : 'https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png';
        newChats.push(new Chat({ ...change.doc.data(), ID: change.doc.id, imageURL ,otherUserName:displayName}))
        }))
      setMyChats(newChats)
    })

    const queryOther = query(chatRef, where('otherUserID', '==', auth.currentUser.uid));

    const unsubscribeOtherUser = onSnapshot(queryOther, async(snapshot) => {
      const newChats = [...theirChats];
      await Promise.all(snapshot.docChanges().map(async(change) => {
        const u = await User.getByID(change.doc.data().ownerID);
        const imageURL = u ? u.imageURL : 'https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png';
        const displayName = u.FullName;
        newChats.push(new Chat({ ...change.doc.data(), ID: change.doc.id, imageURL,otherUserName:displayName }))
        }))
      setTheirChats(newChats)
    });
     const messageQuery = query(collectionGroup(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(messageQuery, (querySnapshot) => {
      const m = []
      
      querySnapshot.forEach((doc) => {
        m.push({
          id: doc.id,
          data: doc.data()
        })
      })
      store.dispatch(update(m));

    })
    return () => {
      unsubscribeOtherUser();
      unsubscribeOwnerChat();
      unsubscribe();
    }
  }, [])
  const setUnique = (chats) => {
    chats.reverse()
    setAllChats(chats.filter((c, index) => (chats.findIndex(ch => ch.ID == c.ID) === index)
    ))
  }
  useEffect(() => {
    setUnique([...myChats, ...theirChats])
  }, [myChats, theirChats])
  const enterChat = (ID, chatName, imageURL) => {
    navigation.navigate('Chat', {
      ID,
      chatName,
      imageURL
    })
  }
  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <ScrollView style={styles.container}>
        {allChats.map((chat, id) => (
          <CustomListItem recentMessage={store.getState().messages[chat.ID]||[]} key={chat.ID + id} ID={chat.ID} chatName={chat.otherUserName} enterChat={enterChat} imageURL={chat.imageURL} />

        ))}
      </ScrollView>

    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
  }
})