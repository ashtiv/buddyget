import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import GoogleButton from 'react-google-button';
import { auth } from './firebase';



function LoginForm() {
    const navigation = useNavigation();
    const [errorMessage, setErrorMessage] = useState('');
    const provider = new GoogleAuthProvider();

    async function handleLogin() {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                navigation.navigate('Dashboard');
            }).catch((error) => {
                const errorCode = error.code;
                const err = error.message;
                setErrorMessage(err)
            });
    }

    function handleSignup() {
        navigation.navigate('Signup');
    }

    const styles = StyleSheet.create({
        link: {
            color: 'blue',
            textDecorationLine: 'underline',
            fontSize: 20,
        },
    });

    return (
        <View style={{ padding: 24 }}>
            <GoogleButton
                onClick={handleLogin}
                style={{ marginBottom: 20 }}
            />
            {errorMessage && <Text>{errorMessage}</Text>}
        </View>
    );
}

export default LoginForm;