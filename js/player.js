export default class Player {
    groundLevel;

    app;
    gameOver = false;
    loaded = false;
    needsFall = false;
    fallComplete = false;
    winSequence = false;

    speedY = 0;

    currSprite;
    running;
    jumping;
    jumpStatic;
    ducking;
    falling;

    jumpS;

    constructor(app, jumpS) {
        this.app = app;

        this.groundLevel = HEIGHT - (HEIGHT * .1);

        this.jumpS = jumpS;
        
        //set up all the sprites
        this.createSprites();
    }

    updateJump() {
        // If the player is on the ground, not ducking, and trying to jump, start the jump sequence with an initial jump speed
        if (this.currSprite.y == this.groundLevel && !window.inputs.duck && window.inputs.jump) {
            if (!window.mute) this.jumpS.play();
            this.speedY = 3.5;
            this.switchSprite(this.jumpStatic);
            // this.switchSprite(this.jumping);
        }

        // If player is below ground, set them on the ground and reset speed and animation
        else if (this.currSprite.y > this.groundLevel) {
            this.speedY = 0;
            this.currSprite.y = this.groundLevel;
            this.currSprite.hitArea.y = this.groundLevel;
            this.switchSprite(this.running);
        }

        // If player is in air, add gravity
        else if (this.currSprite.y < this.groundLevel) {
            this.speedY -= .12;
        }

        // If player is rising and holding jump, keep them up longer
        if (this.speedY > 0 && window.inputs.jump) {
            this.speedY += .06;
        }

        // Once the jump animation is completed, switch to static animation
        // if (this.currSprite === this.jumping && this.currSprite.currentFrame == this.jumping.size - 1){
        //     this.switchSprite(this.jumpStatic);
        // }

        this.currSprite.y -= SCALE * this.speedY;
        this.currSprite.hitArea.y -= SCALE * this.speedY;
    }

    updateDuck() {
        if (window.inputs.duck) {
            // If ducking on (or below) ground, use ducking sprite
            if (this.currSprite.y >= this.groundLevel)
                this.switchSprite(this.ducking);

            // If ducking in midair, move player down faster
            else
                this.speedY -= .15;
        }

        // End of duck
        else if (this.currSprite === this.ducking) {
            this.switchSprite(this.running)
        }
    }

    reset() {
        this.currSprite.x = WIDTH * 0.22;
        this.switchSprite(this.running);
        this.currSprite.x = WIDTH * 0.22;
        this.currSprite.hitArea.y = this.currSprite.y;
    }

    switchSprite(sprite) {
        // Only switch sprite if necesary
        if (this.currSprite !== sprite) {
            let y = this.currSprite.y;
            container.removeChild(this.currSprite);
            this.currSprite = sprite;
            this.currSprite.hitArea = sprite.hitArea;
            this.currSprite.y = y;
            this.currSprite.hitArea.y = y;
            container.addChild(this.currSprite);
        }
    }

    endGame(win) {
        if (!win) {
            if (this.currSprite.y != this.groundLevel) {
                let hold = this.currSprite.y;
                this.switchSprite(this.falling);
                this.currSprite.y = hold;
                this.falling.gotoAndPlay(0);
                this.needsFall = true;
            }
            else {
                this.switchSprite(this.falling);
                this.falling.gotoAndPlay(0);
            }
        } else {
            this.winSequence = true;
            setTimeout(this.sitDown.bind(this), 700);
        }
    }

    sitDown() {
        this.winSequence = false;
        this.ducking.stop();
        let x = this.currSprite.x;
        this.switchSprite(this.ducking);
        this.currSprite.x = x;
    }

    endGameFall() {
        if (this.currSprite.y < this.groundLevel) {
            this.currSprite.y += SCALE * 4;
        } else {
            this.currSprite.y = this.groundLevel;
            this.fallComplete = true;
        }
    }

    createSprites() {
        //only call this the one time in the construtor!!
        let height = SCALE / 1.7;

        let spriteWidth = -(WIDTH - (WIDTH * 0.22)) / 9.3;
        let spriteHeight = -(WIDTH - (WIDTH * 0.22)) / 10;

        this.running = new PIXI.AnimatedSprite(this.app.loader.resources.charaSheet.spritesheet.animations["running_WithSock"]);
        this.running.scale.set(height)
        this.running.interactive = true;
        this.running.x = WIDTH * 0.22;
        this.running.y = HEIGHT - (HEIGHT * .1);
        this.running.hitArea = new PIXI.Rectangle(this.running.x, this.running.y, spriteWidth, spriteHeight);
        //console.log(this.running.hitArea.width);
        this.running.animationSpeed = .15;
        this.running.play()

        this.jumping = new PIXI.AnimatedSprite(this.app.loader.resources.charaSheet.spritesheet.animations["jumping_WithSock"]);
        this.jumping.scale.set(height)
        this.jumping.interactive = true;
        this.jumping.x = WIDTH * 0.22;
        this.jumping.y = HEIGHT - (HEIGHT * .1);
        this.jumping.hitArea = new PIXI.Rectangle(this.jumping.x, this.jumping.y, spriteWidth, spriteHeight);
        this.jumping.animationSpeed = .15;
        this.jumping.play()

        this.jumpStatic = new PIXI.Sprite(this.app.loader.resources.charaSheet.spritesheet.textures["jumping_WithSock_1.png"]);
        this.jumpStatic.scale.set(height)
        this.jumpStatic.interactive = true;
        this.jumpStatic.x = WIDTH * 0.22;
        this.jumpStatic.y = HEIGHT - (HEIGHT * .1);
        this.jumpStatic.hitArea = new PIXI.Rectangle(this.jumpStatic.x, this.jumpStatic.y, spriteWidth, spriteHeight);

        this.ducking = new PIXI.AnimatedSprite(this.app.loader.resources.charaSheet.spritesheet.animations["duck_WithSock"]);
        this.ducking.scale.set(height);
        this.ducking.interactive = true;
        this.ducking.x = WIDTH * 0.22;
        this.ducking.y = HEIGHT - (HEIGHT * .1);
        this.ducking.hitArea = new PIXI.Rectangle(this.ducking.x, this.ducking.y, spriteWidth, spriteHeight * 0.65);
        this.ducking.animationSpeed = .15;
        this.ducking.play()

        this.falling = new PIXI.AnimatedSprite(this.app.loader.resources.charaSheet.spritesheet.animations["falling_WithSock"]);
        this.falling.scale.set(height)
        this.falling.interactive = true;
        this.falling.x = WIDTH * 0.22;
        this.falling.y = HEIGHT - (HEIGHT * .1);
        this.falling.hitArea = new PIXI.Rectangle(this.falling.x, this.falling.y, spriteWidth, spriteHeight);
        this.falling.animationSpeed = .25;
        this.falling.loop = false;

        this.currSprite = this.ducking;
        this.currSprite.hitArea = this.ducking.hitArea;
        container.addChild(this.currSprite);
        this.loaded = true;

    }
}