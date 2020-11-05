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
   - starting sprite for player should be one of the ducking ones (so that it starts on the ground, not mid run, and then it jumps up when player starts game and starts running)
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
let spawner;
let player;
let background;
const groundY = HEIGHT - (HEIGHT * .1);

// Basic game variables
let win = false;
let lose = false;
let gameOver = false;
let gameStart = false;

let inputs = {
  jump: false,
  duck: false,
  prevDuck: false
};



let started = false;
let spawnerInterval;

//noises
let deathS;
let jumpS;
let tokenS;
let winS;
// === End basic app setup === //



// === Sprite setup === //
app.loader
  .add('charaSheet', "sprites/charaSpriteSheet.json")
  .add('obSheet', "sprites/obstacleSprites.json")
  .add('tokenSheet', "sprites/LaundrBombSprite.json")
  .add('deathSound', "sounds/death.wav")
  .add('jumpSound', "sounds/jump.wav")
  .add('tokenSound', "sounds/jelly2.wav")
  .add('winSound', "sounds/BETTERWin3.wav")
  .load((loader, resources) => {
     //create tiling sprite that can be scrolled infinitely
     let bgTexture = PIXI.Texture.from("../sprites/background.png");
     background = new PIXI.TilingSprite(bgTexture, WIDTH, 225);
     background.tileScale.set(0.25);
     app.stage.addChild(background);
 
     //create player object - handles jumping + ducking
     player = new Player(HEIGHT, WIDTH, app);
     player.currSprite.stop();
 
     //create our spawner - handles obstacles + tokens
     spawner = new Spawner(HEIGHT, WIDTH, app, player.groundLevel);
   });

// === Main game loop === //
function gameLoop() {
  //must check &&player first or else itll be checking for loaded on a null object
  if (!gameOver && player && player.loaded && started) {
    moveBackground();

    player.updatePos(inputs.jump);

    if (inputs.duck) player.duck();
    else if (!inputs.duck && inputs.prevDuck) player.reset();
    inputs.prevDuck = inputs.duck;

    //we should try to move this into like a spawner.moveSprites() function or something
    for (var i = 0; i < spawner.obstacles.length; i++) {
      const xBox = spawner.obstacles[i].getBounds().x + spawner.obstacles[i].getBounds().width;
      spawner.obstacles[i].x -= 3.5;
      spawner.obstacles[i].hitArea.x -= 3.5;

      //check collision
      if (checkCollision(player.currSprite, spawner.obstacles[i])) {
        lose = true;
        endGame();
      }

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

// Collision
function checkCollision(a, b) {
  const aBox = a.hitArea;
  const bBox = b.hitArea;

  let playerRight = aBox.x; //200
  let playerLeft = aBox.x + aBox.width; //125
  let playerBottom = aBox.y; //202.5
  let playerTop = aBox.y + aBox.height; //153.02

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
  player.endGame();
  spawner.endGame();

  if (lose) deathS.play();
  else if (win) winS.play();

  //lil message for testing
  let message = new PIXI.Text("game over, hit detected!");
  message.y = 10;
  message.x = 10;
  app.stage.addChild(message);
}

function collectToken(index) {
  //whatever score stuff has to happen here, noises, etc
  spawner.collectToken(index);
  tokenS.play();

  //lil message for testing
  let message = new PIXI.Text("token collected!");
  message.y = 10;
  message.x = 10;
  app.stage.addChild(message);
  setTimeout(function () {
    app.stage.removeChild(message)
  }, 1000);
}

function cleanUp() {
  clearInterval(spawnerInterval);
  spawner = new Spawner(HEIGHT, WIDTH, app);
  started = false;
}

function startGame() {
  //make the noises (they can only be created/started after player interraction due to PIXI limitations)
  createNoises();
  //now the player sprite is allowed to animate
  player.currSprite.play();
  //fire the initial obstacle spawn (which will call all other spawns)
  spawner.spawn();
  //set the interval to decrease over time
  spawnerInterval = setInterval(spawner.decreaseInterval(), 3000);

  started = true;
}

function createNoises() {
  deathS = PIXI.sound.Sound.from(app.loader.resources.deathSound);
  deathS.volume = 0.4;
  jumpS = PIXI.sound.Sound.from(app.loader.resources.jumpSound);
  jumpS.volume = 0.4;
  tokenS = PIXI.sound.Sound.from(app.loader.resources.tokenSound);
  tokenS.volume = 0.4;
  winS = PIXI.sound.Sound.from(app.loader.resources.winSound);
  winS.volume = 0.35;
}

// === Helper functions === //
  // Keypress functions
  window.addEventListener("keydown", keysDown);
  window.addEventListener("keyup", keysUp);
  function keysDown(e) {
    // console.log(e.key);
    if(e.key == "ArrowUp" || e.key == " "){
      inputs.jump = true;
      if (!started) startGame();
    }
    if(e.key == "ArrowDown"){
      inputs.duck = true;
    }
  }
        
  function keysUp(e) {
    if(e.key == "ArrowUp" || e.key == " "){
      inputs.jump = false;
    }
    if(e.key == "ArrowDown"){
      inputs.duck = false;
    }
  }

  
  // Touchevent functions
  app.view.addEventListener("touchstart", touchStart, false);
  app.view.addEventListener("touchend", touchEnd, false);
  app.view.addEventListener("touchcancel", touchCancel, false);
  app.view.addEventListener("touchmove", touchMove, false);

  function touchStart(e) {
    // Touchscreens can have multiple touch points, so we start at the oldest touch and keep going until we get a touch in the relevant area
    for (var i=0; i < e.targetTouches.length; i++) {
      touch = e.targetTouches[i]
      // console.log(touch);
      // Top 2/3 of the canvas will call the jump function
      if (touch.pageY < 2*HEIGHT*RESOLUTION/3) {
        inputs.jump = true;
        if (!started) startGame();
        break;
      }
      // Bottom 1/3 of the canvas will call the duck function
      else if (touch.pageY > HEIGHT*RESOLUTION/3) {
        inputs.duck = true;
        break;
      }
    }
  }

  function touchEnd(e) {
    // console.log(e);
    for (var i=0; i < e.changedTouches.length; i++) {
      touch = e.changedTouches[i]
      // console.log(touch);

      // Top 2/3 of the canvas will stop the jump function
      if (touch.pageY < 2*HEIGHT*RESOLUTION/3) {
        inputs.jump = false;
        break;
      }

      // Bottom 1/3 of the canvas will stop the duck function
      else if (touch.pageY > HEIGHT*RESOLUTION/3) {
        inputs.duck = false;
        break;
      }
    }
  }

  function touchCancel(e) {
    // console.log("cancel");
  }

  // May not work with multitouch!
  function touchMove(e) {
    // console.log(e);
    for (var i=0; i < e.changedTouches.length; i++) {
      touch = e.changedTouches[i]
      // console.log(touch);

      // Top 2/3 of the canvas will call the jump function and stop the duck function
      if (touch.pageY < 2*HEIGHT*RESOLUTION/3) {
        inputs.jump = true;
        inputs.duck = false;
        break;
      }
      // Bottom 1/3 of the canvas will call the duck function and stop the jump function
      else if (touch.pageY > HEIGHT*RESOLUTION/3) {
        inputs.duck = true;
        inputs.jump = false;
        break;
      }
    }
  }

// === End helper functions === //

// === Game functions === //
function moveBackground() {
  //change the '1' to whatever speed is best :)
  background.tilePosition.x -= 1;
}

// === End game functions === //