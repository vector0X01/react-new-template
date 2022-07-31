import axios from 'axios';
import { Auth } from 'aws-amplify';
import { config } from './config';
// import { store } from '../redux/store';
import { authenticate } from '../redux/slice/authSlice';

const instance = axios.create({
  baseURL: config.HostURL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('pd-token');
    if (token) {
      config.headers.Authorization = token;
      config.headers['Accept'] = 'application/json';
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const onCatch = (err) => {
  if (err.response?.status === 401) {
    Auth.signOut();
    localStorage.removeItem('pd-token');
    // store.dispatch(authenticate(false));
  }
};

const ApiService = {
  async get(url, data, config) {
    try {
      const res = await instance.get(url, data, config);
      return res.data;
    } catch (reason) {
      onCatch(reason);
      return await Promise.reject(reason);
    }
  },

  async post(url, data, config) {
    try {
      const res = await instance.post(url, data, config);
      return res.data;
    } catch (reason) {
      onCatch(reason);
      return await Promise.reject(reason);
    }
  },

  async put(url, data, config) {
    try {
      const res = await instance.put(url, data, config);
      return res.data;
    } catch (reason) {
      onCatch(reason);
      return await Promise.reject(reason);
    }
  },

  async delete(url) {
    try {
      const res = await instance.delete(url);
      return res.data;
    } catch (reason) {
      onCatch(reason);
      return await Promise.reject(reason);
    }
  },

  awaitAll() {
    return axios
      .all(Array.from(arguments))
      .then(axios.spread((...responses) => responses))
      .catch((reasons) => Promise.reject(reasons));
  },
};

export default ApiService;
