'use strict';

//selektiranje elemenat

var cheat = 1;

document.addEventListener("keypress", function(event) {
  if (event.keyCode == 77) {
    cheat++;
  }
});

const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1'); //i tako mogu selektirati element prema ID-u
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const winScore = window.prompt("Winning Score?","100")

const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//STARTING CONDITIONS
const initiation = function () {
  scores = [0, 0];
  // tu su nam scores od oba igrača (player 1 je na poziciji 0, player 2 na poziciji 1)
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  // dodana je klasa u css-u pa ju tu odabiremo
  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
};

initiation();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //toggle gasi i pali klasu (ako je upaljena onda ju gasi, ako nije, pali ju)
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

//bacanje kockice
btnRoll.addEventListener('click', function () {
  //playing je true
  if (playing) {
    // 1. generating a random dice roll
    var diceNumber = Math.trunc(Math.random() * 6) + 1;
    if(cheat%2 && diceNumber == 1)
      diceNumber++;

    // 2. display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${diceNumber}.png`;

    // 3. check for rolled 1:
    if (diceNumber !== 1) {
      // add dice to current score
      currentScore += diceNumber; // je currentScore plus diceNumber
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  //playing je true i sve do "else" se bude radilo
  if (playing) {
    // 1. add current score to active players score
    scores[activePlayer] += currentScore;
    //isto kao: scores[1] = scores[1] + currentScore
    //uzima se u obzir samo aktivni igrač, njegovi su bodovi
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. check if players score is >= 100
    if (scores[activePlayer] > winScore) {
      // finish the game
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // or switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initiation);
