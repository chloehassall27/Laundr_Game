// import * as PIXI from 'pixi.js';
// import Player from '../js/player.js';

// describe('player updateJump tests', async () => {
//     let player;
//     let app;

//     before((done) => {
//         app = new PIXI.Application({
//             width: 900, height: 225, backgroundColor: 0xF9F9F9, resolution: window.devicePixelRatio || 1, preserveDrawingBuffer: true
//         });

//         window.HEIGHT = app.screen.height;
//         window.WIDTH = app.screen.width;
//         window.SCALE = HEIGHT / 225;
//         window.RELSCALE = HEIGHT / 225;
//         window.SCORE = 0;
//         window.FPSSCALE = 144 / app.ticker.FPS;
//         window.PIXI = PIXI;

//         window.container = new PIXI.Container();
//         app.stage.addChild(container);
//         container.width = app.screen.width;
//         container.height = app.screen.height;
//         container.interactive = true;

//         window.inputs = {
//             jump: false,
//             duck: false,
//             prevDuck: false
//         };

//         let holder = document.createElement('div');
//         let newScript = document.createElement("script");
//         newScript.src = "/node_modules/pixi-sound/dist/pixi-sound.js";
//         holder.appendChild(newScript);
//         document.body.appendChild(holder);



//         setTimeout(() => {
//             app.loader
//                 .add('charaSheet', "sprites/charaSpriteSheet.json")
//                 .add('jumpSound', "sounds/jump.wav");

//             app.loader
//                 .load((loader, resources) => {
//                     let jumpS = PIXI.sound.Sound.from(resources.jumpSound);
//                     jumpS.volume = 0;
//                     player = new Player(app, jumpS);
//                 });
//         }, 300)


//         setTimeout(() => {
//             done();
//         }, 600);
//     });


//     it('should only switch to jump sprite when allowed', async () => {
//         player.currSprite = player.running;
//         player.currSprite.y = player.groundLevel;
//         window.inputs.duck = false;
//         window.inputs.jump = true;
//         player.updateJump();

//         expect(player.currSprite.texture).to.eql(player.jumpStatic.texture);

//         player.currSprite = player.running;
//         player.currSprite.y = player.groundLevel + 10;
//         window.inputs.duck = false;
//         window.inputs.jump = true;
//         player.updateJump();

//         expect(player.currSprite.texture).to.eql(player.running.texture);

//         player.currSprite = player.ducking;
//         player.currSprite.y = player.groundLevel;
//         window.inputs.duck = true;
//         window.inputs.jump = true;
//         player.updateJump();

//         expect(player.currSprite.texture).to.eql(player.ducking.texture);

//         player.currSprite = player.running;
//         player.currSprite.y = player.groundLevel;
//         window.inputs.duck = false;
//         window.inputs.jump = false;
//         player.updateJump();

//         expect(player.currSprite.texture).to.eql(player.running.texture);

//     });

//     it('should ensure sprite never goes below ground level', async () => {
//         player.currSprite = player.jumpStatic;
//         player.currSprite.y = player.groundLevel + 10;
//         player.updateJump();

//         expect(player.currSprite.y).to.equal(player.groundLevel);
//         expect(player.currSprite.texture).to.equal(player.running.texture);

//     });

//     it('should move sprite downwards if in air mid jump', async () => {
//         player.currSprite = player.jumpStatic;
//         player.currSprite.y = player.groundLevel - 10;
//         player.speedY = 1;
//         player.updateJump();

//         expect(player.speedY).to.be.below(1);

//     });

//     it('should increase speed midair if jump held down', async () => {
//         player.currSprite = player.running;
//         player.currSprite.y = player.groundLevel;
//         player.speedY = 1;
//         window.inputs.jump = true;
//         player.updateJump();

//         expect(player.speedY).to.be.above(1);

//     });
// });

// describe('player updateDuck tests', async () => {
//     let player;
//     let app;

//     before((done) => {
//         app = new PIXI.Application({
//             width: 900, height: 225, backgroundColor: 0xF9F9F9, resolution: window.devicePixelRatio || 1, preserveDrawingBuffer: true
//         });

