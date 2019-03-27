// index.js

import { SEARCH_FILMS } from './types';
import axios from 'axios';

const apiUrl = 'https://api.exchangeratesapi.io/latest';

export const fetchFilms = (films) => {
  return {
    type: SEARCH_FILMS,
    films
  }
};

export const fetchAllFilms = () => {
  return (dispatch) => {
    return axios.get(apiUrl)
      .then(response => {
        dispatch(fetchFilms(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};