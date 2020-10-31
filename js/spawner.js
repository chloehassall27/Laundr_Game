export default class Spawner {
    interval = 1500;
    intDecAmt = 0.9;
    intRangeMax = 3000;
    intRangeMin = 1500;
    smallestInt = 500;
    rangeMin;
    tokenTime;
    washerSprite;
    laundrySprite;
    ironSprite;
    tokenSprite;

    app;
    HEIGHT;
    WIDTH;
    walkingLevel;
    jumpLevel;
    test;

    obstacles = [];
    tokens = [];

    gameOver = false;


    constructor(HEIGHT, WIDTH, app, washerSpr, laundrySpr, ironSpr, tokenSpr) {
        this.app = app;
        this.HEIGHT = HEIGHT;
        this.WIDTH = WIDTH;
        this.washerSprite = washerSpr;
        this.laundrySprite = laundrySpr;
        this.ironSprite = ironSpr;
        this.tokenSprite = tokenSpr;

        this.walkingLevel = HEIGHT - (HEIGHT * 0.16)
        this.jumpLevel = this.walkingLevel - 100;
        this.tokenTime = false;
        this.rangeMin = false;

        let rand = Math.floor(Math.random() * (10 - 5)) + 4;
        setTimeout(this.setTokenTimer.bind(this), this.interval * rand);
    }

    buildObstacles(xOffset, posy, spriteName) {
        var obstacle = new PIXI.AnimatedSprite(this.app.loader.resources.obSheet.spritesheet.animations[spriteName]);

        obstacle.anchor.set(0.5);
        obstacle.scale.set(0.5);
        //the laundry sprite doesn't line up well with the washer one, so offset it a bit
        if (spriteName == "laundrySprite") obstacle.anchor.set(0.5, 0.438);

        obstacle.x = this.app.renderer.width;
        obstacle.x += xOffset;
        obstacle.y = posy;
        console.log(obstacle.getBounds());

        obstacle.calculateBounds();
        console.log(obstacle.getBounds());

        obstacle.animationSpeed = .125;
        obstacle.play()
        this.app.stage.addChild(obstacle);
        this.obstacles.push(obstacle);


        console.log(this.obstacles);
    }

    buildToken() {
        var token = new PIXI.AnimatedSprite(this.tokenSprite);

        token.anchor.set(0.5);
        token.scale.set(0.35);
        const rand = Math.floor(Math.random() * 6);
        if (rand % 3 == 0) token.y = this.jumpLevel;
        else token.y = this.walkingLevel;
        token.x = this.app.renderer.width;

        token.animationSpeed = 0.125;
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
        //first check if it's time to spawn in a token :D
        if (this.tokenTime && !this.gameOver) {
            console.log("token!");
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

    spawnIron() {
        //randomly choose the height (walk under, or duck under?)
        //include that as the y offset in buildObstacle
        const walkOrDuck = Math.floor(Math.random() * 2);
        let yPos;
        if (walkOrDuck === 0) {
            yPos = this.app.renderer.height / 2; //Walk
        }
        else {
            yPos = this.app.renderer.height / 2 + 100; //Duck
        }

        this.buildObstacles(0, yPos, "ironSprite");
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
        this.buildObstacles(80, this.walkingLevel, nameRight);
    }

    chooseSprite() {
        let currTime = performance.now();
        const rand = Math.floor(Math.random() * 25); //set equal to 8 to spawn irons only
        const switchDifficulty = 60000;

        //%3 is more frequent, so after set time (here, 1 minute) switch so that the harder thing (combined sprites) spawns more frequently
        if (rand % 3 == 0) {
            if (currTime > switchDifficulty) return "double";
            return "laundrySprite";
        } else if (rand % 5 == 0) {
            if (currTime > switchDifficulty) return "laundrySprite";
            return "double";
        } else if (rand % 8 == 0) { //IDK if 8 is the best number, but we can change this when we tweak difficulty later!
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