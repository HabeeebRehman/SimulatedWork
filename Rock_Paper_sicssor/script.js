let userScore = 0;
let computerScore = 0;

function playGame(userChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    let result = '';
    let userChoiceDisplay = `Your Choice: ${userChoice}`;
    let computerChoiceDisplay = `Computer's Choice: ${computerChoice}`;

    if (userChoice === computerChoice) {
        result = `It's a draw! You both chose ${userChoice}.`;
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = `You win! ${userChoice} beats ${computerChoice}.`;
        userScore++;
    } else {
        result = `You lose! ${computerChoice} beats ${userChoice}.`;
        computerScore++;
    }

    document.getElementById('user-choice').textContent = userChoiceDisplay;
    document.getElementById('computer-choice').textContent = computerChoiceDisplay;
    document.getElementById('result').innerHTML = `<p>${result}</p>`;

    document.getElementById('user-score').textContent = `Your Score: ${userScore}`;
    document.getElementById('computer-score').textContent = `Computer's Score: ${computerScore}`;
}

function resetGame() {
    userScore = 0;
    computerScore = 0;

    document.getElementById('user-choice').textContent = `Your Choice: `;
    document.getElementById('computer-choice').textContent = `Computer's Choice: `;
    document.getElementById('result').textContent = '';
    document.getElementById('user-score').textContent = `Your Score: 0`;
    document.getElementById('computer-score').textContent = `Computer's Score: 0`;
}
