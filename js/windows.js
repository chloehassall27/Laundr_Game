import Socials from "./socials.js"

export default class Windows {
  constructor(app) {
    this.app = app;
    this.socials = new Socials(app);

    this.style = new PIXI.TextStyle({
      fontFamily: 'Arial', fontSize: SCALE * 15, fill: '#4e4e4e'
    });
    this.scoreStyle = new PIXI.TextStyle({
      fontFamily: 'Arial', fontSize: RELSCALE * 23, fill: '#4b4b4b'
    });
    this.couponInfoStyle = new PIXI.TextStyle({
      fontFamily: 'Arial', fontSize: RELSCALE * 10, fill: '#4b4b4b'
    });
    this.creditsStyle = new PIXI.TextStyle({
      fontFamily: 'Arial', fontSize: RELSCALE * 14, fill: '#4e4e4e'
    });

    this.removedInstruct = false;
    this.creditsShowing = false;

    this.setUpPuns();
    this.setUpCode();
    this.setUpSprites();

    this.scoreMessage = new PIXI.Text(0, this.scoreStyle);
    this.scoreMessage.anchor.set(0.5);
    this.scoreMessage.x = WIDTH / 2;
  }

  setUpCode(){
    fetch('inputData/couponCode.txt')
      .then(response => response.text())
      .then(data => { 
        this.couponCode = data;
    })
    this.code = new PIXI.Text("SOMETHING WENT WRONG", this.scoreStyle);
    this.code.anchor.set(0.5);
    this.code.x = WIDTH / 2;
    this.code.y = HEIGHT / 1.75;
  }

  setUpPuns() {
    fetch('inputData/win_puns.txt')
      .then(response => response.text())
      .then(data => {
        this.winPuns = data.split('\n');
      })

    fetch('inputData/lose_puns.txt')
      .then(response => response.text())
      .then(data => {
        this.losePuns = data.split('\n');
      })
      this.pun = new PIXI.Text("SOMETHING WENT WRONG", this.scoreStyle);
      this.pun.anchor.set(0.5);
      this.pun.x = WIDTH / 2;
      this.pun.y = HEIGHT / 2.5;
  }

  setUpSprites() {
    this.popUpBackground = new PIXI.Sprite.from("../sprites/popupbackground.png");
    this.popUpBackground.anchor.set(0.5);
    this.popUpBackground.scale.set(SCALE * 0.6);
    this.popUpBackground.x = WIDTH / 2;
    this.popUpBackground.y = HEIGHT / 2;

    this.scoreBackgroundLose = new PIXI.Sprite.from("../sprites/scoreBackgroundLose.png");
    this.scoreBackgroundLose.anchor.set(0.5);
    this.scoreBackgroundLose.scale.set(SCALE * 0.4);
    this.scoreBackgroundLose.x = WIDTH / 2;
    this.scoreBackgroundLose.y = this.popUpBackground.y / 2.1;

    this.scoreBackgroundWin = new PIXI.Sprite.from("../sprites/scoreBackgroundWin.png");
    this.scoreBackgroundWin.anchor.set(0.5);
    this.scoreBackgroundWin.scale.set(SCALE * 0.75);
    this.scoreBackgroundWin.x = WIDTH / 2;
    this.scoreBackgroundWin.y = this.popUpBackground.y * 1.05;

    this.creditsButton = document.createElement('IMG');
    this.creditsButton.classList.add("creditsButton");
    this.creditsButton.setAttribute("src", "../sprites/infobutton.png");
    this.creditsButton.style.width = "4%";
    this.creditsButton.style.position = "absolute";
    this.creditsButton.style.cursor = 'pointer';
    this.creditsButton.style.zIndex = "10";

    this.creditsButton.onclick = this.showCredits.bind(this);

    this.creditsButton.style.left = "61%";
    this.creditsButton.style.top = "71%";
  }

