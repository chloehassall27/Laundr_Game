/*
current bugs:
-when a pair of doubles spawn together, the interval should be temporarily lengthened, otherwise they spawn too close together to the next obstacle :(
-the laundry basket and the washing machine arent at the same height, very noticable when they spawn as a double pair :(
*/

//HI OLIVIA I LOVE YOU!!! <3
// <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3
//  _._     _,-'""`-._
// (,-.`._,'(       |\`-/|
//     `-.-' \ )-`( , o o)
//           `-    \`_`"'-


import Obstacle from "./obstacle.js"

const WIDTH = 1000;
const HEIGHT = WIDTH * 2 / 3

var obstacles = [];


// === Basic app setup === //
const app = new PIXI.Application({
  width: WIDTH, height: HEIGHT, backgroundColor: 0xF9F9F9, resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

const container = new PIXI.Container();
app.stage.addChild(container);

app.ticker.add(gameLoop);
let gameOver = false;
let loaded = false;

//time variables
let interval = 1500;
let intDecAmt = 0.9;
let intRangeMax = 3000;
let intRangeMin = 1500;
let smallestInt = 400;
let rangeMin = false;
let currTime;

// let text = new PIXI.Text('This is a PixiJS text',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
// app.stage.addChild(text);

// === Sprite setup === //
let player, obstacle;
app.loader
  .add('charaSheet', "sprites/charaSpriteSheet.json")
  .add('obSheet', "sprites/obstacleSprites.json")
  .load((loader, resources) => {
    player = new PIXI.AnimatedSprite(resources.charaSheet.spritesheet.animations["running_WithSock"]);
    player.height = WIDTH / 8;
    player.width = WIDTH / 8;
    player.x = 200;
    player.y = HEIGHT - (HEIGHT * .1);
    player.animationSpeed = .15;
    player.play()
    app.stage.addChild(player);

    //buildObstacles(app.renderer.height / 2, "washerSprite");
    loaded = true;

    //fire the initial obstacle spawn (which will call all other spawns)
    spawnObstacle();
  });

function buildObstacles(xOffset, posy, spriteName) {
  var obstacle = new Obstacle(app.loader.resources.obSheet.spritesheet.animations[spriteName]);

  obstacle.anchor.set(0.5);
  obstacle.scale.set(0.5);
  obstacle.x = app.renderer.width;
  if (xOffset > 0) obstacle.x += xOffset;
  obstacle.y = posy;
  obstacle.animationSpeed = .125;
  obstacle.play()

  app.stage.addChild(obstacle);

  obstacles.push(obstacle);
}

// === Main game loop === //
function gameLoop() {
  if (!gameOver && loaded) {
    for (var i = 0; i < obstacles.length; i++) {
      const xBox = obstacles[i].getBounds().x + obstacles[i].getBounds().width;
      obstacles[i].x -= 1.9;

      if (xBox === 0) {
        app.stage.removeChild(obstacles[i]);
        obstacles.shift();
      }
      // funcions to run every game tick, ex moveSprite();
    }
  }
}

function decreaseInterval() {
  //intDecAmt is the factor you decrease the increment by
  intRangeMax *= intDecAmt;
  intRangeMin *= intDecAmt;

  //smallestInt is the smallest the interval will ever get
  if (intRangeMin <= smallestInt) {
    intRangeMin = smallestInt;
    rangeMin = true;
  }
}

function randomizeInterval(){
  return (Math.floor(Math.random() * (intRangeMax - intRangeMin + 1)) + intRangeMin);
}

function spawnObstacle() {
  //get the name of the obstacle
  const obstName = chooseSprite();

  if (obstName === "double") { //just make this if(true) to better test the double spawning :)
    spawnDouble();
  } else {
    //spawn in the actual obstacle, use x=0 for the default
    buildObstacles(0, app.renderer.height / 2, obstName);
  }

  //if the current time is greater than [whatever interval you want] and the min range hasn't been reached, dec interval
  currTime = performance.now();
  if ((currTime > (interval * 10)) && !rangeMin) {
    decreaseInterval();
  }
  interval = randomizeInterval();

  //call the next spawn obstacle, with a delay of interval
  setTimeout(spawnObstacle, interval);
}

function spawnDouble() {
  const rand = Math.floor(Math.random() * 6);
  let nameLeft, nameRight;

  if (rand % 2 == 0) {
    nameLeft = "washerSprite"
    nameRight = "laundrySprite"
  } else if (rand % 5 == 0) {
    nameLeft = "washerSprite"
    nameRight = "washerSprite"
  } else {
    nameLeft = "laundrySprite"
    nameRight = "washerSprite"
  }
  buildObstacles(0, app.renderer.height / 2, nameLeft);
  buildObstacles(80, app.renderer.height / 2, nameRight);
}

function chooseSprite() {
  const rand = Math.floor(Math.random() * 25);

  //%3 is more frequent, so after set time (here, 1 minute) switch so that the harder thing (combined sprites) spawns more frequently
  if (rand % 3 == 0) {
    if (currTime > 60000) return "double"
    return "laundrySprite"
  } else if (rand % 5 == 0) {
    if (currTime > 60000) return "laundrySprite"
    return "double"
  }
  else {
    return "washerSprite"
  }
}

// Keypress functions
window.addEventListener("keydown", keysDown);
window.addEventListener("keyup", keysUp);
let keys = {};
function keysDown(e) {
  keys[e.keyCode] = true;
}

function keysUp(e) {
  keys[e.keyCode] = false;
}

// Other game functions
function moveSprite() {
  // Add movement
}