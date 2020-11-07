export default class Player {
    groundLevel;
    HEIGHT;
    WIDTH;

    app;
    gameOver = false;
    loaded = false;
    needsFall = false;
    fallComplete = false;

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

    updatePos(inputs, jumpS) {
        if (this.currSprite.y == this.groundLevel && !inputs.duck && inputs.jump) {
            jumpS.play();
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
        if (this.currSprite.y == this.groundLevel) {
            this.switchSprite(this.ducking);
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
        if (this.currSprite.y != this.groundLevel) {
            let hold = this.currSprite.y;
            this.switchSprite(this.falling);
            this.currSprite.y = hold;
            this.falling.play();
            this.needsFall = true;
        }
        else {
            this.switchSprite(this.falling);
            this.falling.play();
        }
    }

    endGameFall() {
        if (this.currSprite.y < this.groundLevel) {
            this.currSprite.y += 4;
        } else {
            this.currSprite.y = this.groundLevel;
            this.fallComplete = true;
        }
    }

    createSprites() {
        //only call this the one time in the construtor!!
        let height = this.HEIGHT / (this.HEIGHT * 1.7);

        let spriteWidth = -(this.WIDTH - (this.WIDTH * 0.22)) / 9.3;
        let spriteHeight = -(this.WIDTH - (this.WIDTH * 0.22)) / 10;

        this.running = new PIXI.AnimatedSprite(this.app.loader.resources.charaSheet.spritesheet.animations["running_WithSock"]);
        this.running.scale.set(height)
        this.running.interactive = true;
        this.running.x = this.WIDTH * 0.22;
        this.running.y = this.HEIGHT - (this.HEIGHT * .1);
        this.running.hitArea = new PIXI.Rectangle(this.running.x, this.running.y, spriteWidth, spriteHeight);
        //console.log(this.running.hitArea.width);
        this.running.animationSpeed = .15;
        this.running.play()

        this.jumping = new PIXI.AnimatedSprite(this.app.loader.resources.charaSheet.spritesheet.animations["jumping_WithSock"]);
        this.jumping.scale.set(height)
        this.jumping.interactive = true;
        this.jumping.x = this.WIDTH * 0.22;
        this.jumping.y = this.HEIGHT - (this.HEIGHT * .1);
        this.jumping.hitArea = new PIXI.Rectangle(this.jumping.x, this.jumping.y, spriteWidth, spriteHeight);
        this.jumping.animationSpeed = .15;
        this.jumping.loop = false;

        this.jumpStatic = new PIXI.Sprite(this.app.loader.resources.charaSheet.spritesheet.textures["jumping_WithSock_1.png"]);
        this.jumpStatic.scale.set(height)
        this.jumpStatic.interactive = true;
        this.jumpStatic.x = this.WIDTH * 0.22;
        this.jumpStatic.y = this.HEIGHT - (this.HEIGHT * .1);
        this.jumpStatic.hitArea = new PIXI.Rectangle(this.jumpStatic.x, this.jumpStatic.y, spriteWidth, spriteHeight);

        this.ducking = new PIXI.AnimatedSprite(this.app.loader.resources.charaSheet.spritesheet.animations["duck_WithSock"]);
        this.ducking.scale.set(height);
        this.ducking.interactive = true;
        this.ducking.x = this.WIDTH * 0.22;
        this.ducking.y = this.HEIGHT - (this.HEIGHT * .1);
        this.ducking.hitArea = new PIXI.Rectangle(this.ducking.x, this.ducking.y, spriteWidth, spriteHeight * 0.65);
        this.ducking.animationSpeed = .15;
        this.ducking.play()

        this.falling = new PIXI.AnimatedSprite(this.app.loader.resources.charaSheet.spritesheet.animations["falling_WithSock"]);
        this.falling.scale.set(height)
        this.falling.interactive = true;
        this.falling.x = this.WIDTH * 0.22;
        this.falling.y = this.HEIGHT - (this.HEIGHT * .1);
        this.falling.hitArea = new PIXI.Rectangle(this.falling.x, this.falling.y, spriteWidth, spriteHeight);
        this.falling.animationSpeed = .25;
        this.falling.loop = false;

        this.currSprite = this.ducking;
        this.currSprite.hitArea = this.ducking.hitArea;
        this.app.stage.addChild(this.currSprite);
        this.loaded = true;

    }
}