const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector(".results");
const resetButton = document.getElementById("resetButton");

let currentShooterIndex = 202;
const width = 15;
const aliensRemoved = [];
let invadersId;
let isGoingRight = true;
let direction = 1;
let results = 0;
let level = 1;
let alienInvaders = [];
let levelInvaders = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19],
    [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
    [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89],
];

for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll(".grid div"));

function startLevel() {
    alienInvaders = levelInvaders[level - 1];
    draw();
    invadersId = setInterval(moveInvaders, 600 - (level - 1) * 100);
    resultDisplay.innerHTML = `Level: ${level} | Score: ${results}`;
}

function draw() {
    squares.forEach(square => square.classList.remove("invader", "laser", "boom"));

    for (let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add("invader");
        }
    }
}

function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove("invader");
    }
}

squares[currentShooterIndex].classList.add("shooter");

function moveShooter(e) {
    squares[currentShooterIndex].classList.remove("shooter");
    switch (e.key) {
        case "ArrowLeft":
            if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
            break;
        case "ArrowRight":
            if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
            break;
    }
    squares[currentShooterIndex].classList.add("shooter");
}

document.addEventListener("keydown", moveShooter);

function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
    remove();

    if (rightEdge && isGoingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width + 1;
            direction = -1;
            isGoingRight = false;
        }
    }

    if (leftEdge && !isGoingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width - 1;
            direction = 1;
            isGoingRight = true;
        }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction;
    }

    draw();

    if (alienInvaders.some(invader => invader >= squares.length - width)) {
        resultDisplay.innerHTML = "GAME OVER";
        clearInterval(invadersId);
    }

    if (aliensRemoved.length === alienInvaders.length) {
        results += 10 * level;
        level++;
        if (level > levelInvaders.length) {
            resultDisplay.innerHTML = "YOU WIN! You finished all levels!";
            clearInterval(invadersId);
        } else {
            startLevel();
        }
    }
}

function shoot(e) {
    let laserId;
    let currentLaserIndex = currentShooterIndex;

    function moveLaser() {
        squares[currentLaserIndex].classList.remove("laser");
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add("laser");

        if (squares[currentLaserIndex].classList.contains("invader")) {
            squares[currentLaserIndex].classList.remove("laser");
            squares[currentLaserIndex].classList.remove("invader");
            squares[currentLaserIndex].classList.add("boom");

            setTimeout(() => squares[currentLaserIndex].classList.remove("boom"), 300);
            clearInterval(laserId);

            const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
            aliensRemoved.push(alienRemoved);
            results++;
            resultDisplay.innerHTML = `Level: ${level} | Score: ${results}`;
        }
    }

    if (e.key === "ArrowUp") {
        laserId = setInterval(moveLaser, 100);
    }
}

document.addEventListener('keydown', shoot);

resetButton.addEventListener('click', resetGame);

function resetGame() {
    aliensRemoved.length = 0;
    results = 0;
    level = 1;
    alienInvaders = [];
    remove();
    startLevel();
}

startLevel();
