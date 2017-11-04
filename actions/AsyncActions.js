import api from '../utils/api'
import {
  NEW_DECK,
  GET_DECK,
  GET_DECKS,
  UPDATE_DECK,
  ADD_CARD
} from "./types";


const newDeck = (data) => (
  {
    type: NEW_DECK,
    data
  }
);

export const asyncNewDeck = (dispatch) => (title) => (
  api
    .newDeck(title)
    .then( data => dispatch( newDeck(data) ))
);

const getDecks = (data) => (
  {
    type: GET_DECKS,
    data
  }
);

export const asyncGetDecks = (dispatch) => () => {
  api
    .getDecks()
    .then( data => {
      dispatch( getDecks(data))
    })
};

const getDeck = (data) => (
  {
    type: GET_DECK,
    data
  }
);

export const asyncGetDeck = (dispatch) => (key) => () => {
  api
    .getDeck(key)
    .then( data => {
      dispatch( getDeck(data))
    })
};

const updateDeck = (data) => (
  {
    type: UPDATE_DECK,
    data
  }
);

export const asyncUpdateDeck = (dispatch) => (key, data) => {
  api
    .updateDeck(key, data)
    .then( data => {

      dispatch( updateDeck(data))
    })
};

const addCard = (data) => (
  {
    type: ADD_CARD,
    data
  }
);

export const asyncAddCard = (dispatch) => (key)  => (data) => {
  api
    .addCard(key, data)
    .then( data => {
      // data here is the updated deck where card was added.
      dispatch( addCard(data))
    })
};