//         window.HEIGHT = app.screen.height;
//         window.WIDTH = app.screen.width;
//         window.SCALE = HEIGHT / 225;
//         window.RELSCALE = HEIGHT / 225;
//         window.SCORE = 0;
//         window.FPSSCALE = 144 / app.ticker.FPS;
//         window.PIXI = PIXI;

//         window.container = new PIXI.Container();
//         app.stage.addChild(container);
//         container.width = app.screen.width;
//         container.height = app.screen.height;
//         container.interactive = true;

//         window.inputs = {
//             jump: false,
//             duck: false,
//             prevDuck: false
//         };

//         let holder = document.createElement('div');
//         let newScript = document.createElement("script");
//         newScript.src = "/node_modules/pixi-sound/dist/pixi-sound.js";
//         holder.appendChild(newScript);
//         document.body.appendChild(holder);



//         setTimeout(() => {
//             app.loader
//                 .add('charaSheet', "sprites/charaSpriteSheet.json")
//                 .add('jumpSound', "sounds/jump.wav");

//             app.loader
//                 .load((loader, resources) => {
//                     let jumpS = PIXI.sound.Sound.from(resources.jumpSound);
//                     jumpS.volume = 0;
//                     player = new Player(app, jumpS);
//                 });
//         }, 300)


//         setTimeout(() => {
//             done();
//         }, 600);
//     });


//     it('should only switch to duck sprite when allowed', async () => {
//         player.currSprite = player.running;
//         player.currSprite.y = player.groundLevel;
//         window.inputs.duck = true;
//         window.inputs.jump = false;
//         player.updateDuck();

//         expect(player.currSprite.texture).to.eql(player.ducking.texture);

//         player.currSprite = player.running;
//         player.currSprite.y = player.groundLevel - 10;
//         window.inputs.duck = true;
//         window.inputs.jump = false;
//         player.updateDuck();

//         expect(player.currSprite.texture).to.eql(player.running.texture);

//         player.currSprite = player.running;
//         player.currSprite.y = player.groundLevel;
//         window.inputs.duck = false;
//         window.inputs.jump = false;
//         player.updateDuck();

//         expect(player.currSprite.texture).to.eql(player.running.texture);
//     });

//     it('should make player move faster downwards if midair', async () => {
//         player.currSprite = player.jumping;
//         player.currSprite.y = player.groundLevel - 10;
//         window.inputs.duck = true;
//         window.inputs.jump = false;
//         player.speedY = 1;
//         player.updateDuck();

//         expect(player.speedY).to.be.below(1);
//     });

//     it('should switch back to running sprite when duck is over', async () => {
//         player.currSprite = player.ducking;
//         player.currSprite.y = player.groundLevel;
//         window.inputs.duck = false;
//         window.inputs.jump = false;
//         player.updateDuck();

//         expect(player.currSprite.texture).to.eql(player.running.texture);

//     });
// });

// describe('player reset tests', async () => {
//     let player;
//     let app;

//     before((done) => {
//         app = new PIXI.Application({
//             width: 900, height: 225, backgroundColor: 0xF9F9F9, resolution: window.devicePixelRatio || 1, preserveDrawingBuffer: true
//         });

//         window.HEIGHT = app.screen.height;
//         window.WIDTH = app.screen.width;
//         window.SCALE = HEIGHT / 225;
//         window.RELSCALE = HEIGHT / 225;
//         window.SCORE = 0;
//         window.FPSSCALE = 144 / app.ticker.FPS;
//         window.PIXI = PIXI;

//         window.container = new PIXI.Container();
//         app.stage.addChild(container);
//         container.width = app.screen.width;
//         container.height = app.screen.height;
//         container.interactive = true;

//         window.inputs = {
//             jump: false,
//             duck: false,
//             prevDuck: false
//         };

//         let holder = document.createElement('div');
//         let newScript = document.createElement("script");
//         newScript.src = "/node_modules/pixi-sound/dist/pixi-sound.js";
//         holder.appendChild(newScript);
//         document.body.appendChild(holder);



//         setTimeout(() => {
//             app.loader
//                 .add('charaSheet', "sprites/charaSpriteSheet.json")
//                 .add('jumpSound', "sounds/jump.wav");

