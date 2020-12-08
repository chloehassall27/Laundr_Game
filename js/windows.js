import Socials from "./socials.js"

export default class Windows {
  constructor(app) {
    this.app = app;
    this.socials = new Socials(app);

    this.style = new PIXI.TextStyle({
      fontFamily: 'Arial', fontSize: RELSCALE * 15, fill: '#4e4e4e', align: 'center'
    });
    this.scoreStyle = new PIXI.TextStyle({
      fontFamily: 'Arial', fontSize: RELSCALE * 23, fill: '#4b4b4b'
    });
    this.couponInfoStyle = new PIXI.TextStyle({
      fontFamily: 'Arial', fontSize: RELSCALE * 10, fill: '#4b4b4b'
    });
    this.creditsStyle = new PIXI.TextStyle({
      fontFamily: 'Arial', fontSize: RELSCALE * 12, fill: '#4e4e4e'
    });
    this.titlesStyle = new PIXI.TextStyle({
      fontFamily: 'Arial', fontSize: RELSCALE * 12, fill: '#01C9E1'
    });

    this.removedInstruct = false;
    this.creditsShowing = false;

    this.setUpPuns();
    this.setUpCode();
    this.setUpSprites();

    this.scoreMessage = new PIXI.Text(0, this.scoreStyle);
    this.scoreMessage.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
    this.scoreMessage.anchor.set(0.5);
    this.scoreMessage.x = WIDTH / 2;
  }

  setUpCode() {
    fetch('inputData/couponCode.txt')
      .then(response => response.text())
      .then(data => {
        this.couponCode = data;
      })
    this.code = new PIXI.Text("SOMETHING WENT WRONG", this.scoreStyle);
    this.code.anchor.set(0.5);
    this.code.x = WIDTH / 2;
    this.code.y = HEIGHT / 1.75;
    this.code.zIndex = 3;
    this.code.resolution = 1.5 * RELSCALE;
    this.code.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
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
    this.pun.zIndex = 3;
    this.pun.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
  }

  setUpSprites() {
    this.popUpBackground = new PIXI.Sprite.from("../sprites/popupbackground.png");
    this.popUpBackground.anchor.set(0.5);
    this.popUpBackground.scale.set(SCALE * 0.6);
    this.popUpBackground.x = WIDTH / 2;
    this.popUpBackground.y = HEIGHT / 2;
    this.popUpBackground.zIndex = 3;

    this.scoreBackgroundLose = new PIXI.Sprite.from("../sprites/scoreBackgroundLose.png");
    this.scoreBackgroundLose.anchor.set(0.5);
    this.scoreBackgroundLose.scale.set(SCALE * 0.4);
    this.scoreBackgroundLose.x = WIDTH / 2;
    this.scoreBackgroundLose.y = this.popUpBackground.y / 2.1;
    this.scoreBackgroundLose.zIndex = 3;

    this.scoreBackgroundWin = new PIXI.Sprite.from("../sprites/scoreBackgroundWin.png");
    this.scoreBackgroundWin.anchor.set(0.5);
    this.scoreBackgroundWin.scale.set(SCALE * 0.75);
    this.scoreBackgroundWin.x = WIDTH / 2;
    this.scoreBackgroundWin.y = this.popUpBackground.y * 1.05;
    this.scoreBackgroundWin.zIndex = 3;

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
    let instructText;

    this.token = new PIXI.AnimatedSprite(this.app.loader.resources.tokenSheet.spritesheet.animations["tokenSprite"]);
    this.token.anchor.set(0.45);
    this.token.scale.set(SCALE * 0.2);
    this.token.x = this.popUpBackground.x * 0.99;
    if(!PIXI.utils.isMobile.any){this.token.y = this.popUpBackground.y * 1.5;}
    else{this.token.y = this.popUpBackground.y * 1.4;}
    this.token.zIndex = 3;s
    this.token.animationSpeed = 0.135;
    this.token.play();

    if (!PIXI.utils.isMobile.any) {
      instructText = "Deliver the laundry without" + '\n' +
        "hitting any obstacles!" + '\n' + '\n' +
        "Press space/up arrow key to jump" + '\n' + '\n' +
        "Press down arrow key to duck" + '\n' + '\n' +
        "Collect tokens       for extra points";
    }
    else {
      instructText = "Deliver the laundry without" + '\n' +
        "hitting any obstacles!" + '\n' + '\n' +
        "Tap sky to jump" + '\n' + '\n' +
        "Tap street to duck" + '\n' + '\n' +
        "Collect tokens         for extra points" + '\n' + '\n' +
        "Tip: Turn your device horizontally!";
    }
    this.instructMessage = new PIXI.Text(instructText, this.style);
    this.instructMessage.anchor.set(0.5);
    this.instructMessage.x = WIDTH / 2;
    this.instructMessage.y = this.popUpBackground.y;
    this.instructMessage.zIndex = 3;
    this.instructMessage.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;

    this.setupXButton(95, 10, "instruct");

    container.addChild(this.popUpBackground);
    container.addChild(this.token);
    container.addChild(this.instructMessage);
  }

