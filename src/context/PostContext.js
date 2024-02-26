import axios from 'axios';
import React, {createContext, useState} from 'react';
import {BASE_URL} from '../config';
import { Text, View } from 'react-native';

export const PostContext = createContext();

export const PostProvider = ({children}) => {
  const [postsList, setPostList] = useState({});

  const listPosts = () => {
      axios
    .get(`${BASE_URL}/posts`)
    .then(res => {
      let postsInfo = res.data;
      setPostList(postsInfo)
    })
    .catch(e => {
      console.error(`error listing posts ${e}`);
    });
  }

  const createPost = (text, user_id) => {
    axios
      .post(`${BASE_URL}/post`, {
        "text": text,
        "user_id": user_id,
      })
      .then(res => {
        listPosts();
      })
      .catch(e => {
        console.error(`error creating post${e}`);
      });
  };
  
  const updatePost = (post_id, text) => {
    axios
      .post(`${BASE_URL}/update-post`, {
        "post_id": post_id,
        "text": text,
      })
      .then(res => {
        listPosts();
      })
      .catch(e => {
        console.error(`error updating post ${e}`);
      });
  };
  
  const deletePost = (post_id) => {
    axios
      .delete(`${BASE_URL}/post/${post_id}`)
      .then(res => {
        listPosts();
      })
      .catch(e => {
        console.error(`error deleting post ${e}`);
      });
  };

  return(
    <PostContext.Provider
      value={{
        postsList,
        listPosts,
        createPost,
        updatePost,
        deletePost,
      }}>
      {children}
    </PostContext.Provider>
  );

}