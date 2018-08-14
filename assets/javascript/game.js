// create game object
    let gameState = {
        isGameStarted: false,
        winCount: 0,
        guessCount: 6,
        wordsArr: [`example  example`, `another`, `lastly`], //use 2 spaces for multiple words
        activeWordIndex: 0,
        activeWordArr: [``],
        hiddenWordArr: [``],
        lettersGuessed: [``]
        }

function newWord(){ //New game function
    if (gameState.activeWordIndex < gameState.wordsArr.length){ //if we're not out of words to play
        document.querySelector('#message').innerHTML = `Type in your first guess`
        gameState.activeWordArr = gameState.wordsArr[gameState.activeWordIndex].split('')
        for (let i = 0; i < gameState.activeWordArr.length; i++) { //replace letters with underscores, allow spaces
            console.log(`length: ${gameState.activeWordArr.length}`)
            if (gameState.activeWordArr[i] !== ' '){ 
                gameState.hiddenWordArr[i] = '_'
            }
        }
        document.querySelector('#hidden').innerHTML = gameState.hiddenWordArr.join(`&nbsp;`) //display hidden game word
        gameState.guessCount = 6 
        document.querySelector('#guesscount').innerHTML = gameState.guessCount //reset guess count
        gameState.lettersGuessed = ['&nbsp;']
        document.querySelector('#letters').innerHTML = gameState.lettersGuessed //reset letters guessed
        console.log(`active word: ${gameState.activeWordArr} hidden: ${gameState.hiddenWordArr}`)
        gameState.activeWordIndex++ //ready for next round
    }
    else{
        document.querySelector('#message').innerHTML = `That's all for now. Press any key to start over`
        gameState.isGameStarted = false
        gameState.winCount = 0
    }
}
//on key event:
document.onkeyup = function(event){
    console.log(`onkeyup triggered`) //TESTING
    if (gameState.isGameStarted){
        //if key is NOT in letters guessed
        //add letter to lettersGuessed
        //update dom with letters guessed
            //check if letter is in word array.some(event.key)
            
                gameState.activeWordArr.forEach(function(letter, i){
                    if (letter === event.key){
                        //test log
                        console.log(`Key pressed: '${event.key}' was found in array index ${i}`) //TESTING
                        //change underscore to letter
                        //update dom of hidden word
                        //check if game is complete
                            //document.querySelector('#message').innerHTML = 'You Won!'
                            //start new game
                            //add 1 to win count, gameState.winCount++
                    }
                })
                    //false: deduct from number of guesses 
                //if at zero, sorry, start new game
        // display letter as already guessed 
    }
    else{ //game isn't started
        gameState.isGameStarted = true
        console.log(`game is now started`)
        newWord()
    }
}
