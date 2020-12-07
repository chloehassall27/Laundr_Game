import * as PIXI from 'pixi.js';
import HouseGen from '../js/houseGen.js';

describe('houseGen buildHouse tests', async () => {
    let spawner;
    let app;

    before((done) => {
        app = new PIXI.Application({
            width: 900, height: 225, backgroundColor: 0xF9F9F9, resolution: window.devicePixelRatio || 1, preserveDrawingBuffer: true
        });

        window.HEIGHT = app.screen.height;
        window.WIDTH = app.screen.width;
        window.SCALE = HEIGHT / 225;
        window.RELSCALE = HEIGHT / 225;
        window.SCORE = 0;
        window.FPSSCALE = 144 / app.ticker.FPS;
        window.PIXI = PIXI;

        window.container = new PIXI.Container();
        app.stage.addChild(container);
        container.width = app.screen.width;
        container.height = app.screen.height;
        container.interactive = true;

        app.loader
            .add('houseSheet', "sprites/backgroundHouse.json");

        app.loader
            .load((loader, resources) => {
                window.houseGen = new HouseGen(app);

            });

        setTimeout(() => {
            done();
        }, 300);
    });

    it('should build houses with valid names', async () => {
        houseGen.houses = [];
        houseGen.buildHouse("backgroundHouse0.png");
        let test = new PIXI.Sprite(this.app.loader.resources.houseSheet.spritesheet.textures["backgroundHouse0.png"]);
        expect(houseGen.houses[0].texture).to.eql(test.texture);

        houseGen.houses = [];
        houseGen.buildHouse("backgroundHouse1.png");
        let test = new PIXI.Sprite(this.app.loader.resources.houseSheet.spritesheet.textures["backgroundHouse1.png"]);
        expect(houseGen.houses[0].texture).to.eql(test.texture);

        houseGen.houses = [];
        houseGen.buildHouse("backgroundHouse2.png");
        let test = new PIXI.Sprite(this.app.loader.resources.houseSheet.spritesheet.textures["backgroundHouse2.png"]);
        expect(houseGen.houses[0].texture).to.eql(test.texture);

        houseGen.houses = [];
        houseGen.buildHouse("backgroundHouse3.png");
        let test = new PIXI.Sprite(this.app.loader.resources.houseSheet.spritesheet.textures["backgroundHouse3.png"]);
        expect(houseGen.houses[0].texture).to.eql(test.texture);

    });

    it('should handle invalid sprite names', async () => {
        houseGen.houses = [];
        houseGen.buildHouse("test");
        expect(houseGen.houses.length).to.equal(0);

        houseGen.houses = [];
        houseGen.buildHouse("");
        expect(houseGen.houses.length).to.equal(0);

        houseGen.houses = [];
        houseGen.buildHouse(" ");
        expect(houseGen.houses.length).to.equal(0);
    });
});

describe('houseGen moveSprites tests', async () => {
    let spawner;
    let app;

    before((done) => {
        app = new PIXI.Application({
            width: 900, height: 225, backgroundColor: 0xF9F9F9, resolution: window.devicePixelRatio || 1, preserveDrawingBuffer: true
        });

        window.HEIGHT = app.screen.height;
        window.WIDTH = app.screen.width;
        window.SCALE = HEIGHT / 225;
        window.RELSCALE = HEIGHT / 225;
        window.SCORE = 0;
        window.FPSSCALE = 144 / app.ticker.FPS;
        window.PIXI = PIXI;

        window.container = new PIXI.Container();
        app.stage.addChild(container);
        container.width = app.screen.width;
        container.height = app.screen.height;
        container.interactive = true;

        app.loader
            .add('houseSheet', "sprites/backgroundHouse.json");

        app.loader
            .load((loader, resources) => {
                window.houseGen = new HouseGen(app);

            });

        setTimeout(() => {
            done();
        }, 300);
    });

    it('should move every sprite in house array to the left', async () => {
        houseGen.houses = [];
        houseGen.buildHouse("backgroundHouse2.png");
        houseGen.buildHouse("backgroundHouse2.png");
        houseGen.buildHouse("backgroundHouse2.png");

        expect(houseGen.houses[0].x).to.equal(WIDTH);
        expect(houseGen.houses[1].x).to.equal(WIDTH);
        expect(houseGen.houses[2].x).to.equal(WIDTH);

        houseGen.moveSprites();

        expect(houseGen.houses[0].x).to.be.below(WIDTH);
        expect(houseGen.houses[1].x).to.be.below(WIDTH);
        expect(houseGen.houses[2].x).to.be.below(WIDTH);
    });
});

