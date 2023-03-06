const squares = document.getElementsByClassName("square");
const gameCompleteMessage = document.getElementById("gameStatus");
const restart = document.getElementById("restart");
const playerOneCounterText = document.getElementById("playerOneCounter");
const playerTwoCounterText = document.getElementById("playerTwoCounter");

const gameContainer = document.getElementById("game");

console.log("squares: ", squares);

let playerOneTurn = true;
let playerTwoTurn = false;

let restartClicked = false;

let squareMatrix = [
  { index: 0, user: null },
  { index: 1, user: null },
  { index: 2, user: null },
  { index: 3, user: null },
  { index: 4, user: null },
  { index: 5, user: null },
  { index: 6, user: null },
  { index: 7, user: null },
  { index: 8, user: null },
];

let gameComplete = false;
let playerOneCounter = 0;
let playerTwoCounter = 0;

// Restartování hry
restart.addEventListener("click", () => {
  console.log("clicked restart");
  Array.from(squares).forEach((square, index) => {
    square.style = "background-color: #abe85c";
  });
  
  gameCompleteMessage.innerHTML = "";
  gameContainer.setAttribute("style", "pointer-events: auto;");

  squareMatrix = [
    { index: 0, user: null },
    { index: 1, user: null },
    { index: 2, user: null },
    { index: 3, user: null },
    { index: 4, user: null },
    { index: 5, user: null },
    { index: 6, user: null },
    { index: 7, user: null },
    { index: 8, user: null },
  ];
});

Array.from(squares).forEach((square, index) => {
  square.addEventListener("click", () => {
    console.log("Clicked!");

    // turn
    if (playerOneTurn == true) {
      if (square.getAttribute("style") == "background-color: azure;") {
        return;
      }

      square.style = "background-color: blue";
      squareMatrix[index].user = "playerOne";
    } else if (playerTwoTurn == true) {
      if (square.getAttribute("style") == "background-color: blue;") {
        return;
      }

      square.style = "background-color: azure";
      squareMatrix[index].user = "playerTwo";
    }

    // Změna tahu
    playerOneTurn = !playerOneTurn;
    playerTwoTurn = !playerTwoTurn;
    console.log("squareMatrix: ", squareMatrix);

    let blueArray = [];
    let azureArray = [];

    // Výherní Kombinace
    const firstRow = [0, 1, 2];
    const secondRow = [3, 4, 5];
    const thirdRow = [6, 7, 8];

    const firstColumn = [0, 3, 6];
    const secondColumn = [1, 4, 7];
    const thirdColumn = [2, 5, 8];

    const diagonalFromLeft = [0, 4, 8];
    const diagonalFromRight = [2, 4, 6];

    squareMatrix.forEach((square) => {
      if (square.user == "playerOne") {
        blueArray.push(square.index);
      }
      if (square.user == "playerTwo") {
        azureArray.push(square.index);
      }
    });
    console.log("blueArray: ", blueArray);
    console.log("azureArray: ", azureArray);

    if (
      firstRow.every((current) => blueArray.includes(current)) ||
      secondRow.every((current) => blueArray.includes(current)) ||
      thirdRow.every((current) => blueArray.includes(current)) ||
      firstColumn.every((current) => blueArray.includes(current)) ||
      secondColumn.every((current) => blueArray.includes(current)) ||
      thirdColumn.every((current) => blueArray.includes(current)) ||
      diagonalFromLeft.every((current) => blueArray.includes(current)) ||
      diagonalFromRight.every((current) => blueArray.includes(current))
    ) {
      console.log("blue is the winner");
      playerOneCounter++;
      gameComplete = true;
    }
    if (
      firstRow.every((current) => azureArray.includes(current)) ||
      secondRow.every((current) => azureArray.includes(current)) ||
      thirdRow.every((current) => azureArray.includes(current)) ||
      firstColumn.every((current) => azureArray.includes(current)) ||
      secondColumn.every((current) => azureArray.includes(current)) ||
      thirdColumn.every((current) => azureArray.includes(current)) ||
      diagonalFromLeft.every((current) => azureArray.includes(current)) ||
      diagonalFromRight.every((current) => azureArray.includes(current))
    ) {
      console.log("azure is the winner");
      playerTwoCounter++;
      gameComplete = true;
    }

    if (gameComplete == true) {
      gameCompleteMessage.innerHTML = "Konec hry";
      playerOneCounterText.innerHTML = playerOneCounter;
      playerTwoCounterText.innerHTML = playerTwoCounter;

      gameContainer.setAttribute("style", "pointer-events: none;");

      gameComplete = false;
    }
  });
});