//             app.loader
//                 .load((loader, resources) => {
//                     let jumpS = PIXI.sound.Sound.from(resources.jumpSound);
//                     jumpS.volume = 0;
//                     player = new Player(app, jumpS);
//                 });
//         }, 300)


//         setTimeout(() => {
//             done();
//         }, 600);
//     });


//     it('should reset player x pos', async () => {
//         player.currSprite = player.running;
//         player.currSprite.x = WIDTH;
//         player.currSprite.y = player.groundLevel;
//         player.reset();

//         expect(player.currSprite.x).to.equal(WIDTH * 0.22);

//     });

//     it('should reset to running sprite', async () => {
//         player.currSprite = player.ducking;
//         player.reset();

//         expect(player.currSprite.texture).to.eql(player.running.texture);

//     });
// });

// describe('player switchSprite tests', async () => {
//     let player;
//     let app;

//     before((done) => {
//         app = new PIXI.Application({
//             width: 900, height: 225, backgroundColor: 0xF9F9F9, resolution: window.devicePixelRatio || 1, preserveDrawingBuffer: true
//         });

//         window.HEIGHT = app.screen.height;
//         window.WIDTH = app.screen.width;
//         window.SCALE = HEIGHT / 225;
//         window.RELSCALE = HEIGHT / 225;
//         window.SCORE = 0;
//         window.FPSSCALE = 144 / app.ticker.FPS;
//         window.PIXI = PIXI;

//         window.container = new PIXI.Container();
//         app.stage.addChild(container);
//         container.width = app.screen.width;
//         container.height = app.screen.height;
//         container.interactive = true;

//         window.inputs = {
//             jump: false,
//             duck: false,
//             prevDuck: false
//         };

//         let holder = document.createElement('div');
//         let newScript = document.createElement("script");
//         newScript.src = "/node_modules/pixi-sound/dist/pixi-sound.js";
//         holder.appendChild(newScript);
//         document.body.appendChild(holder);



//         setTimeout(() => {
//             app.loader
//                 .add('charaSheet', "sprites/charaSpriteSheet.json")
//                 .add('jumpSound', "sounds/jump.wav");

//             app.loader
//                 .load((loader, resources) => {
//                     let jumpS = PIXI.sound.Sound.from(resources.jumpSound);
//                     jumpS.volume = 0;
//                     player = new Player(app, jumpS);
//                 });
//         }, 300)


//         setTimeout(() => {
//             done();
//         }, 600);
//     });


//     it('should work with any combination of sprites', async () => {
//         player.currSprite = player.running;
//         player.switchSprite(player.ducking);

//         expect(player.currSprite.texture).to.eql(player.ducking.texture);

//         player.currSprite = player.running;
//         player.switchSprite(player.jumpStatic);

//         expect(player.currSprite.texture).to.eql(player.jumpStatic.texture);

//         player.currSprite = player.running;
//         player.switchSprite(player.running);

//         expect(player.currSprite.texture).to.eql(player.running.texture);

//         player.currSprite = player.running;
//         player.switchSprite(player.falling);

//         expect(player.currSprite.texture).to.eql(player.falling.texture);

//         player.currSprite = player.jumpStatic;
//         player.switchSprite(player.ducking);

//         expect(player.currSprite.texture).to.eql(player.ducking.texture);

//         player.currSprite = player.jumpStatic;
//         player.switchSprite(player.jumpStatic);

//         expect(player.currSprite.texture).to.eql(player.jumpStatic.texture);

//         player.currSprite = player.jumpStatic;
//         player.switchSprite(player.running);

//         expect(player.currSprite.texture).to.eql(player.running.texture);

//         player.currSprite = player.jumpStatic;
//         player.switchSprite(player.falling);

//         expect(player.currSprite.texture).to.eql(player.falling.texture);

//         player.currSprite = player.ducking;
//         player.switchSprite(player.ducking);

//         expect(player.currSprite.texture).to.eql(player.ducking.texture);

//         player.currSprite = player.ducking;
//         player.switchSprite(player.jumpStatic);

//         expect(player.currSprite.texture).to.eql(player.jumpStatic.texture);

//         player.currSprite = player.ducking;
//         player.switchSprite(player.running);

