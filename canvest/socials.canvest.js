// import * as PIXI from 'pixi.js';
// import Socials from '../js/socials.js';

// describe('socials endGame tests', async () => {
//     let app;
//     let socials;

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

//         setTimeout(() => {
//             app.loader
//                 .load((loader, resources) => {
//                     socials = new Socials(app);
//                 });
//         }, 300)

//         setTimeout(() => {
//             done();
//         }, 600);
//     });


//     it('should bring divs on screen for large screens', async () => {
//         socials.smallScreen = false;
//         socials.adBlock = false;
//         socials.endGame();
//         expect(socials.socialsDiv.style.left).to.equal("50%");

//         socials.resetGame();
//         socials.backup();
//         socials.smallScreen = false;
//         socials.adBlock = true;
//         socials.endGame();

//         expect(socials.backupSocialsDiv.style.left).to.equal("50%");
//     });

//     it('should bring divs on screen for small screens', async () => {
//         socials.smallScreen = true;
//         socials.adBlock = false;
//         socials.endGame();
//         expect(socials.smallScreenDiv.style.left).to.equal("50%");

//         socials.resetGame();
//         socials.smallScreen = true;
//         socials.adBlock = true;
//         socials.endGame();
//         expect(socials.smallScreenDiv.style.left).to.equal("50%");
//     });

// });

// describe('socials switchSizes tests', async () => {
//     let app;
//     let socials;

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

//         setTimeout(() => {
//             app.loader
//                 .load((loader, resources) => {
//                     socials = new Socials(app);
//                 });
//         }, 300)

//         setTimeout(() => {
//             done();
//         }, 600);
//     });

//     it('should switch screen size variable', async () => {
//         socials.smallScreen = false;
//         socials.switchSizes();
//         expect(socials.smallScreen).to.equal(true);

//         socials.smallScreen = true;
//         socials.switchSizes();
//         expect(socials.smallScreen).to.equal(false);
//     });

//     it('should bring divs on screen for large screens', async () => {
//         socials.resetGame();
//         socials.smallScreen = true;
//         socials.adBlock = false;
//         socials.switchSizes();
//         expect(socials.socialsDiv.style.left).to.equal("50%");

//         socials.resetGame();
//         socials.backup();
//         socials.smallScreen = true;
//         socials.adBlock = true;
//         socials.switchSizes();

//         expect(socials.backupSocialsDiv.style.left).to.equal("50%");
//     });

//     it('should bring divs on screen for small screens', async () => {
//         socials.resetGame();
//         socials.smallScreen = false;
//         socials.adBlock = false;
//         socials.switchSizes();
//         expect(socials.smallScreenDiv.style.left).to.equal("50%");

//         socials.resetGame();
//         socials.smallScreen = false;
//         socials.adBlock = true;
//         socials.switchSizes();
//         expect(socials.smallScreenDiv.style.left).to.equal("50%");
//     });

// });

// describe('socials resetGame tests', async () => {
//     let app;
//     let socials;

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

//         setTimeout(() => {
//             app.loader
//                 .load((loader, resources) => {
//                     socials = new Socials(app);
//                 });
//         }, 300)

//         setTimeout(() => {
//             done();
//         }, 600);
//     });


//     it('should bring divs offscreen', async () => {
//         socials.backup();

//         socials.socialsDiv.style.left = "50%";
//         socials.backupSocialsDiv.style.left = "50%";
//         socials.smallScreenDiv.style.left = "50%";
//         socials.sSMenu.style.left = "50%";
//         socials.resetGame();

//         expect(socials.backupSocialsDiv.style.left).to.equal("-100%");
//     });

// });

// describe('socials restartGame tests', async () => {
//     let app;
//     let socials;

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

//         setTimeout(() => {
//             app.loader
//                 .load((loader, resources) => {
//                     socials = new Socials(app);
//                 });
//         }, 300)

//         setTimeout(() => {
//             done();
//         }, 600);
//     });

//     it('should wipe innerhtml for twitter button', async () => {
//         socials.twtDiv.innerHTML = "test";
//         socials.restartGame();

//         expect(socials.twtDiv.innerHTML).to.equal("");
//     });

//     it('should bring divs offscreen', async () => {
//         socials.backup();

//         socials.socialsDiv.style.left = "50%";
//         socials.backupSocialsDiv.style.left = "50%";
//         socials.smallScreenDiv.style.left = "50%";
//         socials.sSMenu.style.left = "50%";
//         socials.resetGame();

