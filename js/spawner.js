export default class Spawner {
    interval = 1500;
    intDecAmt = 0.9;
    intRangeMax = 3000;
    intRangeMin = 1500;
    smallestInt = 500;
    rangeMin;
    tokenTime;
    app;
    HEIGHT;
    WIDTH;
    walkingLevel;
    jumpLevel;
    test;

    obstScale;
    tokenScale;
    ironRandScale;
    ironRandAdd;

    startTime;
    firstSpawn = true;

    playerBaseY;

    obstacles = [];
    tokens = [];

    gameOver = false;


    constructor(HEIGHT, WIDTH, app, playerBaseY) {
        this.app = app;
        this.HEIGHT = HEIGHT;
        this.WIDTH = WIDTH;
        this.playerBaseY = playerBaseY;

        this.walkingLevel = HEIGHT - (HEIGHT * 0.25);
        this.jumpLevel = HEIGHT - (HEIGHT * 0.6);
        this.tokenTime = false;
        this.rangeMin = false;

        this.obstScale = this.HEIGHT / (this.HEIGHT * 2.41);
        this.tokenScale = this.HEIGHT / (this.HEIGHT * 2.6);
        this.ironRandScale = (this.playerBaseY / 2 + this.HEIGHT * 0.135) - (this.playerBaseY / 2 + this.HEIGHT * 0.4) + 1;
        this.ironRandAdd = this.playerBaseY / 2 + this.HEIGHT * 0.32;

        let rand = Math.floor(Math.random() * (10 - 5)) + 4;
        setTimeout(this.setTokenTimer.bind(this), this.interval * rand);
    }

    buildObstacles(xOffset, posy, spriteName) {
        var obstacle = new PIXI.AnimatedSprite(this.app.loader.resources.obSheet.spritesheet.animations[spriteName]);

        obstacle.anchor.set(0.5);
        obstacle.scale.set(this.obstScale);
        //the laundry sprite doesn't line up well with the washer one, so offset it a bit
        if (spriteName == "laundrySprite") obstacle.anchor.set(0.5, 0.438);

        obstacle.x = this.app.renderer.width;
        obstacle.x += xOffset;
        obstacle.y = posy;
        //console.log(obstacle.getBounds());

        //Calculate hit boxes based on which sprite is spawned
        if (spriteName == "washerSprite") obstacle.hitArea = new PIXI.Rectangle(obstacle.x - 33, obstacle.y - 30, 55, 42);
        else if (spriteName == "laundrySprite") obstacle.hitArea = new PIXI.Rectangle(obstacle.x - 32, obstacle.y, 54, 42);
        else if (spriteName == "ironSprite") obstacle.hitArea = new PIXI.Rectangle(obstacle.x - 35, obstacle.y - 25, 63, 16);
        else obstacle.hitArea = new PIXI.Rectangle(obstacle.x, obstacle.y, 0, 0);
        //console.log(obstacle.hitArea.y);

        obstacle.calculateBounds();
        //console.log(obstacle.getBounds());

        obstacle.animationSpeed = .125;
        obstacle.play()
        this.app.stage.addChild(obstacle);
        this.obstacles.push(obstacle);

    }

    buildToken() {
        var token = new PIXI.AnimatedSprite(this.app.loader.resources.tokenSheet.spritesheet.animations["tokenSprite"]);

        token.anchor.set(0.5);
        token.scale.set(this.tokenScale);
        const rand = Math.floor(Math.random() * 6);
        if (rand % 3 == 0) token.y = this.jumpLevel;
        else token.y = this.walkingLevel;
        token.x = this.app.renderer.width;

        token.hitArea = new PIXI.Rectangle(token.x - 19, token.y - 20, 38, 40);

        token.animationSpeed = 0.135;
        token.play();
        this.app.stage.addChild(token);

        this.tokens.push(token);
    }

    decreaseInterval() {
        //intDecAmt is the factor you decrease the increment by
        this.intRangeMax *= this.intDecAmt;
        this.intRangeMin *= this.intDecAmt;

        //smallestInt is the smallest the interval will ever get
        if (this.intRangeMin <= this.smallestInt) {
            this.intRangeMin = this.smallestInt;
            this.rangeMin = true;
        }
    }

    randomizeInterval() {
        return (Math.floor(Math.random() * (this.intRangeMax - this.intRangeMin + 1)) + this.intRangeMin);
    }

    setTokenTimer() {
        this.tokenTime = true;
    }

    spawn() {
        if (!this.gameOver) {
            if (this.firstSpawn) {
                this.startTime = performance.now();
                this.firstSpawn = false;
            }
            //first check if it's time to spawn in a token :D
            if (this.tokenTime) {
                this.buildToken();
                setTimeout(this.spawn.bind(this), this.interval);
                let rand = Math.floor(Math.random() * (10 - 5)) + 4;
                setTimeout(this.setTokenTimer.bind(this), this.interval * rand);
                this.tokenTime = false;
                return;
            }

            //otherwise we're building a normal obstacle
            //get the name of the obstacle
            const obstName = this.chooseSprite();

            if (obstName === "double") {
                this.spawnDouble();
            } else if (obstName == "ironSprite") {
                this.spawnIron();
            } else {
                this.buildObstacles(0, this.walkingLevel, obstName);
            }

            this.interval = this.randomizeInterval();

            //call the next spawn obstacle, with a delay of interval
            if (!this.gameOver)
                setTimeout(this.spawn.bind(this), this.interval);
        }
    }

    spawnIron() {
        //randomly pick if the irons will spawn in a V formation or not
        const pattern = Math.floor(Math.random() * 2);
        if (pattern === 0) { //Irons spawn in pattern
            this.buildObstacles(100, this.playerBaseY / 2 - this.HEIGHT * 0.05, "ironSprite");
            this.buildObstacles(0, this.playerBaseY / 2 + this.HEIGHT * 0.1, "ironSprite");
            this.buildObstacles(85, this.playerBaseY / 2 + this.HEIGHT * 0.2, "ironSprite");
        }
        else { //Irons spawn between range that can be jumped over or ducked under
            let yPos = Math.floor(Math.random() * this.ironRandScale) + this.ironRandAdd;
            this.buildObstacles(0, yPos, "ironSprite");
        }
    }

    spawnDouble() {
        const rand = Math.floor(Math.random() * 6);
        let nameLeft, nameRight;

        if (rand % 2 == 0) {
            nameLeft = "washerSprite";
            nameRight = "laundrySprite";
        } else if (rand % 5 == 0) {
            nameLeft = "washerSprite";
            nameRight = "washerSprite";
        } else {
            nameLeft = "laundrySprite";
            nameRight = "washerSprite";
        }
        this.buildObstacles(0, this.walkingLevel, nameLeft);
        this.buildObstacles((this.WIDTH * 0.065), this.walkingLevel, nameRight);
    }

    chooseSprite() {
        let currTime = performance.now() - this.startTime;
        const rand = Math.floor(Math.random() * 25); //set equal to 8 to spawn irons only
        const switchDifficulty = 60000;

        //%3 is more frequent, so after set time (here, 1 minute) switch so that the harder thing (combined sprites) spawns more frequently
        if (rand % 3 == 0) {
            if (currTime > switchDifficulty) return "double";
            return "laundrySprite";
        } else if (rand % 5 == 0) {
            if (currTime > switchDifficulty) return "laundrySprite";
            return "double";
        } else if (currTime >= 20000 && rand % 8 == 0) {
            return "ironSprite";
        }
        else {
            return "washerSprite";
        }
    }

    endGame() {
        this.gameOver = true;
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].stop();
        }
    }

    collectToken(index) {
        this.app.stage.removeChild(this.tokens[index]);
        this.tokens.splice(index, 1);
    }
}