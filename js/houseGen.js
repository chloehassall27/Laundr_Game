export default class Spawner {
    constructor(app) {
        this.app = app;
        this.spawn();

        this.houses = [];

        this.intRangeMax = 4000;
        this.intRangeMin = 1000;

        this.gameOver = false;
        this.focus = true;

        //Spawn one house on screen 
        this.buildHouse(this.chooseSprite());
        this.houses[0].x = Math.random() * 4 * WIDTH / 5;
    }

    buildHouse(spriteName) {
        let house = new PIXI.Sprite(this.app.loader.resources.houseSheet.spritesheet.textures[spriteName]);
        try {
            house = new PIXI.Sprite(this.app.loader.resources.houseSheet.spritesheet.textures[spriteName]);
        } catch (error) { console.log("unable to create house with name " + spriteName); }

        if (typeof house !== 'undefined' && house !== undefined) {
            house.anchor.set(0, 1);
            house.x = WIDTH;
            house.y = 4 * HEIGHT / 5;
            house.scale.set(1.9 * SCALE);
            house.zIndex = 0;

            container.addChild(house);
            this.houses.push(house);
        }
    }

    moveSprites() {
        for (var i = 0; i < this.houses.length; i++) {
            const xBox = this.houses[i].getBounds().x + this.houses[i].getBounds().width;
            this.houses[i].x -= SCALE * 1.28 * speedScale * FPSSCALE;

            if (xBox <= 0) {
                container.removeChild(this.houses[i]);
                this.houses.splice(i, 1);
                i--;
            }
        }
    }

    randomizeInterval() {
        return (Math.floor(Math.random() * (this.intRangeMax - this.intRangeMin + 1)) + this.intRangeMin);
    }

    spawn() {
        if (!this.gameOver) {
            if (this.focus && (this.houses.length == 0 || this.houses[this.houses.length - 1].x < WIDTH * 3 / 4) && (performance.now() - window.timeOffset) < window.winTime - 2200) {
                this.buildHouse(this.chooseSprite());
            }

            //call the next spawn obstacle, with a delay of interval
            this.timeout = setTimeout(this.spawn.bind(this), this.randomizeInterval());
        }
    }

    chooseSprite() {
        let rand = Math.floor(Math.random() * 4);
        if (rand == 0) {
            return "backgroundHouse0.png"
        } else if (rand == 1) {
            return "backgroundHouse1.png";
        } else if (rand == 2) {
            return "backgroundHouse2.png";
        }
        else {
            return "backgroundHouse3.png";
        }
    }

    loseFocus() {
        if (this.focus) {
            this.focus = false;
            clearTimeout(this.timeout);
        }
    }

    gainFocus() {
        if (!this.focus) {
            this.focus = true;
            this.timeout = setTimeout(this.spawn.bind(this), this.randomizeInterval());
        }
    }
}