  removeInstruct() {
    container.removeChild(this.popUpBackground);
    container.removeChild(this.token);
    container.removeChild(this.instructMessage);

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

    if (toRemove == "instruct") { this.xButton.onclick = this.removeInstruct.bind(this); }
    else if (toRemove == "credits") { this.xButton.onclick = this.setUpWin.bind(this); }
  }

  getScore(score) {
    this.score = score;
  }

  getCanvasSize(canvasSize) {
    this.canvasSize = canvasSize;
  }

  setUpLose() {
    this.socials.endGame();

    //if (this.canvasSize < 675 && !this.socials.smallScreen) this.socials.switchSizes();
    //else if (this.canvasSize >= 675 && this.socials.smallScreen) this.socials.switchSizes();

    this.scoreMessage.text = Math.round(this.score);
    this.scoreMessage.y = this.scoreBackgroundLose.y;
    this.scoreMessage.zIndex = 3;

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
    this.socials.resetGame();
  }

  setUpWin() {
    this.socials.endGame();
    
    if (this.canvasSize < 1090 && !this.socials.smallScreen) this.socials.switchSizes();
    else if (this.canvasSize >= 1090 && this.socials.smallScreen) this.socials.switchSizes();
    
    if (this.creditsShowing) this.removeCredits();

    this.invisDiv.style.left = "-999%";
    this.creditsShowing = false;

    let topText = 'Use coupon code';
    this.code.text = this.couponCode;
    this.code.resolution = RELSCALE * 1.5;
    let bottomText = 'for 15% off your next order!';

    this.scoreMessage.text = Math.round(this.score);
    this.scoreMessage.y = this.scoreBackgroundWin.y / 2.5;
    this.scoreMessage.zIndex = 3;

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
    this.topMessageCoupon.zIndex = 15;
    this.topMessageCoupon.resolution = RELSCALE * 1.5;
    this.topMessageCoupon.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;

    this.bottomMessageCoupon = new PIXI.Text(bottomText, this.couponInfoStyle);
    this.bottomMessageCoupon.anchor.set(0.5);
    this.bottomMessageCoupon.x = WIDTH / 2;
    this.bottomMessageCoupon.y = this.popUpBackground.y + (this.popUpBackground.y * 0.3);
    this.bottomMessageCoupon.zIndex = 15;
    this.bottomMessageCoupon.resolution = RELSCALE * 1.5;
    this.bottomMessageCoupon.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;

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
    if (!this.creditsShowing) this.laundrDiv.removeChild(this.creditsButton);
    container.removeChild(this.topMessageCoupon);
    container.removeChild(this.code);
    container.removeChild(this.bottomMessageCoupon);
    this.socials.resetGame();
  }

  showCredits() {
    this.removeWin();
    this.creditsShowing = true;
    this.socials.resetGame();

    this.titles = "Supervisor of Suds:" + '\n' + '\n' +
      "Old man in a laundromat:" + '\n' + '\n' +
      "CEO of Clean Code:" + '\n' + '\n' +
      "Director of Detergent:" + '\n' + '\n' +
      "Stain Generator:" + '\n';
    this.credits = '\n' +
      "                                          Kyle Hassall" + '\n' +
      '\n' +
      "                                          Oliver Thomas" + '\n' +
      '\n' +
      "                                          Olivia Jacques-Baker" + '\n' +
      '\n' +
      "                                          Simran Patel" + '\n' +
      '\n' +
      "                                          Michael Zinn";

    this.titleMessage = new PIXI.Text(this.titles, this.titlesStyle);
    this.titleMessage.anchor.set(0.5);
    this.titleMessage.y = HEIGHT / 1.9;
    this.titleMessage.x = WIDTH / 2.3;
    this.titleMessage.resolution = RELSCALE * 1.5;
    this.titleMessage.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
    this.titleMessage.zIndex = 13;

    this.creditsMessage = new PIXI.Text(this.credits, this.creditsStyle);
    this.creditsMessage.anchor.set(0.5);
    this.creditsMessage.y = HEIGHT / 1.9;
    this.creditsMessage.x = WIDTH / 2;
    this.creditsMessage.resolution = RELSCALE * 1.5;
    this.creditsMessage.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
    this.creditsMessage.zIndex = 13;

    container.addChild(this.popUpBackground);
    container.addChild(this.titleMessage);
    container.addChild(this.creditsMessage);
    this.setupXButton(95, 10, "credits");
  }

  removeCredits() {
    this.creditsShowing = false;

    container.removeChild(this.creditsBackground);
    container.removeChild(this.titleMessage);
    container.removeChild(this.creditsMessage);

    this.invisDiv.style.left = "-999%";
  }

  socialsResizing() {
    if (this.canvasSize.width < 675 && !this.socials.smallScreen) this.socials.switchSizes();
    else if (this.canvasSize.width >= 675 && this.socials.smallScreen) this.socials.switchSizes();
  }

}