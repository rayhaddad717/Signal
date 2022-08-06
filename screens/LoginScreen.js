import { StyleSheet, View, Text } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
import { auth,signInWithEmailAndPassword } from '../firebase';
const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading,setIsLoading]=useState(true);
    useEffect(()=>{

            const unsubscribe = auth.onAuthStateChanged((authUser)=>{
                setIsLoading(false);
                if(authUser){
                    navigation.replace('Home');
                }
            })
            return unsubscribe;
    },[])
    const signIn = () => {
        signInWithEmailAndPassword(auth,email,password)
        .then((authUser)=>{
            console.log(authUser)
            navigation.replace('Home');
        })
        .catch(e=>alert(e.message))
    };
    return (
       isLoading ?<View style={styles.spinner}><StatusBar style="light" /></View>: <KeyboardAvoidingView style={styles.container}>
            <StatusBar style="light" />
            <Image source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/600px-Signal-Logo.svg.png?20201126050550'
            }}
                style={{
                    width: 200,
                    height: 200,
                    borderRadius:100,
                    marginBottom:50
                }}
            />
            <View style={styles.inputContainer}>
                <Input placeholder="Email" autofocus type="email" value={email} onChangeText={text => setEmail(text.trim())} />
                <Input placeholder="Password" onSubmitEditing={signIn} secureTextEntry type="password" value={password} onChangeText={text => setPassword(text)} />
            </View>
            <Button containerStyle={styles.button} title="Login" onPress={signIn} />
            <Button containerStyle={styles.button} type="outline" title="Register" onPress={() => navigation.navigate('Register')} />
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
        paddingTop:20,
        backgroundColor: 'white'
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10
    },
    spinner:{
        borderWidth:3,
        borderRadius:50,
        height:100,
        width:100,
    }
});

export default LoginScreen