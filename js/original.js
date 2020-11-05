import Obstacle from "./obstacle.js"

const WIDTH = 1000;
const HEIGHT = WIDTH * 2 / 3
var interval = 500;
var obstacles = [];

// === Basic app setup === //
const app = new PIXI.Application({
    width: WIDTH, height: HEIGHT, backgroundColor: 0xF9F9F9, resolution: window.devicePixelRatio || 1,
});
document.body.appendChild(app.view);

const container = new PIXI.Container();
app.stage.addChild(container);

app.ticker.add(gameLoop);
let gameOver = false;
let loaded = false;

// let text = new PIXI.Text('This is a PixiJS text',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
// app.stage.addChild(text);

// === Sprite setup === //
let player, obstacle;
app.loader
    .add('charaSheet', "sprites/charaSpriteSheet.json")
    .add('obSheet', "sprites/obstacleSprites.json")
    .load((loader, resources) => {
        player = new PIXI.AnimatedSprite(resources.charaSheet.spritesheet.animations["running_WithSock"]);
        player.height = WIDTH / 8;
        player.width = WIDTH / 8;
        player.x = 200;
        player.y = HEIGHT - (HEIGHT * .1);
        player.animationSpeed = .15;
        player.play()
        app.stage.addChild(player);

        //buildObstacles(app.renderer.height / 2, "washerSprite");
        loaded = true;

    });

function buildObstacles(posy, spriteName) {
    var obstacle = new Obstacle(app.loader.resources.obSheet.spritesheet.animations[spriteName]);

    obstacle.anchor.set(0.5);
    obstacle.x = app.renderer.width + 100;
    obstacle.y = posy;
    obstacle.anchor.set(0.5, 0.5);
    obstacle.animationSpeed = .15;
    obstacle.play()

    app.stage.addChild(obstacle);

    obstacles.push(obstacle);
}

// === Main game loop === //
function gameLoop() {
    if (!gameOver && loaded) {
        interval--;
        if (interval === 0) {
            interval = 500;
            buildObstacles(app.renderer.height / 2, "washerSprite");
        }
        for (var i = 0; i < obstacles.length; i++) {
            const xBox = obstacles[i].getBounds().x + obstacles[i].getBounds().width;
            if (xBox < 0) {
                app.stage.removeChild(obstacles[i]);
                obstacles.splice(0, 1);
            }
            else {
                obstacles[i].x -= 1;
            }
        }
        // funcions to run every game tick, ex moveSprite();
    }
}


// Keypress functions
window.addEventListener("keydown", keysDown);
window.addEventListener("keyup", keysUp);
let keys = {};
function keysDown(e) {
    keys[e.keyCode] = true;
}

function keysUp(e) {
    keys[e.keyCode] = false;
}

// Other game functions
function moveSprite() {
    // Add movement
}