describe('houseGen spawn tests', async () => {
    let spawner;
    let app;

    before((done) => {
        app = new PIXI.Application({
            width: 900, height: 225, backgroundColor: 0xF9F9F9, resolution: window.devicePixelRatio || 1, preserveDrawingBuffer: true
        });

        window.HEIGHT = app.screen.height;
        window.WIDTH = app.screen.width;
        window.SCALE = HEIGHT / 225;
        window.RELSCALE = HEIGHT / 225;
        window.SCORE = 0;
        window.FPSSCALE = 144 / app.ticker.FPS;
        window.PIXI = PIXI;

        window.container = new PIXI.Container();
        app.stage.addChild(container);
        container.width = app.screen.width;
        container.height = app.screen.height;
        container.interactive = true;

        app.loader
            .add('houseSheet', "sprites/backgroundHouse.json");

        app.loader
            .load((loader, resources) => {
                window.houseGen = new HouseGen(app);

            });

        setTimeout(() => {
            done();
        }, 300);
    });

    it('should do nothing when gameover', async () => {
        houseGen.houses = [];
        houseGen.gameOver = true;
        houseGen.spawn();

        expect(houseGen.houses.length).to.equal(0);

    });

    it('should create house when not gameover', async () => {
        houseGen.houses = [];
        houseGen.gameOver = false;
        houseGen.spawn();

        expect(houseGen.houses.length).to.equal(1);

    });

    it('should set timeout after creating house', async () => {
        houseGen.houses = [];
        houseGen.gameOver = false;
        houseGen.timeout = null;
        houseGen.spawn();

        expect(houseGen.timeout).to.not.equal(null);
    });
});

describe('houseGen chooseSprite tests', async () => {
    let spawner;
    let app;

    before((done) => {
        app = new PIXI.Application({
            width: 900, height: 225, backgroundColor: 0xF9F9F9, resolution: window.devicePixelRatio || 1, preserveDrawingBuffer: true
        });

        window.HEIGHT = app.screen.height;
        window.WIDTH = app.screen.width;
        window.SCALE = HEIGHT / 225;
        window.RELSCALE = HEIGHT / 225;
        window.SCORE = 0;
        window.FPSSCALE = 144 / app.ticker.FPS;
        window.PIXI = PIXI;

        window.container = new PIXI.Container();
        app.stage.addChild(container);
        container.width = app.screen.width;
        container.height = app.screen.height;
        container.interactive = true;

        app.loader
            .add('houseSheet', "sprites/backgroundHouse.json");

        app.loader
            .load((loader, resources) => {
                window.houseGen = new HouseGen(app);

            });

        setTimeout(() => {
            done();
        }, 300);
    });

    it('should always return a valid sprite name', async () => {
        houseGen.houses = [];
        houseGen.chooseSprite();
        let working = true;

        for (let i = 0; i < 50; i++) {
            let name = houseGen.chooseSprite();
            if (name === "backgroundHouse0.png" || name === "backgroundHouse1.png" || name === "backgroundHouse2.png" || name === "backgroundHouse4.png") {
                //we good
            } else {
                working = false;
            }
        }

        expect(working).to.equal(true);
    });
});

describe('houseGen loseFocus tests', async () => {
    let spawner;
    let app;

    before((done) => {
        app = new PIXI.Application({
            width: 900, height: 225, backgroundColor: 0xF9F9F9, resolution: window.devicePixelRatio || 1, preserveDrawingBuffer: true
        });

        window.HEIGHT = app.screen.height;
        window.WIDTH = app.screen.width;
        window.SCALE = HEIGHT / 225;
        window.RELSCALE = HEIGHT / 225;
        window.SCORE = 0;
        window.FPSSCALE = 144 / app.ticker.FPS;
        window.PIXI = PIXI;

        window.container = new PIXI.Container();
        app.stage.addChild(container);
        container.width = app.screen.width;
        container.height = app.screen.height;
        container.interactive = true;

        app.loader
            .add('houseSheet', "sprites/backgroundHouse.json");

        app.loader
            .load((loader, resources) => {
                window.houseGen = new HouseGen(app);

            });

        setTimeout(() => {
            done();
        }, 300);
    });

    it('should switch focus variable to false', async () => {
        houseGen.focus = true;
        houseGen.loseFocus();

        expect(houseGen.focus).to.equal(false);
    });

    it('should clear timeout', async () => {
        houseGen.focus = true;
        houseGen.loseFocus();

        expect(houseGen.timeout).to.equal(null);
    });
});

describe('houseGen gainFocus tests', async () => {
    let spawner;
    let app;

    before((done) => {
        app = new PIXI.Application({
            width: 900, height: 225, backgroundColor: 0xF9F9F9, resolution: window.devicePixelRatio || 1, preserveDrawingBuffer: true
        });

        window.HEIGHT = app.screen.height;
        window.WIDTH = app.screen.width;
        window.SCALE = HEIGHT / 225;
        window.RELSCALE = HEIGHT / 225;
        window.SCORE = 0;
        window.FPSSCALE = 144 / app.ticker.FPS;
        window.PIXI = PIXI;

        window.container = new PIXI.Container();
        app.stage.addChild(container);
        container.width = app.screen.width;
        container.height = app.screen.height;
        container.interactive = true;

        app.loader
            .add('houseSheet', "sprites/backgroundHouse.json");

        app.loader
            .load((loader, resources) => {
                window.houseGen = new HouseGen(app);

            });

        setTimeout(() => {
            done();
        }, 300);
    });

    it('should switch focus variable to true', async () => {
        houseGen.focus = false;
        houseGen.gainFocus();

        expect(houseGen.focus).to.equal(true);
    });

    it('should set timeout', async () => {
        houseGen.focus = false;
        houseGen.gainFocus();

        expect(houseGen.timeout).to.not.equal(null);
    });
});