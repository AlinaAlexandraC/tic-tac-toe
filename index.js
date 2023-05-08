let gameTurn = 0;
let currentPlayer;
let board;

// this function will be called whenever the user changes
// the `select` input labeled `please select game mode`
function setGameMode(selectedValue) {
    switch (selectedValue) {
        case 'human-human':
            isPlayerXHuman = true;
            isPlayerYHuman = true;
            break;
        case 'human-ai':
            isPlayerXHuman = true;
            isPlayerYHuman = false;
            break;
        case 'ai-ai':
            isPlayerXHuman = false;
            isPlayerYHuman = false;
            break;
    }
    resetBoard();

    setHTMLvisibilityForInputGameMode(false);
    setHTMLvisibilityForInputHumanCoordinates(true);
    setHTMLvisibilityForInputAiCoordinatesInput(false);
    setHTMLvisibilityForButtonLabeledReset(true);
    displayMessage("Player X's turn");
}

// this function is called whenever the user presses the `enter`
// key in the input box labeled `enter coordinates`
// paramerter: input - the content of the input box
function processHumanCoordinate(input) {
    console.log(`'processHumanCoordinate('${input}')`);
    if (gameTurn % 2 === 0) {
        currentPlayer = 'diamond';
        displayMessage("Player O's turn")
    } else {
        currentPlayer = 'pets';
        displayMessage("Player X's turn")
    }

    let coordinates = extractCoordinates(input);
    console.log(coordinates);
    

    //position is already taken on the board
    if (board[coordinates.x][coordinates.y] === "") {
        board[coordinates.x][coordinates.y] = currentPlayer;
    }else {
        displayMessage(`Position is already taken on board`);
    }

    const winningPlayer = getWinningPlayer(board);
    if (winningPlayer) {
        displayMessage(`Player ${currentPlayer} has won !`);
    }

    gameTurn += 1;
    displayBoard(board);

    // TODO: add a message stating either
    // Player X's turn
    // Player O's turn
    // It's a tie
    // Player X won 
    // Player O won 

    // TODO: add conditions to hide the coordinates screen for 
    // the human player & show for the button to generate AI 
    // coordinates
}

// this function is called whenever the user presses
// the button labeled `Generate AI coordinates`
function processAICoordinate() {
    console.log(`processAICoordinate()`);
}

// this function is called when the user clicks on 
// the button labeled `Restart Game`
function resetGame() {
    console.log(`resetGame()`);
    setHTMLvisibilityForInputGameMode(true);
    setHTMLvisibilityForButtonLabeledReset(false);
}

// this function should change from A1..C3 to coordinates
// that are present in the `board` global variable

function extractCoordinates(input) {
    // this is a sample of what should be returned if the
    // the user had typed `A1`
    // you need to add the to also treat other cases (A2..C3)
    let coordX
    let coordY
    
    if(input.charAt(0) === "A" || input.charAt(0) === "a") {
        coordX = 0
    }
    if(input.charAt(0) === "B" || input.charAt(0) === "b") {
        coordX = 1
    }
    if(input.charAt(0) === "C" || input.charAt(0) === "c") {
        coordX = 2
    }
    if (0 < Number(input.charAt(1)) <= 3) {
        coordY = Number(input.charAt(1)) - 1
    }else {
        displayMessage(`Invalid coordinate entered`)
    }
    return { x: coordX, y: coordY }
    
}

// this function should return `X` or `O` or undefined (carefull it's not a string )
// based on interpreting the values in the board variable
function getWinningPlayer(board) {
    return undefined;
}