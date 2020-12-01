export default class Windows{
  constructor(app){
    this.app = app;
    this.style = new PIXI.TextStyle({
      fontFamily: 'Arial', fontSize: SCALE * 15, fill: '#4e4e4e'
    });
    this.scoreStyle = new PIXI.TextStyle({
      fontFamily: 'Arial', fontSize: RELSCALE * 23, fill: '#4b4b4b'
    })

    this.removedInstruct = false;

    this.setUpPuns();
    this.setUpSprites();

  }

  setUpPuns(){
    fetch('puns/win_puns.txt')
    .then(response => response.text())
    .then(data => {
      this.winPuns = data.split('\n');
    })

    fetch('puns/lose_puns.txt')
    .then(response => response.text())
    .then(data => {
      this.losePuns = data.split('\n');
    })

  }

  setUpSprites(){
    this.popUpBackground = new PIXI.Sprite.from("../sprites/popupbackground.png");
    this.popUpBackground.anchor.set(0.5);
    this.popUpBackground.scale.set(SCALE * 0.6);
    this.popUpBackground.x = WIDTH/2;
    this.popUpBackground.y = HEIGHT/2;

    this.scoreBackgroundLose = new PIXI.Sprite.from("../sprites/scoreBackgroundLose.png");
    this.scoreBackgroundLose.anchor.set(0.5);
    this.scoreBackgroundLose.scale.set(SCALE * 0.4);
    this.scoreBackgroundLose.x = WIDTH/2;
    this.scoreBackgroundLose.y = this.popUpBackground.y / 2.1;
  }

  setUpInstruct(){
    let topText;
    let bottomText;
    if(!PIXI.utils.isMobile.any){
      topText = 'Press space/up arrow key to jump';
      bottomText = 'Press down arrow key to duck';
    }
    else{
      topText = 'Tap sky to jump';
      bottomText = 'Tap street to duck'
    }
    this.topMessageInstruct = new PIXI.Text(topText, this.style);
    this.topMessageInstruct.anchor.set(0.5);
    this.topMessageInstruct.x = WIDTH/2;
    this.topMessageInstruct.y = this.popUpBackground.y - (this.popUpBackground.y * 0.25);

    this.bottomMessageInstruct = new PIXI.Text(bottomText, this.style);
    this.bottomMessageInstruct.anchor.set(0.5);
    this.bottomMessageInstruct.x = WIDTH/2;
    this.bottomMessageInstruct.y = this.popUpBackground.y + (this.popUpBackground.y * 0.25);

    container.addChild(this.popUpBackground);
    container.addChild(this.topMessageInstruct);
    container.addChild(this.bottomMessageInstruct);
  }

  removeInstruct(){
    container.removeChild(this.popUpBackground);
    container.removeChild(this.topMessageInstruct);
    container.removeChild(this.bottomMessageInstruct);

    this.removedInstruct = true;
  }

  setUpLose(score){
    this.scoreMessage = new PIXI.Text(Math.round(score), this.scoreStyle);
    this.scoreMessage.anchor.set(0.5);
    this.scoreMessage.x = WIDTH/2;
    this.scoreMessage.y = this.scoreBackgroundLose.y;

    let rand = Math.floor(Math.random() * Math.floor(this.losePuns.length));

    let punSize;
    if(this.popUpBackground.width == 0) punSize = 19;
    else punSize = 500 * (1/(this.losePuns[rand].length%this.popUpBackground.width));
    if(punSize > 19) punSize = 19;

    let punStyle = new PIXI.TextStyle({
      fontFamily: 'Arial', fontSize: RELSCALE * punSize, fill: '#4b4b4b'
    });

    this.punAtLose = new PIXI.Text(this.losePuns[rand], punStyle);
    this.punAtLose.anchor.set(0.5);
    this.punAtLose.x = WIDTH/2;
    this.punAtLose.y = this.scoreBackgroundLose.y * 1.9;

    container.addChild(this.popUpBackground);
    container.addChild(this.scoreBackgroundLose);
    container.addChild(this.scoreMessage);
    container.addChild(this.punAtLose);
  }

  removeLose(){
    container.removeChild(this.popUpBackground);
    container.removeChild(this.scoreBackgroundLose);
    container.removeChild(this.scoreMessage);
    container.removeChild(this.punAtLose);
  }
}