import { SEARCH_FILMS } from '../actions/types';

export default function filmsReducer(state = [], action) {
  switch (action.type) {
    case SEARCH_FILMS:
      return [...state].concat(action.films.Search);
    default:
      return state;
  }
}