const app = new PIXI.Application({
  width: 800, height: 600, backgroundColor: 0xF9F9F9, resolution: window.devicePixelRatio || 1,
});

document.body.appendChild(app.view);


const container = new PIXI.Container();
app.stage.addChild(container);


