WIDTH = window.innerWidth;
HEIGHT = window.innerHeight;

resizing();
window.addEventListener('resize', resizing);
function resizing(){
  if (WIDTH  != window.innerWidth ||
    HEIGHT != window.innerHeight) {
  
  location.reload();
  }
}


// === Basic app setup === //
  const app = new PIXI.Application({
    width: WIDTH, height: HEIGHT, backgroundColor: 0xF9F9F9, resolution: 1// window.devicePixelRatio || 1,
  });

  

  // Add the PIXI app to the webpage
  document.body.appendChild(app.view);

  // Basic game variables
  let gameOver = false;
// === End basic app setup === //


// === Sprite setup === //
  let player, obstacle;

  app.loader
    .add('charaSheet', "sprites/charaSpriteSheet.json")
    .add('obSheet', "sprites/obstacleSpriteSheet.json")
    // After adding the sprite sheets to the app's resource loader, we can use the loaded sprites
    .load((loader, resources) => {
      // Create the player sprite and assign it basic values, then add it to the canvas
      player = new PIXI.AnimatedSprite(resources.charaSheet.spritesheet.animations["running_WithSock"]);
      player.height = WIDTH/8;
      player.width = WIDTH/8;
      player.x = 200;
      player.y = HEIGHT-(HEIGHT*.1);
      player.animationSpeed = .15;
      player.play()
      app.stage.addChild(player);

      // Create the obstacle sprite and assign it basic values, then add it to the canvas
      obstacle = new PIXI.AnimatedSprite(resources.obSheet.spritesheet.animations["washerSprite"])
      obstacle.height = WIDTH/8;
      obstacle.width = WIDTH/8;
      obstacle.x = 400;
      obstacle.y = HEIGHT-(HEIGHT*.1);
      app.stage.addChild(obstacle);

      // Call the gameLoop function every time the app ticks (every time the view updates) after all resources have been loaded in
      app.ticker.add(gameLoop);
    });
// === End sprite setup === //


// === Game functions === //
  function gameLoop() {
    if (!gameOver) {
      // funcions to run every game tick, ex moveSprite();
    }
  }

  function moveSprite() {
    // Add movement
  }
// === End game functions === //


// === Helper functions === //
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
  
// === End helper functions === //