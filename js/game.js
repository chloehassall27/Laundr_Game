/*
  current bugs:
   - Jump/duck spam
*/

import Spawner from "./spawner.js"
import Player from "./player.js"

const HEIGHT = 225;
const WIDTH = HEIGHT * 4;
let RESOLUTION = window.devicePixelRatio || 1;

const style = new PIXI.TextStyle({
  fontFamily: 'Arial', fontSize: 26, fill: '#4e4e4e',
});
const scoreStyle = new PIXI.TextStyle({
  fontFamily: 'Arial', fontSize: 23, fill: '#4b4b4b'
})
const highscoreStyle = new PIXI.TextStyle({
  fontFamily: 'Arial', fontSize: 23, fill: '#7c7c7c',
})

// === Basic app setup === //
const app = new PIXI.Application({
  width: WIDTH, height: HEIGHT, backgroundColor: 0xF9F9F9, resolution: RESOLUTION,
});
document.body.appendChild(app.view);

//app.ticker.add(gameLoop);

// Basic game variables
let spawner;
let player;
let background;
let backgroundFront, backgroundBack;
const groundY = HEIGHT - (HEIGHT * .1);

let win = false;
let lose = false;
let gameOver = false;
let gameStart = false;
let speedScale = 1.0;
let focus = true;
let visible = true;
let winTriggered = false;
let winTimeout;
let timeOffset;
let firstLoop = true;

let inputs = {
  jump: false,
  duck: false,
  prevDuck: false
};

let restartButton;
let score;
let scoreText = new PIXI.Text(score, scoreStyle);
scoreText.x = WIDTH / 1.07;

let highscore = 0;
let highscoreText = new PIXI.Text(highscore, highscoreStyle);
highscoreText.x = WIDTH / 1.21;

//noises
let deathS;
let jumpS;
let tokenS;
let winS;
// === End basic app setup === //

let started = false;
let firstLoad = true;
let spawnerInterval;
let speedInterval;
let gameInterval;
let timeout = 0;


// === Sprite setup === //
app.loader
  .add('charaSheet', "sprites/charaSpriteSheet.json")
  .add('obSheet', "sprites/obstacleSprites.json")
  .add('tokenSheet', "sprites/LaundrBombSprite.json")
  .add('buttonSheet', "sprites/PodsAndButtons.json")
  .add('deathSound', "sounds/death.wav")
  .add('jumpSound', "sounds/jump.wav")
  .add('tokenSound', "sounds/jelly2.wav")
  .add('winSound', "sounds/BETTERWin3.wav");

load();

function load() {
  app.loader
    .load((loader, resources) => {
      score = 0;

      //create tiling sprite that can be scrolled infinitely
      //currently set up for parallax effect, if disliked, switch which things are commented out

      //for non parallax (everything moves together)
      //let bgTexture = PIXI.Texture.from("../sprites/background.png");
      //background = new PIXI.TilingSprite(bgTexture, WIDTH, HEIGHT);
      //background.tileScale.set(0.25);
      //app.stage.addChild(background);

      //for parallax (background moves slower than foreground)
      let bgTextureFront = PIXI.Texture.from("../sprites/background_road.png");
      let bgTextureBack = PIXI.Texture.from("../sprites/background_sky.png");
      backgroundFront = new PIXI.TilingSprite(bgTextureFront, WIDTH, HEIGHT * 0.25);
      backgroundBack = new PIXI.TilingSprite(bgTextureBack, WIDTH, HEIGHT);
      backgroundFront.tileScale.set(0.25);
      backgroundFront.y = HEIGHT - 50.25;
      backgroundBack.tileScale.set(0.25);
      app.stage.addChild(backgroundBack);
      app.stage.addChild(backgroundFront);


      createNoises();

      //create player object - handles jumping + ducking
      player = new Player(HEIGHT, WIDTH, app, jumpS);
      player.currSprite.stop();

      //create our spawner - handles obstacles + tokens
      spawner = new Spawner(HEIGHT, WIDTH, app, player.groundLevel);

      //ensure things speed up over time
      speedInterval = setInterval(increaseSpeedScale, 20000);

      //restart functionality stuff
      restartButton = new PIXI.Sprite(app.loader.resources.buttonSheet.spritesheet.textures["BlueRestart.png"]);
      restartButton.scale.set(0.3)
      restartButton.anchor.set(0.5)
      restartButton.x = WIDTH / 2
      restartButton.y = HEIGHT / 1.75

      restartButton.interactive = true
      restartButton.buttonMode = true

      restartButton.on('pointerdown', onClickRestart);

      gameInterval = setInterval(gameLoop, 7);
    })
}

