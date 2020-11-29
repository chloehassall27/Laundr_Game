import * as PIXI from 'pixi.js';
import Spawner from '../js/spawner.js';

describe('spawner buildObstacles tests', async () => {
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
        window.PIXI = PIXI;

        window.container = new PIXI.Container();
        app.stage.addChild(container);
        container.width = app.screen.width;
        container.height = app.screen.height;
        container.interactive = true;

        app.loader
            .add('obSheet', "sprites/obstacleSprites.json")
            .add('tokenSheet', "sprites/LaundrBombSprite.json");

        app.loader
            .load((loader, resources) => {
                spawner = new Spawner(app);
            });

        setTimeout(() => {
            done();
        }, 300);
    });


    it('should build valid obstacles', async () => {
        spawner.obstacles = [];
        spawner.buildObstacles(0, 0, "laundrySprite");
        let test = new PIXI.AnimatedSprite(app.loader.resources.obSheet.spritesheet.animations["laundrySprite"]);
        expect(spawner.obstacles[0].texture).to.eql(test.texture);

        spawner.obstacles = [];
        spawner.buildObstacles(0, 0, "ironSprite");
        test = new PIXI.AnimatedSprite(app.loader.resources.obSheet.spritesheet.animations["ironSprite"]);
        expect(spawner.obstacles[0].texture).to.eql(test.texture);

        spawner.obstacles = [];
        spawner.buildObstacles(0, 0, "washerSprite");
        test = new PIXI.AnimatedSprite(app.loader.resources.obSheet.spritesheet.animations["washerSprite"]);
        expect(spawner.obstacles[0].texture).to.eql(test.texture);

    });

    it('should handle invalid sprite names', async () => {

        spawner.obstacles = [];
        spawner.buildObstacles(0, 0, "test");
        await expect(spawner.obstacles.length).to.equal(0);

        spawner.obstacles = [];
        spawner.buildObstacles(0, 0, "");
        expect(spawner.obstacles.length).to.equal(0);

        spawner.obstacles = [];
        spawner.buildObstacles(0, 0, " ");
        expect(spawner.obstacles.length).to.equal(0);
    });
})