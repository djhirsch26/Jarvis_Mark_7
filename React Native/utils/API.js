import axios from 'axios';
// import RNFetchBlob from 'react-native-fetch-blob'

import {
  BASE_URL,
  FILE_URL,
} from '../constants';

export const API = {

  testAuth(uid) {
    console.log(`${BASE_URL}/${FILE_URL}/test`)
    const request = axios.get(`${BASE_URL}/${FILE_URL}/test`, {headers: {authorization: `${uid}`}});
    // const request = axios.get(`${BASE_URL}`, message);
    return request;
  },

  ls(uid, path) {
    const request = axios.get(`${BASE_URL}/${FILE_URL}/ls`,
      {
        headers: {authorization: `${uid}`},
        params: {path}
     });
    return request;
  },

  fetch(uid, path) {
    // const request = axios.get(`${BASE_URL}/${FILE_URL}/fetch`,
    //   {
    //     headers: {authorization: `${uid}`},
    //     params: {path}
    //  });
    // return request;
    // return RNFetchBlob.config({
    //   fileCache : true,
    // }).fetch('GET', `${BASE_URL}/${FILE_URL}/fetch`, {
    //   headers: {authorization: `${uid}`},
    //   params: {path}
    // })
  }
}
