//Constants
var CANVAS = document.getElementById("game");
var CONTEXT = CANVAS.getContext("2d");
var FPS = 100;

//Colors and Text


//Variables


//updates and calculations
function updateElements() {

}

//drawing all elements
function drawElements() {

}

//main function running based on FPS
function main() {
    console.log("ello");
    updateElements();
    drawElements();

    setTimeout(function() {main();}, 1000/FPS);
}
main();