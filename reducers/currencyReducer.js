import { FETCH_CURRENCIES } from '../actions/types';

export default function currencyReducer(state = [], action) {
  switch (action.type) {
    case FETCH_CURRENCIES:
      return action.currencies;
    default:
      return state;
  }
}