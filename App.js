import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './Dashboard';
import { LogBox } from 'react-native';
import { ReduxProvider } from './store';
import LoginForm from './LoginForm';


function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();
  return (
    <ReduxProvider>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen
            name="Login2"
            component={LoginForm}
            options={{ title: 'Login', headerLeft: null, headerTitleAlign: 'center' }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ title: 'Dashboard', headerLeft: null, headerTitleAlign: 'center' }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}

export default App;