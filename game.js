window.onload = function () {
    //originally loading canvas and context
    var CANVAS = document.getElementById("game");
    var CONTEXT = CANVAS.getContext("2d");
    document.addEventListener("keydown", keyDown);
    
    //Constants
    const FPS = 100;
    const JUMP_START = 30;
    const JUMP_MODIFIER = 0.66;
    const RUNNER_SIZE = 120;
    const SEAGULL_SIZE = 120;
    const ROCK_SIZE = 120;
    const OBSTACLE_SPEED = -10;
    const SEAGULL_Y = SEAGULL_SIZE;
    const ROCK_Y = CANVAS.height - ROCK_SIZE

    //Colors and Text


    //Variables
    var counter = 0;
    var obstacles = [];
    var player = new runner()

    //Constructors
    function runner() {
        this.jumping = false;
        this.x = 0;
        this.y = 0;
        this.y_vel = 0;
        this.size = RUNNER_SIZE;
        this.draw = function () {
            var sprite = new Image();
            sprite.scr = "sprites/Runner.png"
            var frameToDraw = counter % 4;
            console.log(this.x, this.y);
            CONTEXT.drawImage(sprite, 32*frameToDraw, 0, 32, 32, this.x, this.y - RUNNER_SIZE, RUNNER_SIZE, RUNNER_SIZE);
        }
    }

    function seagull() {
        this.size = SEAGULL_SIZE;
        this.y = SEAGULL_Y;
        this.x = CANVAS.width;
        this.x_vel = OBSTACLE_SPEED;
        this.draw = function () {
            console.log("draw");
        }
    }

    function rock() {
        this.size = ROCK_SIZE;
        this.y = ROCK_Y;
        this.x = CANVAS.width;
        this.x_vel = OBSTACLE_SPEED;
        this.draw = function () {
            console.log("draw");
        }
    }

    //function for spacebar press
    function keyDown(e) {
        if (e.keyCode == 32) {
            if (!player.jumping) {
                player.jumping = true;
                player.y_vel = JUMP_START;
            }
        }
    }

    //updates and calculations
    function updateElements() {
        
        //updating player
        if (player.jumping) {
            if (player.y_vel <= -JUMP_START) {
                player.y_vel = 0;
                player.jumping = false;
                player.y = 0;
            } else {
                player.y += JUMP_MODIFIER * runner.y_vel;
                player.y_vel--;
            }
        }

        //updating obstacles
        for (obstacle in obstacles) {
            obstacle.x -= obstacle.x_vel;
            if (obstacle.x < -obstacle.size) {
                obstacles.splice(obstacles.indexOf(obstacle),1);
            }
        }

        //creating new obstacles
        if (counter % 200 == 0) {
            if (Math.random() > 0.5) {
                obstacles.push(new seagull());
            } else {
                obstacles.push(new rock());
            }
        }

    }

    //drawing all elements
    function drawElements() {
        CONTEXT.clearRect(0,0,CANVAS.width, CANVAS.height);

        //draw player
        player.draw()

        //draw obstacles
        for (var i = 0; i < obstacles.length; i++) {
            obstacles[i].draw();
        }
    }

    //main function running based on FPS
    function main() {
        updateElements();
        drawElements();

        counter++;
        setTimeout(function() {main();}, 1000/FPS);
    }

    main();
}