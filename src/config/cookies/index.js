import Cookies from 'universal-cookie';
import { authAxios } from '../axios/index';

const cookies = new Cookies();

const ACCESS_TOKEN = 'access_token';
const LOGGED_USER = 'user';

export const setAccessToken = async (access_token) => {
  await cookies.set(ACCESS_TOKEN, access_token, {
    sameSite: 'strict',
    path: '/',
    secure: false,
    httpOnly: false,
  });

  authAxios.defaults.headers.Authorization = `Bearer ${access_token}`;
};

export const getAccessToken = () => {
  const access_token = cookies.get(ACCESS_TOKEN);
  return access_token;
};

export const removeAccessToken = () => {
  cookies.remove(ACCESS_TOKEN);

  authAxios.defaults.headers.Authorization = 'Bearer ' + null;
  console.log('removeAccessToken');
};

export const setLoggedUser = (user) => {
  cookies.set(LOGGED_USER, user, {
    sameSite: 'strict',
    path: '/',
    secure: false,
    httpOnly: false,
  });
};

export const getLoggedUser = () => {
  const user = cookies.get(LOGGED_USER);
  if (!user) return null;
  return user;
};

export const removeLoggedUser = () => {
  cookies.remove(LOGGED_USER);
  console.log('removeLoggedUser');
};