  setUpInstruct() {
    let topText;
    let bottomText;
    if (!PIXI.utils.isMobile.any) {
      topText = 'Press space/up arrow key to jump';
      bottomText = 'Press down arrow key to duck';
    }
    else {
      topText = 'Tap sky to jump';
      bottomText = 'Tap street to duck'
    }
    this.topMessageInstruct = new PIXI.Text(topText, this.style);
    this.topMessageInstruct.anchor.set(0.5);
    this.topMessageInstruct.x = WIDTH / 2;
    this.topMessageInstruct.y = this.popUpBackground.y - (this.popUpBackground.y * 0.25);

    this.bottomMessageInstruct = new PIXI.Text(bottomText, this.style);
    this.bottomMessageInstruct.anchor.set(0.5);
    this.bottomMessageInstruct.x = WIDTH / 2;
    this.bottomMessageInstruct.y = this.popUpBackground.y + (this.popUpBackground.y * 0.25);

    this.setupXButton(95, 10, "instruct");

    container.addChild(this.popUpBackground);
    container.addChild(this.topMessageInstruct);
    container.addChild(this.bottomMessageInstruct);
  }

  removeInstruct() {
    container.removeChild(this.popUpBackground);
    container.removeChild(this.topMessageInstruct);
    container.removeChild(this.bottomMessageInstruct);

    this.invisDiv.style.left = "-999%";

    this.removedInstruct = true;
  }

  setupXButton(x, y, toRemove) {
    this.laundrDiv = document.getElementById('laundr-game');

    this.invisDiv = document.createElement('div');
    this.invisDiv.classList.add("invisDiv");
    this.invisDiv.style.width = "5%";
    this.invisDiv.style.position = "absolute";
    this.invisDiv.style.padding = "10vw";
    this.invisDiv.style.margin = "0px";
    this.invisDiv.style.zIndex = "3";
    this.laundrDiv.appendChild(this.invisDiv);

    this.invisDiv.style.top = '50%';
    this.invisDiv.style.left = "50%";
    this.invisDiv.style.transform = "translate(-50%, -50%)";

    this.xButton = document.createElement('div');
    this.xButton.classList.add('xButton_inst');
    this.xButton.innerHTML = "×";
    this.xButton.style.fontSize = "4vw";
    this.xButton.style.fontWeight = "900";
    this.xButton.style.fontFamily = "Impact";
    this.xButton.style.position = "absolute";
    this.xButton.style.cursor = 'pointer';
    this.invisDiv.appendChild(this.xButton);

    let xLoc = x.toString() + "%";
    let yLoc = y.toString() + "%"

    this.xButton.style.top = yLoc;
    this.xButton.style.left = xLoc;
    this.xButton.style.transform = "translate(-50%, -50%)";

    if(toRemove == "instruct"){this.xButton.onclick = this.removeInstruct.bind(this);}
    else if(toRemove == "credits"){this.xButton.onclick = this.setUpWin.bind(this);}
  }

  getScore(score){
    this.score = score;
  }

  getCanvasSize(canvasSize){
    this.canvasSize = canvasSize;
  }

  setUpLose() {
    this.scoreMessage.text = Math.round(this.score);
    this.scoreMessage.y = this.scoreBackgroundLose.y;

    this.rand = Math.floor(Math.random() * Math.floor(this.losePuns.length));
    this.punSize;
    if (this.popUpBackground.width == 0) this.punSize = 19;
    else this.punSize = (1 / (this.losePuns[this.rand].length % this.popUpBackground.width));

    this.punStyle = new PIXI.TextStyle({
      fontFamily: 'Arial', fontSize: (this.popUpBackground.width * this.punSize) * 1.5, fill: '#4b4b4b'
    });

    this.pun.text = this.losePuns[this.rand];
    this.pun.style = this.punStyle;

    container.addChild(this.popUpBackground);
    container.addChild(this.scoreBackgroundLose);
    container.addChild(this.scoreMessage);
    container.addChild(this.pun);
  }

  removeLose() {
    container.removeChild(this.popUpBackground);
    container.removeChild(this.scoreBackgroundLose);
    container.removeChild(this.scoreMessage);
    container.removeChild(this.pun);
  }

