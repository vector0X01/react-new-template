import API from '../helpers/api';

export const getUserData = (request) => {
  const url = '/user/userbyemailid';
  return API.post(url, request);
};

export const getUserMenuAccess = (request) => {
  const url = '/menuaccess/fetch';
  return API.get(url, request);
};
