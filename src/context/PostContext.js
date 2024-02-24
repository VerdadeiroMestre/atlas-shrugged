import axios from 'axios';
import React, {createContext, useState} from 'react';
import {BASE_URL} from '../config';
import { Text, View } from 'react-native';

export const PostContext = createContext();

export const PostProvider = ({children}) => {
  const [postsList, setPostList] = useState({});
  const [user_name, setUserName] = useState({});

  const listPosts = () => {
      axios
    .post(`${BASE_URL}/list-posts`, {
      'my_posts': false,
    })
    .then(res => {
      let postsInfo = res.data;
      setPostList(postsInfo)
    })
    .catch(e => {
      console.log(`request error ${e}`);
    });
  }

  const createPost = (text, user_id) => {
    axios
      .post(`${BASE_URL}/post`, {
        "text": text,
        "user_id": user_id,
      })
      .then(res => {
        console.log(res.data);
        listPosts();
      })
      .catch(e => {
        console.log(`error ${e}`);
      });
  };
  
  const updatePost = (post_id, text) => {
    axios
      .post(`${BASE_URL}/update-post`, {
        "post_id": post_id,
        "text": text,
      })
      .then(res => {
        console.log(res.data);
        listPosts();
      })
      .catch(e => {
        console.log(`error ${e}`);
      });
  };
  
  const deletePost = (post_id) => {
    axios
      .post(`${BASE_URL}/delete-post`, {
        "post_id": post_id,
      })
      .then(res => {
        console.log(res.data);
        listPosts();
      })
      .catch(e => {
        console.log(`error deleting post ${e}`);
      });
  };

  const requestUserName = (post_id) => {
    console.log(post_id);
    axios
      .post(`${BASE_URL}/get-user-name`, {
        "post_id": post_id,
      })
      .then(res => {
        console.log(res.data);
        return <Text>{res.data}</Text>
      })
      .catch(e => {
        console.log(`error getting the name post ${e}`);
      });
    
  }

  const getUserName = ({post_id}) => (
    <View>{requestUserName({post_id : post_id})}</View>
  )


  return(
    <PostContext.Provider
      value={{
        postsList,
        user_name,
        listPosts,
        createPost,
        updatePost,
        deletePost,
        getUserName
      }}>
      {children}
    </PostContext.Provider>
  );

}