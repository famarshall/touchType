//https://www.youtube.com/watch?v=Yw-SYSG-028
//https://github.com/bradtraversy/wordbeater/tree/master/dist
// another versoin https://www.geeksforgeeks.org/design-a-typing-speed-test-game-using-javascript/

//how to connect to github https://www.youtube.com/watch?v=yhlArNbzWgE

window.addEventListener('load', init);

// Globals 


//available levels 
const levels = {
    easy: 5,
    medium: 3,
    hard: 2
}

//to change level
const currentLevel = levels.medium;  //aquí se llama la constante como  un objeto 


let time = currentLevel;
let score = 0;
let isPlaying;
let isTyping;

//DOm elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

var wordStartTimeS;
var wordEndTimeS;
var wordTime;

const words = [
    'speakers',
    'teta',
    'seno',
    'hola',
    'desde',
    'pirula',
    'chapalapachala'
];

//Initialize Game
function init() {
    console.log('init');
    isPlaying = false;

    //load word from array
    showWord(words);
    //start matching on word input 
    wordInput.addEventListener('input', startWord);
    wordInput.addEventListener("keydown", checkKeyPressed, false);

    // call countdown every second
    setInterval(countdown, 1000);
    //check game status
    setInterval(checkStatus, 50);
}

function checkKeyPressed(e) {
    if (e.keyCode === 32) {
        endWord();      
    }
}

//end typing, reinicilized isTyping and calculates wordSpeedP
function endWord() {

    // alert("The 'spacebar' key is pressed, resetting word count") //>> shows a popup message 
    isTyping = false;
    console.log("The 'spacebar' key is pressed, resetting word count");
    wordEndTimeS = Date.now();
    wordTime = wordEndTimeS - wordStartTimeS // 
    console.log('the word has ended, and in took %s to type', wordTime);

}

//start typing
function startWord() {
    console.log('typing...., isTyping Value is %s', isTyping); //check if code receives input

    if (!isTyping) {
        isTyping = true;
        wordStartTimeS = Date.now();
        console.log('a new word is being written, starting at %s', new Date(wordStartTimeS)); //log word start time

    } else {
        // do something with keystrokes in the middle of word typing, write data to table? compare char by char?

    }

}



//start match
function startMatch() {
    console.log('typing....') //check if code receives input

    if (matchWords()) {
        console.log('match!!');
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
    }
    //if score is -1, display 0
    if (score === -1) {
        scoreDisplay.innerHTML = 0;
    } else {
        scoreDisplay.innerHTML = score;
    }
}

//matchcurrentWord to wordInput
function matchWords() {
    console.log(wordInput.value);
    if (wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'Correct!!!';
        return true;
    }
    else {
        message.innerHTML = '';
        return false;
    }
}

//Pick and show random word
function showWord(words) {
    // create a random word, floor to be int, and multipy it by how many words there are (array len)
    const randIndex = Math.floor(Math.random() * words.length);

    //output random word
    currentWord.innerHTML = words[randIndex];
    getWordLength(currentWord.innerHTML)

}

//countdown timer
function countdown() {
    if (time > 0) {
        //Decrease time
        time--

    } else if (time === 0) {
        //Game is over
        isPlaying = false;
    }
    //Show time
    timeDisplay.innerHTML = time;
}

//check game status 
function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = 'GameOver!!';
        score = -1;

    }
}

//read word length (characters)
function getWordLength(word) {
    console.log("Word has %s characters", word.length);
    return word.length;

}

//get the timelog for each keystroke
function getCharSpeed() {


}