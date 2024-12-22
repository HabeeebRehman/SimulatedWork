document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div');
    const resultDisplay = document.querySelector('#result');
    const currentPlayerDisplay = document.querySelector('#current-player');
    const timerDisplay = document.querySelector('#timer');
    const resetButton = document.querySelector('#reset-btn');
    let currentPlayer = 1;
    let timer = 10;
    let countdown;
    let gameOver = false;

    function startTimer() {
        timer = 10;
        timerDisplay.textContent = timer;
        countdown = setInterval(() => {
            timer--;
            timerDisplay.textContent = timer;
            if (timer <= 0) {
                clearInterval(countdown);
                passTurn();
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(countdown);
    }

    function passTurn() {
        if (gameOver) return;

        currentPlayer = currentPlayer === 1 ? 2 : 1;
        currentPlayerDisplay.textContent = currentPlayer;
        startTimer();
    }

    function resetGame() {
        gameOver = false;
        resultDisplay.textContent = '';
        currentPlayer = 1;
        currentPlayerDisplay.textContent = currentPlayer;
        timer = 10;
        timerDisplay.textContent = timer;
        squares.forEach(square => {
            square.classList.remove('taken', 'player-one', 'player-two');
        });
        startTimer();
    }

    squares.forEach((square, index) => {
        square.addEventListener('click', () => {
            if (gameOver) return;

            if (squares[index + 7] && !squares[index + 7].classList.contains('taken')) {
                if (!square.classList.contains('taken')) {
                    square.classList.add('taken');
                    square.classList.add(currentPlayer === 1 ? 'player-one' : 'player-two');
                    square.classList.add('falling');
                    passTurn();
                } else {
                    alert('You cannot place here!');
                }
            } else {
                alert('You can only place on top of another token!');
            }

            stopTimer();
            startTimer();

            checkWinner();
        });
    });

    function checkWinner() {
        const winningArrays = [
            [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6],
            [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13],
            [14, 15, 16, 17], [15, 16, 17, 18], [16, 17, 18, 19], [17, 18, 19, 20],
            [21, 22, 23, 24], [22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27],
            [28, 29, 30, 31], [29, 30, 31, 32], [30, 31, 32, 33], [31, 32, 33, 34],
            [35, 36, 37, 38], [36, 37, 38, 39], [37, 38, 39, 40], [38, 39, 40, 41],
            [0, 7, 14, 21], [7, 14, 21, 28], [14, 21, 28, 35],
            [1, 8, 15, 22], [8, 15, 22, 29], [15, 22, 29, 36],
            [2, 9, 16, 23], [9, 16, 23, 30], [16, 23, 30, 37],
            [3, 10, 17, 24], [10, 17, 24, 31], [17, 24, 31, 38],
            [4, 11, 18, 25], [11, 18, 25, 32], [18, 25, 32, 39],
            [5, 12, 19, 26], [12, 19, 26, 33], [19, 26, 33, 40],
            [6, 13, 20, 27], [13, 20, 27, 34], [20, 27, 34, 41],
            [3, 9, 15, 21], [4, 10, 16, 22], [5, 11, 17, 23], [6, 12, 18, 24],
            [7, 13, 19, 25], [8, 14, 20, 26], [9, 15, 21, 27], [10, 16, 22, 28],
            [11, 17, 23, 29], [12, 18, 24, 30], [13, 19, 25, 31], [14, 20, 26, 32],
            [15, 21, 27, 33], [16, 22, 28, 34], [17, 23, 29, 35], [18, 24, 30, 36],
            [19, 25, 31, 37], [20, 26, 32, 38], [21, 27, 33, 39], [22, 28, 34, 40],
            [23, 29, 35, 41]
        ];

        winningArrays.forEach(array => {
            const [a, b, c, d] = array;
            if (
                squares[a].classList.contains('player-one') &&
                squares[b].classList.contains('player-one') &&
                squares[c].classList.contains('player-one') &&
                squares[d].classList.contains('player-one')
            ) {
                resultDisplay.textContent = 'Player One Wins!';
                gameOver = true;
            }
            if (
                squares[a].classList.contains('player-two') &&
                squares[b].classList.contains('player-two') &&
                squares[c].classList.contains('player-two') &&
                squares[d].classList.contains('player-two')
            ) {
                resultDisplay.textContent = 'Player Two Wins!';
                gameOver = true;
            }
        });
    }

    resetButton.addEventListener('click', resetGame);

    startTimer();
});
