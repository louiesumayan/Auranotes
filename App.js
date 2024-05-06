import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import SlideScreens from './screens/SlideScreens';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ProfileScreen from './screens/ProfileScreen';
import useAuth from './hooks/useAuth';
import Notescreen from './app/screens/Notescreen';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function App() {
  const [users, setUser] = useState({});
  const findUser = async () => {
    const result = await AsyncStorage.getItem('userDummy');
    if (result !== null) {
      setUser(JSON.parse(result));
    }
  };

  useEffect(() => {
    findUser();
  }, []);

  // if (!users.name) return <Intro onFinish={findUser} />;

  const { user } = useAuth();
  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Notescreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="notescreen">
            {(props) => <Notescreen {...props} user={user} />}
          </Stack.Screen>
          <Stack.Screen name="profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="welcome" component={WelcomeScreen} />
          <Stack.Screen name="note" component={Notescreen} />
          <Stack.Screen name="slidescreens" component={SlideScreens} />
          <Stack.Screen name="loginscreen" component={LoginScreen} />
          <Stack.Screen name="signupscreen" component={SignupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
