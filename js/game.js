/*
 References (outside of API/framework documentation) used while building this project include: 
 kittykatattack's Learning Pixi tutorial - https://github.com/kittykatattack/learningPixi
 Dower Chin's Pixi.js Video Tutorials - https://www.youtube.com/user/dowerchin 
*/


/*
  current bugs:
   - jiggle bug
   - mute token collect sound
   - Audio on touch devices will not play until first touch has been let go. Will be fixed by instructions requiring touch
*/

import Spawner from "./spawner.js"
import HouseGen from "./houseGen.js"
import Player from "./player.js"
import Windows from "./windows.js"
import Socials from "./socials.js"

// === Basic app setup === //
let canvas = document.getElementById('pixiCanvas');
const app = new PIXI.Application({
  width: canvas.getBoundingClientRect().width, height: canvas.getBoundingClientRect().width / 4, backgroundColor: 0xF9F9F9, resolution: window.devicePixelRatio || 1, view: canvas,
});
canvas.style.zIndex = "-1";
PIXI.sound.context.paused = true;

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
// PIXI.settings.ROUND_PIXELS = true;
PIXI.settings.MIPMAP_TEXTURES = PIXI.MIPMAP_MODES.ON;
PIXI.settings.RENDER_OPTIONS.antialias = true;

window.HEIGHT = app.screen.height;
window.WIDTH = app.screen.width;
window.SCALE = HEIGHT / 225; // Scale used for compatibility with old code. Originally, we hard coded values with a screen size of 900x225
window.RELSCALE = HEIGHT / 225; // Scale relative to original scale.  Other scale is only calculated at start
window.SCORE = 0;
window.FPSSCALE;
window.loaded = false;

window.container = new PIXI.Container();
app.stage.addChild(container);
container.width = app.screen.width;
container.height = app.screen.height;
container.interactive = true;
container.sortableChildren = true;

app.ticker.add(gameLoop);
app.ticker.minFPS = 30;
// app.ticker.maxFPS = 30;

// Basic game variables

window.winTime = 300000; //300000

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
window.houseGen;
let player;
let windows;
let socials;
let backgroundFront, backgroundBack;
window.groundLevel = HEIGHT * .9;

let focusHold;
let win = false;
window.lose = false;
let gameOver = false;
window.speedScale = 1.0;
let focus = true;
let visible = true;
let winTriggered = false;
let winTimeout;
window.timeOffset;
let firstLoop = true;
let touchDisable = false;
let creditsShowing = false;

window.inputs = {
  jump: false,
  duck: false,
  prevDuck: false
};

let playerSpeedScale = 1;
let endHouse;
let restartButton;
let muteButton;
window.score = 0;


let scoreText = new PIXI.Text(score, scoreStyle);
scoreText.x = WIDTH / 1.07;
scoreText.resolution = 1.5;
scoreText.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;

let highscore = 0;
let highscoreText = new PIXI.Text(highscore, highscoreStyle);
highscoreText.x = WIDTH / 1.21;
highscoreText.resolution = 1.5;
highscoreText.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;

//noises
let deathS;
let jumpS;
let winS;

let started = false;
let firstLoad = true;
let spawnerInterval;
let speedInterval;
// let gameInterval;
let timeout = 0;
let winTimeoutTime = 0;
let slowTimout;
let twtTimeout;
let showingCredits;
// === End basic app setup === //

// === Sprite setup === //
app.loader
  .add('charaSheet', "sprites/charaSpriteSheet.json")
  .add('obSheet', "sprites/obstacleSprites.json")
  .add('houseSheet', "sprites/backgroundHouse.json")
  .add('tokenSheet', "sprites/LaundrBombSprite.json")
  .add('buttonSheet', "sprites/PodsAndButtons.json")
  .add('muteSheet', "sprites/MuteUnmute.json")
  .add('deathSound', "sounds/death.wav")
  .add('jumpSound', "sounds/jump.wav")
  .add('tokenSound', "sounds/jelly2.wav")
  .add('winSound', "sounds/BETTERWin3.wav");

