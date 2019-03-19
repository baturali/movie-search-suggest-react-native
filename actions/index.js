// index.js

import { FETCH_CURRENCIES } from './types';
import axios from 'axios';

const apiUrl = 'https://api.exchangeratesapi.io/latest';

export const fetchCurrencies = (currencies) => {
  return {
    type: FETCH_CURRENCIES,
    currencies
  }
};

export const fetchAllCurrencies = () => {
  return (dispatch) => {
    return axios.get(apiUrl)
      .then(response => {
        dispatch(fetchCurrencies(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};