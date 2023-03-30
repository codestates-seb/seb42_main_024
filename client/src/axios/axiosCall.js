import axios from 'axios';

import { API } from '../config';

const axiosCall = async (url, method, data = null) => {
  try {
    const res = await axios({
      method,
      url,
      data,
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
    });
    return res;
  } catch (err) {
    const refresh = localStorage.getItem('refreshToken');
    try {
      if (err.response.data.code === 401 && refresh) {
        const refreshRes = await axios.get(`${API.MEMBER}/auth`, {
          headers: {
            Refresh: refresh,
            accept: 'application/json',
          },
        });
        localStorage.setItem('accessToken', refreshRes.headers.authorization);
        localStorage.setItem('refreshToken', refreshRes.headers.refresh);
        console.log(refreshRes);
        try {
          const res = await axios({
            method,
            url,
            data,
            headers: {
              Authorization: localStorage.getItem('accessToken'),
            },
          });
          return res;
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
};

export default axiosCall;
