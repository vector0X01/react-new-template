import API from '../helpers/api';

export const fetchClients = (request) => {
  const url = '/client/all';
  return API.get(url, request);
};
