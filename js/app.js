/**
 * Global Variables
 */
// Array for speed values of enemies
const speedValues = [2, 3, 4];

// Array for Y values of enemy placement on game field
const enemiesY = [95, 178, 261, 344];

// Array for X and y values of gems placement on game field
const gemsX = [15, 120, 217, 316, 421];
const gemsY = [107, 190, 273, 356];

// Array for gem images
const gemImages = ['images/gem-green.png', 'images/gem-blue.png', 'images/gem-orange.png']

const gemMaxTime = 300;

/**
 * Enemy class for player to avoid
 */
class Enemy {
    constructor() {
        this.sprite = 'images/enemy-bug.png';
        this.x = -50;
        this.y = enemiesY[Math.floor(Math.random() * enemiesY.length)];
        this.speed = speedValues[Math.floor(Math.random() * speedValues.length)];
        this.width = 50;
        this.height = 50;
    }

    update(dt) {
        this.x += this.speed;
        // If enemy does it's full run
        if (this.x >= 500) {
            // set run to initial X
            this.x = -50;
            // Set run random Y
            this.y = enemiesY[Math.floor(Math.random() * enemiesY.length)];
            // Set run random speed
            this.speed = speedValues[Math.floor(Math.random() * speedValues.length)];
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 80, 120);
    }
}

/**
 * @description Player class
 */
class Player {
    /**
     * 
     * @param {integer} x 
     * @param {integer} y 
     */
    constructor(x, y) {
        // initial position
        this.x = 218;
        this.y = 442;
        this.sprite = 'images/char-boy.png';
        this.width = 50;
        this.height = 50;
    }

    update(dt) {}


    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 70, 110);
    }

    handleInput(moveX, moveY) {
        const moveFactorY = 5;
        const moveFactorX = 7;
        this.y += moveY * moveFactorY;
        if (this.y <= 10) {
            this.y = 10;
        }
        if (this.y >= 455) {
            this.y = 455;
        }
        this.x += moveX * moveFactorX;
        if (this.x <= -10) {
            this.x = -10;
        }
        if (this.x >= 445) {
            this.x = 445;
        }
        //console.log(`Coordenadas do Player: ${this.x},${this.y}`);

    }
}

/**
 * @description Gem Class
 */
class Gem {
    constructor() {
        this.x = gemsX[Math.floor(Math.random() * gemsX.length)];
        this.y = gemsY[Math.floor(Math.random() * gemsY.length)];
        this.sprite = gemImages[Math.floor(Math.random() * gemImages.length)];
        this.counter = 0;
        this.width = 50;
        this.height = 50;
    }

    update(dt) {
        this.counter++;
        if (this.counter === gemMaxTime) {
            this.x = gemsX[Math.floor(Math.random() * gemsX.length)];
            this.y = gemsY[Math.floor(Math.random() * gemsY.length)];
            this.sprite = gemImages[Math.floor(Math.random() * gemImages.length)];
            this.counter = 0;
            // console.log(`Coordenadas da Gem: ${this.x},${this.y}`);
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 70, 100);
    }

}

/**
 * @description Heart Class
 */
class Heart {
    /**
     * @param {integer} x 
     * @param {integer} y 
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/heart.png';
    }

    update(dt) {}

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 30, 50);
    }

}

class Score {
    constructor() {
        this.value = 0;
    }

    update(dt) {}

    render() {
        ctx.font = "25px Impact";
        ctx.fillStyle = "red";
        ctx.textAlign = "left";
        ctx.fillText(`Score: ${score.value}`, 10, 30);
    }
}


// Objects instantiation

// Place all enemy objects in an array called allEnemies
const allEnemies = [new Enemy, new Enemy, new Enemy, new Enemy, new Enemy];

// Place the player object in a variable called player
const player = new Player;

// Place gem in game field
const gem = new Gem;

const score = new Score;

// Place all hearts objects in an array called life
const life = [new Heart(10, 575), new Heart(40, 575), new Heart(70, 575), new Heart(100, 575), new Heart(130, 575)];


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
}, 25);


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