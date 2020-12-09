export default class Spawner {
    constructor(app, player) {
        this.app = app;

        this.interval = 1100;
        this.intDecAmt = 0.85;
        this.intRangeMax = 2500;
        this.intRangeMin = 1100;
        this.smallestInt = 200;
        this.switchDifficulty = 60000;
        this.ironTime = 20000;

        this.firstSpawn = true;

        this.obstacles = [];
        this.tokens = [];
        this.tokenAmt = 0;


        this.player = player;
        this.gameOver = false;
        this.focus = true;

        this.walkingLevel = HEIGHT - (HEIGHT * 0.25);
        this.jumpLevel = HEIGHT - (HEIGHT * 0.6);
        this.tokenTime = false;
        this.rangeMin = false;

        this.obstScale = SCALE * 1 / 2.41;
        this.tokenScale = SCALE * 1 / 2.6;
        this.ironRandScale = (window.groundLevel / 2 + HEIGHT * 0.135) - (window.groundLevel / 2 + HEIGHT * 0.4) + 1;
        this.ironRandAdd = window.groundLevel / 2 + HEIGHT * 0.32;

        let rand = Math.floor(Math.random() * (10 - 5)) + 4;
        setTimeout(this.setTokenTimer.bind(this), this.interval * rand);
    }

    buildObstacles(xOffset, posy, spriteName) {
        let obstacle;
        try {
            obstacle = new PIXI.AnimatedSprite(this.app.loader.resources.obSheet.spritesheet.animations[spriteName]);
        } catch (error) { console.log("unable to create sprite with name " + spriteName); }

        if (typeof obstacle !== 'undefined' && obstacle !== undefined) {
            obstacle.anchor.set(0.5);
            obstacle.scale.set(this.obstScale);
            //ensure irons are always rendered on top of the player
            if (spriteName == "ironSprite") obstacle.zIndex = 5;
            //the laundry sprite doesn't line up well with the washer one, so offset it a bit
            if (spriteName == "laundrySprite") obstacle.anchor.set(0.5, 0.438);

            obstacle.x = WIDTH * 1.1;
            obstacle.x += xOffset;
            obstacle.y = posy;
            obstacle.zIndex = 3
            //console.log(obstacle.getBounds());

            //Calculate hit boxes based on which sprite is spawned
            if (spriteName == "washerSprite") obstacle.hitArea = new PIXI.Rectangle(obstacle.x - (obstacle.width * 0.40), obstacle.y - (obstacle.height * 0.38), obstacle.width * .7, obstacle.height * .53);
            else if (spriteName == "laundrySprite") obstacle.hitArea = new PIXI.Rectangle(obstacle.x - obstacle.width * 0.40, obstacle.y - (obstacle.height * 0.01), obstacle.width * 0.68, obstacle.height * 0.53);
            else if (spriteName == "ironSprite") obstacle.hitArea = new PIXI.Rectangle(obstacle.x - (obstacle.width * 0.44), obstacle.y - (obstacle.height * 0.29), obstacle.width * 0.8, obstacle.height * 0.4);
            else obstacle.hitArea = new PIXI.Rectangle(obstacle.x, obstacle.y, 0, 0);
            //console.log(obstacle.hitArea.y);

            obstacle.calculateBounds();
            //console.log(obstacle.getBounds());

            obstacle.animationSpeed = .125;
            obstacle.play();
            container.addChild(obstacle);
            this.obstacles.push(obstacle);
        }
    }

    moveSprites() {
        for (var i = 0; i < this.obstacles.length; i++) {
            const xBox = this.obstacles[i].getBounds().x + this.obstacles[i].getBounds().width;
            this.obstacles[i].x -= SCALE * 3.5 * speedScale * FPSSCALE;
            this.obstacles[i].hitArea.x -= SCALE * 3.5 * speedScale * FPSSCALE;;

            //check collision
            if (checkCollision(this.player.currSprite, this.obstacles[i])) {
                //lose = true;
               // endGame();
            }

            //remove box if it's offscreen
            if (xBox <= 0) {
                container.removeChild(this.obstacles[i]);
                this.obstacles.shift();
                i--;
            }
        }

        for (var i = 0; i < this.tokens.length; i++) {
            const xBox = this.tokens[i].getBounds().x + this.tokens[i].getBounds().width;
            this.tokens[i].x -= SCALE * 3.5 * speedScale * FPSSCALE;
            this.tokens[i].hitArea.x -= SCALE * 3.5 * speedScale * FPSSCALE;

            if (checkCollision(this.player.currSprite, this.tokens[i]))
                this.collectToken(i);

            if (xBox <= 0) {
                container.removeChild(this.tokens[i]);
                this.tokens.shift();
                i--;
            }
        }
    }

    buildToken() {
        var token = new PIXI.AnimatedSprite(this.app.loader.resources.tokenSheet.spritesheet.animations["tokenSprite"]);

        token.anchor.set(0.5);
        token.scale.set(this.tokenScale);
        const rand = Math.floor(Math.random() * 6);
        if (rand % 3 == 0) token.y = this.jumpLevel;
        else token.y = this.walkingLevel;
        token.x = WIDTH * 1.1;
        token.zIndex = 3;

        token.hitArea = new PIXI.Rectangle(token.x - (token.width * 0.25), token.y - (token.height * 0.28), token.width * 0.52, token.height * 0.55);

        token.animationSpeed = 0.135;
        token.play();
        container.addChild(token);

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
            if (this.tokenTime && this.tokenAmt < 15) {
                let rand = Math.floor(Math.random() * (10 - 5)) + 4;
                if (!this.firstSpawn && (performance.now() - this.startTime >= 15000)) {
                    if (this.focus) this.buildToken();
                    setTimeout(this.spawn.bind(this), this.interval * 0.5);
                    setTimeout(this.setTokenTimer.bind(this), this.interval * rand * 1.5);
                    clearTimeout(this.tokenTimeoutHold);
                    this.tokenTime = false;
                    this.tokenAmt++;
                    return;
                }
                else {
                    clearTimeout(this.tokenTimeoutHold);
                    this.tokenTimeoutHold = setTimeout(this.setTokenTimer.bind(this), this.interval * rand * 1.5);
                }
            }

            //otherwise we're building a normal obstacle
            //get the name of the obstacle
            const obstName = this.chooseSprite();

            if (this.focus) {
                if (obstName === "double") {
                    this.spawnDouble();
                } else if (obstName == "ironSprite") {
                    this.spawnIron();
                } else {
                    this.buildObstacles(0, this.walkingLevel, obstName);
                }
            }

            this.interval = this.randomizeInterval();

            //call the next spawn obstacle, with a delay of interval
            if (!this.gameOver)
                this.spawnTimeout = setTimeout(this.spawn.bind(this), this.interval);
        }
    }

    spawnIron() {
        //randomly pick if the irons will spawn in a V formation or not
        const pattern = Math.floor(Math.random() * 2);
        if (pattern === 0) { //Irons spawn in pattern
            this.buildObstacles(0 * SCALE, window.groundLevel / 2 + HEIGHT * 0.1, "ironSprite");
            this.buildObstacles(85 * SCALE, window.groundLevel / 2 + HEIGHT * 0.2, "ironSprite");
            this.buildObstacles(100 * SCALE, window.groundLevel / 2 - HEIGHT * 0.05, "ironSprite");
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
        this.buildObstacles((WIDTH * 0.065), this.walkingLevel, nameRight);
    }

    chooseSprite() {
        let currTime = performance.now() - this.startTime;
        const rand = Math.floor(Math.random() * 25); //set equal to 8 to spawn irons only

        // %3 is more frequent, so after set time (here, 1 minute) switch so that the harder thing (combined sprites) spawns more frequently
        if (rand % 3 == 0) {
            if (currTime > this.switchDifficulty) return "double";
            return "laundrySprite";
        } else if (rand % 5 == 0) {
            if (currTime > this.switchDifficulty) return "laundrySprite";
            return "double";
        } else if (currTime >= this.ironTime && rand % 8 == 0){
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
        for (let i = 0; i < this.tokens.length; i++) {
            this.tokens[i].stop();
        }
    }

    collectToken(index) {
        tokenS.play();
        score += 25;
        container.removeChild(this.tokens[index]);
        this.tokens.splice(index, 1);
    }

    loseFocus() {
        this.focus = false;
    }

    gainFocus() {
        this.focus = true;
    }
}