loadOnce();

function loadOnce() {
  //speedScale = 1.3;

  app.loader
    .load((loader, resources) => {
      deathS = PIXI.sound.Sound.from(resources.deathSound);
      deathS.volume = 0.4;
      jumpS = PIXI.sound.Sound.from(resources.jumpSound);
      jumpS.volume = 0.4;
      window.tokenS = PIXI.sound.Sound.from(resources.tokenSound);
      window.tokenS.volume = 0.4;
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
      //let bgTextureBack = PIXI.Texture.from("../sprites/background_sky_blue.png"); // HELLO MR BLUE SKY
      bgTextureFront.baseTexture.mipmap = false;
      bgTextureBack.baseTexture.mipmap = false;
      backgroundFront = new PIXI.TilingSprite(bgTextureFront, WIDTH, HEIGHT * 0.25);
      backgroundBack = new PIXI.TilingSprite(bgTextureBack, WIDTH, HEIGHT);
      backgroundFront.zIndex = 2;
      backgroundFront.tileScale.set(SCALE * 3.52);
      backgroundFront.y = HEIGHT - SCALE * 50.25;
      backgroundBack.tileScale.set(SCALE * .88);
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
      muteButton.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
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
      restartButton.on('pointerover', function () { restartButton.tint = 0xF0F0F0; });
      restartButton.on('pointerout', function () { restartButton.tint = 0xFFFFFF; });
      restartButton.zIndex = 15;

      let endHouseText = PIXI.Texture.from("../sprites/endHouse.png");
      endHouse = new PIXI.Sprite(endHouseText);
      endHouse.scale.set(SCALE * 0.07);
      endHouse.anchor.set(0.5);
      endHouse.x = WIDTH * 1.5;
      endHouse.y = HEIGHT / 2.4;
      container.addChild(endHouse);

      socials = new Socials(app);

      //add windows;
      windows = new Windows(app);
      windows.setUpInstruct();

      window.loaded = true;
    });

  reload();

  // modern Chrome requires { passive: false } when adding event
  var supportsPassive = false;
  try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
      get: function () { supportsPassive = true; } 
    }));
  } catch(e) {}

  var wheelOpt = supportsPassive ? { passive: false } : false;
  var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

  // call this to Disable
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);

}

function reload() {
  app.loader
    .load((loader, resources) => {
      //create our spawner - handles obstacles + tokens
      spawner = new Spawner(app, player);
      window.houseGen = new HouseGen(app);
    });

  speedInterval = setInterval(increaseSpeedScale, 20000);
  // gameInterval = setInterval(gameLoop, 7);
}

