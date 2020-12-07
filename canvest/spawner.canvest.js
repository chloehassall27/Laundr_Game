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
        window.FPSSCALE = 144 / app.ticker.FPS;
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
        expect(spawner.obstacles.length).to.equal(0);

        spawner.obstacles = [];
        spawner.buildObstacles(0, 0, "");
        expect(spawner.obstacles.length).to.equal(0);

        spawner.obstacles = [];
        spawner.buildObstacles(0, 0, " ");
        expect(spawner.obstacles.length).to.equal(0);
    });

    it('should use x offset appropriately', async () => {
        spawner.obstacles = [];
        spawner.buildObstacles(100, 0, "washerSprite");

        let xexpected = WIDTH * 1.1 + 100;
        expect(spawner.obstacles[0].x).to.equal(xexpected);
    });

    it('should use y position appropriately', async () => {
        spawner.obstacles = [];
        spawner.buildObstacles(0, 100, "washerSprite");

        let yexpected = 100;
        expect(spawner.obstacles[0].y).to.equal(yexpected);
    });

    it('should set a non-null hitArea', async () => {
        spawner.obstacles = [];
        spawner.buildObstacles(0, 100, "washerSprite");

        expect(spawner.obstacles[0].hitArea).not.be.equal(null);
    });
});

describe('spawner buildToken tests', async () => {
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


    it('should build valid tokens', async () => {
        spawner.tokens = [];
        spawner.buildToken();
        let test = new PIXI.AnimatedSprite(app.loader.resources.tokenSheet.spritesheet.animations["tokenSprite"]);
        expect(spawner.tokens[0].texture).to.eql(test.texture);
    });

    it('should occassionally spawn tokens at jump level', async () => {
        spawner.tokens = [];
        let jumpLvl = false;
        for (let i = 0; i < 50; i++) {
            spawner.buildToken();
            if (spawner.tokens[i].y === spawner.jumpLevel) jumpLvl = true;
        }

        expect(jumpLvl).to.equal(true);
    });
});

describe('spawner decreaseInterval tests', async () => {
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


    it('should decrease both interval range caps', async () => {
        let beforeMax = spawner.intRangeMax;
        let beforeMin = spawner.intRangeMin;

        spawner.decreaseInterval();
        let afterMax = spawner.intRangeMax;
        let afterMin = spawner.intRangeMin;

        expect(beforeMax).to.be.above(afterMax);
        expect(beforeMin).to.be.above(afterMin);
    });

    it('should always keep interval above absolute minimum', async () => {
        spawner.intRangeMin = -2;
        spawner.decreaseInterval();

        expect(spawner.intRangeMin).to.equal(spawner.smallestInt);
    });
});

describe('spawner randomizeInterval tests', async () => {
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


    it('should return a value between both interval range caps', async () => {
        let beforeMax = spawner.intRangeMax;
        let beforeMin = spawner.intRangeMin;

        let interval = spawner.randomizeInterval();

        expect(beforeMax).to.be.above(interval);
        expect(beforeMin).to.be.below(interval);
    });

});

describe('spawner setTokenTimer tests', async () => {
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


    it('should set true on true', async () => {
        spawner.tokenTime = true;
        spawner.setTokenTimer();

        expect(spawner.tokenTime).to.equal(true);
    });

    it('should set true on false', async () => {
        spawner.tokenTime = false;
        spawner.setTokenTimer();

        expect(spawner.tokenTime).to.equal(true);
    });
});

describe('spawner spawn tests', async () => {
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


    it('should do nothing on game over', async () => {
        spawner.obstacles = [];

        spawner.gameOver = true;
        spawner.spawn();

        expect(spawner.obstacles.length).to.equal(0);
    });

    it('should set start time only on first call', async () => {
        spawner.gameOver = false;

        spawner.firstSpawn = true;
        spawner.startTime = 0;
        spawner.spawn();

        expect(spawner.firstSpawn).to.equal(false);
        expect(spawner.startTime).to.be.above(0);

        spawner.gameOver = false;

        spawner.firstSpawn = false;
        spawner.startTime = 0;
        spawner.spawn();

        expect(spawner.firstSpawn).to.equal(false);
        expect(spawner.startTime).to.equal(0);
    });

    it('should spawn a token and not an obstacle when told to', async () => {
        spawner.obstacles = [];
        spawner.tokens = [];
        spawner.tokenTime = true;
        spawner.gameOver = false;
        spawner.startTime = -15000;

        spawner.spawn();

        expect(spawner.obstacles.length).to.equal(0);
        expect(spawner.tokens.length).to.equal(1);
    });

    it('should spawn an obstacle and not a token otherwise', async () => {
        spawner.obstacles = [];
        spawner.tokens = [];
        spawner.tokenTime = false;

        spawner.spawn();

        expect(spawner.obstacles.length).to.be.above(0);
        expect(spawner.tokens.length).to.equal(0);
    });

    it('should not spawn a token at the start of the game', async () => {
        spawner.tokens = [];
        spawner.tokenTime = true;
        spawner.gameOver = false;
        spawner.startTime = 10000;

        spawner.spawn();

        expect(spawner.tokens.length).to.equal(0);
    });

    it('should reset the spawn timeout only when game is not over', async () => {
        spawner.gameOver = false;
        spawner.spawnTimeout = null;

        spawner.spawn();
        expect(spawner.spawnTimeout).to.not.equal(null);

        spawner.gameOver = true;
        spawner.spawnTimeout = null;

        spawner.spawn();
        expect(spawner.spawnTimeout).to.equal(null);
    });
});

