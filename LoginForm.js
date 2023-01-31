import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import GoogleButton from 'react-google-button';
import { auth } from './firebase';
import { useSelector, useDispatch } from 'react-redux';


function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [errorMessage, setErrorMessage] = useState('');
    const provider = new GoogleAuthProvider();
    const dispatch = useDispatch();
    const loginUser = useSelector(state => state.loginUser);

    async function handleLogin() {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch({ type: 'LOGIN', user });
                navigation.navigate('Dashboard');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
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
            <Input
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCompleteType="email"
                label="Email"
                labelStyle={{ fontSize: 18, marginBottom: 8 }}
                inputStyle={{ borderWidth: 1, borderColor: '#ccc', padding: 8, fontSize: 16 }}
            />
            <Input
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry={true}
                autoCapitalize="none"
                autoCompleteType="password"
                label="Password"
                labelStyle={{ fontSize: 18, marginBottom: 8 }}
                inputStyle={{ borderWidth: 1, borderColor: '#ccc', padding: 8, fontSize: 16 }}
            />
            <View style={{ marginBottom: 16 }}>
                <Button title="Log in" onPress={handleLogin} />
            </View>
            <View style={{ marginBottom: 16 }}>
                <Button title="Create account" onPress={handleSignup} />
            </View>
        </View>
    );
}

export default LoginForm;