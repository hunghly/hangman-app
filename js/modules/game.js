import Home from "./home.js";
import {sound} from "../data/sound.js";

const Game = (_ => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    const words = ['apple', 'ball', 'cat', 'dog', 'elephant'];

    let chosenWord;
    let guessingWord;
    let lives;
    let guesses;

    //cache Dom
    const $hangman = document.querySelector(".hangman");

    const init = _ => {
        chosenWord = chooseWord();
        console.log(chosenWord);
        guessingWord = Array(chosenWord.length).fill("_");
        console.log(guessingWord);
        guesses = [];
        lives = 7;
        //show initial screen
        showInitPage();
        listeners();
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
    }

    const check = guess => {
        if (isAlreadyTaken()) return;
        guesses.push(guess);
        // check if guess already exists in chosenWord
        if (chosenWord.includes(guess)) {
            // update the guessing word

        } else {
            lives--;
            // render the board
        }
        render();
    };

    const render = _ => {

    };

    const showInitPage = _ => {
        let markup = `
              <p class="hangman__stats">Lives: 
              <span class=""hangman__lives>${lives}</span>
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
            markup += `
            <li class="hangman__letter">${letter}</li>`
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