// === Main game loop === //
function gameLoop() {
  //must check &&player first or else itll be checking for loaded on a null object
  if (!gameOver && player && player.loaded && started) {
    checkFocus();
    if (focus && visible) {
      if (firstLoop) {
        timeOffset = performance.now();
        firstLoop = false;
        app.stage.addChild(scoreText);
      }

      moveBackground();
      displayScore();

      //jump + duck stuff
      player.updateJump(inputs);
      player.updateDuck(inputs);

      //we should try to move this into like a spawner.moveSprites() function or something
      for (var i = 0; i < spawner.obstacles.length; i++) {
        const xBox = spawner.obstacles[i].getBounds().x + spawner.obstacles[i].getBounds().width;
        spawner.obstacles[i].x -= 3.5 * speedScale;
        spawner.obstacles[i].hitArea.x -= 3.5 * speedScale;

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
        spawner.tokens[i].x -= 3.5 * speedScale;
        spawner.tokens[i].hitArea.x -= 3.5 * speedScale;

        if (checkCollision(player.currSprite, spawner.tokens[i]))
          collectToken(i);

        if (xBox === 0) {
          app.stage.removeChild(tokens[i]);
          spawner.tokens.shift();
        }
      }

      //check if it's time to win!
      if ((performance.now() - timeOffset) > 300000 && !winTriggered) {
        win = true;
        winTriggered = true;
        spawner.gameOver = true;
        winTimeout = setTimeout(endGame, 3000);
      }

    }
  } else if (gameOver && player && player.needsFall) {
    endGameFall();
  }
}

// Display the current score
function displayScore() {
  score += .01;
  scoreText.text = Math.round(score);

  // app.stage.addChild(scoreText);

  displayHighScore();
}

