// HTML Elements
const board = document.getElementById("game-board")

//Game variables
const gridSize = 20
let snake = [{x:10,y:10}]  // start from the mid of 20x20 board. 
let food  = generateFood()
 

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
draw();

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

// Moving the snake
function move(){

}