//         expect(player.currSprite.texture).to.eql(player.running.texture);

//         player.currSprite = player.ducking;
//         player.switchSprite(player.falling);

//         expect(player.currSprite.texture).to.eql(player.falling.texture);

//         player.currSprite = player.falling;
//         player.switchSprite(player.ducking);

//         expect(player.currSprite.texture).to.eql(player.ducking.texture);

//         player.currSprite = player.falling;
//         player.switchSprite(player.jumpStatic);

//         expect(player.currSprite.texture).to.eql(player.jumpStatic.texture);

//         player.currSprite = player.falling;
//         player.switchSprite(player.running);

//         expect(player.currSprite.texture).to.eql(player.running.texture);

//         player.currSprite = player.falling;
//         player.switchSprite(player.falling);

//         expect(player.currSprite.texture).to.eql(player.falling.texture);

//     });
// });

// describe('player endGame tests', async () => {
//     let player;
//     let app;

//     before((done) => {
//         app = new PIXI.Application({
//             width: 900, height: 225, backgroundColor: 0xF9F9F9, resolution: window.devicePixelRatio || 1, preserveDrawingBuffer: true
//         });

//         window.HEIGHT = app.screen.height;
//         window.WIDTH = app.screen.width;
//         window.SCALE = HEIGHT / 225;
//         window.RELSCALE = HEIGHT / 225;
//         window.SCORE = 0;
//         window.FPSSCALE = 144 / app.ticker.FPS;
//         window.PIXI = PIXI;

//         window.container = new PIXI.Container();
//         app.stage.addChild(container);
//         container.width = app.screen.width;
//         container.height = app.screen.height;
//         container.interactive = true;

//         window.inputs = {
//             jump: false,
//             duck: false,
//             prevDuck: false
//         };

//         let holder = document.createElement('div');
//         let newScript = document.createElement("script");
//         newScript.src = "/node_modules/pixi-sound/dist/pixi-sound.js";
//         holder.appendChild(newScript);
//         document.body.appendChild(holder);



//         setTimeout(() => {
//             app.loader
//                 .add('charaSheet', "sprites/charaSpriteSheet.json")
//                 .add('jumpSound', "sounds/jump.wav");

//             app.loader
//                 .load((loader, resources) => {
//                     let jumpS = PIXI.sound.Sound.from(resources.jumpSound);
//                     jumpS.volume = 0;
//                     player = new Player(app, jumpS);
//                 });
//         }, 300)


//         setTimeout(() => {
//             done();
//         }, 600);
//     });


//     it('should switch sprite to falling on a lose', async () => {
//         player.currSprite = player.running;
//         player.endGame(false);

//         expect(player.currSprite.texture).to.eql(player.falling.texture);

//     });

//     it('should set trigger to fall if in air on a lose', async () => {
//         player.currSprite = player.jumping;
//         player.currSprite.y = player.groundLevel + 10;
//         player.needsFall = false;
//         player.endGame(false);

//         expect(player.currSprite.texture).to.eql(player.falling.texture);
//         expect(player.needsFall).to.equal(true);

//     });

//     it('should set trigger to enter win sequence if a win', async () => {
//         player.currSprite = player.jumping;
//         player.currSprite.y = player.groundLevel;
//         player.winsequence = false;
//         player.endGame(true);

//         expect(player.winSequence).to.equal(true);

//     });

//     it('should not immedietely change sprite if a win', async () => {
//         player.currSprite = player.jumping;
//         player.currSprite.y = player.groundLevel;
//         player.winsequence = false;
//         player.endGame(true);

//         expect(player.currSprite.texture).to.eql(player.jumping.texture);


//     });
// });

// describe('player sitDown tests', async () => {
//     let player;
//     let app;

//     before((done) => {
//         app = new PIXI.Application({
//             width: 900, height: 225, backgroundColor: 0xF9F9F9, resolution: window.devicePixelRatio || 1, preserveDrawingBuffer: true
//         });

//         window.HEIGHT = app.screen.height;
//         window.WIDTH = app.screen.width;
//         window.SCALE = HEIGHT / 225;
//         window.RELSCALE = HEIGHT / 225;
//         window.SCORE = 0;
//         window.FPSSCALE = 144 / app.ticker.FPS;
//         window.PIXI = PIXI;

