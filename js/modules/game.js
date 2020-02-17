const Game = (_ => {
    const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

    const words = ['apple', 'ball', 'cat', 'dog','elephant'];

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