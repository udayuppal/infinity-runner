//originally loading canvas and context
window.onload = function () {
    var CANVAS = document.getElementById("game");
    var CONTEXT = CANVAS.getContext("2d");
    document.addEventListener("keydown", keyDown);
}

//Constants
var FPS = 100;
var JUMPSTART = 50;

//Colors and Text


//Variables
var counter = 0;
var jump_modifier = 1;
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
            runner.y_vel = JUMPSTART;
        }
    }
}

//updates and calculations
function updateElements() {
    if (runner.jumping) {
        if (runner.y_vel <= -JUMPSTART) {
            runner.y_vel = 0;
            runner.jumping = false;
            runner.y = 0;
        } else {
            runner.y += jump_modifier * runner.y_vel;
            runner.y_vel--;
        }
    } 
}

//drawing all elements
function drawElements() {

}

//main function running based on FPS
function main() {
    updateElements();
    drawElements();

    console.log(runner.y);


    counter++;
    setTimeout(function() {main();}, 1000/FPS);
}
main();