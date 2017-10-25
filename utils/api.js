import { AsyncStorage } from 'react-native'
export const DECK_LIBRARY = 'MobileFlashcards:DeckLibrary';

const api = {
  initializeDeckLibrary: function (data){
    AsyncStorage.setItem(DECK_LIBRARY, JSON.stringify(data))
  },
  getDecks: function (){
    return AsyncStorage.getItem(DECK_LIBRARY)
      .then((data) => JSON.parse(data))
  },
  getDeck: function (key){
    return this.getDecks()
      .then(data => data[key])
  },
  newDeck: function (title) {
    return AsyncStorage.mergeItem(DECK_LIBRARY, JSON.stringify({
      [title]: {}
    }))
  },
  updateDeck: function (key, data)  {
    // As this merges the data inside the DECK_LIBRARY, this will also creates the deck if it does not exist.
    return AsyncStorage.mergeItem(DECK_LIBRARY, JSON.stringify({
      [key]: data
    })).then( () => (
      // This part is just to return the updated deck.
      this.getDeck(key)
    ))
  }
};

export default api;