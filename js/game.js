/*
first let me just mention, i had to change where the washer was spawning in, i brought it up higher on the screen, when i first started live server the washer was way too low, i could only see the top of it peeking out? idk
alright so check out this website for details on setTimeOut which is what i used for interval decrementation:
https://www.geeksforgeeks.org/how-to-change-the-time-interval-of-setinterval-method-at-runtime-using-javascript/
all the variables relating to the spawn time stuff has been grouped togther under "time variables"
bug when sprite makes it ~2/3 across screen, it kind of stutters? not very visible if you run as is, but if you let it run for long enough that the interval decreases a bunch (or if you just set the interval small to begin with) you can see it very well.
if you comment out the section labeled "??????" (the part where we check if the sprite needs to be deleted) the stutter goes away, but then like,, nothing gets cleaned up lol
lmk if you want my help to better understand what i did/help in debugging!! <33
OH ALSO i copied the original stuff into original.js! bc the original code does not have this bug so,,, like even tho i mentioned the one part makes the bug go away if you comment it out, the problem is still probably in the new code not the old stuff LMAO
*/

//HI OLIVIA I LOVE YOU!!! <3


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

function buildObstacles(posy, spriteName) {
  var obstacle = new Obstacle(app.loader.resources.obSheet.spritesheet.animations[spriteName]);

  obstacle.anchor.set(0.5);
  obstacle.scale.set(0.5);
  obstacle.x = app.renderer.width;
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
  console.log(intRangeMax);
}

function randomizeInterval(){
  return (Math.floor(Math.random() * (intRangeMax - intRangeMin + 1)) + intRangeMin);
}

function spawnObstacle() {
  //spawn in the actual obstacle
  buildObstacles(app.renderer.height / 2, "washerSprite");

  //if the current time is greater than [whatever interval you want] and the min range hasn't been reached, dec interval
  currTime = performance.now();
  if ((currTime > (interval * 10)) && !rangeMin) {
    decreaseInterval();
  }
  interval = randomizeInterval();

  //call the next spawn obstacle, with a delay of interval
  setTimeout(spawnObstacle, interval);
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