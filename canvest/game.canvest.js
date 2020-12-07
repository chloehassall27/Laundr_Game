// import * as PIXI from 'pixi.js';
// //import * as game from '../js/game.js';
// import {
//     loadOnce,
//     reload,
//     gameLoop,
//     displayScore,
//     displayHighScore,
//     checkCollision,
//     endGame,
//     slowMovement,
//     onClickRestart,
//     onClickMute,
//     collectToken,
//     cleanUp,
//     startGame,
//     moveBackground,
// } from '../js/game.js';

// import Spawner from "./spawner.js"
// import Player from "./player.js"
// import Window from "./windows.js"
// import Socials from "./socials.js"
// import Windows from "./windows.js"

// /*
// game.js is unique from the other js files... it isn't in class format
// what does this mean? we can't easily export it;;
// feel free to find a better solution that the one i have here, but this is the only thing that didn't seem like am obscene amount of work
//     - please note, half this "solution" i am talking about can be found at the bottom of game.js, where i export out the functions i am testing here. if you want to test a function i haven't exported out, you'll have to edit that bit in game.js, too, not just this file!

// it's also important to remember that all the objects game.js controls have already been tested! what's important to test in game.js are just things like:
//     - do global variables get modified by functions they are supposed to be modified by, and correctly so?
//     - can functions with restrictions start without meeting their requirements, or are they properlly restricted?
//     - for functions that do calculations, like collision checking, do they return the proper values? (manually calculate some stuff and make sure the function returns the same thing as your manually calculated answer)

// some things can't be tested with unit tests because either a) it requires actual interaction with the game, such as pausing when the browser loses focus or resizing the tab, or b) it's something that visual that is tested against what "feels" right, like the bug simran noticed where the falling sprite was a few pixels too high. for these types of things, they will get tested when the game is tested as a whole, not in unit tests.
// */


// //some variables game functions need 

// const style = new PIXI.TextStyle({
//     fontFamily: 'Arial', fontSize: RELSCALE * 26, fill: '#4e4e4e',
// });
// const scoreStyle = new PIXI.TextStyle({
//     fontFamily: 'Arial', fontSize: RELSCALE * 23, fill: '#4b4b4b'
// })
// const highscoreStyle = new PIXI.TextStyle({
//     fontFamily: 'Arial', fontSize: RELSCALE * 23, fill: '#7c7c7c',
// })

// let spawner;
// let player;
// let windows;
// let socials;
// // let background;
// let backgroundFront, backgroundBack;
// window.groundLevel = HEIGHT * .9;

// let win = false;
// let lose = false;
// let gameOver = false;
// let speedScale = 1.0;
// let focus = true;
// let visible = true;
// window.mute = false;
// let winTriggered = false;
// let winTimeout;
// let timeOffset;
// let firstLoop = true;
// let endMessage;
// let touchDisable = false;

// window.inputs = {
//     jump: false,
//     duck: false,
//     prevDuck: false
// };

// let playerSpeedScale = 1;
// let endHouse;
// let restartButton;
// let muteButton;
// let score = 0;
// let scoreText = new PIXI.Text(score, scoreStyle);
// scoreText.x = WIDTH / 1.07;
// scoreText.resolution = 1.5;

// let highscore = 0;
// let highscoreText = new PIXI.Text(highscore, highscoreStyle);
// highscoreText.x = WIDTH / 1.21;
// highscoreText.resolution = 1.5;

// //noises
// let deathS;
// let jumpS;
// let tokenS;
// let winS;

// let started = false;
// let firstLoad = true;
// let spawnerInterval;
// let speedInterval;
// let gameInterval;
// let timeout = 0;
// let winTimeoutTime = 0;
// let slowTimout;
// let twtTimeout;

// app.loader
//     .add('charaSheet', "sprites/charaSpriteSheet.json")
//     .add('obSheet', "sprites/obstacleSprites.json")
//     .add('tokenSheet', "sprites/LaundrBombSprite.json")
//     .add('buttonSheet', "sprites/PodsAndButtons.json")
//     .add('muteSheet', "sprites/MuteUnmute.json")
//     .add('deathSound', "sounds/death.wav")
//     .add('jumpSound', "sounds/jump.wav")
//     .add('tokenSound', "sounds/jelly2.wav")
//     .add('winSound', "sounds/BETTERWin3.wav");

// loadOnce();





// //currently broken, yes, i know, it's probably in the way things are being added to the html where i'm trying to make it have access to the scripts and stuff.

// //the tests

// describe('game gameLoop tests', async () => {

//     before((done) => {
//         app = new PIXI.Application({
//             width: 900, height: 225, backgroundColor: 0xF9F9F9, resolution: window.devicePixelRatio || 1, preserveDrawingBuffer: true
//         });

//         window.HEIGHT = app.screen.height;
//         window.WIDTH = app.screen.width;
//         window.SCALE = HEIGHT / 225;
//         window.RELSCALE = HEIGHT / 225;
//         window.SCORE = 0;
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
//         holder.innerHTML = `
//         <body>
//           <div class="laundr-game" id="laundr-game" style="position: relative;">
//         <canvas class="pixiCanvas" id="pixiCanvas" , style="width:100%;"></canvas>

//         <!-- html version of social sharing options -->
//         <div class="socials" id="socials" style="width: 25%; min-width: 70px;">
//           <div class="twtDiv" id="twtDiv" style="display: inline-block; vertical-align: top; min-width:40%;"></div>
//           <div id="fb-root" style="display: inline-block; vertical-align: top; width:0%;"></div>
//           <div class="fbDiv fb-share-button" id="fbDiv" data-href="https://www.laundr.io/404" data-layout="button"
//             data-size="small" style="display: inline-block; vertical-align: top; min-width:40%;"><a target="_blank"
//               href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.laundr.io%2F404&amp;src=sdkpreparse"
//               class="fb-xfbml-parse-ignore">Share</a></div>
//         </div>

//       </div>`;
//         document.body.appendChild(holder);

//         let newScript = document.createElement("script");
//         newScript.src = "https://platform.twitter.com/widgets.js";
//         holder.appendChild(newScript);
//         let newScript1 = document.createElement("script");
//         newScript1.src = "/node_modules/pixi-sound/dist/pixi-sound.js";
//         holder.appendChild(newScript1);


//         setTimeout(() => {
//             app.loader
//                 .load((loader, resources) => {
//                     spawner = new Spawner(app);
//                     player = new Player(app, jumpS);
//                     player.currSprite.stop();
//                     socials = new Socials(app);
//                     windows = new Windows(app);
//                     windows.setUpInstruct();
//                 });
//             clearInterval(spawnerInterval);
//             clearInterval(speedInterval);
//             clearInterval(slowTimout);
//             clearInterval(gameInterval);
//         }, 300)

//         setTimeout(() => {
//             done();
//         }, 600);
//     });


//     it('should only progress game when allowed', async () => {
//         gameOver = false;
//         started = true;
//         let hold = backgroundFront.tilePosition.x;
//         gameLoop();
//         let hold2 = backgroundFront.tilePosition.x;

//         expect(hold2).to.be.below(hold);

//     });
// });