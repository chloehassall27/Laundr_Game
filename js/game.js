/*
current bugs:
- One more obstacle is spawned after game ends
  - i think i fixed this? spawn gets called one more time, but it doesnt add anything. 

- Game slows down after multiple tokens due to persistent text I think??? That's not like a serious bug but something to keep in mind!
  - i changed it so the text goes away after a second, check to see if the slowdown still happens -  it doesn't look like it does, but idk what the slowdown originally looked like so//

- Hit areas are hard-coded. Also not a super serious bug since it works but might be nice to fix
  
- Can't hug Olivia due to Coronavirus bug - URGENT :((((
  -possible fixes: hug olivia anyway
  
  function hugOlivia(Olivia, Oliver){
    if(abs(Olivia.location.x - Oliver.location.x) < 200 miles) 
      hug();
    else
      cry();
  }

*/

//                _ |\_
//                \` ..\  <3
//           __,.-" =__Y=
//         ."        )
//   _    /   ,    \/\_
//  ((____|    )_-\ \_-`
//   `-----'`-----` `--`

//                      _                        
//                      \`*-.                    
//                      )  _`-.                 
//   ,d88b.d88b,       .  : `. .
//   88888888888       : _   '  \
//   `Y8888888Y'       ; *` _.   `*-._  
//     `Y888Y'         `-.-'          `-. 
//       `Y'             ;       `       `.                          
//                       :.       .        \              
//                       . \  .   :   .-'   .   
//                        '  `+.;  ;  '      :   
//                        :  '  |    ;       ;-. 
//                        ; '   : :`-:     _.`* ;
//                     .*' /  .*' ; .*`- +'  `*' 
//                     `*-*   `*-*  `*-*'              
//                            


import Spawner from "./spawner.js"

const HEIGHT = 450;
const WIDTH = HEIGHT * 3;

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

let spawner;
let count = 0;

//time variables
let interval = 1500;


// === Sprite setup === //
let player;
let background;
app.loader
  .add('charaSheet', "sprites/charaSpriteSheet.json")
  .add('obSheet', "sprites/obstacleSprites.json")
  .add('tokenSheet', "sprites/LaundrBombSprite.json")
  .load((loader, resources) => {

    let bgTexture = PIXI.Texture.from("../sprites/background.png");
    background = new PIXI.TilingSprite(bgTexture, WIDTH, HEIGHT);
    background.tileScale.set(0.5);
    app.stage.addChild(background);

    player = new PIXI.AnimatedSprite(resources.charaSheet.spritesheet.animations["running_WithSock"]);
    player.scale.set(0.65)
    player.interactive = true;
    player.x = 200;
    player.y = HEIGHT - (HEIGHT * .1);
    player.hitArea = new PIXI.Rectangle(player.x, player.y, -75, -70);
    player.animationSpeed = .15;
    player.play()
    app.stage.addChild(player);

    loaded = true;

    //create our spawner - handles obstacles and tokens
    spawner = new Spawner(HEIGHT, WIDTH, app, app.loader.resources.obSheet.spritesheet.animations["washerSprite"], app.loader.resources.obSheet.spritesheet.animations["laundrySprite"], app.loader.resources.obSheet.spritesheet.animations["ironSprite"], app.loader.resources.tokenSheet.spritesheet.animations["tokenSprite"]);

    //fire the initial obstacle spawn (which will call all other spawns)
    spawner.spawn();
    //set the interval to decrease over time
    setInterval(spawner.decreaseInterval(), 3000);
  });

// === Main game loop === //
function gameLoop() {
  if (!gameOver && loaded) {
    moveBackground();
    //we should try to move this into like a spawner.moveSprites() function or something
    for (var i = 0; i < spawner.obstacles.length; i++) {
      const xBox = spawner.obstacles[i].getBounds().x + spawner.obstacles[i].getBounds().width;
      spawner.obstacles[i].x -= 1.9;
      spawner.obstacles[i].hitArea.x -= 1.9;

      //check collision
      if (checkCollision(player, spawner.obstacles[i]))
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

      if (checkCollision(player, spawner.tokens[i]))
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
  player.stop();
  spawner.endGame();

  //lil message for testing
  let message = new PIXI.Text("game over, hit detected!");
  message.y = app.view.height / 2;
  message.x = 150;
  app.stage.addChild(message);
}

function collectToken(index) {
  //whatever score stuff has to happen here, noises, etc
  spawner.collectToken(index);

  //lil message for testing
  let message = new PIXI.Text("token collected!");
  message.y = app.view.height / 2;
  message.x = 150;
  app.stage.addChild(message);
  setTimeout(function () {
    app.stage.removeChild(message)
  }, 1000);
}

function moveBackground() {
  //change the '1' to whatever speed is best :)
  background.tilePosition.x -= 1;
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