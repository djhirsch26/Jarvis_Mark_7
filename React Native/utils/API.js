import axios from 'axios';

import {
  BASE_URL,
  FILE_URL,
  FILE_TYPE,
} from '../constants';

import RNFetchBlob from 'rn-fetch-blob'

export function getType(file) {
  var re = /(?:\.([^.]+))?$/;
  var ext = re.exec(file)[1];

  console.log(ext)

  switch(ext) {
    case 'mp3':
    case 'mp4':
    case 'wav':
      return FILE_TYPE.MEDIA
    default:
      return FILE_TYPE.FILE
  }
}

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
    const request = RNFetchBlob.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache : true,
      path: RNFetchBlob.fs.dirs.DocumentDir + path
    }).fetch('post', 'http://localhost:3000/file/fetch', {
      authorization: `${uid}`,
      'Content-Type': 'application/json'
    }, JSON.stringify({
      path: path
    }))

    return request;

  }
}
