const cvs = document.getElementById("canvas")
const ctx = cvs.getContext("2d")
const body = document
const LA = 20

let scoreT = document.getElementById("score")

let snakeX = cvs.width/2
let snakeY = cvs.height/2 
let score = 0
let d

let trail = []
let tail = 2

let foodY = (Math.floor(Math.random() * LA) * LA)
let foodX = (Math.floor(Math.random() * LA) * LA)

body.addEventListener("keydown", changeDirection)

function changeDirection(e) {
    if (e.key === "ArrowUp")    { d = "up" }
    if (e.key === "ArrowDown")  { d = "down" }
    if (e.key === "ArrowLeft")  { d = "left" }
    if (e.key === "ArrowRight") { d = "right" }
}

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, h)
}

function drawSnake() {
    for (let i = 0; i < trail.length; i++) {
        drawRect(trail[i].x, trail[i].y, LA, LA, "white")
        if (snakeX == trail[i].x && snakeY == trail[i].y) {
            snakeX = cvs.width/2
            snakeY = cvs.height/2
            tail = 2
            d = ""
        }
    }

    trail.push({ y : snakeY, x : snakeX })

    while (trail.length > tail)
        trail.shift()
}

function drawGrid() {
    for (let i = 0; i < LA; i++) {
        drawRect(LA * i, 0, 1, cvs.height, "black")
    } for (let o = 0; o < LA; o++) {
        drawRect(0, LA * o, cvs.width, 1, "black")
    }
}

function update() {

    if (snakeY == foodY && snakeX == foodX) {
        foodY = (Math.floor(Math.random() * LA) * LA)
        foodX = (Math.floor(Math.random() * LA) * LA)
        score++
        tail++

        scoreT.innerHTML = "Pontos: " + score
    }

    if (d == "up")    { snakeY -= LA }
    if (d == "down")  { snakeY += LA }
    if (d == "left")  { snakeX -= LA }
    if (d == "right") { snakeX += LA }

    if (snakeY + LA > cvs.height) { snakeY = 0 }
    if (snakeY < 0)               { snakeY = cvs.height - LA}
    if (snakeX + LA > cvs.width)  { snakeX = 0 }
    if (snakeX < 0)               { snakeX = cvs.width - LA }
}

function render() {
    if (score === (cvs.width + cvs.height) / LA) 
        scoreT.innerHTML = "Parabéns, você ganhou!"
    else {
        drawRect(0, 0, cvs.width, cvs.height, "black")
        drawRect(foodX, foodY, LA, LA, "red")
        drawSnake()
        drawRect(snakeX, snakeY, LA, LA, "white")
        drawGrid()
    }
}

function game() {
    update()
    render()
}

setInterval(game, 1000/10)