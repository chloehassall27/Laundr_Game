/*
current bugs:
- Can't hug Olivia due to Coronavirus bug - URGENT
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

      if (xBox === 0) {
        app.stage.removeChild(spawner.obstacles[i]);
        spawner.obstacles.shift();
      }
    }
    for (var i = 0; i < spawner.tokens.length; i++) {
      const xBox = spawner.tokens[i].getBounds().x + spawner.tokens[i].getBounds().width;
      spawner.tokens[i].x -= 1.9;

      if (xBox === 0) {
        app.stage.removeChild(tokens[i]);
        spawner.tokens.shift();
      }
    }
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