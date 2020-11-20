export default class Windows{
  //app;
  //popUpBackground;

  //style;
  //topMessageInstruct;
  //bottomMessageInstruct;

  //removedInstruct;
  

  constructor(app){
    this.app = app;
    this.style = new PIXI.TextStyle({
      fontFamily: 'Arial', fontSize: SCALE * 15, fill: '#4e4e4e'
    });

    this.removedInstruct = false;

    this.setUpSprites();
  }


  setUpSprites(){
    this.popUpBackground = new PIXI.Sprite.from("../sprites/popupbackground.png");
    this.popUpBackground.anchor.set(0.5);
    this.popUpBackground.scale.set(SCALE * 0.5);
    this.popUpBackground.x = WIDTH/2;
    this.popUpBackground.y = HEIGHT/2;
  }

  setUpInstruct(){
    this.topMessageInstruct = new PIXI.Text('Press space/up arrow key to jump', this.style);
    this.topMessageInstruct.anchor.set(0.5);
    this.topMessageInstruct.x = WIDTH/2;
    this.topMessageInstruct.y = this.popUpBackground.y - (this.popUpBackground.y * 0.25);

    this.bottomMessageInstruct = new PIXI.Text('Press down arrow key to duck', this.style);
    this.bottomMessageInstruct.anchor.set(0.5);
    this.bottomMessageInstruct.x = WIDTH/2;
    this.bottomMessageInstruct.y = this.popUpBackground.y + (this.popUpBackground.y * 0.25);

    this.app.stage.addChild(this.popUpBackground);
    this.app.stage.addChild(this.topMessageInstruct);
    this.app.stage.addChild(this.bottomMessageInstruct);
  }

  removeInstruct(){
    this.app.stage.removeChild(this.popUpBackground);
    this.app.stage.removeChild(this.topMessageInstruct);
    this.app.stage.removeChild(this.bottomMessageInstruct);

    this.removedInstruct = true;
  }
}