import * as PIXI from 'pixi.js';
import Player from '../js/player.js';

describe('spawner updateJump tests', async () => {
    let player;
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

        window.inputs = {
            jump: false,
            duck: false,
            prevDuck: false
        };

        app.loader
            .add('charaSheet', "sprites/charaSpriteSheet.json")
            .add('jumpSound', "sounds/jump.wav");

        app.loader
            .load((loader, resources) => {
                jumpS = PIXI.sound.Sound.from(resources.jumpSound);
                jumpS.volume = 0.4;
                player = new Player(app, jumpS);
            });

        setTimeout(() => {
            done();
        }, 300);
    });


    it('should only switch to jump sprite when allowed', async () => {
        player.currSprite = player.running;
        player.currSprite.y = player.groundLevel;
        window.inputs.duck = false;
        window.inputs.jump = true;
        player.updateJump();

        expect(player.currSprite.texture).to.eql(player.jumpStatic.texture);

    });
});
