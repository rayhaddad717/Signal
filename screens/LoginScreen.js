import { StyleSheet, View, Text } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator,KeyboardAvoidingView } from 'react-native';
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
        setIsLoading(true);
        signInWithEmailAndPassword(auth,email,password)
        .then((authUser)=>{
            setIsLoading(false);
            navigation.replace('Home');
        })
        .catch(e=>{alert(e.message);setIsLoading(false);})
    };
    return (
       isLoading ?<View style={styles.spinner}><StatusBar style="light" /><ActivityIndicator size="large" color="#2C6BED" /></View>: <KeyboardAvoidingView style={styles.container}>
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
        width:'100%',
        height:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }
});

export default LoginScreen