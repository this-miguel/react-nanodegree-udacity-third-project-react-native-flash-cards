import { AsyncStorage } from 'react-native'
export const DECK_LIBRARY = 'MobileFlashcards:DeckLibrary';

export function initializeDeckLibrary(data){
  AsyncStorage.setItem(DECK_LIBRARY, JSON.stringify(data))
}

export function getDecks(){
  return AsyncStorage.getItem(DECK_LIBRARY)
    .then((data) => JSON.parse(data))
}

export function getDeck(key){
  return getDecks()
    .then(data => data[key])
}

export function newDeck(title) {
  return AsyncStorage.mergeItem(DECK_LIBRARY, JSON.stringify({
    [title]: {}
  }))
}