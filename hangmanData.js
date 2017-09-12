

// Holds the letters for the keyboard amd camn also hold guerss letters
var letterHolder = function (manager) {
  var myManager = manager
  var letters = [];
  var letterBTN = document.getElementById('letterBTN')

  letterBTN.addActionListener('click', function(){
    manager.sayHello();
  });

  var letHolder = {
    setLetters : function(allLetters) {
      letters = allLetters.split('');
    },
    getLetter : function(index) {
      return letters[index]
    },
    clearLetters : function() {
      letters = [];
    },
    addLetter : function (letter) {
      letters.push(letter);
    },
    isLetterPresent : function (let) {
      return letters.some(function(letter) {
        return letter === let
      });
    },
    getAllLetters : function () {
      return letters;
    },
  }
  return letHolder;
}

// The actual letter being guessed
var letter = function () {
  var name = ''
  var color = ''
  var background = ''
  var left = 0;
  var top = 0;

  var newletter = {
    setletter : function(letter) {
      name = ltter;
    },
    setDetails : function(col, bkg) {
        color = col;
        background = bkg;
    },
    getLetter : function() {
      return name
    },
    clearletter : function() {
      letter = '';
    },
    setLetter : function (letter) {
      name = letter;
    },
    isEqual : function (let) {
      return name === let
    },
    getAllLetters : function () {
      return letters;
    },
    setCoOrds : function (leftNum, topNum) {
      left = leftNum;
      top = topNum;
    }
  }
  return newletter;
}

var hangingMan = function () {
  const DEAD =0;
  var isDead = false;
  var lives = 0;
  var hanger = {
    isDead : function() {
        return lives === DEAD;
    },
    setLives : function (livesNum) {
      lives = livesNum;
    },
    killLife : function (num) {
      lives -= 1;
    },
    getLives : function() {
      return lives;
    },
  }
  return hanger;
}

var guessingWord = function () {
   var allreadyGuessed = []
   var currentWord = []
   var word =  {

     setWord : function(wordString) {
         currentWord = wordString.split('');
         allreadyGuessed = wordString.split('');
     },
     isLetterInWord : function (letter) {
       result = false;
       for (var i = 0; i < currentWord.length; i++ ) {
         if (currentWord[i] === letter && allreadyGuessed[i] !== '*') {
           allreadyGuessed[i] = '*'
           currentWord[i] = letter;
           result = true;
           break;
         }
       }
       return result;
     },
     clearWord : function () {
       word = [];
     },
     isWordGuessed : function () {
       return allreadyGuessed.every(function(letter){
         return letter !== '*';
       })
     },
   }
   return word;
}

var gameTimer = function () {
  const MINUTES = 60 * 1000;
  const SECONDS = 1;
  const TIMER_START = 0;
  var count = 0;
  var maxGameTime = 0;
  var increment = 1000;
  var timerRunning = false;
  var timerID

  var timer = {
    isTimeUp : function() {
        return count > maxGameTime;
    },
    setGameTime : function (time) {
      maxGameTime = time * MINUTES ;
    },
    getTime : function () {
      return count;
    },
    start : function(thisGameTimer) {
      timerRunning = true;
      timerID = setInterval(function() {
        thisGameTimer.updateTime(SECONDS)
      }, increment)
    },
    pause : function() {
      timerRunning = !timerRunning
    },
    reset : function() {
      clearInterval(timerID);
      count = TIMER_START;
    },
    updateTime : function(time) {
      if (timerRunning) {
        count += time;
        console.log(count);
      }
    },
    setIncrement : function (incNum) {
      increment = incNum;
    }
  }
  return timer;
}

var randomNumber = function () {
  var randNum = {
    getRandomNum : function(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
  }
  return randNum;
}

// Used to store the words from the WORD DICTIOARY and the words
// that are generated manually by the parent


var resetGame = function () {
  var reset = {
    resetLetters : function(myWord) {
      console.log('reset letters - not sure how yet');
    },
    resetWord : function() {
      console.log('reset word - not sure how yet');
    },
    resetHangingGuy : function(allWords) {
      console.log('reset hanging guy - not sure how yet');
    },
  }
  return reset;
}

// Stores all teh game words that are hard coded
var wordDictionary = function () {
  var words = []
  var wordsDic = {
    getWords : function() {
      return words;
    },
    setWords : function(allWords) {
      words = allWords;
    }
  }
  return wordsDic;
}


// Holds onto the eords that are being used in the game
// Gets the words from the WORD DICTIIONARY
var gameWords = function () {
  var words = [];

  var gWord = {
    setWords : function(allWords) {
      words = allWords;
    },
    getWord : function(index) {
      return words[index]
    },
    clearWords : function() {
      words = [];
    },
    addWord : function (word) {
      words.push(word);
    },
    isWordPresent : function (word) {
      return words.some(function(w) {
        return w === word
      });
    },
    getAllWords : function () {
      return words;
    },
    removeWord : function (myWord) {
      words.splice(words.indexOf(myWord),1)
    },
    anyMoreWords : function () {
      return words.length;
    }
  }
  return gWord;
}

// var wordGenerator = function (manager) {
//   var words = []
//   var wordGen = {
//     addWord : function(myWord) {
//       words.push(myWord);
//     },
//     removeWord : function(myWord) {
//       words.splice(words.indexOf(myWord),1)
//     },
//     setWords : function(allWords) {
//       words = allWords;
//     },
//     getWords : function() {
//       return words;
//     }
//
//   }
//   return wordGen;
// }

// Is the manager of the word generation system
var wordManager = function () {
  // var myGenerator;
  const NO_MORE_WORDS = -1
  var myDictionary;
  var myGameWords ;
  var manager = {
    init : function() {
      // myGenerator = wordGenerator();
      myDictionary = wordDictionary();
      myGameWords = gameWords();
    },
    getReady  : function(){
      var x = myDictionary.getWords();
      // myGenerator.setWords(x);
      myGameWords.setWords(x)
      return myGameWords.getAllWords();
    },
    getAllWords : function() {
      return myGameWords.getAllWords();
    },
    setWords : function (words) {
      myDictionary.setWords(words);
    },
    removeWord : function(word) {
      myGameWords.removeWord(word);
    },
    restore : function() {
      myGameWords.clearWords();
    },
    getWord : function(index) {
      result = NO_MORE_WORDS;
      if (myGameWords.length !== 0 ) {
        result =  myGameWords.getWord(index);
      }
      return result;
    }
  }
  return manager;
}
