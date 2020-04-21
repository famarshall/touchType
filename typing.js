//https://www.youtube.com/watch?v=Yw-SYSG-028
//https://github.com/bradtraversy/wordbeater/tree/master/dist
// another versoin https://www.geeksforgeeks.org/design-a-typing-speed-test-game-using-javascript/

//how to connect to github https://www.youtube.com/watch?v=yhlArNbzWgE

window.addEventListener('load', init);

// Globals testbgoode


//available levels 
const levels = {
    easy: 20,
    medium: 3,
    hard: 2
}

//to change level
const currentLevel = levels.easy;  //aquí se llama la constante como  un objeto 


let time = currentLevel;
let score = 0;
let isPlaying;
let isTyping;

//Dom elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

var wordStartTimeS;
var wordEndTimeS;
var wordTime;
var typed_char;
var backspaces;

const words = [
    'vamos a ver',
    'desde que te vi',
    'hola, cómo estás?',
    'hola amigo',
    'es muy importante',
    'taringa la minga',
    'pero probablemente'
];

//Initialize Game
function init() {
    console.log('init');
    isPlaying = false;
    typed_char = 0
    //load word from array
    showWord(words);
    //start matching on word input 
    wordInput.addEventListener('keyup', startWord);
    wordInput.addEventListener('keyup', checkKeyPressed, false);

    // call countdown every second
    setInterval(countdown, 1000);
    //check game status
    setInterval(checkStatus, 50);
}
//if spacebar is pressed endWord
function checkKeyPressed(e) {
   
    //32 spacebar
   /* if (e.keyCode === 32) {
       //do something with spacebar 
    }*/

    //8 backspace
    if (e.keyCode === 8) {
        backspaces++;
        
        console.log("backspace hit, decreasing typed_char");
        if (typed_char === 0) {
            //do nothing
        } else {
            typed_char--;
        }
    } else {
        trackTypedChars();
    }
    
    if(typed_char===word_length){
        
        if (matchWords()) {
            console.log('match!!');
            endWord();
        }
    }
    console.log("%s chars typed and the target is %s ", typed_char, word_length);
    
    
}

//start 
function startWord() {
    
    if (!isTyping) {
        isTyping = true;
        typed_char = 0
        backspaces = 0;
        word = currentWord.innerHTML
        wordStartTimeS = Date.now();
        console.log('a new word is being written, starting at %s', new Date(wordStartTimeS)); //log word start time
        console.log("Word has %s characters", word.length);

    } else {
        // do something with keystrokes in the middle of word typing, write data to table? compare char by char?

    }


}
//end typing, reinicilized isTyping and calculates wordSpeedP
function endWord() {
    
    // alert("The 'spacebar' key is pressed, resetting word count") //>> shows a popup message 
    isTyping = false;
    if (matchWords()) {
        console.log('match!!');
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
        
    } else { //if no match
        console.log('no match, bad typing');
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
        
    }
    word = currentWord.innerHTML
    wordEndTimeS = Date.now();
    wordTime = wordEndTimeS - wordStartTimeS; // 
    var cpm = (word.length/(wordTime/1000))*60;
    var wpm = cpm/5;
    console.log("endWord event reached, resetting word count");
    console.log('the word has ended, and it took %s to type; CPM: %s , WPM: %s', wordTime,cpm,wpm);
}


//start match
function startMatch() {

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

//matchcurrentWord to wordInput
function matchTyping(typed_char) {
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
    getWordLength(currentWord.innerHTML);

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
    return word.length;

}

//check how many chars have been pressed and check target word length
function trackTypedChars() {
    if (isTyping) {
        word = currentWord.innerHTML
        typed_char++;
        
        word_length = getWordLength(currentWord.innerHTML);
        if (typed_char === word_length) {
            console.log("Beeep")
            endWord();
        }
        //check is typing has error:: compare input with word and see if they match (itsa match?)
    }


}




//get the timelog for each keystroke
function getCharSpeed() {


}