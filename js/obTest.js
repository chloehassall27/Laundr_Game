
class CustomSprite extends PIXI.AnimatedSprite {
  constructor(texture){
      super(texture)
  }

  setId(id) {
      this.id = id;
  }
}

var app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  // backgroundColor: 0x2c3e50,
  forceCanvas: true
});
document.body.appendChild(app.view);

// Load the bunny texture
app.loader.add('bunny', 'https://pixijs.io/examples/examples/assets/bunny.png')
  .load(startup);

function startup()
{
  var bunny = new CustomSprite(app.loader.resources.bunny.texture);
  bunny.setID(1);
  console.log(bunny.id);

  bunny.anchor.set(0.5);
  bunny.x = app.renderer.width / 2;
  bunny.y = app.renderer.height / 2;

  app.stage.addChild(bunny);
}
