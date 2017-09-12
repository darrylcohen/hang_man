

// Holds the letters for the keyboard amd camn also hold guerss letters
var letterHolder = function (manager) {
  var myManager = manager
  var letters = [];
  var wrongLetterDiv = document.getElementById('wrongLetters')

  var letHolder = {
    setLetters : function(allLetters) {
      letters = allLetters.split('');
    },
    getLetter : function(index) {
      return letters[index]
    },
    clearLetters : function() {
      letters = [];
      while (wrongLetterDiv.firstChild) {
          wrongLetterDiv.removeChild(wrongLetterDiv.firstChild);
      }
    },
    addLetter : function (letter) {
      if (letters.indexOf(letter) === -1) {
        letters.push(letter);
        var div = document.createElement('wrongLetters')
        div.textContent = letter;
        div.className = 'wrongLetter';
        wrongLetterDiv.appendChild(div)
      }
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

var keyBoard = function () {
  var myManager;
  var letters = [];
  var keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var keyBoardLetter = document.querySelector('#keyBoard');

  keyBoardLetter.addEventListener('click', function(event) {
      myManager.useLetter(event.target)
  });
  var keyB = {
    buildKeyBoard : function() {
      letters.forEach(function(letter) {
        var btn = document.createElement('button')
        btn.textContent = letter;
        btn.className = 'keyBoardLetter';
        keyBoardLetter.appendChild(btn)
      })
    },
    setManager : function(manager) {
      myManager = manager
    },
    setLetters : function() {
      letters = keys.split('')
      this.buildKeyBoard()
    },
    getLetter : function(index) {
      return letters[index]
    },
    clearLetters : function() {
      letters = [];
    },
    addLetter : function (letter) {
      if (letters.indexOf(letter) === -1) {
        letters.push(letter);
      }
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
  return keyB;
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
        colkg;or = col;
        background = b
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
    resetLives : function() {
      var hangman = document.querySelector('#hangingMan');
      while (hangman.firstChild) {
          hangman.removeChild(hangman.firstChild);
      }
      for (var i = 0; i < lives; i++) {
        var div = document.createElement('div')
        div.textContent = ':-)';
        div.className = 'hangManLife';
        hangman.appendChild(div)
      }
    },
    isDead : function() {
        return lives === DEAD;
    },
    setLives : function (livesNum) {
      lives = livesNum;
      this.resetLives()
    },
    killLife : function (num) {
      lives -= 1;
      this.resetLives()

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
   var displayW = []

   var word =  {

     displayWord : function() {
       var gameWord = document.querySelector('#gameWord');
       while (gameWord.firstChild) {
           gameWord.removeChild(gameWord.firstChild);
       }
       displayW.forEach(function(letter) {
         var div = document.createElement('div')
         div.textContent = letter.toUpperCase();
         div.className = 'gameWordLetter';
         gameWord.appendChild(div)
       })
     },

     setWord : function(wordString) {
       displayW = [];
       allreadyGuessed = [];
       currentWord = wordString.toLowerCase().split('');
       currentWord.forEach(function(){
         displayW.push('*')
         allreadyGuessed.push(' ')
       })
     },
     getDisplayWord : function() {
       return displayW;
     },
     addLetter : function(let) {
       letter = let.toLowerCase()
       for (var i = 0; i < currentWord.length; i++ ) {
         if (currentWord[i] === letter && allreadyGuessed[i] === ' ') {
           allreadyGuessed[i] = letter
           displayW[i] = letter
           result = true;
           break;
         }
       }
       this.displayWord();

     },

     isLetterInWord : function (let) {
       letter = let.toLowerCase()
       result = false;
       for (var i = 0; i < currentWord.length; i++ ) {
         if (currentWord[i] === letter && allreadyGuessed[i] === ' ') {
          //  allreadyGuessed[i] = letter
          //  displayWord[i] = letter
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
       return displayW.every(function(letter){
         return letter !== '*';
       })
     },
   }
   return word;
}

var gameTimer = function () {
  // const MINUTES = 60 * 1000;
  const SECONDS = 1;
  const TIMER_START = 0;
  // const TIME_UP = 61;
  var count = 0;
  var maxGameTime = 0; // minutes
  var increment = 1000;
  var timerRunning = false;
  var myManager;
  var timerID;
  var gameTime = document.querySelector('#gameTime');
  var max = document.querySelector('#maxGameTime');

  var timer = {
    isTimeUp : function() {
        return count > maxGameTime;
    },
    setGameTime : function (time) {
      maxGameTime = time * 60;
      timer.displayMaxGameTime();
    },
    getTime : function () {
      return count;
    },
    start : function(manager) {
      myManager = manager;
      timerRunning = true;
      timerID = setInterval(function() {
        timer.updateTime(SECONDS)
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
        gameTime.textContent = timer.getTimeString(count);
        if (count >= maxGameTime) {
          myManager.timeUp();
          timer.pause();
        }
      }
    },
    getTimeString : function(time) {
      var h = Math.floor(time/3600);

      var m = Math.floor((time - (h * 3600)) / 60)
      var s = Math.floor(time - m * 60)
      if(h.toString().length === 1) {
        h = '0' + h.toString();
      }
      if(m.toString().length === 1) {
        m = '0' + m.toString();
      }
      if(s.toString().length === 1) {
        s = '0' + s.toString();
      }
      return  h + ' : ' + m + ' : ' + s

    },
    displayMaxGameTime : function() {
      max.textContent = timer.getTimeString(maxGameTime)
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

// Stores all teh game words that are hard coded
var wordDictionary = function () {
  var words = ['dog','pig','goat']
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
  var myManager;
  var addBTN = document.querySelector('#add');
  var removeBTN = document.querySelector('#remove');
  var listOfWords = document.querySelector('#wordList');
  var wordTXT = document.querySelector('#word');
  addBTN.addEventListener('click',function(event){
    gWord.addWord(wordTXT.value)
  })
  removeBTN.addEventListener('click',function(){
    gWord.removeWord(event.target)
  })
  listOfWords.addEventListener('click',function(event){

    wordTXT.value = event.target.textContent
  })
  var gWord = {
    initialise : function(manager) {
      myManager = manager;
    },
    setWords : function(allWords) {
      words = allWords;
      this.displayWords();
    },
    getWord : function(index) {
      return words[index]
    },
    clearWords : function() {
      words = [];
      this.displayWords();
    },
    addWord : function (word) {
      words.push(word);
      this.displayWords();
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
      this.displayWords();
    },
    anyMoreWords : function () {
      return words.length;
    },
    displayWords : function() {
      while (listOfWords.firstChild) {
          listOfWords.removeChild(listOfWords.firstChild);
      }
      for (var i = 0; i < words.length; i++) {
        var li = document.createElement('li')
        li.textContent = words[i];
        li.className = 'wordInList';
        listOfWords.appendChild(li)
      }

    }

  }
  return gWord;
}
var wordManager = function () {
  var myManager;
  var currentWord;
  var myDictionary;
  var myGameWords ;
  var wordMan = {
    setManager : function (man) {
      myManager = man;
    },
    init : function() {
      // myGenerator = wordGenerator();
      myDictionary = wordDictionary();
      myGameWords = gameWords();
    },
    getReady  : function(){

      myGameWords.initialise(this);
      myGameWords.setWords(myDictionary.getWords());
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
    hasAnotherWord : function() {
      return currentWord;
    },
    getWord : function(index) {
      result = -1;
      if (myGameWords.length !== 0 ) {
        result =  myGameWords.getWord(index);
        currentWord = true;
      } else {
        currentWord = false;
      }
      return result;
    }
  }
  return wordMan;
}

var viewer = function () {
  var myManager;
  var playAgainBTN = document.querySelector('#playAgain');
  var playGameBTN = document.querySelector('#playGame');
  var mainContainer = document.querySelector('#container');
  var wordGenerator = document.querySelector('#wordGenerator')
  var view = {
    setManager : function(man) {
      myManager = man
    },
    initialise : function() {

      playAgainBTN.addEventListener('click', function(event) {
        myManager.playAgainA()
      });
      playGameBTN.addEventListener('click', function(event) {
        view.playGame()
      });
    },
    playGame : function() {
      mainContainer.style.display = 'block';
      wordGenerator.style.display = 'none';

    },
    useLetter : function (letter) {
      myManager.useLetter(letter)
    },
    displayMessage : function (message) {
      var msg = document.querySelector('#message');
      msg.textContent = message;
    },
    displayScore : function (score) {
      var msg = document.querySelector('#score');
      msg.textContent = score;
    },
  }
  return view;
}

var manager = function(){
  const WINNER = "You Guessed the Word";
  const DEAD = "YOU ARE DEAD"
  var manager = {
    wordsCorrect : 0,
    myViewer : viewer(),
    myWordManager : wordManager(),
    myGuessedLetters : letterHolder(),
    myKeyboard : keyBoard(),
    myLetter : letter(),
    myHangingMan : hangingMan(),
    myGuessingWord : guessingWord(),
    myGameTimer : gameTimer(),
    myRandomNumber : randomNumber(),
    myResetGame : resetGame(),
    updateGame : function() {
      manager.myGuessingWord.getDisplayWord();
      manager.myGuessedLetters.getAllLetters().sort();

    },
    getNextWord : function () {
      var number =  manager.myRandomNumber.getRandomNum(0, manager.myWordManager.getAllWords().length)
      var word = manager.myWordManager.getWord(number)
      manager.myGuessingWord.setWord(word);
      return manager.myGuessingWord.getDisplayWord();

    },
    initialise : function() {
      manager.myViewer.setManager(manager);
      manager.myViewer.initialise();
      manager.myKeyboard.setManager(this)
      manager.myKeyboard.setLetters()
      manager.myWordManager.setManager(manager);
      manager.myWordManager.init();
      manager.myGameTimer.setGameTime(5);
      manager.myGameTimer.start(this);
      manager.myViewer.displayScore(0);
    //  game.myGameTimer.start(game.myGameTimer);

      manager.playAgain = true;
//      manager.myWordManager.setWords(words);
      manager.myWordManager.getReady();
    },
    timeUp : function() {
      console.log('time up');
    },

    useLetter : function(letter) {
      manager.myLetter.setLetter(letter.textContent);
      if ( manager.myGuessingWord.isLetterInWord(manager.myLetter.getLetter())) {
        // The letter guessed is in the word
        manager.correctLetter(letter.textContent);

        if (manager.myGuessingWord.isWordGuessed()) {
          // The word has been guessed
          manager.wordHasBeenGuessed();
        }
      } else {
        manager.wrongLetter(letter.textContent)
      }
      if (manager.myHangingMan.isDead()) {
            manager.playerIsDead();

      }
      // manager.checkWinner()
    },
    playerIsDead : function() {
      manager.myViewer.displayMessage(DEAD );

    },
    playAgainA : function() {
      manager.myGuessedLetters.clearLetters();
      manager.myViewer.displayMessage('');
      // manager.myViewer.displayScore(0);
      manager.myHangingMan.setLives(LIFES);
      var x = manager.getNextWord()
      manager.myGuessingWord.displayWord(x);
    },
    playGame : function() {
      manager.myGuessedLetters.clearLetters();
      manager.myViewer.displayMessage('');
      manager.myViewer.displayScore(0);
      manager.myHangingMan.setLives(LIFES);
      var x = manager.getNextWord()
      manager.myGuessingWord.displayWord(x);
    },

    wordHasBeenGuessed : function() {
      manager.myViewer.displayMessage(WINNER);
      manager.myViewer.displayScore(manager.wordsCorrect += 1);
    },
    wrongLetter : function(letter) {
      manager.myGuessedLetters.addLetter(letter)
      manager.myHangingMan.killLife()
    },
    correctLetter : function(letter) {
      manager.myGuessingWord.addLetter(letter)
    },
  }
  return manager;
}

// ****************************************************
const LIFES = 5;
var number = 0;
var word

var playHangMan = function() {
  var game = manager();
  game.initialise()
  game.playGame()
}
playHangMan();
// clicked when player wants the net word
