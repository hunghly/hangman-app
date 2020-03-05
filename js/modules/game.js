import Home from "./home.js";
import End from "./end.js";
import Board from "./board.js";
import {sound} from "../data/sound.js";
import {wordnikKey} from "../keys.js";

const Game = (_ => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    // const words = ['burrito', 'basketball', 'batman', 'coding', 'elephant', 'zorro', 'apollo', 'ranger'];

    let chosenWord;
    let guessingWord;
    let lives;
    let guesses;

    // const getRandomWord = () => {
    //     fetch(`https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=${wordnikKey}`, {
    //         "method": "GET"
    //     }).then((result) => {
    //         return result.json();
    //     }).then((data) => {
    //         console.log(data.word);
    //         chosenWord = data.word;
    //     })
    // };

    //cache Dom
    const $hangman = document.querySelector(".hangman");

    const init = _ => {
        // chosenWord = chooseWord();
        // getRandomWord();
        return fetch(`https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=${wordnikKey}`, {
            "method": "GET"
        }).then((result) => {
            return result.json();
        }).then((data) => {
            chosenWord = data.word;
            chosenWord = chosenWord.toString().toLowerCase();
            guessingWord = Array(chosenWord.length).fill("_");
            if (chosenWord.includes('-')) {
                guessingWord[chosenWord.indexOf('-')] = '-';
            }
            if (chosenWord.includes(' ')) {
                guessingWord[chosenWord.indexOf(' ')] = ' ';
            }
            guesses = [];
            lives = 7;
            //show initial screen
            showInitPage();
            listeners();
            Board.init();
        })
        // guessingWord = Array(chosenWord.length).fill("_");
        // guesses = [];
        // lives = 7;
        // //show initial screen
        // showInitPage();
        // listeners();
        // Board.init();
    };

    const listeners = _ => {
        $hangman.addEventListener("click", e => {
            if (e.target.matches(".hangman__letter")) {
                sound.click.play();
                check(e.target.innerHTML);
            }
            if (e.target.matches(".hangman__trigger")) {
                sound.click.play();
                Home.init();
            }
        })
    };

    const isAlreadyTaken = letter => {
        return guesses.includes(letter);
    };

    const check = guess => {
        if (!isAlreadyTaken(guess)) {
            guesses.push(guess);
            // check if guess already exists in chosenWord
            if (chosenWord.includes(guess)) {
                // update the guessing word
                updateGuessingWord(guess);
            } else {
                lives--;
                Board.setLives(lives);
            }
            // render the board
            render();
            // check if game is over
            isGameOver();
        }
    };

    const hasWon = _ => guessingWord.join("") === chosenWord;

    const hasLost = _ => lives <= 0;


    const isGameOver = _ => {
        // if won then alert('win');
        if (hasWon()) {
            sound.win.play();
            End.setState({
                chosenWord: chosenWord,
                result: "win"
            });
        }
        // if lost then alert('lose');
        if (hasLost()) {
            sound.lose.play();
            End.setState({
                chosenWord: chosenWord,
                result: "lose"
            });
        }
    };

    const updateGuessingWord = letter => {
        chosenWord.split("").forEach((elem, index) => {
            if (elem === letter) {
                guessingWord[index] = elem;
            }
        })
    };

    const render = _ => {
        document.querySelector(".hangman__lives").innerHTML = lives;
        document.querySelector(".hangman__word").innerHTML = guessingWord.join("");
        document.querySelector(".hangman__letters").innerHTML = createLetters();
    };

    const showInitPage = _ => {
        let markup = `
              <p class="hangman__stats">Lives: 
              <span class="hangman__lives">${lives}</span>
              </p>
              <h1 class="hangman__title">Hangman</h1>
              <canvas class="hangman__board" height="155px"></canvas>
              <div class="hangman__word">${guessingWord.join("")}</div>
                <p class="hangman__instructions">Pick a letter below to guess the whole word.</p>
                <ul class="hangman__letters">
                    ${createLetters()}
                </ul>
            <button class="button hangman__trigger">Main Button</button>`;
        $hangman.innerHTML = markup;
    };

    const createLetters = _ => {
        let markup = ``;
        letters.forEach(letter => {
            const isActive = isAlreadyTaken(letter) ? 'hangman__letter--active' : '';
            markup += `
            <li class="hangman__letter ${isActive}">${letter}</li>`;
        });
        return markup;
    };

    //1. choose a random word, chosenWord = chooseWord()
    const chooseWord = _ => {
        let randNum = Math.floor(Math.random() * words.length);
        return words[randNum];
    };
    // apple chosenWord
    // -pp-- guessingWord
    return {
        init
    }
})();

export default Game;