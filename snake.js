const cvs = document.querySelector('canvas');
const ctx = cvs.getContext('2d');
// Direction using keys
window.addEventListener('keydown', direction, false);
var d;
function direction(key) {
    if (key.keyCode == "37" && d != "RIGHT") {
        //console.log("left")
        d = "LEFT";
    }
    if (key.keyCode == "39" && d != "LEFT") {
        //console.log("right")
        d = "RIGHT";
    }
    if (key.keyCode == "38" && d != "DOWN") {
        //console.log("up")
        d = "UP";
    }
    if (key.keyCode == "40" && d != "UP") {
        //console.log("down")
        d = "DOWN";
    }
}
d="RIGHT";
// ctx.fillRect(100, 300, 30, 30);

let box = 32;
let score = 0;
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };
// Let food take random place
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};
// check collision
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }

    }
    return false;
};
let y;
// function drawBackground(){
//     y++;
//     for (let i = 0; i < 17; i++){
//         for(let k = 0; k < 15; k++){
//             if (i % 2 == 0 && k % 2 == 1){
//                 ctx.fillStyle = "gray";
//                 ctx.fillRect( box * i + box, box * k + box * 3, box, box)
//             } else {
//                 ctx.fillStyle = "lightgray";
//                 ctx.fillRect( box * i + box, box * k + box * 3, box, box)
//             }
//         }
//     }
// }
// Draw function
function draw() {
    ctx.fillStyle = "rgba(69, 230, 29, 0.432)";
    ctx.fillRect(0, 0, 608, 608);
    ctx.fillStyle = "lightgray";
    ctx.fillRect(box * 1, box * 3, box * 17, box * 15);
    // drawBackground();
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "rgba(12, 177, 169, 0.767)" : "rgba(177, 125, 12, 0.767)";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    if (collision(food, snake)) {
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box

        }
        ctx.fillStyle = "green";
        ctx.fillRect(food.x, food.y, 32, 32);
    } else {
        ctx.fillStyle = "green";
        ctx.fillRect(food.x, food.y, 32, 32);
    }
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    // what direction
    if (d == "LEFT") { snakeX -= box };
    if (d == "RIGHT") { snakeX += box };
    if (d == "DOWN") { snakeY += box };
    if (d == "UP") { snakeY -= box };
    // if it  eats the food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        };
    } else {
        // remove the tail
        snake.pop();
    }
    // check borders
    if (snakeX > 17 * box)
        snakeX = box;
    if (snakeX < 1 * box)
        snakeX = 17 * box;
    if (snakeY > 17 * box)
        snakeY = 3 * box;
    if (snakeY < 3 * box)
        snakeY = 17 * box;
    // add new head
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    if (collision(newHead, snake)) {
        clearInterval(game)
    }

    snake.unshift(newHead);

    ctx.fillStyle = "Black";
    ctx.font = "45px Changd One";
    // ctx.fontfamily = "Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    ctx.fillText(score, 12.8 * box, 1.6 * box);
    ctx.fillText('Your score is', 5 * box, 1.6 * box);
    //game over

}
let game = setInterval(draw, 100)