describe('spawner spawnIron tests', async () => {
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


    it('should randomly choose between single or triple formation', async () => {
        let spawnsTriple = false;
        let spawnsSingle = false;

        for (let i = 0; i < 10; i++) {
            spawner.obstacles = [];
            spawner.spawnIron();

            if (spawner.obstacles.length === 3) spawnsTriple = true;
            else if (spawner.obstacles.length === 1) spawnsSingle = true;
            else {
                spawnsSingle = false;
                spawnsTriple = false;
            }
        }

        expect(spawnsTriple).to.equal(true);
        expect(spawnsSingle).to.equal(true);
    });

    it('should set positon offsets for triple formation', async () => {
        for (let i = 0; i < 10; i++) {
            spawner.obstacles = [];
            spawner.spawnIron();

            if (spawner.obstacles.length === 3) {
                break;
            }
        }

        expect(spawner.obstacles[0].x).to.not.equal(spawner.obstacles[1].x);
        expect(spawner.obstacles[0].x).to.not.equal(spawner.obstacles[2].x);
        expect(spawner.obstacles[1].x).to.not.equal(spawner.obstacles[2].x);

        expect(spawner.obstacles[0].y).to.not.equal(spawner.obstacles[1].y);
        expect(spawner.obstacles[0].y).to.not.equal(spawner.obstacles[2].y);
        expect(spawner.obstacles[1].y).to.not.equal(spawner.obstacles[2].y);
    });

});

describe('spawner spawnDouble tests', async () => {
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


    it('should always spawn two obstacles at once', async () => {
        for (let i = 0; i < 10; i++) {
            spawner.obstacles = []
            spawner.spawnDouble();

            expect(spawner.obstacles.length).to.equal(2);
        }
    });

    it('should spawn with an x offset for one of the pair', async () => {
        spawner.obstacles = [];
        spawner.spawnDouble();

        expect(spawner.obstacles[0].x).to.not.equal(spawner.obstacles[1].x);
    });
});

describe('spawner chooseSprite tests', async () => {
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


    it('should only be able to choose irons after game has been ongoing for awhile', async () => {
        spawner.obstacles = []
        spawner.ironTime = -100;
        spawner.startTime = 0;
        let ironSpawned = false;
        for (let i = 0; i < 100; i++) {
            let returnVal = spawner.chooseSprite();
            if (returnVal === 'ironSprite') ironSpawned = true;
        }
        expect(ironSpawned).to.equal(true);

        spawner.obstacles = []
        spawner.ironTime = 100000;
        ironSpawned = false;
        for (let i = 0; i < 100; i++) {
            let returnVal = spawner.chooseSprite();
            if (returnVal === 'ironSprite') ironSpawned = true;
        }
        expect(ironSpawned).to.equal(false);
    });
});

describe('spawner endGame tests', async () => {
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


    it('should always set gameOver variable to true', async () => {
        spawner.gameOver = true;
        spawner.endGame();
        expect(spawner.gameOver).to.equal(true);

        spawner.gameOver = false;
        spawner.endGame();
        expect(spawner.gameOver).to.equal(true);
    });

    it('should stop all sprite animations', async () => {
        spawner.obstacles = [];
        spawner.gameOver = false;
        spawner.buildObstacles(0, 0, "washerSprite");
        spawner.endGame();
        expect(spawner.obstacles[0].playing).to.equal(false);

        spawner.tokens = [];
        spawner.gameOver = false;
        spawner.buildToken();
        spawner.endGame();
        expect(spawner.tokens[0].playing).to.equal(false);
    });
});

describe('spawner collectToken tests', async () => {
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
        window.score = 0;

        app.loader
            .add('tokenSound', "sounds/jelly2.wav")
            .add('obSheet', "sprites/obstacleSprites.json")
            .add('tokenSheet', "sprites/LaundrBombSprite.json");

        app.loader
            .load((loader, resources) => {
                window.tokenS = PIXI.sound.Sound.from(resources.tokenSound);
                spawner = new Spawner(app);
            });

        setTimeout(() => {
            done();
        }, 300);
    });


    it('should remove indicated token from tokens array', async () => {
        spawner.tokens = [];
        spawner.buildToken();
        spawner.buildToken();

        spawner.collectToken(0);
        expect(spawner.tokens.length).to.equal(1);

        spawner.collectToken(0);
        expect(spawner.tokens.length).to.equal(0);
    });

});

describe('spawner loseFocus tests', async () => {
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


    it('should always change focus variable to false', async () => {
        spawner.focus = true;
        spawner.loseFocus();
        expect(spawner.focus).to.equal(false);

        spawner.focus = false;
        spawner.loseFocus();
        expect(spawner.focus).to.equal(false);
    });

});

describe('spawner gainFocus tests', async () => {
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


    it('should always change focus variable to true', async () => {
        spawner.focus = true;
        spawner.gainFocus();
        expect(spawner.focus).to.equal(true);

        spawner.focus = false;
        spawner.gainFocus();
        expect(spawner.focus).to.equal(true);
    });

});