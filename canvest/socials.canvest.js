import * as PIXI from 'pixi.js';
import socials from '../js/socials.js';

describe('HELLO spawner endGame tests', async () => {
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

        setTimeout(() => {
            done();
        }, 300);
    });


    it('should bring divs on screen for large screens', async () => {
        socials.smallScreen = false;
        socials.adBlock = false;
        socials.endGame();
        expect(spawner.socialsDiv.left).to.be.above(0);

        socials.resetGame();
        socials.smallScreen = false;
        socials.adBlock = true;
        socials.endGame();
        expect(spawner.backupSocialsDiv.left).to.be.above(0);
    });

    it('should bring divs on screen for small screens', async () => {
        socials.smallScreen = true;
        socials.adBlock = false;
        socials.endGame();
        expect(spawner.smallScreenDiv.left).to.be.above(0);

        socials.resetGame();
        socials.smallScreen = true;
        socials.adBlock = true;
        socials.endGame();
        expect(spawner.smallScreenDiv.left).to.be.above(0);
    });

});