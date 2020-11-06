export default class Player {
    groundLevel;
    HEIGHT;
    WIDTH;

    app;
    gameOver = false;
    loaded = false;

    speedY = 0;

    currSprite;
    running;
    jumping;
    jumpStatic;
    ducking;
    falling;

    constructor(HEIGHT, WIDTH, app) {
        this.app = app;
        this.HEIGHT = HEIGHT;
        this.WIDTH = WIDTH;

        this.groundLevel = this.HEIGHT - (this.HEIGHT * .1);

        //set up all the sprites
        this.createSprites();
    }

    updatePos(inputs) {
        if (this.currSprite.y == this.groundLevel && !inputs.duck && inputs.jump) {
            this.speedY = 3.5;
            this.switchSprite(this.jumpStatic);
        }

        if (this.speedY > 0 && inputs.jump) {
            this.speedY += .06;
        }

        if (this.currSprite.y < this.groundLevel) {
            this.speedY -= .12;
        }
        else if (this.currSprite.y > this.groundLevel) {
            this.speedY = 0;
            this.currSprite.y = this.groundLevel;
            this.currSprite.hitArea.y = this.groundLevel;
            this.switchSprite(this.running);
        }

        this.currSprite.y -= this.speedY;
        this.currSprite.hitArea.y -= this.speedY;
    }

    duck() {
        if(this.currSprite.y == this.groundLevel){
            this.switchSprite(this.ducking);
            let hitY = this.groundLevel - 130;
            this.currSprite.hitArea.y = hitY;
        }
        else {
            this.speedY -= .15;
        }
    }

    reset() {
        this.switchSprite(this.running);
        this.currSprite.hitArea.y = this.currSprite.y;
    }

    switchSprite(sprite) {
        this.app.stage.removeChild(this.currSprite);
        this.currSprite = sprite;
        this.currSprite.hitArea = sprite.hitArea;
        this.app.stage.addChild(this.currSprite);
    }

    endGame() {
        this.switchSprite(this.falling);
        this.falling.play();
    }

    createSprites() {
        //only call this the one time in the construtor!!
        this.running = new PIXI.AnimatedSprite(this.app.loader.resources.charaSheet.spritesheet.animations["running_WithSock"]);
        this.running.scale.set(0.55)
        this.running.interactive = true;
        this.running.x = 200;
        this.running.y = this.HEIGHT - (this.HEIGHT * .1);
        this.running.hitArea = new PIXI.Rectangle(this.running.x, this.running.y, -75, -70);
        this.running.animationSpeed = .15;
        this.running.play()

        this.jumping = new PIXI.AnimatedSprite(this.app.loader.resources.charaSheet.spritesheet.animations["jumping_WithSock"]);
        this.jumping.scale.set(0.55)
        this.jumping.interactive = true;
        this.jumping.x = 200;
        this.jumping.y = this.HEIGHT - (this.HEIGHT * .1);
        this.jumping.hitArea = new PIXI.Rectangle(this.jumping.x, this.jumping.y, -75, -70);
        this.jumping.animationSpeed = .15;
        this.jumping.loop = false;

        this.jumpStatic = new PIXI.Sprite(this.app.loader.resources.charaSheet.spritesheet.textures["jumping_WithSock_1.png"]);
        this.jumpStatic.scale.set(0.55)
        this.jumpStatic.interactive = true;
        this.jumpStatic.x = 200;
        this.jumpStatic.y = this.HEIGHT - (this.HEIGHT * .1);
        this.jumpStatic.hitArea = new PIXI.Rectangle(this.jumpStatic.x, this.jumpStatic.y, -75, -70);

        this.ducking = new PIXI.AnimatedSprite(this.app.loader.resources.charaSheet.spritesheet.animations["duck_WithSock"]);
        this.ducking.scale.set(0.55)
        this.ducking.interactive = true;
        this.ducking.x = 200;
        this.ducking.y = this.HEIGHT - (this.HEIGHT * .1);
        this.ducking.hitArea = new PIXI.Rectangle(this.ducking.x, this.ducking.y, -75, -70);
        this.ducking.animationSpeed = .15;
        this.ducking.play()

        this.falling = new PIXI.AnimatedSprite(this.app.loader.resources.charaSheet.spritesheet.animations["falling_WithSock"]);
        this.falling.scale.set(0.55)
        this.falling.interactive = true;
        this.falling.x = 200;
        this.falling.y = this.HEIGHT - (this.HEIGHT * .1);
        this.falling.hitArea = new PIXI.Rectangle(this.falling.x, this.falling.y, -75, -70);
        this.falling.animationSpeed = .25;
        this.falling.loop = false;

        this.currSprite = this.ducking;
        this.currSprite.hitArea = this.ducking.hitArea;
        this.app.stage.addChild(this.currSprite);
        this.loaded = true;
    }
}