import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet, TextInput, SafeAreaView, Touchable, TouchableOpacity } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

const RegisterScreen = ({navigation}) =>{
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [re_password, setRePassword] = useState(null);

    const {isLoading, register} = useContext(AuthContext);
    return (
        <SafeAreaView style={styles.sectionContainer}>
        <Spinner visible={isLoading} />
        <Text style={styles.title}>Register</Text>
            <View>
                <View style={styles.inputContainer}>
                    <MaterialIcons name='person' size={21} style={styles.icon} />
                    <TextInput 
                        style={styles.input} 
                        placeholder="name"
                        keyboardType="email-address"
                        onChangeText={text => setName(text)} />
                </View>
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
                <View style={styles.inputContainer}>
                    <MaterialIcons name='key' size={21} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="confirm password"
                        secureTextEntry={true}
                        onChangeText={text => setRePassword(text)}  />
                </View>
                <TouchableOpacity onPress={()=>{register(name, email, password,re_password);}} style={styles.buttom}>
                    <Text style={styles.buttomText}>Register</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', marginTop: 20}}>
                <Text>Already have an accoutn? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}>Login</Text>
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
        backgroundColor: '#CBB071',
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

export default RegisterScreen;