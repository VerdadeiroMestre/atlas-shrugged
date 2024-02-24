import React, {useState, useContext} from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import {AuthContext} from '../context/AuthContext';
import {PostContext} from '../context/PostContext';

const NewPost = ({navigation}) => {

    const {userInfo} = useContext(AuthContext);
    const [text, setText] = useState(null);
    const {createPost} = useContext(PostContext);

    const publish = () => {
        createPost(text,userInfo.id);
        navigation.goBack();
    }

    return (
        <View style={styles.sectionContainer}>
            <View>
                <Text style={styles.title}>What's in your mind?</Text>
            </View>
            <View style={styles.textBox}>
                <TextInput 
                    inputMode="text" 
                    multiline 
                    maxLength={280}
                    placeholder="Type here..."
                    onChangeText={text => setText(text)}
                    style={{fontSize: 21}} ></TextInput>
            </View>
            <View style={{alignItems: "center"}}>
                <TouchableOpacity style={styles.postButton} onPress={() => publish()}>
                    <Text style={styles.text}>post</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

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
  button: {
    backgroundColor: "#2E2E2E",
    paddingVertical: 15,
    alignItems: "center",
    padding: 13,
  },
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
  textBox: {
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 13
  },
  postButton: {
    backgroundColor: "#2E2E2E",
    paddingVertical: 15,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
  },
});

export default NewPost;