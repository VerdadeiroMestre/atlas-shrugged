import React, {useContext} from 'react';
import {Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import NewPostScreen from '../screens/NewPostScreen';
import UpdatePostScreen from '../screens/UpdatePostScreen';
import {AuthContext} from '../context/AuthContext';
import {PostProvider} from '../context/PostContext';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {userInfo} = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userInfo.id ? (
          <>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{headerShown: false}} />
            <Stack.Screen
              name="NewPost"
              component={NewPostScreen}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="UpdatePost"
              component={UpdatePostScreen}
              options={{headerShown: true}}
            />
          </>
            
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;