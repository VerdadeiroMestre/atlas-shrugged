import React, {useContext, useState, useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Moment from 'moment';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {PostContext} from '../context/PostContext';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL} from '../config';

const Post = ({postInfo, userInfo}) => {
  const {deletePost} = useContext(PostContext);
  const [user_name, setUserName] = useState([]);
  const navigation = useNavigation();

  const requestUserName = () => {
    axios
    .get(`${BASE_URL}/get-author/${postInfo.id}`)
    .then(res => {
      setUserName(res.data.name);
    })
    .catch(e => {
      console.error(`error getting the name post ${e}`);
    });
  }

  useEffect(() => {
    requestUserName();
  }, []);

    return (
      <View style={styles.postContainer}>
        <View style={styles.header}>
            <Text style={styles.name}>{user_name}</Text>
            <View style={styles.headerExtra}>
              <Text>{Moment(postInfo.created_at).format('M/D/Y')}</Text>
              {userInfo.id == postInfo.user_id &&
                <Menu>
                  <MenuTrigger>
                  <MaterialIcons name='more-vert' size={21} style={styles.more} />
                  </MenuTrigger>
                  <MenuOptions>
                    <MenuOption onSelect={() => navigation.navigate("UpdatePost",{post_id: postInfo.id,text:postInfo.text})}>
                      <Text><MaterialIcons name='edit' size={13} />  Edit</Text>
                    </MenuOption>
                    <MenuOption  onSelect={() => deletePost(postInfo.id)}>
                      <Text style={{color: 'red'}}><MaterialIcons name='delete' size={13} />  Delete</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              }
            </View>
        </View>
        <View style={styles.postBody}>
            <Text style={styles.text}>{postInfo.text}</Text>
        </View>
      </View>
      );
}


const styles = StyleSheet.create({
  postContainer: {
      marginTop: 13,
      marginHorizontal: 13,
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderRadius: 8
  },
  header: {
      width: '100%',
      paddingHorizontal: 8,
      paddingVertical: 8,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  headerExtra: {
    flexDirection: 'row',
  },
  more: {
    marginLeft: 13
  },
  postBody: {
    width: '100%',
    borderTopWidth: 1,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  text: {
    textAlign: 'justify'
  },
});

export default Post;