  setUpWin() {
    if (this.canvasSize < 675 && !this.socials.smallScreen) this.socials.switchSizes();
    else if (this.canvasSize >= 675 && this.socials.smallScreen) this.socials.switchSizes();

    this.socials.endGame();
    this.invisDiv.style.left = "-999%";
    this.creditsShowing = false;

    let topText = 'Use coupon code';
    this.code.text = this.couponCode;
    let bottomText = 'for 15% off your next order!';

    this.scoreMessage.text = Math.round(this.score);
    this.scoreMessage.y = this.scoreBackgroundWin.y / 2.35;

    this.rand = Math.floor(Math.random() * Math.floor(this.winPuns.length));
    this.punSize;
    if (this.popUpBackground.width == 0) this.punSize = 19;
    else this.punSize = (1 / (this.winPuns[this.rand].length % this.popUpBackground.width));

    this.punStyle = new PIXI.TextStyle({
      fontFamily: 'Arial', fontSize: (this.popUpBackground.width * this.punSize) * 1.5, fill: '#4b4b4b'
    });

    this.pun.text = this.winPuns[this.rand];
    this.pun.style = this.punStyle;

    this.topMessageCoupon = new PIXI.Text(topText, this.couponInfoStyle);
    this.topMessageCoupon.anchor.set(0.5);
    this.topMessageCoupon.x = WIDTH / 2;
    this.topMessageCoupon.y = this.popUpBackground.y;

    this.bottomMessageCoupon = new PIXI.Text(bottomText, this.couponInfoStyle);
    this.bottomMessageCoupon.anchor.set(0.5);
    this.bottomMessageCoupon.x = WIDTH / 2;
    this.bottomMessageCoupon.y = this.popUpBackground.y + (this.popUpBackground.y * 0.3);

    container.addChild(this.popUpBackground);
    container.addChild(this.scoreBackgroundWin);
    container.addChild(this.scoreMessage);
    container.addChild(this.pun);
    this.laundrDiv.appendChild(this.creditsButton);
    container.addChild(this.topMessageCoupon);
    container.addChild(this.code);
    container.addChild(this.bottomMessageCoupon);
  }

  removeWin() {
    container.removeChild(this.popUpBackground);
    container.removeChild(this.scoreBackgroundWin);
    container.removeChild(this.scoreMessage);
    container.removeChild(this.pun);
    if(!this.creditsShowing) this.laundrDiv.removeChild(this.creditsButton);
    container.removeChild(this.topMessageCoupon);
    container.removeChild(this.code);
    container.removeChild(this.bottomMessageCoupon);
  }

  showCredits(){
    this.removeWin();
    this.creditsShowing = true;
    this.socials.resetGame();

    this.credits = "Kyle Hassall:                 Supervisor of Suds" + '\n' +
                   "Oliver Thomas:    Old man in a laundromat" + '\n' +
                   "Olivia Jacques-Baker: CEO of Clean Code" + '\n' +
                   "Simran Patel:                    FILLER" + '\n' +
                   "Michael Zinn:                     Stain Generator";


    this.creditsMessage = new PIXI.Text(this.credits, this.creditsStyle);
    this.creditsMessage.anchor.set(0.5);
    this.creditsMessage.y = HEIGHT / 2.1;
    this.creditsMessage.x = WIDTH / 2;

    container.addChild(this.popUpBackground);
    container.addChild(this.creditsMessage);
    this.setupXButton(95, 10, "credits");
  }

  removeCredits(){
    this.creditsShowing = false;

    container.removeChild(this.creditsBackground);
    container.removeChild(this.creditsMessage);

    this.invisDiv.style.left = "-999%";
  }

  socialsResizing(gameOver){
    if (this.canvasSize < 675 && !this.socials.smallScreen && gameOver) this.socials.switchSizes();
    else if (this.canvasSize >= 675 && this.socials.smallScreen && gameOver) this.socials.switchSizes();
  }

}