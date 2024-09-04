// HTML Elements
const board = document.getElementById("game-board")
const instructionText = document.getElementById("instruction-text")
const logo = document.getElementById("logo")

//Game variables
const gridSize = 20
let snake = [{x:10,y:10}]  // start from the mid of 20x20 board. 
let food  = generateFood()
let direction = 'right'
let gameInterval
let gameSpeedDelay = 200
let gameStarted = false 

// Draw game map, snake and food. 
function draw(){
    board.innerHTML = ''
    drawSnake()
    drawFood()
}


// draw snake 
function drawSnake(){
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div','snake')
        setPosition(snakeElement, segment)
        board.appendChild(snakeElement)
    })
}

// create a snake or food cube/div
function createGameElement(tag, className){
    const element = document.createElement(tag)
    element.className = className
    return element
}

// Set the position of snake or food 
function setPosition(element, position){
    element.style.gridColumn = position.x
    element.style.gridRow = position.y
}

// Testing draw fn 
// draw();

// Draw food function 
function drawFood(){
    const foodElement = createGameElement('div', 'food')
    setPosition(foodElement, food)
    board.appendChild(foodElement)
}

// Generate food
function generateFood(){
    const x = Math.floor(Math.random() * gridSize) + 1
    const y = Math.floor(Math.random() * gridSize) + 1
    return {x,y}
}

// Moving the snake   *** We are using shallow copy here, as we don't want to do any changes in the org arr. It can create some errors. 
function move(){
    const head = {...snake[0]}
    switch (direction) {
        case 'right':
            head.x++;
            break;
        case 'up':
            head.y--;
            break;
        case 'left':
            head.x--;
            break;
        case 'down':
            head.y++;
            break;    
    }
    // unshift will add a head object prior to all the objects in the snake array. 
    snake.unshift(head)  
    // snake.pop()
    if(head.x === food.x && head.y === food.y){
        food = generateFood();
        increaseSpeed()
        clearInterval(gameInterval); // clear past Interval
        gameInterval = setInterval(()=>{
            move()
            // checkCollision()
            draw()
        }, gameSpeedDelay)
    }
    else{
        snake.pop()
    }
}

//test moving
// setInterval(()=>{
//     move() // move first 
//     draw() // then draw again the new position 
// },200)


// Start game function 
function startGame(){
    gameStarted = true // keep track of a running game 
    instructionText.style.display = 'none'
    logo.style.display = 'none'
    gameInterval = setInterval(()=>{
        move()
        // checkCollision()
        draw()
    },gameSpeedDelay)
}

// Keypress event listener 
function handleKeyPress(event){   // if condition to handle every browser. 
    if((!gameStarted && event.code == 'Space') || (!gameStarted && event.key == ' ') ){
        startGame()
    }
    else{
        switch(event.key){
            case 'ArrowUp':
                direction = 'up'
                break
            case 'ArrowDown':
                direction = 'down'
                break
            case 'ArrowLeft':
                direction = 'left'
                break
            case 'ArrowRight':
                direction = 'right'
                break
        }
    }
}

document.addEventListener('keydown', handleKeyPress) // for every keydown we are calling the function handleKeyPress. 

function increaseSpeed(){
    if(gameSpeedDelay > 150){
        gameSpeedDelay -= 5
    }
    else if (gameSpeedDelay > 100){
        gameSpeedDelay -= 3;
    }
    else if (gameSpeedDelay > 50){
        gameSpeedDelay -= 2;
    }
    else if (gameSpeedDelay > 25){
        gameSpeedDelay -= 1;
    }
}

function checkCollision(){
    
}