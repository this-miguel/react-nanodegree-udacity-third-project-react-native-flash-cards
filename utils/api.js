import { AsyncStorage } from 'react-native'
export const DECK_LIBRARY = 'MobileFlashcards:DeckLibrary';

const api = {
  initializeDeckLibrary: function (data){
    AsyncStorage.setItem(DECK_LIBRARY, JSON.stringify(data))
  },

  getDecks: () => (
    AsyncStorage.getItem(DECK_LIBRARY)
      .then((data) => JSON.parse(data))
  ),

  getDeck: function(key) {
    return this.getDecks()
      .then(data => data[key])
  },

  newDeck: function (title) {
    return AsyncStorage.mergeItem(DECK_LIBRARY, JSON.stringify({
      [title]: {
        title: title,
        questions:[],
      }
    }))
      // returns the new deck
      .then( () => this.getDeck(title))
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