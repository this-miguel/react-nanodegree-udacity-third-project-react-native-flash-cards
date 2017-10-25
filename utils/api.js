import { AsyncStorage } from 'react-native'
export const DECK_LIBRARY = 'MobileFlashcards:DeckLibrary';

export function initializeDeckLibrary(data){
  AsyncStorage.setItem(DECK_LIBRARY, JSON.stringify(data))
}

export function getDecks(){
  return AsyncStorage.getItem(DECK_LIBRARY)
    .then((data) => { return JSON.parse(data) })
}
