// create game object
let gameState = {
    isGameStarted: false,
    winCount: 0,
    guessCount: 6,
    wordsArr: [`example ex`, `another`, `lastly`], //use 2 spaces for multiple words
    activeWordIndex: 0,
    activeWordArr: [``],
    hiddenWordArr: [``],
    lettersGuessed: [``]
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
        }
        document.querySelector('#hidden').innerHTML = gameState.hiddenWordArr.join(`&nbsp;`) //display hidden game word
        gameState.guessCount = 6
        document.querySelector('#guesscount').innerHTML = gameState.guessCount //reset guess count
        gameState.lettersGuessed = ['&nbsp;']
        document.querySelector('#letters').innerHTML = gameState.lettersGuessed //reset letters guessed
        gameState.activeWordIndex++ //ready for next round
    }
    else {
        document.querySelector('#message').innerHTML = `That's all for now. Press any key to start over`
        gameState.isGameStarted = false
        gameState.winCount = 0
    }
}
//on key event:
document.onkeyup = function (event) {
    console.log(`onkeyup triggered`) //TESTING
    if (gameState.isGameStarted) { //if game was started
        if (/[a-z]/i.test(event.key)) { //if key pressed was a letter
            console.log(`tested if it's a letter`)
            if (gameState.lettersGuessed.indexOf(event.key) === -1) { //if it's not already guessed
                gameState.lettersGuessed.push(event.key)
                document.querySelector('#letters').innerHTML = gameState.lettersGuessed.join(' - ') //update letters guessed
                if (gameState.activeWordArr.indexOf(event.key) > -1) {
                    gameState.activeWordArr.forEach(function (letter, i) {
                        if (letter === event.key) {
                            gameState.hiddenWordArr[i] = letter
                            document.querySelector('#hidden').innerHTML = gameState.hiddenWordArr.join(`&nbsp;`) //display hidden game word
                            console.log(`Key pressed: '${event.key}' was found in array index ${i}`) //TESTING
                            //check if game is complete
                            //document.querySelector('#message').innerHTML = 'You Won!'
                            //start new game
                            //add 1 to win count, gameState.winCount++
                        }
                    })
                }
                else {
                    gameState.guessCount--
                    document.querySelector('#guesscount').innerHTML = gameState.guessCount
                    if (gameState.guessCount < 1) {
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
    else { //game isn't started
        gameState.isGameStarted = true
        console.log(`game is now started`)
        document.querySelector('#message').innerHTML = `Type in your first guess`
        newWord()
    }
}
