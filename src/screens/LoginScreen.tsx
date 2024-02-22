import React, {useContext, useState} from "react";
import { View, Text, StyleSheet, TextInput, SafeAreaView, TouchableOpacity } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';

const LoginScreen = ({navigation}) =>{
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const {isLoading, login} = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.sectionContainer}>
        <Spinner visible={isLoading} />
        <Text style={styles.title}>Login</Text>
            <View>
                <View style={styles.inputContainer}>
                    <MaterialIcons name='alternate-email' size={21} style={styles.icon} />
                    <TextInput 
                        style={styles.input} 
                        placeholder="email"
                        keyboardType="email-address"
                        onChangeText={text => setEmail(text)} />
                </View>
                <View style={styles.inputContainer}>
                    <MaterialIcons name='key' size={21} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="password"
                        secureTextEntry={true}
                        onChangeText={text => setPassword(text)} />
                </View>
                <TouchableOpacity onPress={()=>{login(email, password);}} style={styles.buttom}>
                    <Text style={styles.buttomText}>Login</Text>
                </TouchableOpacity>

                <View style={{flexDirection: 'row', marginTop: 20}}>
                <Text>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.link}>Register</Text>
                </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 21,
    },
    title: {
        fontSize: 34,
        fontWeight: '600',
        marginBottom: 13
    },
    input: {
      fontSize: 24,
      fontWeight: '600',
      flex: 1
    },
    inputContainer: {
        flexDirection: 'row',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingVertical:0
    },
    icon: {
        marginTop: 18,
        marginRight: 5
    },
    buttom: {
        marginTop: 18,
        padding: 13,
        justifyContent: 'center',
        backgroundColor: '#aaa',
        borderRadius: 8,
        textAlign: 'center'
    },
    buttomText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 21,
        fontWeight: '600',
    },
  });

export default LoginScreen;