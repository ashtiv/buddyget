import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import GoogleButton from './assets/google-signin-button.png'

WebBrowser.maybeCompleteAuthSession();

const USER_KEY = 'user';

export default function LoginForm() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        androidClientId: '454714096775-ifeu4fu2rdqliocukp69as8r6en5u6ge.apps.googleusercontent.com',
        webClientId: '454714096775-78ium6fo1thl0ag4a5t05tlv54hp5o6v.apps.googleusercontent.com',
    });

    React.useEffect(() => {
        // Check if user is already logged in
        AsyncStorage.getItem(USER_KEY)
            .then(userString => {
                if (userString) {
                    const user = JSON.parse(userString);
                    if (user?.id != null && user?.id != undefined) {
                        dispatch({ type: 'LOGIN', user });
                        navigation.navigate('Dashboard');
                    }
                }
            })
            .catch(error => {
                console.error(error);
            });

        if (response?.type === 'success') {
            const { accessToken } = response.authentication;

            axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    const user = response.data;
                    dispatch({ type: 'LOGIN', user });
                    // Store user in local storage
                    AsyncStorage.setItem(USER_KEY, JSON.stringify(user))
                        .catch(error => {
                            console.error(error);
                        });
                    navigation.navigate('Dashboard');
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [response]);

    return (
        <TouchableOpacity disabled={!request}
            title="Login"
            onPress={() => {
                promptAsync();
            }}
            style={{ padding: 5, alignItems: 'center' }}
        >
            <Image
                style={{ height: 60, marginTop: 10, borderColor: 'black', borderWidth: 1, borderRadius: 1 }}
                source={GoogleButton}
            />
        </TouchableOpacity>
    );
}
