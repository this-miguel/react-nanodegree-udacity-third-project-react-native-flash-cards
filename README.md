## What is this about?

This is my submission for the third and final project of the [udacity](https://www.udacity.com/) [React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019). 
This training program has been developed in conjunction with [React Training](https://reacttraining.com).
This project is about learning about the basics of react native.

## What should this do?

Basically this app is about flash cards.
This app should allow you to create, collections of flashcards or decks, and add cards to a specific deck.
Cards represent what you will use as a flashcard, the front of the card contains a question or cue,
to make you remember the back of the card, where there should be an answer or something you want to remember.
You should be able see a list of the decks you have created, selecting a deck from the list should lead you to a deck menu
where you can choose between starting a quiz for the deck or add a card to it. You should be able  to review each deck, 
in a quiz view the app should allow to review the cards from a particular deck, 
you should  be able  to see the front and back of each card, and then inform the app if you have remembered the card or not, 
when you have reviewed all cards in a deck, the app should show you the results of the quiz, namely the number of correct answer you had in the quiz.
And off course all you should be able to navigate through all the screens in the app in the habitual ways mobile apps offer these days.


## Setup and installation
##### What do you need to run the app?
You must at least have node and npm installed in your machine, which you can get [here](https://www.npmjs.com/get-npm).

##### Do you know how to use git?
First of all, do you have git installed in your machine? As long as I know it comes preinstalled in any linux distro and also for mac, so you don't need to install it for those. If you are using other operative system go here to get [git](https://git-scm.com/downloads) so you can clone the repo.

##### Do you know how to clone a repo?
Go [here](https://help.github.com/articles/cloning-a-repository/) to know how if you don't.

#### Get an Android emulator or get the expo app from the android store
You can follow the instruction in expo documentation to set up the emulator, [click here](https://docs.expo.io/versions/latest/guides/genymotion.html)  to go there.
You can also test this app by getting the expo app in the google play store, [click here](https://expo.io/) to get it and read more about it.

### Install the app dependencies

After cloning this repo you have to  install for it dependencies, go inside the directory where repository was cloned and run this in the console:
```
npm install
```
Or if you use [yarn](https://yarnpkg.com/en/), simply run `yarn`.

### Start the app
After installing all dependencies you can start the app by running this inside the cloned repo directory:
```
npm run start
```
Or with yarn simply run `yarn start`.

Then when the packager has started, you'll be presented with a set of options to run the app. This app has been only tested in Android, both with a real device and with a emulator, 
so you should start the android option by typing `a`, to run the app in a real device type `q` from the menu to show a QR code
that you will be able to scan with the expo app from the google play store mentioned above, and after scanning it the app will boot in your device.

## Create React App
This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).
## Thank you!
__Thanks for taking some of your time to take a look of my project!__