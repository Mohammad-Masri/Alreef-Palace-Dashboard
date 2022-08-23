import axios from 'axios';
import { showErrorSnackbarMessage, showWarningSnackbarMessage } from 'src/helper/snackbar';
import { getErrorMessageByCode } from 'src/server/error-codes';
import { getAccessToken } from '../cookies/index';

export const authAxios = axios.create();

// for error handling
authAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('error.message\n', error.message);
    console.log('error.response\n', error.response);
    const ERROR_CODE = error?.response?.data?.error?.code;
    if (error.message == 'Network Error') {
      showWarningSnackbarMessage('خطأ في الشبكة');
    } else {
      const message = getErrorMessageByCode(ERROR_CODE);
      showErrorSnackbarMessage(message);
    }
  }
);

authAxios.interceptors.request.use((config) => {
  const access_token = getAccessToken() || null;

  config.headers['Authorization'] = `Bearer ${access_token}`;
  return config;
});
