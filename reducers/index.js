import { combineReducers } from 'redux';
import currencies from './currencyReducer';

export default combineReducers({
    currencies: currencies
});