// === Main game loop === //
function gameLoop() {
  window.FPSSCALE = 144 / app.ticker.FPS;
  //must check &&player first or else itll be checking for loaded on a null object
  if (!gameOver && loaded && player && player.loaded && started) {
    if (!windows.removedInstruct) {
      windows.removeInstruct();
    }
    checkFocus();

    if (focus && visible) {
      if (firstLoop) {
        window.timeOffset = performance.now();
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

      spawner.moveSprites();
      houseGen.moveSprites();

      //check if it's time to win!
      if ((performance.now() - timeOffset) > winTime && !winTriggered && !gameOver) {
        win = true;
        winTriggered = true;
        spawner.gameOver = true;
        winTimeoutTime = performance.now();
        twtTimeout = setTimeout(socials.renderTwt, 2980);
        winTimeout = setTimeout(endGame, 3000);
        slowTimout = setInterval(slowMovement, 700);
      }
    }
  } else if (gameOver && player && player.needsFall) {
    endGameFall();
  }

  else if (gameOver && player && player.winSequence && !lose) {
    player.currSprite.x += 2.5 * playerSpeedScale;
  }

  if (gameOver) {
    creditsShowing = windows.creditsShowing;
  }
}

// Display the current score
function displayScore() {
  let increaseAmt = (13.0 / 900.0) * window.FPSSCALE;
  score += increaseAmt;
  let roundedScore = Math.round(score);
  if (roundedScore > 999) roundedScore = 999;
  scoreText.text = roundedScore;
  window.SCORE = roundedScore;
  displayHighScore();
}

//display the highest score
function displayHighScore() {
  if (highscore > 0) {
    if (!container.children.includes(highscoreText))
      container.addChild(highscoreText);
    highscoreText.text = 'HI ' + Math.round(highscore);
  }
}


//collision function largely from Dower Chin's Pixi.js Video Tutorials - https://www.youtube.com/user/dowerchin 
window.checkCollision = function (a, b) {
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

  if ((playerRight > obsLeft) && (playerLeft < obsRight) && (playerBottom > obsTop) && (playerTop < obsBottom) && !win)
    return true;
  else
    return false;
}

window.endGame = function () {
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
  clearTimeout(twtTimeout);


  if (score > highscore) {
    highscore = score;
    if (highscore > 999) highscore = 999;
    displayHighScore();
  }

  restartButton.x = WIDTH / 2;
  restartButton.y = HEIGHT / 1.65;
  restartButton.scale.set(SCALE * 0.3);

  windows.getScore(score);

  if (lose) {
    deathS.play();
    //this is on a timeout so that the twitter button has enough time to render
    setTimeout(() => {
      windows.setUpLose();
      container.addChild(restartButton);
      //socials.endGame();

    }, 60);
  } else if (win) {
    setTimeout(() => {
      winS.play();
      windows.setUpWin();
      //container.addChild(restartButton);
      //socials.endGame();
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


function onClickMute() {
  touchDisable = true;

  // Unmute
  if (muteButton.currentFrame == 1){
    muteButton.gotoAndStop(0);
    deathS.muted = false;
    winS.muted = false;
    tokenS.muted = false;
    jumpS.muted = false;
  }
  // Mute
  else {
    muteButton.gotoAndStop(1);
    deathS.muted = true;
    winS.muted = true;
    tokenS.muted = true;
    jumpS.muted = true;
  }
}

function onReleaseMute() {
  touchDisable = false;
}

function cleanUp() {
  if (win) {
    player.reset();
    windows.removeWin();
    windows.removeCredits();
    clearInterval(slowTimout);
  }
  if (lose) windows.removeLose();
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
  // clearInterval(gameInterval);
  endHouse.x = WIDTH * 1.5;
  socials.restartGame();
  window.winTime = 300000;

  // Remove obstacles
  for (var i = 0; i < spawner.obstacles.length; i++) {
    container.removeChild(spawner.obstacles[i]);
  }

  // Clean up houses too
  for (var i = 0; i < houseGen.houses.length; i++) {
    container.removeChild(houseGen.houses[i]);
  }
  houseGen.houses.shift();

  // Remove tokens
  for (var i = 0; i < spawner.tokens.length; i++) {
    container.removeChild(spawner.tokens[i]);
  }

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
    if (!started && firstLoad && windows.removedInstruct)
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
  if (touch.identifier !== currentTouchID || touchDisable) return;

  let pos = e.data.getLocalPosition(this.parent);

  // Top 2/3 of the canvas will call the jump function
  if (pos.y < (2 * container.height / 3)) {
    inputs.jump = true;

    if (!started && firstLoad && windows.removedInstruct)
      startGame();
  }
  // Bottom 1/3 of the canvas will call the duck function

  else {
    inputs.duck = true;
  }
}

function touchMove(e) {

  let touch = e.data;

  // If there's no current touch, then set this touch to be the current one
  if (currentTouchID === -1) currentTouchID = touch.identifier

  // We only care about the current touch
  if (touch.identifier !== currentTouchID) return;


  let pos = e.data.getLocalPosition(this.parent);
  // console.log(this.parent)

  // Top 2/3 of the canvas will call the jump function and stop the duck function
  if (pos.y < (2 * container.height / 3)) {
    inputs.jump = true;
    inputs.duck = false;
  }
  // Bottom 1/3 of the canvas will call the duck function and stop the jump function
  else {
    inputs.duck = true;
    inputs.jump = false;
  }
}

function touchEnd(e) {
  let touch = e.data;

  if (touch.identifier == currentTouchID) {
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
    houseGen.loseFocus();
  }
  else if (document.visibilityState === 'visible') {
    visible = true;
    spawner.gainFocus();
    houseGen.gainFocus();
  }
});

function checkFocus() {
  if (document.hasFocus()) {
    if (focus === false) {
      focusHold = performance.now() - focusHold;
      winTime += focusHold;
    }
    spawner.gainFocus();
    houseGen.gainFocus();
    focus = true;
    player.running.play();

    for (let i = 0; i < spawner.obstacles.length; i++) {
      spawner.obstacles[i].play();
    }
    for (let i = 0; i < spawner.tokens.length; i++) {
      spawner.tokens[i].play();
    }

  } else if (!document.hasFocus()) {
    if (focus === true) {
      focusHold = performance.now();
    }
    spawner.loseFocus();
    houseGen.loseFocus();
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
function resize() {
  app.renderer.resize(canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().width / 4);

  window.RELSCALE = (app.screen.height / 225) / SCALE;
  windows.getCanvasSize(canvas);

  container.scale.set(RELSCALE);

  scoreText.resolution = RELSCALE * 1.5;
  windows.instructMessage.resolution = RELSCALE * 1.5;
  highscoreText.resolution = RELSCALE * 1.5;

  //if (canvas.width < 1090 && !socials.smallScreen && gameOver) socials.switchSizes();
  //else if (canvas.width >= 1090 && socials.smallScreen && gameOver) socials.switchSizes();

  windows.scoreMessage.resolution = RELSCALE * 1.5;
  windows.pun.resolution = RELSCALE * 1.5;
  windows.code.resolution = RELSCALE * 1.5;

  try {windows.scoreMessage.resolution = RELSCALE * 1.5;} catch{};
  try {windows.pun.resolution = RELSCALE * 1.5;} catch{};
  try {
    windows.topMessageCoupon.resolution = RELSCALE * 1.5;
    windows.code.resolution = RELSCALE * 1.5;
    windows.bottomMessageCoupon.resolution = RELSCALE * 1.5;
  } catch{};
  try { 
    windows.titleMessage.resolution = RELSCALE * 1.5;
    windows.creditsMessage.resolution = RELSCALE * 1.5;
  } catch{};

  if (gameOver) {
    if (!creditsShowing) { windows.socialsResizing(); }
  }
}

function preventDefaultForScrollKeys(e) {
  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  var keys = {40: 1, 38: 1, 32: 1};
  if (keys[e.keyCode]) {
    e.preventDefault();
    return false;
  }
}

// === End helper functions === //

// === Game functions === //
function moveBackground() {
  //non parallax
  //background.tilePosition.x -= 3.5*speedScale;
  //parallax

  backgroundFront.tilePosition.x -= SCALE * 3.5 * speedScale * FPSSCALE;
  backgroundBack.tilePosition.x -= SCALE * 1.2 * speedScale * FPSSCALE;
  backgroundFront.tileScale.set(SCALE * 3.52);
  backgroundFront.tilePosition.x %= backgroundFront.texture.width * SCALE * 3.52;
  backgroundBack.tilePosition.x %= backgroundBack.texture.width * SCALE *.88;
  if (winTriggered && performance.now() >= (winTimeoutTime)) endHouse.x -= SCALE * 3.5 * speedScale * FPSSCALE;
}

function endGameFall() {
  if (!player.fallComplete && player.needsFall) {
    player.endGameFall();
  }
}

// === End game functions === //
