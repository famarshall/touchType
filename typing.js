//https://www.youtube.com/watch?v=Yw-SYSG-028
//https://github.com/bradtraversy/wordbeater/tree/master/dist

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

//DOm elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

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

    //load word from array
    showWord(words);
    //start matching on word input 
    wordInput.addEventListener('input', startMatch)

    // call countdown every second
    setInterval(countdown, 1000);
    //check game status
    setInterval(checkStatus, 50);
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
    if(score === -1){
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