// Global Variables
/**
 * Array for speed values of enemies
 */
const speedValues = [2, 3, 4];

/**
 * Array for Y values of enemy placement on game field
 */
const fieldY = [70, 151, 231, 316];

/**
 * Enemy class for player to avoid
 */
class Enemy {
    constructor() {
        this.sprite = 'images/enemy-bug.png';
        this.x = -10;
        this.y = fieldY[Math.floor(Math.random() * fieldY.length)];
        this.speed = speedValues[Math.floor(Math.random() * speedValues.length)];
    }

    update(dt) {
        this.x += this.speed;
        // If enemy does it's full run
        if (this.x >= 412) {
            // set run to initial X
            this.x = -10;
            // Set run random Y
            this.y = fieldY[Math.floor(Math.random() * fieldY.length)];
            // Set run random speed
            this.speed = speedValues[Math.floor(Math.random() * speedValues.length)];
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

/**
 * @description Player class
 */
class Player {
    constructor(x, y) {
        // initial position
        this.x = 201;
        this.y = 421;
        this.sprite = 'images/char-boy.png';
    }

    update(dt) {}


    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(moveX, moveY) {
        const moveFactor = 10;
        this.y += moveY * moveFactor;
        if (this.y <= -10) {
            this.y = -10;
        }
        if (this.y >= 435) {
            this.y = 435;
        }
        this.x += moveX * moveFactor;
        if (this.x <= -10) {
            this.x = -10;
        }
        if (this.x >= 412) {
            this.x = 412;
        }
        console.log(`${this.x} ${this.y}`);

    }
}



// Now instantiate your objects.
// Enemies
/* let slowEnemy = new Enemy;
let normalEnemy = new Enemy;
let fastEnemy = new Enemy; */
// Place all enemy objects in an array called allEnemies
const allEnemies = [new Enemy, new Enemy, new Enemy, new Enemy];
// Place the player object in a variable called player
let player = new Player;



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
/* document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
}); */

// Arrow key movement.
KeyboardController({
    37: function() {
        player.handleInput(-1, 0);
    },
    38: function() {
        player.handleInput(0, -1);
    },
    39: function() {
        player.handleInput(1, 0);
    },
    40: function() {
        player.handleInput(0, 1);
    }
}, 40);


/**
 * Keyboard input with customisable repeat(set to 0 for no key repeat)
 * @param {Object} keys 
 * @param {Integer} repeat 
 * @see[stackoverflow] {@link https://stackoverflow.com/a/3691661}
 */
function KeyboardController(keys, repeat) {
    // Lookup of key codes to timer ID, or null for no repeat
    let timers = {};

    // When key is pressed and we don't already think it's pressed, call the
    // key action callback and set a timer to generate another one after a delay
    document.onkeydown = function(event) {
        let key = (event || window.event).keyCode;
        if (!(key in keys))
            return true;
        if (!(key in timers)) {
            timers[key] = null;
            keys[key]();
            if (repeat !== 0)
                timers[key] = setInterval(keys[key], repeat);
        }
        return false;
    };

    // Cancel timeout and mark key as released on keyup
    document.onkeyup = function(event) {
        let key = (event || window.event).keyCode;
        if (key in timers) {
            if (timers[key] !== null)
                clearInterval(timers[key]);
            delete timers[key];
        }
    };

    // When window is unfocused we may not get key events. To prevent this
    // causing a key to 'get stuck down', cancel all held keys
    window.onblur = function() {
        for (key in timers)
            if (timers[key] !== null)
                clearInterval(timers[key]);
        timers = {};
    };
};