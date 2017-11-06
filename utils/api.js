import { AsyncStorage } from 'react-native'
import help from './helpers'
export const DECK_LIBRARY = 'MobileFlashcards:DeckLibrary';

 const {replaceWhiteSpaces} =  help;

const api = {
  initializeDeckLibrary: function (data){
     return AsyncStorage.setItem(DECK_LIBRARY, JSON.stringify(data))
  },

  deleteDeckLibrary: () => (AsyncStorage.removeItem(DECK_LIBRARY)),

  getDecks: function() {
     return AsyncStorage.getItem(DECK_LIBRARY)
      .then((data) => {
        if (data === null) {
          // this should run only the first time the app boots. When the DECK_LIBRARY does not exist.
          this.initializeDeckLibrary({});
          return {}
        } else {
          // Any other time should return the data stored.
          return JSON.parse(data)
        }
      })
  }
  ,

  getDeck: function(key) {
    return this.getDecks()
      .then(data => data[key])
  },

  newDeck: function (title) {
    return AsyncStorage.mergeItem(DECK_LIBRARY, JSON.stringify({
      [replaceWhiteSpaces(title)]: {
        title: title.trim(),
        questions:[],
      }
    }))
      // returns the new deck
      .then( () => this.getDeck( replaceWhiteSpaces(title) ))
  },

  updateDeck: function (key, data) {
    // As this merges the data inside the DECK_LIBRARY, this will also creates the deck if it does not exist.
    return AsyncStorage.mergeItem(DECK_LIBRARY, JSON.stringify({
      [key]: data
    })).then(() => (
      // This part is just to return the updated deck.
      this.getDeck(key)
    ))
  },
  addCard: function (deckKey, card) {
    return this.getDeck(deckKey)
      .then( (oldDeck) => {
        return {
          ...oldDeck,
          questions: [
            ...oldDeck.questions,
            card
          ]
        };
      })
      .then(updatedDeck => this.updateDeck(deckKey, updatedDeck) )
  },
};

export default api;