import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

function SignupForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    function handleSignup() {
        // Validate name, email, and password
        // Send a request to the server to create a new account
    }

    function handleLogin() {
        navigation.navigate('Login');
    }

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
                <Button title="Log in" onPress={handleLogin} />
            </View>
        </View>
    );
}

export default SignupForm;