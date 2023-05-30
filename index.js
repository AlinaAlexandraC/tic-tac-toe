let gameTurn = 0;
let currentPlayer;
let board;
let playerAI;
let secondAI;

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
            setHTMLvisibilityForInputAiCoordinatesInput(false);
            break;
        case 'ai-ai':
            isPlayerXHuman = false;
            isPlayerYHuman = false;
            setHTMLvisibilityForInputHumanCoordinates(false);
            setHTMLvisibilityForInputAiCoordinatesInput(true);
            break;
    }
    resetBoard();

    setHTMLvisibilityForInputGameMode(false);
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

    const inputField = document.querySelector('.coordinates input');
    inputField.value = '';

    //position is already taken on the board
   
    if(board[coordinates.x][coordinates.y] !== ""){
        displayMessage(`Position is already taken on board`);
        //with this return, gameTurn is not skipped when position is already taken
        return
    } 
    
    board[coordinates.x][coordinates.y] = currentPlayer;
        gameTurn += 1;
    
    if (isPlayerYHuman === false) {
        setHTMLvisibilityForInputHumanCoordinates(false);
        setHTMLvisibilityForInputAiCoordinatesInput(true);
    }

    endOfGameSetUp()

    displayBoard(board);
}

// this function is called whenever the user presses
// the button labeled `Generate AI coordinates`
function processAICoordinate() {
    console.log(`processAICoordinate()`);
    //human vs ai
    if (isPlayerXHuman === true && isPlayerYHuman === false) {
        if (gameTurn % 2 === 0) {
            currentPlayer = 'diamond';
            displayMessage("Player O's turn");
        } else {
            playerAI = 'pets';
            displayMessage("Player X's turn");
        }
    }

    //ai vs ai mode
    if (isPlayerXHuman === false && isPlayerYHuman === false) {
        // let coordX = Math.floor(Math.random() * 3);
        // let coordY = Math.floor(Math.random() * 3);

        if (gameTurn % 2 === 0) {
            secondAI = 'diamond';
            displayMessage("Player O's turn");
            // if(gameTurn < 3){
            //     if (board[coordX][coordY] === "") {
            //         board[coordX][coordY] = secondAI;                
            //     } else {
            //         coordX = Math.floor(Math.random() * 3);
            //         coordY = Math.floor(Math.random() * 3);
            //         if (board[coordX][coordY] === "") {
            //             board[coordX][coordY] = secondAI;        
            //         }
            //     getUnbeatableAiCoordinatesForXAI()
            //     }
            // } else {
                getUnbeatableAiCoordinatesForXAI()
            // }            
        } else {
            playerAI = 'pets';
            displayMessage("Player X's turn");
            getUnbeatableAiCoordinates(secondAI)
        }
        console.log(gameTurn)
        console.log(board)
        // displayBoard(board);
    } else {
        getUnbeatableAiCoordinates(currentPlayer);
    }
    
    if (isPlayerXHuman === true) {
        setHTMLvisibilityForInputHumanCoordinates(true);
        setHTMLvisibilityForInputAiCoordinatesInput(false);
    }

    endOfGameSetUp()
    
    gameTurn +=1;
    displayBoard(board);
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
    let coordX;
    let coordY;
    
    if (input.charAt(0) === "A" || input.charAt(0) === "a") {
        coordX = 0
    }
    if (input.charAt(0) === "B" || input.charAt(0) === "b") {
        coordX = 1
    }
    if (input.charAt(0) === "C" || input.charAt(0) === "c") {
        coordX = 2
    }
    
    coordY = Number(input.charAt(1)) - 1

    if(coordX < 3 && coordY < 3 && input.length === 2) {
        return { x: coordX, y: coordY }
    } else {
        displayMessage(`Invalid coordinate entered`)
    }   
}

