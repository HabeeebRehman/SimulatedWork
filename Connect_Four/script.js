document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div');
    const resultDisplay = document.querySelector('#result');
    const currentPlayerDisplay = document.querySelector('#current-player');
    let currentPlayer = 1;
  
    squares.forEach((square, index) => {
      square.addEventListener('click', () => {
        // Check if the square below is "taken"
        if (squares[index + 7] && squares[index + 7].classList.contains('taken')) {
          // Add class for the current player
          if (!square.classList.contains('taken')) {
            square.classList.add('taken');
            square.classList.add(currentPlayer === 1 ? 'player-one' : 'player-two');
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            currentPlayerDisplay.textContent = currentPlayer;
          } else {
            alert('You cannot place here!');
          }
        } else {
          alert('You can only place on top of another token!');
        }
  
        checkWinner();
      });
    });
  
    function checkWinner() {
      const winningArrays = [
        // Horizontal
        [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6],
        [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13],
        // Vertical
        [0, 7, 14, 21], [7, 14, 21, 28], [14, 21, 28, 35], [21, 28, 35, 42],
        // Diagonal
        [3, 9, 15, 21], [4, 10, 16, 22], [5, 11, 17, 23], [6, 12, 18, 24]
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
        }
        if (
          squares[a].classList.contains('player-two') &&
          squares[b].classList.contains('player-two') &&
          squares[c].classList.contains('player-two') &&
          squares[d].classList.contains('player-two')
        ) {
          resultDisplay.textContent = 'Player Two Wins!';
        }
      });
    }
  });
  