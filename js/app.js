// Enemies our player must avoid
class Enemy {
    constructor() {
        this.sprite = 'images/enemy-bug.png';
    }

    update(dt) {

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
/* 
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
 */
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor(x, y) {
        this.x = 201;
        this.y = 451;
        this.sprite = 'images/char-boy.png';
    }

    update(dt) {}


    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(moveX, moveY) {
        const moveFactor = 11;

        this.y += moveY * moveFactor;
        this.x += moveX * moveFactor;

    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];
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

// Arrow key movement. Repeat key five times a second
//
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


// Keyboard input with customisable repeat (set to 0 for no key repeat)
//

/**
 * 
 * @param {Object} keys 
 * @param {Integer} repeat 
 */
function KeyboardController(keys, repeat) {
    // Lookup of key codes to timer ID, or null for no repeat
    //
    let timers = {};

    // When key is pressed and we don't already think it's pressed, call the
    // key action callback and set a timer to generate another one after a delay
    //
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
    //
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
    //
    window.onblur = function() {
        for (key in timers)
            if (timers[key] !== null)
                clearInterval(timers[key]);
        timers = {};
    };
};