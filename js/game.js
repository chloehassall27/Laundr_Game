/*
  current bugs:
   - jiggle bug
   - mute token collect sound
   - Audio on touch devices will not play until first touch has been let go. Will be fixed by instructions requiring touch
   - social media icons look a bit fuzzy

  to test win functionality:
   - change win time to a lower value (i usually use 3000 instead of 300000)
   - uncomment out the line in moveBackground that sets speedScale = 1.3
*/

import Spawner from "./spawner.js"
import Player from "./player.js"
import Window from "./windows.js"
import Socials from "./socials.js"

window.RESOLUTION = 1;

// === Basic app setup === //
let canvas = document.getElementById('pixiCanvas');
const app = new PIXI.Application({
  width: canvas.getBoundingClientRect().width, height: canvas.getBoundingClientRect().width / 4, backgroundColor: 0xF9F9F9, resolution: window.devicePixelRatio || 1, view: canvas,
});
canvas.style.zIndex = "-1";
document.body.appendChild(app.view);
PIXI.sound.context.paused = true;

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;
PIXI.settings.ROUND_PIXELS = true;

window.HEIGHT = app.screen.height;
window.WIDTH = app.screen.width;
window.SCALE = HEIGHT / 225; // Scale used for compatibility with old code. Originally, we hard coded values with a screen size of 900x225
window.RELSCALE = HEIGHT / 225; // Scale relative to original scale.  Other scale is only calculated at start

window.container = new PIXI.Container();
app.stage.addChild(container);
container.width = app.screen.width;
container.height = app.screen.height;
container.interactive = true;

//app.ticker.add(gameLoop);

// Basic game variables

const style = new PIXI.TextStyle({
  fontFamily: 'Arial', fontSize: RELSCALE * 26, fill: '#4e4e4e',
});
const scoreStyle = new PIXI.TextStyle({
  fontFamily: 'Arial', fontSize: RELSCALE * 23, fill: '#4b4b4b'
})
const highscoreStyle = new PIXI.TextStyle({
  fontFamily: 'Arial', fontSize: RELSCALE * 23, fill: '#7c7c7c',
})

let spawner;
let player;
let windows;
let socials;
// let background;
let backgroundFront, backgroundBack;
window.groundLevel = HEIGHT * .9;

let win = false;
let lose = false;
let gameOver = false;
let speedScale = 1.0;
let focus = true;
let visible = true;
window.mute = false;
let winTriggered = false;
let winTimeout;
let timeOffset;
let firstLoop = true;
let endMessage;
let touchDisable = false;

window.inputs = {
  jump: false,
  duck: false,
  prevDuck: false
};

let playerSpeedScale = 1;
let endHouse;
let restartButton;
let muteButton;
let score = 0;
let scoreText = new PIXI.Text(score, scoreStyle);
scoreText.x = WIDTH / 1.07;
scoreText.resolution = 1.5;

let highscore = 0;
let highscoreText = new PIXI.Text(highscore, highscoreStyle);
highscoreText.x = WIDTH / 1.21;
highscoreText.resolution = 1.5;

//noises
let deathS;
let jumpS;
let tokenS;
let winS;

let started = false;
let firstLoad = true;
let spawnerInterval;
let speedInterval;
let gameInterval;
let timeout = 0;
let winTimeoutTime = 0;
let slowTimout;
// === End basic app setup === //

// === Sprite setup === //
app.loader
  .add('charaSheet', "sprites/charaSpriteSheet.json")
  .add('obSheet', "sprites/obstacleSprites.json")
  .add('tokenSheet', "sprites/LaundrBombSprite.json")
  .add('buttonSheet', "sprites/PodsAndButtons.json")
  .add('muteSheet', "sprites/MuteUnmute.json")
  .add('deathSound', "sounds/death.wav")
  .add('jumpSound', "sounds/jump.wav")
  .add('tokenSound', "sounds/jelly2.wav")
  .add('winSound', "sounds/BETTERWin3.wav");

loadOnce();

