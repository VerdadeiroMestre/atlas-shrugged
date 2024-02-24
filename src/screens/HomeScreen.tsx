import React, {useContext, useEffect, useState} from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { MenuProvider } from 'react-native-popup-menu';
import {AuthContext} from '../context/AuthContext';
import {PostContext} from '../context/PostContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Post from '../components/Post';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const Home = ({navigation}) =>{
    const {userInfo, logout} = useContext(AuthContext);
    const {postsList, listPosts} = useContext(PostContext);

    useEffect(() => {
      listPosts();
    }, []);

    const header = () => {
      return (
        <View>
          <View style={styles.header}>
              <Text style={styles.headerText}>{userInfo.name}</Text>
              <Menu>
                  <MenuTrigger>
                    <MaterialIcons name='account-circle' size={55} />
                  </MenuTrigger>
                  <MenuOptions>
                    <MenuOption  onSelect={() => logout()}>
                      <Text style={{color: 'red'}}><MaterialIcons name='logout' size={13} />  Logout</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NewPost')}>
              <Text style={styles.text}>Post your ideas...</Text>
          </TouchableOpacity>
        </View>
      )
    }

    const renderPost = ({item}) => {
      return <Post postInfo={item} userInfo={userInfo}></Post>;
    }

    return (
        <MenuProvider>
          <View>
            <FlatList 
                data={postsList}
                renderItem={renderPost}
                ListHeaderComponent={header}
                keyExtractor={(item) => item.id}>
            </FlatList>
          </View>
        </MenuProvider>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 21,
        paddingVertical: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1
    },
    headerText: {
        fontSize: 21,
    },
    button: {
      backgroundColor: "#2E2E2E",
      paddingVertical: 15,
      alignItems: "center",
    },
    text: {
      color: "white",
      fontWeight: "700",
      fontSize: 18,
    },
  });
export default Home;