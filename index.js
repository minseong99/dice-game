const rollDice = document.querySelector(".dice-roll");
const holdDice = document.querySelector(".dice-hold");
const dice = [1, 2, 3, 4, 5, 6];
let crrPlayer = 1; // 1 => player1, 2 => player2
const players = [
  { name: "player1", score: 0, crrScore: 0 },
  { name: "player2", score: 0, crrScore: 0 },
];
const crrPlayerArrow = document.querySelector("#img__cur-player");

const displayCrrScore = () => {
  const crrScoreDiv = document.querySelector(`.player-${crrPlayer}__current `);
  crrScoreDiv.innerText = players[crrPlayer - 1].crrScore;
};

const displayScore = () => {
  displayCrrScore();
  const scoreDiv = document.querySelector(`.player-${crrPlayer}__total`);
  scoreDiv.innerText = players[crrPlayer - 1].score;
};

const handleClick = (event) => {
  // rollDice
  const handleRollDice = () => {
    const initializeCrrScore = () => {
      players[crrPlayer - 1].crrScore = 0;
      displayCrrScore();
      crrPlayer = crrPlayer == 1 ? 2 : 1;
      crrPlayerArrow.src =
        crrPlayer == 1 ? "public/leftArrow.svg" : "public/rightArrow.svg";
    };
    const randomIndex = Math.floor(Math.random() * dice.length);
    const diceNumber = dice[randomIndex];

    if (diceNumber <= 2) initializeCrrScore();
    else players[crrPlayer - 1].crrScore += diceNumber;

    displayCrrScore();
  };
  // hold dice
  const handleHoldDice = () => {
    const checkWinner = () => {
      const gameOver = () => {
        rollDice.removeEventListener("click", handleClick);
        holdDice.removeEventListener("click", handleClick);
        const body = document.querySelector("body");
        const gameOverDiv = document.createElement("div");
        gameOverDiv.id = "gameover";
        const div = document.createElement("div");
        div.id = "text-gameover";
        div.innerText = `winner is player${crrPlayer}`;
        gameOverDiv.appendChild(div);
        body.appendChild(gameOverDiv);
      };
      if (players[crrPlayer - 1].score > 50) gameOver(crrPlayer);
    };
    players[crrPlayer - 1].score += players[crrPlayer - 1].crrScore;
    checkWinner();
    players[crrPlayer - 1].crrScore = 0;
    displayScore();
    crrPlayer = crrPlayer == 1 ? 2 : 1;
    crrPlayerArrow.src =
      crrPlayer == 1 ? "public/leftArrow.svg" : "public/rightArrow.svg";
  };

  const isRollDice = event.srcElement.className.includes("roll");
  if (isRollDice) handleRollDice();
  else handleHoldDice();
};

rollDice.addEventListener("click", handleClick);
holdDice.addEventListener("click", handleClick);