function loadOnce(){
  app.loader
    .load((loader, resources) => {
      deathS = PIXI.sound.Sound.from(resources.deathSound);
      deathS.volume = 0.4;
      jumpS = PIXI.sound.Sound.from(resources.jumpSound);
      jumpS.volume = 0.4;
      tokenS = PIXI.sound.Sound.from(resources.tokenSound);
      tokenS.volume = 0.4;
      winS = PIXI.sound.Sound.from(resources.winSound);
      winS.volume = 0.35;
    
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
      backgroundFront.tileScale.set(SCALE * .25);
      backgroundFront.y = HEIGHT - SCALE * 50.25;
      backgroundBack.tileScale.set(SCALE * .25);
      container.addChild(backgroundBack);
      container.addChild(backgroundFront);
      
      // Mute/unmute button
      muteButton = new PIXI.AnimatedSprite(resources.muteSheet.spritesheet.animations["mute_unmute"]);
      muteButton.on('pointerdown', onClickMute);
      muteButton.on('pointerup', onReleaseMute);
      muteButton.on('pointercancel', onReleaseMute);
      muteButton.on('pointerout', onReleaseMute);
      muteButton.scale.set(SCALE);
      muteButton.interactive = true;
      muteButton.buttonMode = true;
      container.addChild(muteButton);

      //create player object - handles jumping + ducking
      player = new Player(app, jumpS);
      player.currSprite.stop();


      //restart functionality stuff
      restartButton = new PIXI.Sprite(resources.buttonSheet.spritesheet.textures["BlueRestart.png"]);
      restartButton.scale.set(SCALE * 0.3);
      restartButton.anchor.set(0.5);
      restartButton.interactive = true;
      restartButton.buttonMode = true;
      restartButton.on('pointerdown', onClickRestart);
      restartButton.on('pointerover', function () {restartButton.tint = 0xF0F0F0;});
      restartButton.on('pointerout', function () {restartButton.tint = 0xFFFFFF;});

      let endHouseText = PIXI.Texture.from("../sprites/endHouse.png");
      endHouse = new PIXI.Sprite(endHouseText);
      endHouse.scale.set(SCALE * 0.07);
      endHouse.anchor.set(0.5);
      endHouse.x = WIDTH * 1.5;
      endHouse.y = HEIGHT / 2.4;
      app.stage.addChild(endHouse);

      windows = new Window(app);
      windows.setUpInstruct();
    
      container.addChild(endHouse);

      endMessage = new PIXI.Text('G A M E  O V E R', style);
      endMessage.resolution = 1.5;

      socials = new Socials(app);
    });

  reload();
}

function reload() {
  app.loader
    .load((loader, resources) => {
      //create our spawner - handles obstacles + tokens
      spawner = new Spawner(app);
    });

  speedInterval = setInterval(increaseSpeedScale, 20000);
  gameInterval = setInterval(gameLoop, 7);
}

