import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';
import { useSelector, useDispatch } from 'react-redux';
import ActivityModal from './ActivityModal';

function SignupForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const loginUser = useSelector(state => state.loginUser);


    function handleSignup() {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch({ type: 'LOGIN', user })
                navigation.navigate('Dashboard');
                setLoading(false);

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMess = error.message;
                setErrorMessage(errorMess);
                setLoading(false);
            });
    }

    function handleLogin() {
        navigation.navigate('Login');
    }

    return (
        <View style={{ padding: 24 }}>
            <ActivityModal loading={loading} />
            <Input
                value={name}
                onChangeText={setName}
                placeholder="Full name"
                label="Full name"
                labelStyle={{ fontSize: 18, marginBottom: 8 }}
                inputStyle={{ borderWidth: 1, borderColor: '#ccc', padding: 8, fontSize: 16 }}
            />
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
                <Text style={{ color: 'red' }}>{errorMessage}</Text>
            </View>
            <View style={{ marginBottom: 16 }}>
                <Button title="Create account" onPress={handleSignup} />
            </View>
            <View style={{ marginBottom: 16 }}>
                <Button title="Log in" onPress={handleLogin} />
            </View>
        </View>
    );
}

export default SignupForm;