//         window.container = new PIXI.Container();
//         app.stage.addChild(container);
//         container.width = app.screen.width;
//         container.height = app.screen.height;
//         container.interactive = true;

//         window.inputs = {
//             jump: false,
//             duck: false,
//             prevDuck: false
//         };

//         let holder = document.createElement('div');
//         let newScript = document.createElement("script");
//         newScript.src = "/node_modules/pixi-sound/dist/pixi-sound.js";
//         holder.appendChild(newScript);
//         document.body.appendChild(holder);



//         setTimeout(() => {
//             app.loader
//                 .add('charaSheet', "sprites/charaSpriteSheet.json")
//                 .add('jumpSound', "sounds/jump.wav");

//             app.loader
//                 .load((loader, resources) => {
//                     let jumpS = PIXI.sound.Sound.from(resources.jumpSound);
//                     jumpS.volume = 0;
//                     player = new Player(app, jumpS);
//                 });
//         }, 300)


//         setTimeout(() => {
//             done();
//         }, 600);
//     });


//     it('should switch sprite to ducking and pause animation', async () => {
//         player.currSprite = player.running;
//         player.ducking.play();
//         player.sitDown();

//         expect(player.currSprite.texture).to.eql(player.ducking.texture);
//         expect(player.currSprite.playing).to.equal(false);

//     });

//     it('should maintain edited x positions from before function call', async () => {
//         player.currSprite = player.running;
//         player.currSprite.x = 100;
//         player.sitDown();

//         expect(player.currSprite.x).to.equal(100);

//     });

//     it('should turn off win sequence trigger', async () => {
//         player.currSprite = player.running;
//         player.currSprite.x = 100;
//         player.winSequence = true;
//         player.sitDown();

//         expect(player.winSequence).to.equal(false);

//     });
// });

// describe('player endGameFall tests', async () => {
//     let player;
//     let app;

//     before((done) => {
//         app = new PIXI.Application({
//             width: 900, height: 225, backgroundColor: 0xF9F9F9, resolution: window.devicePixelRatio || 1, preserveDrawingBuffer: true
//         });

//         window.HEIGHT = app.screen.height;
//         window.WIDTH = app.screen.width;
//         window.SCALE = HEIGHT / 225;
//         window.RELSCALE = HEIGHT / 225;
//         window.SCORE = 0;
//         window.FPSSCALE = 144 / app.ticker.FPS;
//         window.PIXI = PIXI;

//         window.container = new PIXI.Container();
//         app.stage.addChild(container);
//         container.width = app.screen.width;
//         container.height = app.screen.height;
//         container.interactive = true;

//         window.inputs = {
//             jump: false,
//             duck: false,
//             prevDuck: false
//         };

//         let holder = document.createElement('div');
//         let newScript = document.createElement("script");
//         newScript.src = "/node_modules/pixi-sound/dist/pixi-sound.js";
//         holder.appendChild(newScript);
//         document.body.appendChild(holder);



//         setTimeout(() => {
//             app.loader
//                 .add('charaSheet', "sprites/charaSpriteSheet.json")
//                 .add('jumpSound', "sounds/jump.wav");

//             app.loader
//                 .load((loader, resources) => {
//                     let jumpS = PIXI.sound.Sound.from(resources.jumpSound);
//                     jumpS.volume = 0;
//                     player = new Player(app, jumpS);
//                 });
//         }, 300)


//         setTimeout(() => {
//             done();
//         }, 600);
//     });


//     it('should prevent sprite from going below ground level', async () => {
//         player.currSprite = player.falling;
//         player.currSprite.y = player.groundLevel + 10;
//         player.endGameFall();

//         expect(player.currSprite.y).to.equal(player.groundLevel + WIDTH * 0.0016);

//     });

//     it('should move sprite downwards if above ground level', async () => {
//         player.currSprite = player.falling;
//         player.currSprite.y = player.groundLevel - 10;
//         player.endGameFall();

//         expect(player.currSprite.y).to.above(player.groundLevel - 10);

//     });
// });
