import { getUserTokens, saveUserTokens } from '@/utils/common/tokens';
import axios from 'axios';
const instance = axios.create({
  baseURL: process.env.API_URL,
});

instance.interceptors.request.use(
  async config => {
    const tokens = await getUserTokens();
    if (tokens) {
      config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const tokens = await getUserTokens();
      if (!tokens) {
        console.log('No tokens found');
        return Promise.reject(
          new Error('Session expired. Please log in again.'),
        );
      }

      try {
        const res = await instance.post('/auth/refresh-token', {
          refreshToken: tokens.refresh,
        });

        if (res.status === 200) {
          const {access, refresh} = res.data;

          instance.defaults.headers.common.Authorization = `Bearer ${access}`;
          originalRequest.headers.Authorization = `Bearer ${refresh}`;

          await saveUserTokens({access, refresh});
          console.log('Token refreshed');

          return instance(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;