//         expect(socials.backupSocialsDiv.style.left).to.equal("-100%");
//     });

// });

// describe('socials setupHTMLBtns tests', async () => {
//     let app;
//     let socials;

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

//         setTimeout(() => {
//             app.loader
//                 .load((loader, resources) => {
//                     socials = new Socials(app);
//                 });
//         }, 300)

//         setTimeout(() => {
//             done();
//         }, 600);
//     });

//     it('should put socialsDiv off screen', async () => {
//         socials.socialsDiv.style.left = "50%";

//         socials.setupHTMLBtns();

//         expect(socials.socialsDiv.style.left).to.equal("-999%");
//     });

//     it('should populate twitter div without adblock', async () => {
//         socials.adBlock = false;
//         socials.twtDiv.innerHTML = "";
//         socials.setupHTMLBtns();

//         setTimeout(() => {
//             expect(socials.twtDiv.innerHTML).to.not.equal("");

//         }, 200)
//     });

// });

// describe('socials bringOnScreen tests', async () => {
//     let app;
//     let socials;

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

//         setTimeout(() => {
//             app.loader
//                 .load((loader, resources) => {
//                     socials = new Socials(app);
//                 });
//         }, 300)

//         setTimeout(() => {
//             done();
//         }, 600);
//     });

//     it('should bring divs on screen for large screens at half height', async () => {
//         socials.resetGame();
//         socials.smallScreen = true;
//         socials.adBlock = false;
//         socials.bringOnScreen(true);
//         expect(socials.socialsDiv.style.top).to.equal("50%");
//         expect(socials.socialsDiv.style.top).to.equal("50%");

//         socials.resetGame();
//         socials.backup();
//         socials.smallScreen = false;
//         socials.adBlock = true;
//         socials.bringOnScreen(true);

//         expect(socials.backupSocialsDiv.style.top).to.equal("50%");
//         expect(socials.backupSocialsDiv.style.top).to.equal("50%");
//     });

//     it('should bring divs on screen for large screens at 80% height', async () => {
//         socials.resetGame();
//         socials.smallScreen = false;
//         socials.adBlock = false;
//         socials.bringOnScreen(false);
//         expect(socials.socialsDiv.style.left).to.equal("50%");
//         expect(socials.socialsDiv.style.top).to.equal("78%");

//         socials.resetGame();
//         socials.backup();
//         socials.smallScreen = false;
//         socials.adBlock = true;
//         socials.bringOnScreen(false);

//         expect(socials.backupSocialsDiv.style.left).to.equal("50%");
//         expect(socials.backupSocialsDiv.style.top).to.equal("78%");
//     });

//     it('should bring divs on screen for small screens at 80% height', async () => {
//         socials.resetGame();
//         socials.smallScreen = true;
//         socials.adBlock = false;
//         socials.bringOnScreen(false);
//         expect(socials.smallScreenDiv.style.left).to.equal("50%");
//         expect(socials.smallScreenDiv.style.top).to.equal("78%");

//         socials.resetGame();
//         socials.smallScreen = true;
//         socials.adBlock = true;
//         socials.bringOnScreen(false);
//         expect(socials.smallScreenDiv.style.left).to.equal("50%");
//         expect(socials.smallScreenDiv.style.top).to.equal("78%");
//     });

// });

// describe('socials smallBringOnScreen tests', async () => {
//     let app;
//     let socials;

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

//         setTimeout(() => {
//             app.loader
//                 .load((loader, resources) => {
//                     socials = new Socials(app);
//                 });
//         }, 300)

//         setTimeout(() => {
//             done();
//         }, 600);
//     });

//     it('should bring divs on screen for small screens at 80% height', async () => {
//         socials.resetGame();
//         socials.smallScreen = true;
//         socials.adBlock = false;
//         socials.smallBringOnScreen();
//         expect(socials.smallScreenDiv.style.left).to.equal("50%");
//         expect(socials.smallScreenDiv.style.top).to.equal("78%");
//     });

// });

// describe('socials renderTwt tests', async () => {
//     let app;
//     let socials;

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

//         setTimeout(() => {
//             app.loader
//                 .load((loader, resources) => {
//                     socials = new Socials(app);
//                 });
//         }, 300)

//         setTimeout(() => {
//             done();
//         }, 600);
//     });

//     it('should populate twitter div with no adblock', async () => {
//         socials.adBlock = false;
//         socials.twtDiv.innerHTML = "";
//         socials.setupHTMLBtns();

