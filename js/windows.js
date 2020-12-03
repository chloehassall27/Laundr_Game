export default class Windows {
  constructor(app) {
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

    this.scoreMessage = new PIXI.Text(0, this.scoreStyle);
    this.scoreMessage.anchor.set(0.5);
    this.scoreMessage.x = WIDTH / 2;
    this.scoreMessage.y = this.scoreBackgroundLose.y;
  }

  setUpPuns() {
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
    setTimeout(() => {
      this.punAtLose = new PIXI.Text(this.losePuns[0], this.scoreStyle);
      this.punAtLose.anchor.set(0.5);
      this.punAtLose.x = WIDTH / 2;
      this.punAtLose.y = this.scoreBackgroundLose.y * 1.7;
    }, 600)
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

    this.setupXButton();

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

  setupXButton() {
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

    this.xButton.style.top = "10%";
    this.xButton.style.left = "95%";
    this.xButton.style.transform = "translate(-50%, -50%)";

    this.xButton.onclick = this.removeInstruct.bind(this);
  }

  setUpLose(score) {
    this.scoreMessage.text = Math.round(score);

    this.rand = Math.floor(Math.random() * Math.floor(this.losePuns.length));
    this.punSize;
    if (this.popUpBackground.width == 0) this.punSize = 19;
    else this.punSize = (1 / (this.losePuns[this.rand].length % this.popUpBackground.width));

    this.punStyle = new PIXI.TextStyle({
      fontFamily: 'Arial', fontSize: (this.popUpBackground.width * this.punSize) * 1.5, fill: '#4b4b4b'
    });

    this.punAtLose.text = this.losePuns[this.rand];
    this.punAtLose.style = this.punStyle;

    container.addChild(this.popUpBackground);
    container.addChild(this.scoreBackgroundLose);
    container.addChild(this.scoreMessage);
    container.addChild(this.punAtLose);
  }

  removeLose() {
    container.removeChild(this.popUpBackground);
    container.removeChild(this.scoreBackgroundLose);
    container.removeChild(this.scoreMessage);
    container.removeChild(this.punAtLose);
  }
}