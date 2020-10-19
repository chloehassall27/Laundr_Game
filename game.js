const WIDTH = 1000;
const HEIGHT = WIDTH * 2/3

const app = new PIXI.Application({
  width: WIDTH, height: HEIGHT, backgroundColor: 0xF9F9F9, resolution: window.devicePixelRatio || 1,
});

document.body.appendChild(app.view);

let chara;

const container = new PIXI.Container();
app.stage.addChild(container);


// let text = new PIXI.Text('This is a PixiJS text',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
// app.stage.addChild(text);

const spriteSheetName = "sprites/charaSpriteSheet.json"

// load the texture we need
app.loader.add('charaSheet', spriteSheetName).load((loader, resources) => {

  chara = new PIXI.AnimatedSprite(resources.charaSheet.spritesheet.animations["running_WithSock"]);
  chara.height = WIDTH/8;
  chara.width = WIDTH/8;
  chara.animationSpeed = .15;
  chara.x = 200;
  chara.y = HEIGHT-(HEIGHT*.1);
  chara.play()
  app.stage.addChild(chara);

});

// var loader = new PIXI.Loader()
//     .add(spriteSheetName)
//     .load(setup);

// function setup() {
//   // get a reference to the sprite sheet we've just loaded:
//   let sheet = loader.resources[spriteSheetName].spriteSheet;

//   // create an animated sprite
//   animatedSprite = new PIXI.AnimatedSprite(sheet.animations["running_WithSock"]);

//   // set speed, start playback and add it to the stage
//   animatedSprite.animationSpeed = 0.167; 
//   animatedSprite.play();
//   app.stage.addChild(animatedSprite);
// }
