import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';

function SignupForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    function handleSignup() {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigation.navigate('Dashboard');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    function handleLogin() {
        navigation.navigate('Login');
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
                <Button title="Create account" onPress={handleSignup} />
            </View>
            <View style={{ marginBottom: 16 }}>
                <Text style={styles.link} onPress={handleLogin}>Already have account? Login</Text>
            </View>
        </View>
    );
}

export default SignupForm;