// === Main game loop === //
function gameLoop() {
  //must check &&player first or else itll be checking for loaded on a null object
  if (!gameOver && player && player.loaded && started) {
    if(!windows.removedInstruct){
      windows.removeInstruct();
    }
    checkFocus();

    if (focus && visible) {
      if (firstLoop) {
        timeOffset = performance.now();
        container.addChild(scoreText);
        firstLoop = false;
      }

      moveBackground();
      displayScore();

      //jump + duck stuff
      if (!(win && performance.now() > (winTimeoutTime + 1500) && player.currSprite.y === groundLevel && player.currSprite != player.ducking)) {
        player.updateJump();
        player.updateDuck();
      }

      //we should try to move this into like a spawner.moveSprites() function or something
      for (var i = 0; i < spawner.obstacles.length; i++) {
        const xBox = spawner.obstacles[i].getBounds().x + spawner.obstacles[i].getBounds().width;
        spawner.obstacles[i].x -= SCALE * 3.5 * speedScale;
        spawner.obstacles[i].hitArea.x -= SCALE * 3.5 * speedScale;

        //check collision
        if (checkCollision(player.currSprite, spawner.obstacles[i])) {
          lose = true;
          endGame();
        }

        //remove box if it's offscreen
        if (xBox === 0) {
          container.removeChild(spawner.obstacles[i]);
          spawner.obstacles.shift();
        }
      }
      for (var i = 0; i < spawner.tokens.length; i++) {
        const xBox = spawner.tokens[i].getBounds().x + spawner.tokens[i].getBounds().width;
        spawner.tokens[i].x -= SCALE * 3.5 * speedScale;
        spawner.tokens[i].hitArea.x -= SCALE * 3.5 * speedScale;

        if (checkCollision(player.currSprite, spawner.tokens[i]))
          collectToken(i);

        if (xBox === 0) {
          container.removeChild(tokens[i]);
          spawner.tokens.shift();
        }
      }

      //check if it's time to win!
      if ((performance.now() - timeOffset) > 300000 && !winTriggered && !gameOver) {//300000
        win = true;
        winTriggered = true;
        spawner.gameOver = true;
        winTimeoutTime = performance.now();
        winTimeout = setTimeout(endGame, 3000);
        slowTimout = setInterval(slowMovement, 700);
      }

    }
  } else if (gameOver && player && player.needsFall) {
    endGameFall();
  }

  else if (gameOver && player && player.winSequence && !lose) {
    player.currSprite.x += 3.5 * playerSpeedScale;
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
    container.addChild(highscoreText);
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
    return true;
  else
    return false;
}

function endGame() {
  //call whatever clean up is needed, trigger popups, etc..
  if (lose && winTriggered) {
    winTriggered = false;
    win = false;
  }
  gameOver = true;
  player.endGame(win);
  spawner.endGame();
  started = false;
  timeout = performance.now();
  clearTimeout(winTimeout);
  socials.endGame(score);


  if (score > highscore) {
    highscore = score;
    displayHighScore();
  }

  if (win) endMessage.text = 'W I N N E R';
  endMessage.anchor.set(.5, 0);
  endMessage.x = WIDTH / 2;
  endMessage.y = HEIGHT / 4;

  restartButton.x = WIDTH / 2;
  restartButton.y = HEIGHT / 1.75;
  restartButton.scale.set(SCALE * 0.3);

  if (lose) {
    if (!mute) {
      deathS.play();
    }
    container.addChild(endMessage);
    container.addChild(restartButton);
  } else if (win) {
    setTimeout(() => {
      if (!mute) {
        winS.play();
      }
      container.addChild(endMessage);
      container.addChild(restartButton);
    }, 950);
  }

}

function slowMovement() {
  if (winTriggered) {
    speedScale *= 0.6;
    if (player.winSequence)
      playerSpeedScale *= 0.65;
  }
}

// restart game on command
function onClickRestart() {
  cleanUp();
  reload();

  winTimeoutTime = performance.now();
  player.switchSprite(player.running);
  player.ducking.play();
  startGame();
}

function onClickMute(){
  touchDisable = true;
  window.mute = !window.mute;
  if (muteButton.currentFrame == 1) muteButton.gotoAndStop(0);
  else muteButton.gotoAndStop(1);
}

function onReleaseMute(){
  touchDisable = false;
}

function collectToken(index) {
  //whatever score stuff has to happen here, noises, etc
  spawner.collectToken(index);
  tokenS.play();
  score += 25;
}

function cleanUp() {
  if (win) {
    player.reset();
    clearInterval(slowTimout);
  }
  clearInterval(spawnerInterval);
  clearInterval(speedInterval);
  gameOver = false;
  started = true;
  win = false;
  lose = false;
  score = 0;
  speedScale = 1.0;
  playerSpeedScale = 1.0;
  player.needsFall = false;
  player.fallComplete = false;
  player.speedY = 0;
  winTriggered = false;
  firstLoop = true;
  clearInterval(gameInterval);
  endHouse.x = WIDTH * 1.5;
  socials.resetGame();

  // Remove obstacles
  for (var i = 0; i < spawner.obstacles.length; i++){
    container.removeChild(spawner.obstacles[i]);
  }
  container.removeChild(endMessage);
  container.removeChild(restartButton);
}

function startGame() {
  PIXI.sound.context.audioContext.resume();

  //now the player sprite is allowed to animate
  player.currSprite.play();
  //fire the initial obstacle spawn (which will call all other spawns)
  spawner.spawn();
  //set the interval to decrease over time
  spawnerInterval = setInterval(spawner.decreaseInterval(), 3000);

  started = true;
  firstLoad = false;
}


// === Helper functions === //
// Keypress functions
window.addEventListener("keydown", keysDown);
window.addEventListener("keyup", keysUp);

function keysDown(e) {
  if (e.key == "ArrowUp" || e.key == " ") {
    window.inputs.jump = true;
    if (!started && firstLoad) 
      startGame();
    
    if (gameOver) {
      if (lose && (performance.now() - timeout > 600))
        onClickRestart();
      else if (win && (performance.now() - timeout > 2500))
        onClickRestart();
    }

  }

  if (e.key == "ArrowDown") {
    window.inputs.duck = true;
  }
}

function keysUp(e) {
  if (e.key == "ArrowUp" || e.key == " ") {
    window.inputs.jump = false;
  }
  
  if (e.key == "ArrowDown") {
    window.inputs.duck = false;
  }
}


// Touchevent functions
container.on("touchstart", touchStart)
  .on("touchend", touchEnd)
  .on("touchendoutside", touchEnd)
  .on("touchcancel", touchCancel)
  .on("touchmove", touchMove);

let currentTouchID = -1;

function touchStart(e) {
  let touch = e.data;

  // If there's no current touch, then set this touch to be the current one
  if (currentTouchID === -1) currentTouchID = touch.identifier
  
  // We only care about the current touch, so skip if this isn't it
  if(touch.identifier !== currentTouchID || touchDisable) return;

  let pos = e.data.getLocalPosition(this.parent);

  // Top 2/3 of the canvas will call the jump function
  if ( pos.y < (2 * container.height / 3) ) {
    inputs.jump = true;

    if (!started && firstLoad) 
      startGame();
  }
  // Bottom 1/3 of the canvas will call the duck function

  else{
    inputs.duck = true;
  }
}

function touchMove(e) {

  let touch = e.data;

  // If there's no current touch, then set this touch to be the current one
  if (currentTouchID === -1) currentTouchID = touch.identifier
  
  // We only care about the current touch
  if(touch.identifier !== currentTouchID) return;

 
  let pos = e.data.getLocalPosition(this.parent);
  // console.log(this.parent)

  // Top 2/3 of the canvas will call the jump function and stop the duck function
  if (pos.y < (2 * container.height / 3) ) {
    inputs.jump = true;
    inputs.duck = false;
  }
  // Bottom 1/3 of the canvas will call the duck function and stop the jump function
  else{
    inputs.duck = true;
    inputs.jump = false;
  }
}

function touchEnd(e) {
  let touch = e.data;
  
  if(touch.identifier == currentTouchID){
    currentTouchID = -1;
    inputs.jump = false;
    inputs.duck = false;
  }
}

function touchCancel(e) {
  inputs.jump = false;
  inputs.duck = false;
}

function increaseSpeedScale() {
  speedScale += 0.02;
  if (speedScale >= 1.3) {
    speedScale = 1.3;
    clearInterval(speedInterval);
  }
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    // console.log("hidden!");
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

    window.inputs.duck = false;
    window.inputs.jump = false;

    player.running.stop();
    for (let i = 0; i < spawner.obstacles.length; i++) {
      spawner.obstacles[i].stop();
    }
    for (let i = 0; i < spawner.tokens.length; i++) {
      spawner.tokens[i].stop();
    }
  }
}


