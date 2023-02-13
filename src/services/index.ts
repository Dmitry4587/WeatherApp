import axios from 'axios';
import { User } from '../app/slices/user/types';
import { CityResponses } from '../app/slices/city/types';

export enum ServicesMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export const fetchUser = async (url: string, method: ServicesMethods, data?: User) => {
  const res = await axios[method]<User[]>(`${'https://630ddb7fb37c364eb70d1aa6.mockapi.io'}/${url}`, data);
  if (!res.data.length && Array.isArray(res.data)) {
    throw Error('Error try changing data');
  }
  if (res.data.length === 1) {
    return res.data[0];
  }
  return res.data;
};

export const fetchCity = async (url: string, method: ServicesMethods) => {
  const options = {
    method,
    url: `https://weatherapi-com.p.rapidapi.com/${url}`,
    headers: {
      'X-RapidAPI-Key': 'b0ac9c540bmshddc5d40949f1d88p181837jsn0a5dd8e03f47',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
    },
  };
  const res = await axios.request<CityResponses>(options);

  return res.data;
};
