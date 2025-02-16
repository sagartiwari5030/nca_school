import axios from 'axios';

import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.request.use(
  (req) => {
    // Check if browser is online before sending request
    if (!navigator.onLine) {
      axios.Cancel('Request canceled due to no internet connection.')
      // You can throw an error to stop the request if desired:
      throw new ('No internet connection! Please check your network and try again.');
    }
    return req;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

export const nativeFetcher = async (url, headers) => {
  const URL = `${HOST_API}${url}`
  const res = await axios.get(URL, { headers });
  return res.data;
}

export const poster = async (url, data, headers) => {
  const URL = `${HOST_API}${url}`
  const res = await axios.post(URL, data, { headers });
  return res.data;
}

export const puter = async (url, data, headers) => {
  const URL = `${HOST_API}${url}`
  const res = await axios.put(URL, data, { headers });
  return res.data;
}

export const deleter = async (url, headers) => {
  const URL = `${HOST_API}${url}`
  const res = await axios.delete(URL, { ...headers });
  return res.data;
}

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    check: '/auth/check',
    me: '/auth/profile',
    login: '/auth/login',
    register: '/auth/signUp1',
    logout: '/auth/logout'
  },
  otp: {
    send: '/otp/generate',
    verify: '/otp/verify'
  }, 
  patient: {
    list: '/user/fetchAll ',
    details: '/user/fetchOne',
    update: '/user/update',
    create: '/user/add',
    delete: '/user/deletePackage'
  }
};
