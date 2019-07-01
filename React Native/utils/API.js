import axios from 'axios';

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
  }
}
