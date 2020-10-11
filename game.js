const app = new PIXI.Application({
  width: 800, height: 600, backgroundColor: 0xF9F9F9, resolution: window.devicePixelRatio || 1,
});

document.body.appendChild(app.view);


const container = new PIXI.Container();
app.stage.addChild(container);


let text = new PIXI.Text('This is a PixiJS text',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
app.stage.addChild(text);


// // load the texture we need
// app.loader.add('charaSheet', 'sprites/charaSpriteSheet.json').load((loader, resources) => {
//   // let chara = new PIXI.AnimatedSprite(resources.charaSheet.spriteSheet.animations["running_WithSock"]);
//   let sheet = PIXI.Loader.shared.resources["sprites/spritesheet.json"].spritesheet;
//   animatedSprite = new PIXI.AnimatedSprite(sheet.animations["running_WithSock"]);

//   // Add the bunny to the scene we are building
//   app.stage.addChild(chara);
// });

var loader = new PIXI.Loader()
    .add("sprites/charaSpriteSheet.json")
    .load(setup);

function setup() {
  // get a reference to the sprite sheet we've just loaded:
  let sheet = loader.resources["sprites/charaSpriteSheet.json"].spriteSheet;

  // create an animated sprite
  animatedCapguy = new PIXI.AnimatedSprite(sheet.animations["running_WithSock"]);

  // set speed, start playback and add it to the stage
  animatedCapguy.animationSpeed = 0.167; 
  animatedCapguy.play();
  app.stage.addChild(animatedCapguy);
}