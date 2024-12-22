const squares = document.querySelectorAll('.square');
const scoreDisplay = document.querySelector('#score');
const timeLeftDisplay = document.querySelector('#time-left');

let result = 0;
let currentTime = 60;
let timerId = null;
let moleTimerId = null;
let hitPosition;
let moleSpeed = 800;

function randomSquare() {
  squares.forEach(square => {
    square.classList.remove('mole', 'bonus-mole'); 
  });

  const randomSquare = squares[Math.floor(Math.random() * squares.length)];
  const isBonus = Math.random() < 0.2; 

  if (isBonus) {
    randomSquare.classList.add('bonus-mole');
    randomSquare.dataset.bonus = true;
  } else {
    randomSquare.classList.add('mole');
    randomSquare.dataset.bonus = false;
  }

  hitPosition = randomSquare.id;
}

squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (square.id === hitPosition) {
      if (square.dataset.bonus === 'true') {
        result += 5;
      } else {
        result++;
      }
      scoreDisplay.textContent = result;
      hitPosition = null;
    }
  });
});

function moveMole() {
  moleTimerId = setInterval(randomSquare, moleSpeed);

  setInterval(() => {
    if (moleSpeed > 300) {
      moleSpeed -= 50;
      clearInterval(moleTimerId);
      moleTimerId = setInterval(randomSquare, moleSpeed);
    }
  }, 10000);
}

function countDown() {
  currentTime--;
  timeLeftDisplay.textContent = currentTime;

  if (currentTime === 0) {
    clearInterval(timerId);
    clearInterval(moleTimerId);
    alert(`GAME OVER! Your final score is ${result}`);
  }
}
timerId = setInterval(countDown, 1000);
moveMole();
