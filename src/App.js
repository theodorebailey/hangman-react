import React, { useState, useEffect } from 'react';

// Import all components
import { Header, Footer } from './components/common';
import Figure from './components/Figure';
import Wrongletters from './components/Wrongletters';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';

// We want to build our App, then identify what states we require
// Simple, we don't need state management
import './App.css';

const words = ['application', 'programming', 'interface', 'wizard'];

// words, round down Math.random in relation to length of dictionary - pass as prop
let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

// state management
const correctLetters = [];
const wrongLetters = [];


function App() {

  const [playable, setPlayable] = useState(true); 
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);

  // use effect will use any side effects of our app
  // By adding our event listener here, everytime our app re-renders our event listener will be added
  useEffect(() => {
    // our event has parameters
    const handleKeydown = event => {
    const {key, keyCode} = event;
      // if playable true and event object keyCode is between alphabet range
      // ensure letters read as such - if letter key
      if (playable && keyCode >= 65 && keyCode <= 90) {
        // set letter to lowerCase
        const letter = key.toLowerCase();
        // Now if the selected word contains the letter (passed as parameter)
        if (selectedWord.includes(letter)) {
          // if correct letters doesn't include the letter
          if (!correctLetters.includes(letter)) {
            // setCorrectLetters to currentLetters, spread operator for currentLetters, then add new letter evaluated to true
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
            // run display word function
          } else {
            // showNotification();
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(wrongLetters => [...wrongLetters, letter]);
          } else {
            // showNotification();
          }
        }
      }
  }
  // use effect will help with event listener
  // everytime it renders we don't want to readd an event listener meaning we need to clean up after each render
  window.addEventListener('keydown', handleKeydown);

  // clean up so we only have one event listener running each time
  return () => window.removeEventListener('keydown', handleKeydown);

  // the empty array will stop this being called everytime the app renders - blank array will make it run only on initial render
  // anytime correctLetters, wrongLetters and playable get updated will call this function, and on initial render
  }, [correctLetters, wrongLetters, playable]);


   return (
    <div className="App">
      <Header />
      <div className="container">
        <Figure />
        <Wrongletters wrongLetters={wrongLetters} />
        {/* pass down as props */}
        <Word selectedWord={selectedWord} correctLetters={correctLetters}/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
