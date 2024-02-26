import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const register = (name, email, password, re_password) => {
    setIsLoading(true);

    if(password != re_password){
      Alert.alert("Register Error", "Passwords does not match")
    }else{
      axios
        .post(`${BASE_URL}/register`, {
          "name": name,
          "email": email,
          "password": password,
        })
        .then(res => {
          let userInfo = res.data;
          setUserInfo(userInfo);
          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        })
        .catch(e => {
          console.error(`register error ${e}`);
        });
    }
    setIsLoading(false);
  };

  const login = (email, password) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/login`, {
        email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);
    AsyncStorage.removeItem('userInfo');
    setUserInfo({});
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

    } catch (e) {
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        register,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};