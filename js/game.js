/*
HEY MAKE SURE THAT WHEN YOU PUSH YOU PUSH TO 
https://github.com/kylehassall27/Laundr_Game.git

it looks like simran forked off of kyle's thing?? idk but i had to change my defualt origin to push to, so double check you have the right one!

  current bugs:
   - i copy pasted their game.js and lost our notes :'(
   - hitArea needs to be updated on jump and duck
   - hitAreas need to be updated in general to reflect the changed size of things
   - locations things spawn at (mostly the y values of irons, i think) need to be updated
   - speed at which obstacles move leftward should increase over time until it hits a max
      - i replayed dino game and i think they might have only increased speed and not decreased spawn times? idk, let's just try increasing speed and see if we need to edit other stuff, i do think it needs to go faster in general or else it's too easy/boring (play dino game for ref)
   - sound doesnt work rn :( relevant stuff is commented out so that it doesnt interfere with your stuff
   - reset needed for spawner
   - the whole "pause when leave tab" thing
*/

//import sound from 'pixi-sound';
import Spawner from "./spawner.js"
import Player from "./player.js"

const HEIGHT = 225;
const WIDTH = HEIGHT * 4;

// === Basic app setup === //
const app = new PIXI.Application({
  width: WIDTH, height: HEIGHT, backgroundColor: 0xF9F9F9, resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

app.ticker.add(gameLoop);
let gameOver = false;
let gameStart = false;
let inputs = {
  jump: false,
  duck: false,
  prevDuck: false
};
let groundY = HEIGHT - (HEIGHT * .1)

let spawner;
let death;

// === Sprite setup === //
let player;
let background;

app.loader
  .add('charaSheet', "sprites/charaSpriteSheet.json")
  .add('obSheet', "sprites/obstacleSprites.json")
  .add('tokenSheet', "sprites/LaundrBombSprite.json")
  .load((loader, resources) => {

    //create tiling sprite that can be scrolled infinitely
    let bgTexture = PIXI.Texture.from("../sprites/background.png");
    background = new PIXI.TilingSprite(bgTexture, WIDTH, HEIGHT);
    background.tileScale.set(0.25);
    app.stage.addChild(background);

    //create player object - handles jumping + ducking
    player = new Player(HEIGHT, WIDTH, app);

    //create our spawner - handles obstacles + tokens
    spawner = new Spawner(HEIGHT, WIDTH, app);

    //create sounds
    //death = PIXI.sound.Sound.from('sounds/death.wav');
    // PIXI.sound.add('token', 'sounds/jelly2.wav');
    // PIXI.sound.add('death', 'sounds/death.wav');
    // PIXI.sound.add('win', 'sounds/win.wav');

    //fire the initial obstacle spawn (which will call all other spawns)
    spawner.spawn();

    //set the interval to decrease over time
    setInterval(spawner.decreaseInterval(), 3000);
  });

// === Main game loop === //
function gameLoop() {
  //must check &&player first or else itll be checking for loaded on a null object
  if (!gameOver && player && player.loaded) {
    moveBackground();

    player.updatePos(inputs.jump);

    if (inputs.duck) player.duck();
    else if (!inputs.duck && inputs.prevDuck) player.reset();
    inputs.prevDuck = inputs.duck;

    //we should try to move this into like a spawner.moveSprites() function or something
    for (var i = 0; i < spawner.obstacles.length; i++) {
      const xBox = spawner.obstacles[i].getBounds().x + spawner.obstacles[i].getBounds().width;
      spawner.obstacles[i].x -= 1.9;
      spawner.obstacles[i].hitArea.x -= 1.9;

      //check collision
      if (checkCollision(player.currSprite, spawner.obstacles[i]))
        endGame();

      //remove box if it's offscreen
      if (xBox === 0) {
        app.stage.removeChild(spawner.obstacles[i]);
        spawner.obstacles.shift();
      }
    }
    for (var i = 0; i < spawner.tokens.length; i++) {
      const xBox = spawner.tokens[i].getBounds().x + spawner.tokens[i].getBounds().width;
      spawner.tokens[i].x -= 1.9;
      spawner.tokens[i].hitArea.x -= 1.9;

      if (checkCollision(player.currSprite, spawner.tokens[i]))
        collectToken(i);

      if (xBox === 0) {
        app.stage.removeChild(tokens[i]);
        spawner.tokens.shift();
      }
    }

  }

}

//collision
function checkCollision(a, b) {
  const aBox = a.hitArea;
  const bBox = b.hitArea;

  let playerRight = aBox.x;
  let playerLeft = aBox.x + aBox.width;
  let playerBottom = aBox.y;
  let playerTop = aBox.y + aBox.height;

  let obsLeft = bBox.x;
  let obsRight = bBox.x + bBox.width;
  let obsBottom = bBox.y + bBox.height;
  let obsTop = bBox.y;

  if ((playerRight > obsLeft) && (playerLeft < obsRight) && (playerBottom > obsTop) && (playerTop < obsBottom))
    return true
  else
    return false;
}

function endGame() {
  //call whatever clean up is needed, trigger popups, etc..
  gameOver = true;
  //death.play();
  player.endGame();
  spawner.endGame();

  //lil message for testing
  let message = new PIXI.Text("game over, hit detected!");
  message.y = 10;
  message.x = 10;
  app.stage.addChild(message);
}

function collectToken(index) {
  //whatever score stuff has to happen here, noises, etc
  spawner.collectToken(index);

  //lil message for testing
  let message = new PIXI.Text("token collected!");
  message.y = 10;
  message.x = 10;
  app.stage.addChild(message);
  setTimeout(function () {
    app.stage.removeChild(message)
  }, 1000);
}

// === Helper functions === //
// Keypress functions
window.addEventListener("keydown", keysDown);
window.addEventListener("keyup", keysUp);
let keys = {};
function keysDown(e) {
  // console.log(e.key);
  // keys[e.keyCode] = true;

  if (e.key == "ArrowUp" || e.key == " ") {
    inputs.jump = true;
  }
  if (e.key == "ArrowDown") {
    inputs.duck = true;
  }
}

function keysUp(e) {
  if (e.key == "ArrowUp" || e.key == " ") {
    inputs.jump = false;
  }
  if (e.key == "ArrowDown") {
    inputs.duck = false;
  }
}

// === End helper functions === //

// === Game functions === //


function moveBackground() {
  //change the '1' to whatever speed is best :)
  background.tilePosition.x -= 1;
}

// === End game functions === //