'use strict';

// DOM Manipulation!!

// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = 'Correct Number!!';
// document.querySelector('.number').textContent = 20;
// document.querySelector('.score').textContent = 35;

// document.querySelector('.guess').value = 38;
// console.log(document.querySelector('.guess').value);
const body = document.querySelector('body');
let number = Math.floor(Math.random() * 20) + 1;
let score = Number(document.querySelector('.score').textContent);
const highScore = document.querySelector('.highscore');
let highScoreValue = Number(highScore.textContent);

const displayMsg = msg => {
  document.querySelector('.message').textContent = msg;
};

document.querySelector('.check').addEventListener('click', e => {
  const guess = Number(document.querySelector('.guess').value);
  // when Player choose not any guess value
  if (!guess) {
    // document.querySelector('.message').textContent = '😥 No Number';
    displayMsg('😥 No Number');
  } // when player chooses correct guess!!
  else if (guess === number) {
    document.querySelector('.number').textContent = number;
    // document.querySelector('.message').textContent = '🍕 Correct Number!!';
    displayMsg('🍕 Correct Number!!');
    body.style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    if (score > highScoreValue) {
      highScore.textContent = score;
      highScoreValue = highScore.textContent;
    }
  }
  // When guess is wrong/different than the secret number!!
  else if (guess !== number) {
    if (score > 1) {
      // document.querySelector('.message').textContent =
      //   guess > number ? '🤨 Too High!!' : '😗 Too Low!!';
      displayMsg(guess > number ? '🤨 Too High!!' : '😗 Too Low!!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      // document.querySelector('.message').textContent =
      //   '😪 Sorry!! You lose the game..';
      displayMsg('😪 Sorry!! You lose the game..');
      body.style.backgroundColor = '#E14D2A';
    }
  }

  // when player guess Is Too high!!
  // else if (guess > number) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '🤨 Too High!!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent =
  //       '😪 Sorry!! You lose the game..';
  //     body.style.backgroundColor = '#E14D2A';
  //   }
  // }
  // // when player guess is too low
  // else if (guess < number) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '😗 Too Low!!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent =
  //       '😪 Sorry!! You lose the game..';
  //     body.style.backgroundColor = '#E14D2A';
  //   }
  // }
});

// Adding Event-listener to the reset button!!

const resetBtn = document
  .querySelector('.again')
  .addEventListener('click', e => {
    number = Math.floor(Math.random() * 20) + 1;
    score = 20;
    document.querySelector('.guess').value = '';
    document.querySelector('.number').textContent = '?';
    document.querySelector('.number').style.width = '15rem';
    // document.querySelector('.message').textContent = 'Start guessing...';
    displayMsg('Start guessing...');
    body.style.backgroundColor = '#222';
    document.querySelector('.score').textContent = score;
  });
