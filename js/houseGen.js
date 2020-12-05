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
        var firstHouse = new PIXI.Sprite(this.app.loader.resources.houseSheet.spritesheet.textures[this.chooseSprite()]);

        firstHouse.anchor.set(0, 1);
        firstHouse.x = Math.random() * 4 *WIDTH/5;
        firstHouse.y = 4 * HEIGHT / 5;
        firstHouse.scale.set(1.7 * SCALE);
        // console.log(1.7 * SCALE)
        firstHouse.zIndex = 0;
        
        container.addChild(firstHouse);
        this.houses.push(firstHouse);
    }

    buildHouse(spriteName) {
        var house = new PIXI.Sprite(this.app.loader.resources.houseSheet.spritesheet.textures[spriteName]);

        house.anchor.set(0, 1);
        house.x = WIDTH;
        house.y = 4 * HEIGHT / 5;
        house.scale.set(1.7 * SCALE);
        house.zIndex = 0;
        
        container.addChild(house);
        this.houses.push(house);

    }

    randomizeInterval() {
        return (Math.floor(Math.random() * (this.intRangeMax - this.intRangeMin + 1)) + this.intRangeMin);
    }

    spawn() {
        if (!this.gameOver) {
            if (this.focus) {
                this.buildHouse(this.chooseSprite());
            }

            //call the next spawn obstacle, with a delay of interval
            setTimeout(this.spawn.bind(this), this.randomizeInterval());
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
        this.focus = false;
    }

    gainFocus() {
        this.focus = true;
    }
}