import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { setUseCleartextTraffic } from 'expo-network';
import { signInWithEmailAndPassword, connectAuthEmulator, getAuth } from "firebase/auth";



function LoginForm() {
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    async function handleLogin() {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigation.navigate('Dashboard');
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage, " eeeeeeeee")
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
                <Text style={styles.link} onPress={handleSignup}>New Here? Create Account</Text>
            </View>
        </View>
    );
}

export default LoginForm;