//         setTimeout(() => {
//             expect(socials.twtDiv.innerHTML).to.not.equal("");

//         }, 200)
//     });

//     it('should set up an onclick for twitter backup with adblock', async () => {
//         socials.backup();
//         socials.twtBackupDiv.onclick = null;
//         socials.adblock = true;
//         socials.renderTwt();

//         setTimeout(() => {
//             expect(socials.twtBackupDiv.onclick).to.not.equal(null);

//         }, 200)
//     });

// });

// describe('socials smallScreenSetup tests', async () => {
//     let app;
//     let socials;

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

//         setTimeout(() => {
//             app.loader
//                 .load((loader, resources) => {
//                     socials = new Socials(app);
//                 });
//         }, 300)

//         setTimeout(() => {
//             done();
//         }, 600);
//     });

//     it('should put all created divs offscreen', async () => {
//         socials.smallScreenDiv.style.left = "50%";
//         socials.sSMenu.style.left = "50%";

//         socials.smallScreenSetup();

//         expect(socials.smallScreenDiv.style.left).to.equal("-999%");
//         expect(socials.sSMenu.style.left).to.equal("-999%");

//     });

// });


// describe('socials smallScreenPopup tests', async () => {
//     let app;
//     let socials;

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

//         setTimeout(() => {
//             app.loader
//                 .load((loader, resources) => {
//                     socials = new Socials(app);
//                 });
//         }, 300)

//         setTimeout(() => {
//             done();
//         }, 600);
//     });

//     it('should bring small screen menu div on screen', async () => {
//         socials.sSMenu.style.left = "-999%";

//         socials.smallScreenPopup();

//         expect(socials.sSMenu.style.left).to.equal("50%");

//     });

// });

// describe('socials smallScreenReset tests', async () => {
//     let app;
//     let socials;

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

//         setTimeout(() => {
//             app.loader
//                 .load((loader, resources) => {
//                     socials = new Socials(app);
//                 });
//         }, 300)

//         setTimeout(() => {
//             done();
//         }, 600);
//     });

//     it('should bring small screen main div on screen + remove menu div', async () => {
//         socials.sSMenu.style.left = "50%";
//         socials.smallScreenDiv.style.left = "-999%";

//         socials.smallScreenReset();

//         expect(socials.sSMenu.style.left).to.equal("-100%");
//         expect(socials.smallScreenDiv.style.left).to.equal("50%");

//     });

// });

// describe('socials resetTwtDiv tests', async () => {
//     let app;
//     let socials;

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

//         setTimeout(() => {
//             app.loader
//                 .load((loader, resources) => {
//                     socials = new Socials(app);
//                 });
//         }, 300)

//         setTimeout(() => {
//             done();
//         }, 600);
//     });

//     it('should wipe twitter div', async () => {
//         socials.twtDiv.innerHTML = "test";
//         socials.resetTwtDiv();

//         expect(socials.twtDiv.innerHTML).to.equal("");
//     });

// });

// describe('socials checkForBlock2 tests', async () => {
//     let app;
//     let socials;

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

//         setTimeout(() => {
//             app.loader
//                 .load((loader, resources) => {
//                     socials = new Socials(app);
//                 });
//         }, 300)

//         setTimeout(() => {
//             done();
//         }, 600);
//     });

//     it('should setup backup if adblock is in place', async () => {
//         socials.adblock = false;
//         socials.twtDiv.innerHTML = "";
//         socials.checkForBlock2();
//         expect(socials.backupSocialsDiv.style.left).to.equal("-999%");
//     });

//     it('should do nothing otherwise', async () => {
//         socials.adblock = false;
//         socials.twtDiv.innerHTML = "adblock not in place";
//         socials.checkForBlock2();
//         expect(socials.adblock).to.equal(false);
//     });

// });

// describe('socials backup tests', async () => {
//     let app;
//     let socials;

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

//         setTimeout(() => {
//             app.loader
//                 .load((loader, resources) => {
//                     socials = new Socials(app);
//                 });
//         }, 300)

//         setTimeout(() => {
//             done();
//         }, 600);
//     });

//     it('should setup backup div offscreen', async () => {
//         socials.adblock = true;

//         socials.backup();
//         setTimeout(() => {
//             expect(socials.backupSocialsDiv.style.left).to.equal("-999%");

//         }, 20);
//     });

// });