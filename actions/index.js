import { SEARCH_FILMS } from './types';
import axios from 'axios';

const apiUrl = 'http://www.omdbapi.com/?s=';
const apiKey = '4dfc64fa';

export const fetchFilms = (films, changed) => {
  return {
    type: SEARCH_FILMS,
    films,
    changed
  }
};

export const fetchAllFilms = (query, currentPage, queryChanged) => {
  return (dispatch) => {
    if(query && query.length) {
      axios.get(apiUrl + query + '&page='+currentPage+'&apikey=' + apiKey)
      .then((response) => {
        if (response.data.Response === 'False') alert('Movie Not Found!')
        else dispatch(fetchFilms(response.data, queryChanged))
      })
      .catch(error => {
        alert(error)
      })
    }
  };
};