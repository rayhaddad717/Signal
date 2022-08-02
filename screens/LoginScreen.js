import { StyleSheet, View, Text } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signIn = () => {

    };
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Image source={{
                uri: 'https://assets.mofoprod.net/network/images/signal_logo.width-250.jpg'
            }}
                style={{
                    width: 200,
                    height: 200
                }}
            />
            <View style={styles.inputContainer}>
                <Input placeholder="Email" autofocus type="email" value={email} onChangeText={text => setEmail(text)} />
                <Input placeholder="Password" secureTextEntry type="password" value={password} onChangeText={text => setPassword(text)} />
            </View>
            <Button containerStyle={styles.button} title="Login" onPress={signIn} />
            <Button containerStyle={styles.button} type="outline" title="Register" onPress={() => navigation.navigate('Register')} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10
    }
});

export default LoginScreen