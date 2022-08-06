import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Button, Input } from 'react-native-elements'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons/faComments';
import { db, collection, addDoc, auth, getDocs } from '../firebase';
import { StatusBar } from 'expo-status-bar';
import { User } from '../interface/user';
import UserListItem from '../components/UserListItem';
const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUserID,setSelectedUserID]=useState('');
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat",
            headerBackTitle: 'Chats'
        })
    }, [navigation])
    useEffect(()=>{
        getUsers();

    },[])
    const getUsers = async ()=>{
        const querySnapshot = await getDocs(collection(db, "users"));
        const users=[];
        querySnapshot.forEach((doc) => {
          //console.log(doc.id, " => ", doc.data());
          users.push(new User({...doc.data()}));
        });
        setUsers(users)
    }
    const createChat = async () => {
        if(selectedUserID==''){
            alert("You must select another user to chat with!");
            return;
        }else if(input==''){
            alert("Your chat must have a name!");
            return;
        }
        try {
            await addDoc(collection(db, 'chats'), {
                chatName: input,
                ownerID: auth.currentUser.uid,
                otherUserID:selectedUserID
            });
            navigation.goBack()
        }
        catch (e) {
            alert(e)
        }
    }
    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <Input
                placeholder='Enter a chat name'
                value={input}
                onChangeText={text => setInput(text.trim())}
                onSubmitEditing={createChat}
                leftIcon={
                    <FontAwesomeIcon icon={faComments} />
                }
            />
           <ScrollView style={styles.scrollView}>
            {users.map(u=>(
                <UserListItem key={u.ID} {...u} isSelected={selectedUserID==u.ID} setSelectedUserID={setSelectedUserID}/>
            ))}
            </ScrollView>
            <Button disabled={!input||!selectedUserID} title="Create new chat" onPress={createChat} />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        padding: 30,
    },
    scrollView:{
        }
})