// this function should return `X` or `O` or undefined (carefull it's not a string )
// based on interpreting the values in the board variable
function getWinningPlayer(board) {
    // horizontal wins
    if(board[0][0] === board[0][1] && board[0][1] === board[0][2]) {
        return board[0][0];
    }
    if(board[1][0] === board[1][1] && board[1][1] === board[1][2]) {
        return board[1][0];
    }
    if(board[2][0] === board[2][1] && board[2][1] === board[2][2]) {
        return board[2][0];
    }

    // diagonal wins
    if(board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0];
    }
    if(board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2];
    }

    // vertical wins
    if(board[0][0] === board[1][0] && board[1][0] === board[2][0]) {
        return board[0][0];
    }
    if(board[0][1] === board[1][1] && board[1][1] === board[2][1]) {
        return board[0][1];
    }
    if(board[0][2] === board[1][2] && board[1][2] === board[2][2]) {
        return board[0][2];
    }

    return 0;
}

function getUnbeatableAiCoordinates(opponent) {
    console.log("getUnbeatableAiCoordinates()")
    if(gameTurn === 1 && oppositeCorners(oppositeC) === true){
        if(board[1][1] === ""){
            board[1][1] = playerAI
        }
    }
    if(gameTurn < 4 && gameTurn !== 1 && oppositeCorners(oppositeC) === true){
        oppositeCorners(oppositeC)
    } else if(easyWinOrEasyLose(playerAI, easyWin, playerAI) === true){
        easyWinOrEasyLose(playerAI, easyWin, playerAI)
    } else if (easyWinOrEasyLose(playerAI, easyWin, playerAI) === false && easyWinOrEasyLose(opponent, easyLose, playerAI) === true){
        easyWinOrEasyLose(opponent, easyLose, playerAI);
    }
    else {
        extraMoves(playerAI)
    }
};

let easyWin = false
let easyLose = false
function easyWinOrEasyLose(playerToCheck, param, playerToMakeAMove) {
    for (let i = 0; i < board[0].length; i++) {      
        // columns
        if (board[i][0] === board[i][1] && board[i][1] === playerToCheck && board[i][2] === "") {
            board[i][2] = playerToMakeAMove
            param = true
            break
        }
        // rows
        if (board[0][i] === board[1][i] && board[1][i] === playerToCheck && board[2][i] === "") {
            board[2][i] = playerToMakeAMove
            param = true
            break
        }
        // skipped columns
        if (board[i][1] === board[i][2] && board[i][2] === playerToCheck && board[i][0] === "") {
            board[i][0] = playerToMakeAMove
            param = true
            break
        }
        // skipped rows
        if (board[1][i] === board[2][i] && board[2][i] === playerToCheck && board[0][i] === "") {
            board[0][i] = playerToMakeAMove
            param = true
            break
        } 
        // columns from bottom to top
        if (board[i][0] === board[i][2] && board[i][2] === playerToCheck && board[i][1] === "") {
            board[i][1] = playerToMakeAMove
            param = true
            break
        }
        // rows from right to left
        if (board[0][i] === board[2][i] && board[2][i] === playerToCheck && board[1][i] === "") {
            board[1][i] = playerToMakeAMove
            param = true
            break
        }
        // diagonals
        if(board[0][2] === board[2][0] && board[2][0] === playerToCheck && board[1][1] === "") {
            board[1][1] = playerToMakeAMove
            param = true
            break
        }
        if(board[0][2] === board[1][1] && board[1][1] === playerToCheck && board[2][0] === "") {
            board[2][0] = playerToMakeAMove
            param = true
            break
        }
        if(board[2][0] === board[1][1] && board[1][1] === playerToCheck && board[0][2] === "") {
            board[0][2] = playerToMakeAMove
            param = true
            break
        }
        if(board[0][0] === board[1][1] && board[1][1] === playerToCheck && board[2][2] === "") {
            board[2][2] = playerToMakeAMove
            param = true
            break
        }
        if(board[0][0] === board[2][2] && board[2][2] === playerToCheck && board[1][1] === "") {
            board[1][1] = playerToMakeAMove
            param = true
            break
        }
        if(board[1][1] === board[2][2] && board[2][2] === playerToCheck && board[0][0] === "") {
            board[0][0] = playerToMakeAMove
            param = true
            break
        }
    }
    return param
}

