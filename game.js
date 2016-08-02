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
    const RUNNER_HEIGHT = RUNNER_SIZE;
    const RUNNER_WIDTH = 0.58 * RUNNER_SIZE;
    const SEAGULL_SIZE = 100;
    const SEAGULL_WIDTH = 0.9 * SEAGULL_SIZE;
    const SEAGULL_HEIGHT = 0.65 * SEAGULL_SIZE;
    const ROCK_SIZE = 180;
    const ROCK_WIDTH = 0.48 * ROCK_SIZE;
    const ROCK_HEIGHT = 0.4 * ROCK_SIZE;
    const SEAGULL_Y = 50;
    const ROCK_Y = CANVAS.height - ROCK_SIZE;
    const ROCK_PROBABILITY = 0.60;

    //Colors and Text
    const BACKGROUND = "yellow";
    const SCORE_COLOR = "black";
    const SCORE_FONT = "30px VT323";

    //Variables
    var counter = 0;
    var obstacles = [];
    var player = new runner()
    var obstacle_speed = -8
    var spawn_speed = 120
    var collision = false;

    //Constructors
    function runner() {
        this.size = RUNNER_SIZE;
        this.width = RUNNER_WIDTH;
        this.height = RUNNER_HEIGHT;
        this.jumping = false;
        this.x = this.size/2;
        this.y = CANVAS.height - this.size/2;
        this.y_vel = 0;
        this.draw = function () {
            var sprite = new Image();
            sprite.src = "sprites/Runner.png"
            var frameToDraw = Math.floor((counter % 40)/10);
            CONTEXT.drawImage(sprite, 0, 32*frameToDraw, 32, 32, this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        }
    }

    function seagull() {
        this.size = SEAGULL_SIZE;
        this.width = SEAGULL_WIDTH;
        this.height = SEAGULL_HEIGHT;
        this.y = SEAGULL_Y + this.size/2 - 5;
        this.x = CANVAS.width + this.size/2;
        this.x_vel = obstacle_speed;
        this.draw = function () {
            var sprite = new Image();
            sprite.src = "sprites/Seagull.png"
            var frameToDraw = Math.floor((counter % 24)/12);
            CONTEXT.drawImage(sprite, 0, 32*frameToDraw, 32, 32, this.x - this.size/2, this.y - this.size/2 + 5, this.size, this.size);
        }
    }

    function rock() {
        this.size = ROCK_SIZE;
        this.width = ROCK_WIDTH;
        this.height = ROCK_HEIGHT;
        this.y = ROCK_Y + this.size/2 + 50;
        this.x = CANVAS.width + this.size/2 - 18;
        this.x_vel = obstacle_speed;
        this.draw = function () {
            var sprite = new Image();
            sprite.src = "sprites/Rock.png"
            CONTEXT.drawImage(sprite, this.x - this.size/2 + 18, this.y - this.size/2 - 50, this.size, this.size);            
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
                player.y = CANVAS.height - player.size/2;
            } else {
                player.y -= JUMP_MODIFIER * player.y_vel;
                player.y_vel--;
            }
        }

        //updating obstacles
        for (var i = 0; i < obstacles.length; i++) {
            obstacles[i].x += obstacles[i].x_vel;
            if (obstacles[i].x < -obstacles[i].size/2) {
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
        var background = new Image();
        background.src = "sprites/Background.png";
        //CONTEXT.drawImage(background, 0, 0, CANVAS.width, CANVAS.height);

        //draw player
        player.draw()

        //draw obstacles
        for (var i = 0; i < obstacles.length; i++) {
            obstacles[i].draw();
        }
    }

    function detectCollisions() {
        for (var i = 0; i < obstacles.length; i++) {
            var player_x_min = player.x - player.width/2;
            var player_x_max = player.x + player.width/2;
            var player_y_min = player.y - player.height/2;
            var player_y_max = player.y + player.height/2;
            var obstacle_x_min = obstacles[i].x - obstacles[i].width/2;
            var obstacle_x_max = obstacles[i].x + obstacles[i].width/2;
            var obstacle_y_min = obstacles[i].y - obstacles[i].height/2;
            var obstacle_y_max = obstacles[i].y + obstacles[i].height/2;
            
            if (player_x_max > obstacle_x_min && player_x_min < obstacle_x_max && 
                player_y_max > obstacle_y_min && player_y_min < obstacle_y_max) {
                collision = true;
            }
        }
    }

    function drawScore () {
        CONTEXT.font = SCORE_FONT;
        CONTEXT.fillStyle = SCORE_COLOR;
        CONTEXT.fillText(counter, CANVAS.width - CONTEXT.measureText(counter).width - 20, 20);
    }

    function endGame() {
        
    }

    //main function running based on FPS
    function main() {

        if (!collision) {
            updateElements();
            drawElements();
            detectCollisions();
            drawScore();
        } else {
            endGame();
        }

        counter++;
        setTimeout(function() {main();}, 1000/FPS);
    }

    main();
}
