import { SERVER_BASE_URL } from '../../src/config';
import axios from 'axios';

const url = `${SERVER_BASE_URL}/playlist/`;

export default {
  removeItem: item => {
    const options = {
      method: 'delete',
      data: item,
      url
    };
    return axios(options);
  },
  getPlaylistData: () => {
    return axios.get(url);
  },
  addVideoItem: videoItem => {
    const options = {
      method: 'post',
      data: videoItem,
      url
    };
    return axios(options);
  }
};
