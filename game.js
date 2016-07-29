//Constants
var CANVAS = document.getElementById("game");
var CONTEXT = canvas.getContext("2d");
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

    window.setInterval(function() {main();}, 1000/FPS);
    
}
main();