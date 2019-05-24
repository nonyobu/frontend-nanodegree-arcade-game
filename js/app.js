// Global Variables
/**
 * Array for speed values of enemies
 */
const speedValues = [2, 3, 4];

/**
 * Array for Y values of enemy and gems placement on game field
 */
const fieldY = [111, 194, 277, 360];


/**
 * Array for X values of gems placement on game field
 */
const fieldX = [10, 110, 220, 315, 430];

/**
 * Array for gem images
 */
const gemImages = ['images/gem-green.png', 'images/gem-blue.png', 'images/gem-orange.png']

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
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 70, 100);
    }
}

/**
 * @description Player class
 */
class Player {
    constructor(x, y) {
        // initial position
        this.x = 218;
        this.y = 442;
        this.sprite = 'images/char-boy.png';
    }

    update(dt) {}


    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 70, 110);
    }

    handleInput(moveX, moveY) {
        const moveFactorY = 5;
        const moveFactorX = 7;
        this.y += moveY * moveFactorY;
        if (this.y <= -10) {
            this.y = -10;
        }
        if (this.y >= 473) {
            this.y = 473;
        }
        this.x += moveX * moveFactorX;
        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.x >= 454) {
            this.x = 454;
        }
        console.log(`${this.x} ${this.y}`);

    }
}


let counter = 0;

class Gem {
    constructor() {
        this.x = fieldX[Math.floor(Math.random() * fieldY.length)];
        this.y = fieldY[Math.floor(Math.random() * fieldY.length)];
        this.sprite = gemImages[Math.floor(Math.random() * gemImages.length)];
    }

    update(dt) {
        counter++;
        if (counter === 300) {
            this.x = fieldX[Math.floor(Math.random() * fieldY.length)];
            this.y = fieldY[Math.floor(Math.random() * fieldY.length)];
            this.sprite = gemImages[Math.floor(Math.random() * gemImages.length)];
            console.log(`${this.x} ${this.y}`);

            counter = 0;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 70, 100);
    }

}


// Objects instantiation

// Place all enemy objects in an array called allEnemies
const allEnemies = [new Enemy, new Enemy, new Enemy, new Enemy];

// Place the player object in a variable called player
const player = new Player;

// Place gem in game field
const gem = new Gem;


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
}, 15);


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