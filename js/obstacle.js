//import "../sprites/obstacleSprites.json"

/*export default class Obstacle{
  Obstacle(ob){
    if(typeof ob === 'undefined'){
      throw new Error('Somethin is messed up');
    }
  }

  async build(posx, posy, sprite){
    var ob = await makeOb(posx, posy, sprite);
    return new Obstacle(ob);
  }

  async makeOb(posx, posy, sprite){
    let obstacle;
    app.loader.add('obSheet', "sprites/obstacleSprites.json")
    .load((loader, resources) => {
      obstacle = new PIXI.AnimatedSprite(resources.obSheet.spritesheet.animations[sprite]);
      obstacle.height = WIDTH/8;
      obstacle.width = WIDTH/8;
      obstacle.x = posx;
      obstacle.y = posy;
      obstacle.animationSpeed = .15;
      obstacle.play()
      //app.stage.addChild(obstacle);
    })
    return obstacle;
  }
}*/

export default class Obstacle extends PIXI.AnimatedSprite {
  constructor(texture){
    super(texture)
  }
}