import { View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Text } from 'react-native-elements';
import { auth,createUserWithEmailAndPassword } from '../firebase';
const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageURL, setImageURL] = useState('');
    const register = () => {
        createUserWithEmailAndPassword(auth,email,password)
        .then(authUser=> {
    console.log('hi',authUser)
    authUser.user.update({
        displayName:name,
        photoURL:imageURL || 'https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png'
    })
})
.catch(Error=> alert(Error.message))
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to Login"
        })
    }, [navigation])
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{ marginBottom: 30 }}>
                Create a Signal Account
            </Text>
            <View style={styles.inputContainer}>
                <Input
                    style={styles.input}
                    placeholder="Full Name"
                    // autoFocus
                    type="text"
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <Input
                    style={styles.input}
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Input
                    style={styles.input}
                    placeholder="Password"
                    type="password"
                    value={password}
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                />
                <Input
                    style={styles.input}
                    placeholder="Profile Picture URL (optional)"
                    type="text"
                    value={imageURL}
                    onChangeText={text => setImageURL(text)}
                    onSubmitEditing={register}
                />
            </View>
            <View style={styles.buttonContainer}>

                <Button
                    raised
                    title="Register"
                    onPress={register}
                    style={styles.button} />
            </View>
            {/* <View style={{ height: 100 }} /> */}
        </View>
    )
}
const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
        backgroundColor: 'white'
    },
    inputContainer: {
        width: 300,
    },
    input: {
        // borderWidth: 2,
        // borderColor: 'gray',
        // padding:5,
        // borderRadius:12,

    },
    button: {
        width: 200,
        marginTop: 10,
        color: 'red'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: 300,
        justifyContent: 'flex-end',
        marginTop: 50
    }
}
export default RegisterScreen