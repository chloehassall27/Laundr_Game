const WIDTH = 1000;
const HEIGHT = WIDTH * 2/3;
const RESOLUTION = 1/window.devicePixelRatio || 1;

console.log(RESOLUTION)

// === Basic app setup === //
  const app = new PIXI.Application({
    width: WIDTH, height: HEIGHT, backgroundColor: 0xF9F9F9, resolution: RESOLUTION,
  });

  // Add the PIXI app to the webpage
  document.body.appendChild(app.view);

  // Basic game variables
  let gameOver = false;
  let inputs = {
    jump: false,
    duck: false
  };
  let groundY = HEIGHT-(HEIGHT*.1)

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
      player.y = groundY;
      player.animationSpeed = .15;
      player.play()
      app.stage.addChild(player);

      // Create the obstacle sprite and assign it basic values, then add it to the canvas
      obstacle = new PIXI.AnimatedSprite(resources.obSheet.spritesheet.animations["washerSprite"])
      obstacle.height = WIDTH/8;
      obstacle.width = WIDTH/8;
      obstacle.x = 400;
      obstacle.y = groundY;
      app.stage.addChild(obstacle);

      // Call the gameLoop function every time the app ticks (every time the view updates) after all resources have been loaded in
      app.ticker.add(gameLoop);
    });
// === End sprite setup === //


// === Game functions === //
  function gameLoop() {
    if (!gameOver) {
      // funcions to run every game tick, ex moveBackground();
      if(player.y == groundY){
        if(inputs[jump])
          jump();
        else if(inputs[duck])
          duck();
      }
    }
  }

  function moveBackground() {
    // Add movement
  }

  function jump() {
    console.log("jump");
  }

  function duck() {
    console.log("duck");
  }
// === End game functions === //


// === Helper functions === //
  // Keypress functions
  window.addEventListener("keydown", keysDown);
  window.addEventListener("keyup", keysUp);
  function keysDown(e) {
    // console.log(e.key);
    if(e.key == "ArrowUp"){
      inputs[jump] = true;
    }
    if(e.key == "ArrowDown"){
      inputs[duck] = true;
    }
  }

  function keysUp(e) {
    if(e.key == "ArrowUp"){
      inputs[jump] = false;
    }
    if(e.key == "ArrowDown"){
      inputs[duck] = false;
    }
  }

  
  // Touchevent functions
  app.view.addEventListener("touchstart", touchStart, false);
  app.view.addEventListener("touchend", touchEnd, false);
  app.view.addEventListener("touchcancel", touchCancel, false);
  app.view.addEventListener("touchmove", touchMove, false);

  function touchStart(e) {
    // Touchscreens can have multiple touch points, so we start at the oldest touch and keep going until we get a touch in the relevant area
    for (var i=0; i < e.targetTouches.length; i++) {
      touch = e.targetTouches[i]
      // console.log(touch);
      // Top 2/3 of the canvas will call the jump function
      if (touch.pageY < 2*HEIGHT*RESOLUTION/3) {
        inputs[jump] = true;
        break;
      }
      // Bottom 1/3 of the canvas will call the duck function
      else if (touch.pageY > HEIGHT*RESOLUTION/3) {
        inputs[duck] = true;
        break;
      }
    }
  }

  function touchEnd(e) {
    // console.log(e);
    for (var i=0; i < e.changedTouches.length; i++) {
      touch = e.changedTouches[i]
      // console.log(touch);

      // Top 2/3 of the canvas will stop the jump function
      if (touch.pageY < 2*HEIGHT*RESOLUTION/3) {
        inputs[jump] = false;
        break;
      }

      // Bottom 1/3 of the canvas will stop the duck function
      else if (touch.pageY > HEIGHT*RESOLUTION/3) {
        inputs[duck] = false;
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
    for (var i=0; i < e.changedTouches.length; i++) {
      touch = e.changedTouches[i]
      // console.log(touch);

      // Top 2/3 of the canvas will call the jump function and stop the duck function
      if (touch.pageY < 2*HEIGHT*RESOLUTION/3) {
        inputs[jump] = true;
        inputs[duck] = false;
        break;
      }
      // Bottom 1/3 of the canvas will call the duck function and stop the jump function
      else if (touch.pageY > HEIGHT*RESOLUTION/3) {
        inputs[duck] = true;
        inputs[jump] = false;
        break;
      }
    }
  }
  
// === End helper functions === //