//display the highest score
function displayHighScore() {
  if (highscore > 0) {
    highscoreText.text = 'HI ' + Math.round(highscore);
    app.stage.addChild(highscoreText);
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
  player.endGame(win);
  spawner.endGame();
  started = false;
  timeout = performance.now();
  clearTimeout(winTimeout);

  if (lose) deathS.play();
  else if (win) winS.play();

  if (score > highscore) {
    highscore = score;
    displayHighScore();
  }

  let message;
  if (lose) message = new PIXI.Text('G A M E  O V E R', style);
  else if (win) message = new PIXI.Text('W I N N E R', style);
  message.x = WIDTH / 2.6;
  message.y = HEIGHT / 4;

  app.stage.addChild(message);
  app.stage.addChild(restartButton);
}

// restart game on command
function onClickRestart() {
  app.stage.removeChild(restartButton);
  cleanUp();
  load();
  player.switchSprite(player.running);
  player.ducking.play();
  startGame();
}

function collectToken(index) {
  //whatever score stuff has to happen here, noises, etc
  spawner.collectToken(index);
  tokenS.play();
  score += 25;
}

function cleanUp() {
  clearInterval(spawnerInterval);
  clearInterval(speedInterval);
  gameOver = false;
  started = true;
  win = false;
  lose = false;
  score = 0;
  speedScale = 1.0;
  player.needsFall = false;
  player.fallComplete = false;
  winTriggered = false;
  firstLoop = true;
  clearInterval(gameInterval);

}

function startGame() {
  //now the player sprite is allowed to animate
  player.currSprite.play();
  //fire the initial obstacle spawn (which will call all other spawns)
  // spawner.spawn();
  //set the interval to decrease over time
  spawnerInterval = setInterval(spawner.decreaseInterval(), 3000);

  started = true;
  firstLoad = false;
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
let keys = {};
function keysDown(e) {
  // console.log(e.key);
  // keys[e.keyCode] = true;

  if (e.key == "ArrowUp" || e.key == " ") {
    inputs.jump = true;
    if (!started && firstLoad) {
      //make the noises (they can only be created/started after player interraction due to PIXI limitations)
      startGame();
    }
    if (gameOver && (performance.now() - timeout > 600)) {
      onClickRestart();
    }

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


// Touchevent functions
app.view.addEventListener("touchstart", touchStart, false);
app.view.addEventListener("touchend", touchEnd, false);
app.view.addEventListener("touchcancel", touchCancel, false);
app.view.addEventListener("touchmove", touchMove, false);

function touchStart(e) {
  // Touchscreens can have multiple touch points, so we start at the oldest touch and keep going until we get a touch in the relevant area
  for (var i = 0; i < e.targetTouches.length; i++) {
    let touch = e.targetTouches[i]
    // console.log(touch);
    // Top 2/3 of the canvas will call the jump function
    if (touch.pageY < 2 * HEIGHT * RESOLUTION / 3) {
      inputs.jump = true;

      if (!started && firstLoad) {
        //make the noises (they can only be created/started after player interraction due to PIXI limitations)
        startGame();
      }

      break;
    }
    // Bottom 1/3 of the canvas will call the duck function
    else if (touch.pageY > HEIGHT * RESOLUTION / 3) {
      inputs.duck = true;
      break;
    }

  }
}

function touchEnd(e) {
  // console.log(e);
  for (var i = 0; i < e.changedTouches.length; i++) {
    let touch = e.changedTouches[i]
    // console.log(touch);

    // Top 2/3 of the canvas will stop the jump function
    if (touch.pageY < 2 * HEIGHT * RESOLUTION / 3) {
      inputs.jump = false;
      break;
    }

    // Bottom 1/3 of the canvas will stop the duck function
    else if (touch.pageY > HEIGHT * RESOLUTION / 3) {
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
  for (var i = 0; i < e.changedTouches.length; i++) {
    let touch = e.changedTouches[i]
    // console.log(touch);

    // Top 2/3 of the canvas will call the jump function and stop the duck function
    if (touch.pageY < 2 * HEIGHT * RESOLUTION / 3) {
      inputs.jump = true;
      inputs.duck = false;
      break;
    }
    // Bottom 1/3 of the canvas will call the duck function and stop the jump function
    else if (touch.pageY > HEIGHT * RESOLUTION / 3) {
      inputs.duck = true;
      inputs.jump = false;
      break;
    }
  }
}

function increaseSpeedScale() {
  speedScale += 0.02;
  if (speedScale >= 1.3) {
    clearInterval(speedInterval);
  }
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    console.log("hidden!");
    visible = false;
    spawner.loseFocus();
  }
  else if (document.visibilityState === 'visible') {
    visible = true;
    spawner.gainFocus();
  }
});

function checkFocus() {
  if (document.hasFocus()) {
    spawner.gainFocus();
    focus = true;
    player.running.play();

    for (let i = 0; i < spawner.obstacles.length; i++) {
      spawner.obstacles[i].play();
    }
    for (let i = 0; i < spawner.tokens.length; i++) {
      spawner.tokens[i].play();
    }

  } else if (!document.hasFocus()) {
    spawner.loseFocus();
    focus = false;

    player.running.stop();
    for (let i = 0; i < spawner.obstacles.length; i++) {
      spawner.obstacles[i].stop();
    }
    for (let i = 0; i < spawner.tokens.length; i++) {
      spawner.tokens[i].stop();
    }
  }
}

// === End helper functions === //

// === Game functions === //
function moveBackground() {
  //non parallax
  //background.tilePosition.x -= 3.5*speedScale;

  //parallax
  backgroundFront.tilePosition.x -= 3.5 * speedScale;
  backgroundBack.tilePosition.x -= 1.2 * speedScale;
}

function endGameFall() {
  if (!player.fallComplete && player.needsFall) {
    player.endGameFall();
  }
}

// === End game functions === //