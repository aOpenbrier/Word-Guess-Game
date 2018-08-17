// create game object
let gameState = {
    isGameStarted: false,
    winCount: 0,
    guessCount: 10,
    wordsArr: [`CIRCUS`, `STRONGER`, `MAKE ME OOH`, `EVERYTIME`, `IF YOU SEEK AMY`, `FEMME FATALE`, `GIMME MORE`, `WOMANIZER`, `TOXIC`, `SLUMBER PARTY`, `OOPS I DID IT AGAIN`, `BLACKOUT`, `MY PREROGATIVE`, `BREAK THE ICE`, `LUCKY`, `OVER PROTECTED`], //use 2 spaces for multiple words
    activeWordIndex: 0,
    activeWordArr: [],
    hiddenWordArr: [],
    lettersGuessed: [],
    updateValues(){
        document.querySelector('#hidden').innerHTML = this.hiddenWordArr.join(`&nbsp;`)
        document.querySelector('#guesscount').innerHTML = this.guessCount
        document.querySelector('#letters').innerHTML = this.lettersGuessed.join('&nbsp;')
        document.querySelector('#wincount').innerHTML = this.winCount
    }
}

function newWord() {
    console.log(`ran newWord function`)
    if (gameState.activeWordIndex < gameState.wordsArr.length) { //if we're not out of words to play
        gameState.activeWordArr = gameState.wordsArr[gameState.activeWordIndex].split('')
        gameState.hiddenWordArr = ['']
        for (let i = 0; i < gameState.activeWordArr.length; i++) { //replace letters with underscores, allow spaces
            if (gameState.activeWordArr[i] !== ' ') {
                gameState.hiddenWordArr[i] = '_'
            }
            else{
                gameState.hiddenWordArr[i] = `&nbsp;`
            }
        }
        gameState.guessCount = 10
        gameState.lettersGuessed = ['&nbsp;']
        gameState.activeWordIndex++ //ready for next round
    }
    else {
        document.querySelector('#message').innerHTML = `That's all for now. Press any key to start over`
        gameState.isGameStarted = false
        gameState.winCount = 0
        gameState.activeWordIndex = 0

    }
    gameState.updateValues()
}

//on key event:
document.onkeyup = function (event) {
    if (gameState.isGameStarted) { //if game was started
        if (/[a-z]/i.test(event.key)) { //if key pressed was a letter
            let keyPressed=event.key.toUpperCase()
            console.log(keyPressed)
            if (gameState.lettersGuessed.indexOf(keyPressed) === -1) { //if it hasn't been guessed yet
                gameState.lettersGuessed.push(keyPressed)
                if (gameState.activeWordArr.indexOf(keyPressed) > -1) { //if letter is in the array at all
                    gameState.activeWordArr.forEach(function (letter, i) { //replace any underscores with letter
                        if (letter === keyPressed) {
                            gameState.hiddenWordArr[i] = gameState.activeWordArr[i]
                        }
                    })
                    if (gameState.hiddenWordArr.indexOf('_') === -1) { //if there aren't any underscores remaining
                        document.querySelector('#message').innerHTML = `You won! '${gameState.activeWordArr.join('')}' is correct. Next word:`
                        gameState.winCount++
                        newWord()
                    }
                }
                else { //letter wasn't found in word
                    gameState.guessCount--
                    if (gameState.guessCount < 1) { //if there are no guesses remaining
                        document.querySelector('#message').innerHTML = `Sorry, you lost. Try the next word`
                        newWord()
                    }
                }
            }
            else {
                document.querySelector('#message').innerHTML = `You already tried that. Guess again`
            }
        }
    }
    else { //game hasn't started
        gameState.isGameStarted = true
        document.querySelector('#message').innerHTML = `Type in your first guess`
        newWord()
    }
    gameState.updateValues()
}
