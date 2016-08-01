window.onload = function () {
    //originally loading canvas and context
    var CANVAS = document.getElementById("game");
    var CONTEXT = CANVAS.getContext("2d");
    document.addEventListener("keydown", keyDown);
    
    //Constants
    const FPS = 100;
    const JUMP_START = 30;
    const JUMP_MODIFIER = 0.5;
    const RUNNER_SIZE = 90;
    const SEAGULL_SIZE = 100;
    const ROCK_SIZE = 180;
    const SEAGULL_Y = 50;
    const ROCK_Y = CANVAS.height - ROCK_SIZE;
    const ROCK_PROBABILITY = 0.63;

    //Colors and Text
    const BACKGROUND = "yellow";

    //Variables
    var counter = 0;
    var obstacles = [];
    var player = new runner()
    var obstacle_speed = -8
    var spawn_speed = 120

    //Constructors
    function runner() {
        this.size = RUNNER_SIZE;
        this.jumping = false;
        this.x = 0;
        this.y = CANVAS.height - this.size;
        this.y_vel = 0;
        this.draw = function () {
            var sprite = new Image();
            sprite.src = "sprites/Runner.png"
            var frameToDraw = Math.floor((counter % 40)/10);
            CONTEXT.drawImage(sprite, 0, 32*frameToDraw, 32, 32, this.x, this.y, this.size, this.size);
            CONTEXT.strokeRect(this.x, this.y, this.size, this.size);
        }
    }

    function seagull() {
        this.size = SEAGULL_SIZE;
        this.y = SEAGULL_Y;
        this.x = CANVAS.width;
        this.x_vel = obstacle_speed;
        this.draw = function () {
            var sprite = new Image();
            sprite.src = "sprites/Seagull.png"
            var frameToDraw = Math.floor((counter % 24)/12);
            CONTEXT.drawImage(sprite, 0, 32*frameToDraw, 32, 32, this.x, this.y, this.size, this.size);
            CONTEXT.strokeRect(this.x, this.y, this.size, this.size);
        }
    }

    function rock() {
        this.size = ROCK_SIZE;
        this.y = ROCK_Y;
        this.x = CANVAS.width;
        this.x_vel = obstacle_speed;
        this.draw = function () {
            var sprite = new Image();
            sprite.src = "sprites/Rock.png"
            CONTEXT.drawImage(sprite, this.x, this.y, this.size, this.size);
            CONTEXT.strokeRect(this.x, this.y, this.size, this.size);
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
                player.y = CANVAS.height - player.size;
            } else {
                player.y -= JUMP_MODIFIER * player.y_vel;
                player.y_vel--;
            }
        }

        //updating obstacles
        for (var i = 0; i < obstacles.length; i++) {
            obstacles[i].x += obstacles[i].x_vel;
            if (obstacles[i].x < -obstacles[i].size) {
                obstacles.splice(i,1);
            }
        }

        //creating new obstacles
        if (counter % spawn_speed == 0) {
            if (Math.random() > ROCK_PROBABILITY) {
                obstacles.push(new seagull());
            } else {
                obstacles.push(new rock());
            }
        }

    }

    //drawing all elements
    function drawElements() {
        CONTEXT.clearRect(0,0,CANVAS.width, CANVAS.height);
        CONTEXT.fillStyle = BACKGROUND;
        CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height);

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