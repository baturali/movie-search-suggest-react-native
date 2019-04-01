import { combineReducers } from 'redux';
import films from './filmsReducer';

export default combineReducers({
    films: films
});