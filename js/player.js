export default class Player {
    groundLevel;
    HEIGHT;
    WIDTH;

    app;
    gameOver = false;
    loaded = false;

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

    jump() {
        //add your jump stuff here!

        /*
        these lines play the animated jumping sprite. commented out for now bc simran was saying that it loops and that's a pain, so we have a few options:
            - time the jump so that it takes exactly the same amount of time as one loop of the jump animation\
            - or visa versa, change the length of the jump animation so that it matches the jump timing
            -or just keep to the line that's not commented out, which just gets a static sprite, not animated
        the animated jumping sprite is set to only play once (not loop) but it still might look a bit odd to have it finish playing before the player hits the ground, so if you choose to use the animated sprite, it is important to make sure the timing is right imo!

        this.switchSprite(this.jumping);
        this.jumping.play();

        */
        this.switchSprite(this.jumpStatic);
    }

    duck() {
        //oliver n i got this one! we'll use your jump as ref :D

        this.switchSprite(this.ducking);
    }

    reset() {
        //call this any time player is back to a default running state
        //idk how y'all have your stuff set up, so can't tell you when/how to do this;;;
        //if currSprite.x = groundLevel, reset() might work for jumping, but not ducking
        //for ducking, perhaps you could just have, on release of downArrow, reset()?
        this.switchSprite(this.running);
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

        this.currSprite = this.running;
        this.currSprite.hitArea = this.running.hitArea;
        console.log(this.currSprite.hitArea);
        this.app.stage.addChild(this.currSprite);
        this.loaded = true;
    }
}