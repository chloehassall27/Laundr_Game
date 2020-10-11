const app = new PIXI.Application({
  width: 800, height: 600, backgroundColor: 0xF9F9F9, resolution: window.devicePixelRatio || 1,
});

document.body.appendChild(app.view);


const container = new PIXI.Container();
app.stage.addChild(container);


let text = new PIXI.Text('This is a PixiJS text',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
app.stage.addChild(text);

let chara = new PIXI.Sprite.from("sprites/charaSpriteSheet.png");
app.stage.addChild(chara);