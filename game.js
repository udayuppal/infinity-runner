//originally loading canvas and context
var CANVAS;
var CONTEXT;
window.onload = function () {
    CANVAS = document.getElementById("game");
    CONTEXT = CANVAS.getContext("2d");
    document.addEventListener("keydown", keyDown);
    main();
}

//Constants
var FPS = 100;
var JUMP_START = 30;
var JUMP_MODIFIER = 0.5;

//Colors and Text


//Variables
var counter = 0;
var runner = {
    jumping: false,
    y: 0,
    y_vel: 0
}

//function for spacebar press
function keyDown(e) {
    if (e.keyCode == 32) {
        if (!runner.jumping) {
            runner.jumping = true;
            runner.y_vel = JUMP_START;
        }
    }
}

//updates and calculations
function updateElements() {
    if (runner.jumping) {
        if (runner.y_vel <= -JUMP_START) {
            runner.y_vel = 0;
            runner.jumping = false;
            runner.y = 0;
        } else {
            runner.y += JUMP_MODIFIER * runner.y_vel;
            runner.y_vel--;
        }
    } 
}

//drawing all elements
function drawElements() {
    console.log(CONTEXT);
    CONTEXT.beginPath();
    CONTEXT.rect(0, CANVAS.width - runner.y - 10, 10, 10);
    CONTEXT.stroke();
}

//main function running based on FPS
function main() {
    updateElements();
    drawElements();

    console.log(runner.y);


    counter++;
    setTimeout(function() {main();}, 1000/FPS);
}