function endOfGameSetUp(){
    const winningPlayer = getWinningPlayer(board);
    if (winningPlayer) {
        if (getWinningPlayer(board) === playerAI) {
            displayMessage(`Player ${playerAI} has won !`);
        } else {
            displayMessage(`Player  ${currentPlayer !== undefined ? currentPlayer : secondAI} has won !`);
        }
        setHTMLvisibilityForInputGameMode(false);
        setHTMLvisibilityForButtonLabeledReset(true);
        setHTMLvisibilityForInputHumanCoordinates(false);
        setHTMLvisibilityForInputAiCoordinatesInput(false);
    } else if (gameTurn === 9 && winningPlayer === 0) {
        displayMessage("It's a tie");
        setHTMLvisibilityForButtonLabeledReset(true);
        setHTMLvisibilityForInputHumanCoordinates(false);
        setHTMLvisibilityForInputAiCoordinatesInput(false);
        setHTMLvisibilityForInputGameMode(false);
    }
}

// opposite corners

let oppositeC = false
function oppositeCorners(param){
    if(board[0][0] === "diamond" && board[2][2] === "diamond"){
        board[1][0] = playerAI
        param = true
    }
    if(board[0][2] === "diamond" && board[2][0] === "diamond"){
        board[1][2] = playerAI
        param = true
    }
    return param
}

function extraMoves(player) {
    // center
    if (board[1][1] === ""){ board[1][1] = player }
    // corners
    else if (board[0][2] === ""){ board[0][2] = player } 
    else if (board[2][2] === ""){ board[2][2] = player } 
    else if (board[2][0] === ""){ board[2][0] = player } 
    else if (board[0][0] === ""){ board[0][0] = player }
    // edges
    else if (board[1][0] === ""){ board[1][0] = player } 
    else if (board[0][1] === ""){ board[0][1] = player } 
    else if (board[1][2] === ""){ board[1][2] = player } 
    else if (board[2][1] === ""){ board[2][1] = player }
}

// let oppositeC1 = false
// function oppositeCornersForXAI(param){
//     if(board[0][0] === "pets" && board[2][2] === "pets"){
//         board[1][0] = secondAI
//         param = true
//     }
//     if(board[0][2] === "pets" && board[2][0] === "pets"){
//         board[1][2] = secondAI
//         param = true
//     }
//     return param
// }

function getUnbeatableAiCoordinatesForXAI() {
    console.log("getUnbeatableAiCoordinatesForXAI()")
    let coordX = Math.floor(Math.random() * 3);
    let coordY = Math.floor(Math.random() * 3);
    // if(gameTurn === 1 && oppositeCornersForXAI(oppositeC1) === true){
    //     if(board[1][1] === ""){
    //         board[1][1] = secondAI
    //     }
    // }
    // if(gameTurn < 4 && gameTurn !== 1 && oppositeCornersForXAI(oppositeC1) === true){
    //     oppositeCornersForXAI(oppositeC1)
    // } else 
    if(easyWinOrEasyLose(secondAI, easyWin, secondAI) === true){
        easyWinOrEasyLose(secondAI, easyWin, secondAI)
    } else if (easyWinOrEasyLose(secondAI, easyWin, secondAI) === false && easyWinOrEasyLose(playerAI, easyLose, secondAI) === true){
        easyWinOrEasyLose(playerAI, easyLose, secondAI);
    }
    else {
        // extraMoves(secondAI)
        if (board[coordX][coordY] !== "") {
            displayMessage(`Position is already taken on board`);
            gameTurn -= 1
            return
        } else {
            board[coordX][coordY] = secondAI;
        }
    }
};