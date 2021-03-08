
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const startButton = document.getElementsByClassName('btn__reset')[0];
let start = document.getElementsByClassName('start');
const startOverlay = document.getElementsByClassName('main-container');
let images = document.getElementsByClassName('tries');
const phrases = ['how are you', 'i like to code', 'hail javascript', 'look up', 'whats nine plus ten'];
let missed = 0;
const title = document.getElementsByClassName('title')[0];
const tries = document.getElementsByClassName('tries');
const button = document.getElementsByTagName('BUTTON');


startButton.addEventListener('click', (e) => {
    //when you click the start button and the textContent is "Start Game" the overlay is hidden
    if (startButton.textContent === 'Start Game') {
    const Overlay = e.target.parentNode;
    Overlay.style.display = 'none';
    }
    //if the textContent of startButton is reset, the page will be reloaded
    if (startButton.textContent === 'Reset') {
      window.location.reload();
    }
});
//this function returns a random string from array of strings
function getRandomPhraseAsArray(arr) {
    const random = arr[Math.floor(Math.random()*arr.length)];
    return random
}
const phraseArray = getRandomPhraseAsArray(phrases);

//this function adds the random phrase to the DOM
function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    ul = document.getElementById('phrase');  
    const list = document.createElement('li');
    list.textContent = arr[i]
    
    ul.appendChild(list);
    if ( arr[i] !== " " ) {
        list.className = 'letter';
    } else {
        list.className = 'space';
    }
    
  }
}
addPhraseToDisplay(phraseArray)

//elements with className "letter"
const letters = document.getElementsByClassName('letter');

//the starting amount of elements with className "letter"
const letterLength = letters.length;

//this loop checks if the button value is equal to any letter in phrase

function checkLetter(button) {
  
  
  for ( let i = 0; i < letters.length; i++ ) {
      if ( button === letters[i].textContent ) {
        //if the button is equal to letters the letters will change className to "show"

          letters[i].className = 'show';
          // "button" value will be added to "letterFound"
          letterFound += button;
          
      }   
    } 
}



qwerty.addEventListener('click', (e) => {
    
    
    if ( e.target.tagName === 'BUTTON') {
      const button = e.target.textContent;
      //listening after clicks on DOM keyboard and disabling button after click
      e.target.className = 'chosen'
      e.target.disabled = true;
      //each click runs the checkLetter function to see if button clicked matches letter in phrase
      checkLetter(button)  
      checkLetter(button)
      //if the buttons textContent is not included in letterFound, the missed value goes up by one.
     if ( !letterFound.includes(button) ) {
       missed++
       //hides heart image is wrong word is guessed
       tries[missed-1].childNodes[0].style.display = 'none';
       
     } 
     //after each click the programs runs the win and loss function to see if you won or lost
     loss()
     win()
    } 
   
});

//if there have been 5 missed attempts, the start overlay will get classname of lose
//the new lose overlay will be displayed
function loss() {
  if (missed === 5) {
    overlay.className = 'lose';
    overlay.style.display = 'flex';
    title.textContent = 'YOU LOST!';
    startButton.textContent = 'Reset';
    //loop trough each button and disable it
    for (let i = 0; i < button.length; i++) {
      button[i].disabled = true;
    }
  }
}
//if the starting amount of lists with className letter, is equal to letterFound where all right guesses are stored
//the start overlay will get className win and be displayed
function win() {
  if (letterFound.length === letterLength) {
    overlay.className = 'win';
    overlay.style.display = 'flex';
    title.textContent = 'YOU WON!';
    startButton.textContent = 'Reset';
    //loop trough each button and disable it
    for (let i = 0; i < button.length; i++) {
      button[i].disabled = true;
    }
  }
}

let letterFound = '';
