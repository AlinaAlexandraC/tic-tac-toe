let gameTurn = 0;
let currentPlayer;
let board;
let playerAI;

// this function will be called whenever the user changes
// the `select` input labeled `please select game mode`
function setGameMode(selectedValue) {
    switch (selectedValue) {
        case 'human-human':
            isPlayerXHuman = true;
            isPlayerYHuman = true;            
            setHTMLvisibilityForInputHumanCoordinates(true);
            setHTMLvisibilityForInputAiCoordinatesInput(false);
            break;
        case 'human-ai':
            isPlayerXHuman = true;
            isPlayerYHuman = false;
            setHTMLvisibilityForInputHumanCoordinates(true);
            setHTMLvisibilityForInputAiCoordinatesInput(true);
            break;
        case 'ai-ai':
            isPlayerXHuman = false;
            isPlayerYHuman = false;
            setHTMLvisibilityForInputHumanCoordinates(false);
            setHTMLvisibilityForInputAiCoordinatesInput(true);
            break;
    }
    resetBoard();

    setHTMLvisibilityForInputGameMode(true);
    // setHTMLvisibilityForInputHumanCoordinates(true);
    // setHTMLvisibilityForInputAiCoordinatesInput(false);
    setHTMLvisibilityForButtonLabeledReset(false);
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

    const inputField = document.querySelector('.coordinates input');
    inputField.value = '';

    //position is already taken on the board
    if (board[coordinates.x][coordinates.y] === "") {
        board[coordinates.x][coordinates.y] = currentPlayer;
    } else {
        displayMessage(`Position is already taken on board`);
    }

    const winningPlayer = getWinningPlayer(board);
    if (winningPlayer) {
        displayMessage(`Player ${currentPlayer} has won !`);
        setHTMLvisibilityForInputGameMode(false);
        setHTMLvisibilityForButtonLabeledReset(true);
        setHTMLvisibilityForInputHumanCoordinates(false);
        setHTMLvisibilityForInputAiCoordinatesInput(false);
    }

    gameTurn += 1;
    displayBoard(board);

    //It's a tie mode
    if (gameTurn === 9 && !winningPlayer) {
        displayMessage("It's a tie");
    }
    
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
    // setHTMLvisibilityForInputAiCoordinatesInput(true);
    console.log(currentPlayer)
    if (gameTurn % 2 === 0) {
        currentPlayer = 'diamond';
        displayMessage("Player O's turn")
    } else {
        playerAI = 'pets';
        displayMessage("Player X's turn")
    }
    // center
    if (board[1][1] === ""){ board[1][1] = playerAI } 
    // corners
    else if (board[0][2] === ""){ board[0][2] = playerAI } 
    else if (board[2][2] === ""){ board[2][2] = playerAI } 
    else if (board[2][0] === ""){ board[2][0] = playerAI } 
    else if (board[0][0] === ""){ board[0][0] = playerAI }
    // edges
    else if (board[1][0] === ""){ board[1][0] = playerAI } 
    else if (board[0][1] === ""){ board[0][1] = playerAI } 
    else if (board[1][2] === ""){ board[1][2] = playerAI } 
    else if (board[2][1] === ""){ board[2][1] = playerAI }

    gameTurn +=1
    displayBoard(board)
}

// this function is called when the user clicks on 
// the button labeled `Restart Game`
function resetGame() {
    console.log(`resetGame()`);
    document.querySelectorAll(".material-symbols-outlined").forEach((element) => element.innerHTML = "");
    let selectBox = document.getElementById("gameMode");
    let selectedValue = selectBox.value;
        selectedValue = "";
    console.log(selectedValue);
    displayMessage("");
    resetBoard();
    setHTMLvisibilityForInputGameMode(true);
    setHTMLvisibilityForInputHumanCoordinates(false);
    setHTMLvisibilityForInputAiCoordinatesInput(false);
    setHTMLvisibilityForButtonLabeledReset(false);
    document.getElementById('gameMode').selectedIndex = 0
    gameTurn = 0;
}

// this function should change from A1..C3 to coordinates
// that are present in the `board` global variable

function extractCoordinates(input) {
    // this is a sample of what should be returned if the
    // the user had typed `A1`
    // you need to add the to also treat other cases (A2..C3)
    let coordX
    let coordY
    
    if (input.charAt(0) === "A" || input.charAt(0) === "a") {
        coordX = 0
    }
    if (input.charAt(0) === "B" || input.charAt(0) === "b") {
        coordX = 1
    }
    if (input.charAt(0) === "C" || input.charAt(0) === "c") {
        coordX = 2
    }
    if (0 < Number(input.charAt(1)) <= 3) {
        coordY = Number(input.charAt(1)) - 1
    } else {
        coordY = 10
    }

    if(coordX < 3 && coordY < 3 ) {
        return { x: coordX, y: coordY }
    } else {
        displayMessage(`Invalid coordinate entered`)
    }   
}

// this function should return `X` or `O` or undefined (carefull it's not a string )
// based on interpreting the values in the board variable
function getWinningPlayer(board) {
    // horizontal wins
    if(board[0][0] === currentPlayer && board[0][1] === currentPlayer && board[0][2] === currentPlayer) {
        return board[0][0];
    }
    if(board[1][0] === currentPlayer && board[1][1] === currentPlayer && board[1][2] === currentPlayer) {
        return board[1][0];
    }
    if(board[2][0] === currentPlayer && board[2][1] === currentPlayer && board[2][2] === currentPlayer) {
        return board[2][0];
    }

    // diagonal wins
    if(board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) {
        return board[0][0];
    }
    if(board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) {
        return board[0][2];
    }

    // vertical wins
    if(board[0][0] === currentPlayer && board[1][0] === currentPlayer && board[2][0] === currentPlayer) {
        return board[0][0];
    }
    if(board[0][1] === currentPlayer && board[1][1] === currentPlayer && board[2][1] === currentPlayer) {
        return board[0][1];
    }
    if(board[0][2] === currentPlayer && board[1][2] === currentPlayer && board[2][2] === currentPlayer) {
        return board[0][2];
    }
}

function getUnbeatableAiCoordinates() {

};