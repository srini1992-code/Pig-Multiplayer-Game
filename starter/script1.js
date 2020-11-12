'use strict';
// declarations
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');

const btnnew = document.querySelector('.btn--new');
const btnhold = document.querySelector('.btn--hold');
const btnroll = document.querySelector('.btn--roll');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// reset consitons
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  // hide the dice
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
// switch playerfunction
const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// dice functionality
// 1.roolling  a dice
btnroll.addEventListener('click', function () {
  if (playing) {
    // 1.generate random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //   2.display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //   3.add score to current score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      // console.log(activePlayer);shows which player is playing game
      // current0El.textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
  // 4.if dice ==1,switch player
});
btnhold.addEventListener('click', function () {
  if (playing) {
    // 1.add current score to active players score
    scores[activePlayer] += currentScore;
    // score[1]=score[1]+currentScore;
    console.log(scores[activePlayer]);
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2.check if player score>=100
    if (scores[activePlayer] >= 15) {
      // finish the game
      diceEl.classList.add('hidden');
      playing = false;
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
  // 3.if 100 then player wins if <100 switch player
});
btnnew.addEventListener('click', init);
