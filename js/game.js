/*
current bugs:
-collision happens too soon - the bounding boxes of the sprites are bigger than the sprites themselves
  -possible fixes: manually create the hitArea for each sprite and use that for collisions, see
   https://www.html5gamedevs.com/topic/42185-how-to-update-hitarea-of-a-sprite/
  -we could also just. crop all the sprites to just be the sprite itself, no blank space at all
    -this might be the easiest solution? you'll probs have to be the one do it tho, my texturepacker free trial expired LMAO
    -idk tho maybe we could manually crop all the sprites outside texture packer?
      -take simran's obstacle .png, manually save a bunch of crops of it, add those crops into a texturepacker thing??
  -or there could be an easier way to edit the bounds that i havent found yet
  -or we could, in the collision function, check for bounds smaller than the bounds we fetch?
    -this is what is what i started messing with bc im lazy and head empty only tgcf donghua
    -but the results aren't great, vry hard to make it behave the way i want it to
    -srsly i think we should just change the sprite images themselves lmao
  -wait one last possibility: don't change the sprite png stuff, but in the json data, change the values for spriteSourceSize or spriteSize???
  
- Can't hug Olivia due to Coronavirus bug - URGENT :((((
  -possible fixes: hug olivia anyway

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

const WIDTH = 1000;
const HEIGHT = WIDTH * 2 / 3

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

//time variables
let interval = 1500;


// let text = new PIXI.Text('This is a PixiJS text',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
// app.stage.addChild(text);

// === Sprite setup === //
let player;
app.loader
  .add('charaSheet', "sprites/charaSpriteSheet.json")
  .add('obSheet', "sprites/obstacleSprites.json")
  .add('tokenSheet', "sprites/LaundrBombSprite.json")
  .load((loader, resources) => {
    player = new PIXI.AnimatedSprite(resources.charaSheet.spritesheet.animations["running_WithSock"]);
    player.height = WIDTH / 8;
    player.width = WIDTH / 8;
    player.x = 200;
    player.y = HEIGHT - (HEIGHT * .1);
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
    //we should try to move this into like a spawner.moveSprites() function or something
    for (var i = 0; i < spawner.obstacles.length; i++) {
      const xBox = spawner.obstacles[i].getBounds().x + spawner.obstacles[i].getBounds().width;
      spawner.obstacles[i].x -= 1.9;

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
  const aBox = a.getBounds();
  const bBox = b.getBounds();
  //none of us thought to trim our sprites rip so this offset makes it so collision happens at the bounds we see, rather than the sprites' actual bounds
  let offset = 35;

  if ((aBox.x + aBox.width > bBox.x + offset) && (aBox.x < bBox.x + bBox.width - offset) && (aBox.y + aBox.height > bBox.y + offset) && (aBox.y < bBox.y + bBox.height - offset)) {
    return true;
  }
  else return false;
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