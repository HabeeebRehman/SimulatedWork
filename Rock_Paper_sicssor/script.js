let userWins = 0, userLosses = 0, ties = 0;

const emojis = {
    rock: "✊",
    paper: "✋",
    scissors: "✌️"
};

function playGame(userChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    let resultMessage = '';
    let userChoiceDisplay = `Your Choice: ${emojis[userChoice]} ${userChoice}`;
    let computerChoiceDisplay = `Computer's Choice: ${emojis[computerChoice]} ${computerChoice}`;

    if (userChoice === computerChoice) {
        resultMessage = `🤝 It's a tie! You both chose ${emojis[userChoice]} ${userChoice}.`;
        ties++;
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        resultMessage = `🎉 You win! ${emojis[userChoice]} ${userChoice} beats ${emojis[computerChoice]} ${computerChoice}.`;
        userWins++;
    } else {
        resultMessage = `😢 You lose! ${emojis[computerChoice]} ${computerChoice} beats ${emojis[userChoice]} ${userChoice}.`;
        userLosses++;
    }

    document.getElementById('user-choice').textContent = userChoiceDisplay;
    document.getElementById('computer-choice').textContent = computerChoiceDisplay;
    document.getElementById('result').innerHTML = `<p>${resultMessage}</p>`;

    document.getElementById('user-score').textContent = `Wins: ${userWins}`;
    document.getElementById('computer-score').textContent = `Losses: ${userLosses}`;
    document.getElementById('ties').textContent = `Ties: ${ties}`;
}

function resetGame() {
    userWins = 0;
    userLosses = 0;
    ties = 0;

    document.getElementById('user-choice').textContent = `Your Choice: `;
    document.getElementById('computer-choice').textContent = `Computer's Choice: `;
    document.getElementById('result').textContent = '';
    document.getElementById('user-score').textContent = `Wins: 0`;
    document.getElementById('computer-score').textContent = `Losses: 0`;
    document.getElementById('ties').textContent = `Ties: 0`;
}
