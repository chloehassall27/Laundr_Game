import * as PIXI from 'pixi.js';
import Spawner from '../js/spawner.js';

describe('spawner setup test', () => {
    it('should build obstacles', async () => {
        //let canvas = document.getElementById('pixiCanvas');
        let spawner;

        const app = new PIXI.Application({
            width: 900, height: 225, backgroundColor: 0xF9F9F9, resolution: window.devicePixelRatio || 1, preserveDrawingBuffer: true
        });

        app.loader
            .add('obSheet', "sprites/obstacleSprites.json")
            .add('tokenSheet', "sprites/LaundrBombSprite.json");

        app.loader
            .load((loader, resources) => {
                spawner = new Spawner(app);
            });

        setTimeout(() => {
            spawner.buildObstacles(100, 100, "laundrySprite");
            var test = new PIXI.AnimatedSprite(this.app.loader.resources.obSheet.spritesheet.animations["laundrySprite"]);
            expect(spawner.obstacles[0].toBe(test));
        }, 300);

    })
})