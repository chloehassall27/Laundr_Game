const WIDTH = 1000;
const HEIGHT = WIDTH * 2/3

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

// let text = new PIXI.Text('This is a PixiJS text',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
// app.stage.addChild(text);

// === Sprite setup === //
let player, obstacle;
app.loader
  .add('charaSheet', "sprites/charaSpriteSheet.json")
  .add('obSheet', "sprites/obstacleSprites.json")
  .load((loader, resources) => {
    player = new PIXI.AnimatedSprite(resources.charaSheet.spritesheet.animations["running_WithSock"]);
    player.height = WIDTH/8;
    player.width = WIDTH/8;
    player.x = 200;
    player.y = HEIGHT-(HEIGHT*.1);
    player.animationSpeed = .15;
    player.play()
    app.stage.addChild(player);

    obstacle = new PIXI.Sprite(resources.obSheet.spritesheet.textures["washer.png"])
    obstacle.height = WIDTH/8;
    obstacle.width = WIDTH/8;
    obstacle.x = 400;
    obstacle.y = HEIGHT-(HEIGHT*.1);
    app.stage.addChild(obstacle);

    loaded = true;
  });

// === Main game loop === //
function gameLoop() {
  if (!gameOver && loaded) {
    // funcions to run every game tick, ex moveSprite();
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