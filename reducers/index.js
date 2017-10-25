import {GET_DECK, GET_DECKS, NEW_DECK, UPDATE_DECK, ADD_CARD} from '../actions/types'
export default function reducer(state={}, {data, type}) {
  switch (type) {

    case NEW_DECK :
    case GET_DECK :
    case UPDATE_DECK :
    case ADD_CARD : // This action returns the deck where the card was added.
      return {
        ...state,
        data
      };
    case GET_DECKS :
      return data;
    default :
          return state
    }
}