window.addEventListener('resize', resize);
function resize(){
  // window.RELSCALE = (window.innerWidth / 4 / 225) / SCALE ;
  // app.renderer.resolution = window.devicePixelRatio || RELSCALE * 1.25;
  // console.log(app.renderer.resolution);

  app.renderer.resize(canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().width / 4 );

  window.RELSCALE = (app.screen.height / 225) / SCALE ;

  container.scale.set(RELSCALE);
  
  scoreText.resolution = RELSCALE * 1.5;
  highscoreText.resolution = RELSCALE * 1.5;
  endMessage.resolution = RELSCALE * 1.5;
}

// === End helper functions === //

// === Game functions === //
function moveBackground() {
  //non parallax
  //background.tilePosition.x -= 3.5*speedScale;
  //parallax

  //TO TEST WIN FUNCTIONALITY - at the end of the 5 minutes, speed scale will have reached 1.3, so uncomment this out!
  //speedScale = 1.3;
  backgroundFront.tilePosition.x -= SCALE * 3.5 * speedScale;
  backgroundBack.tilePosition.x -= SCALE * 1.2 * speedScale;
  if (winTriggered && performance.now() >= (winTimeoutTime + 1600)) endHouse.x -= SCALE * 3.5 * speedScale;
}

function endGameFall() {
  if (!player.fallComplete && player.needsFall) {
    player.endGameFall();
  }
}

// === End game functions === //