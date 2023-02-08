import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


WebBrowser.maybeCompleteAuthSession();

export default function App() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        androidClientId: '454714096775-ifeu4fu2rdqliocukp69as8r6en5u6ge.apps.googleusercontent.com',
        webClientId: '454714096775-78ium6fo1thl0ag4a5t05tlv54hp5o6v.apps.googleusercontent.com',
    });

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { accessToken } = response.authentication;

            axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    const user = response.data;
                    dispatch({ type: 'LOGIN', user })
                    navigation.navigate('Dashboard');
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [response]);

    return (
        <Button
            title="Login"
            onPress={() => {
                promptAsync();
            }}
        />
    );
}
