'use strict';

// let randomDiceNumber = Math.floor(Math.random() * 6) + 1;
// // console.log(randomDiceNumber);

// // Storing all the players!!
// const player1 = document.querySelector('.player--0');
// const player2 = document.querySelector('.player--1');

// // Storing The Active Player!!

// const activePlayer = document.querySelector('.player--active');

// // Storing All the Player's current and tota score!!
// const player1TotalScore = document.querySelector('#score--0');
// const player1CurrentScore = document.querySelector('#current--0');
// const player2TotalScore = document.querySelector('#score--1');
// const player2CurrentScore = document.querySelector('#current--1');

// // Storing the image
// const img = document.querySelector('.dice');
// img.style.display = 'none';

// // Now, Storing all the game-buttons!!

// const newGameBtn = document.querySelector('.btn--new');
// const rollDiceBtn = document.querySelector('.btn--roll');
// const holdGameBtn = document.querySelector('.btn--hold');

// // Adding Event to the roll dice btn!!
// let sum = 0;
// rollDiceBtn.addEventListener('click', e => {
//   randomDiceNumber = Math.floor(Math.random() * 6) + 1;
//   img.style.display = 'block';
//   img.src = `dice-${randomDiceNumber}.png`;
//   if (player1.classList.contains('player--active') && totalScore1 < 40) {
//     if (randomDiceNumber !== 1) {
//       sum = sum + randomDiceNumber;
//       player1CurrentScore.textContent = sum;
//     } else {
//       sum = 0;
//       player1CurrentScore.textContent = sum;
//       player1.classList.remove('player--active');
//       player2.classList.add('player--active');
//     }
//   } else if (player2.classList.contains('player--active') && totalScore2 < 40) {
//     if (randomDiceNumber !== 1) {
//       sum = sum + randomDiceNumber;
//       player2CurrentScore.textContent = sum;
//     } else {
//       sum = 0;
//       player2CurrentScore.textContent = sum;
//       player2.classList.remove('player--active');
//       player1.classList.add('player--active');
//     }
//   } else {
//     player1CurrentScore.textContent = 0;
//     player2CurrentScore.textContent = 0;
//     img.style.display = 'none';
//   }
// });

// // Adding Event to the Hold Button!!
// let totalScore1 = 0;
// let totalScore2 = 0;
// holdGameBtn.addEventListener('click', e => {
//   if (totalScore1 >= 40 && player1.classList.contains('player--active')) {
//     player1.style.backgroundColor = '#fff';
//     player1TotalScore.textContent = totalScore1;
//     player1CurrentScore.textContent = 0;
//     player2TotalScore.textContent = totalScore2;
//     player2CurrentScore.textContent = 0;
//     img.style.display = 'none';
//   } else if (
//     totalScore2 >= 40 &&
//     player2.classList.contains('player--active')
//   ) {
//     player2.style.backgroundColor = '#fff';
//     player2TotalScore.textContent = totalScore2;
//     player2CurrentScore.textContent = 0;
//     player1TotalScore.textContent = totalScore1;
//     player1CurrentScore.textContent = 0;
//     img.style.display = 'none';
//   } else if (totalScore1 < 40 && player1.classList.contains('player--active')) {
//     player1.classList.remove('player--active');
//     player2.classList.add('player--active');
//     totalScore1 += sum;
//     player1TotalScore.textContent = totalScore1;
//     sum = 0;
//     player1CurrentScore.textContent = 0;
//   } else if (totalScore2 < 40 && player2.classList.contains('player--active')) {
//     player2.classList.remove('player--active');
//     player1.classList.add('player--active');
//     totalScore2 += sum;
//     player2TotalScore.textContent = totalScore2;
//     sum = 0;
//     player2CurrentScore.textContent = 0;
//   }
// });

// // adding reset feature to the game!!

// newGameBtn.addEventListener('click', e => {
//   sum = 0;
//   img.style.display = 'none';
//   player1.style.backgroundColor = '#d9aebc';
//   player2.style.backgroundColor = '#b97a98';
//   player1CurrentScore.textContent = 0;
//   player1TotalScore.textContent = 0;
//   player2CurrentScore.textContent = 0;
//   player2TotalScore.textContent = 0;
//   if (!player1.classList.contains('player--active')) {
//     player2.classList.remove('player--active');
//     player1.classList.add('player--active');
//   } else {
//     player1.classList.add('player--active');
//     player2.classList.remove('player--active');
//   }
// });

// ****************************************************
// Working Code!!

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
diceEl.classList.add('hidden');

// Selecting game btns
const newGameBtn = document.querySelector('.btn--new');
const diceBtn = document.querySelector('.btn--roll');
const holdGameBtn = document.querySelector('.btn--hold');

// // Starting Conditions
// score0El.textContent = 0;
// score1El.textContent = 0;

// // Game State Variable

let playing = true;
let scores = [0, 0];
let activePlayer = 0;
let currentScore = 0;

// Init function
const init = function () {
  diceEl.classList.add('hidden');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;
};
init();
// switchPayer function

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling Dice functionallity
diceBtn.addEventListener('click', e => {
  if (playing) {
    const dice = Math.floor(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      // Add to current Score!!
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to another player!!
      switchPlayer();
    }
  }
});

// Adding hold functionality

holdGameBtn.addEventListener('click', e => {
  if (playing) {
    scores[activePlayer] += currentScore;
    //   scores[0] = scores[0] + 1;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
// console.log(currentScore);

// Adding Reset Game Functionality

newGameBtn.addEventListener('click', init);
