import * as PIXI from 'pixi.js';
import Windows from '../js/windows.js';

describe('Windows setUpCode tests', async () => {
    let app;
    let windows;

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
        window.speedScale = 1.0;

        let holder = document.createElement('div');
        holder.innerHTML = `
        <body>
          <div class="laundr-game" id="laundr-game" style="position: relative;">
        <canvas class="pixiCanvas" id="pixiCanvas" , style="width:100%;"></canvas>

        <!-- html version of social sharing options -->
        <div class="socials" id="socials" style="width: 25%; min-width: 70px;">
          <div class="twtDiv" id="twtDiv" style="display: inline-block; vertical-align: top; min-width:40%;"></div>
          <div id="fb-root" style="display: inline-block; vertical-align: top; width:0%;"></div>
          <div class="fbDiv fb-share-button" id="fbDiv" data-href="https://www.laundr.io/404" data-layout="button"
            data-size="small" style="display: inline-block; vertical-align: top; min-width:40%;"><a target="_blank"
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.laundr.io%2F404&amp;src=sdkpreparse"
              class="fb-xfbml-parse-ignore">Share</a></div>
        </div>

      </div>`;
        document.body.appendChild(holder);

        let newScript = document.createElement("script");
        newScript.src = "https://platform.twitter.com/widgets.js";
        holder.appendChild(newScript);

        app.loader
            .add('tokenSheet', "sprites/LaundrBombSprite.json")
            .add('houseSheet', "sprites/backgroundHouse.json");


        setTimeout(() => {
            app.loader
                .load((loader, resources) => {
                    windows = new Windows(app);
                    windows.setUpInstruct();
                });

            setTimeout(() => {
                done();
            }, 300);
        }, 300);

    });

    it('should set code to valid string', async () => {
        windows.code = "";
        windows.setUpCode();

        expect(windows.code).to.not.equal("")
    });
});

describe('Windows setUpPuns tests', async () => {
    let app;
    let windows;

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
        window.speedScale = 1.0;

        let holder = document.createElement('div');
        holder.innerHTML = `
        <body>
          <div class="laundr-game" id="laundr-game" style="position: relative;">
        <canvas class="pixiCanvas" id="pixiCanvas" , style="width:100%;"></canvas>

        <!-- html version of social sharing options -->
        <div class="socials" id="socials" style="width: 25%; min-width: 70px;">
          <div class="twtDiv" id="twtDiv" style="display: inline-block; vertical-align: top; min-width:40%;"></div>
          <div id="fb-root" style="display: inline-block; vertical-align: top; width:0%;"></div>
          <div class="fbDiv fb-share-button" id="fbDiv" data-href="https://www.laundr.io/404" data-layout="button"
            data-size="small" style="display: inline-block; vertical-align: top; min-width:40%;"><a target="_blank"
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.laundr.io%2F404&amp;src=sdkpreparse"
              class="fb-xfbml-parse-ignore">Share</a></div>
        </div>

      </div>`;
        document.body.appendChild(holder);

        let newScript = document.createElement("script");
        newScript.src = "https://platform.twitter.com/widgets.js";
        holder.appendChild(newScript);

        app.loader
            .add('tokenSheet', "sprites/LaundrBombSprite.json")
            .add('houseSheet', "sprites/backgroundHouse.json");


        setTimeout(() => {
            app.loader
                .load((loader, resources) => {
                    windows = new Windows(app);
                    windows.setUpInstruct();
                });

            setTimeout(() => {
                done();
            }, 300);
        }, 300);
    });

    it('should set pun to valid string', async () => {
        windows.pun = "";
        windows.setUpPuns();

        expect(windows.pun).to.not.equal("")
    });
});

describe('Windows removeInstruct tests', async () => {
    let app;
    let windows;

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
        window.speedScale = 1.0;

        let holder = document.createElement('div');
        holder.innerHTML = `
        <body>
          <div class="laundr-game" id="laundr-game" style="position: relative;">
        <canvas class="pixiCanvas" id="pixiCanvas" , style="width:100%;"></canvas>

        <!-- html version of social sharing options -->
        <div class="socials" id="socials" style="width: 25%; min-width: 70px;">
          <div class="twtDiv" id="twtDiv" style="display: inline-block; vertical-align: top; min-width:40%;"></div>
          <div id="fb-root" style="display: inline-block; vertical-align: top; width:0%;"></div>
          <div class="fbDiv fb-share-button" id="fbDiv" data-href="https://www.laundr.io/404" data-layout="button"
            data-size="small" style="display: inline-block; vertical-align: top; min-width:40%;"><a target="_blank"
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.laundr.io%2F404&amp;src=sdkpreparse"
              class="fb-xfbml-parse-ignore">Share</a></div>
        </div>

      </div>`;
        document.body.appendChild(holder);

        let newScript = document.createElement("script");
        newScript.src = "https://platform.twitter.com/widgets.js";
        holder.appendChild(newScript);

        app.loader
            .add('tokenSheet', "sprites/LaundrBombSprite.json")
            .add('houseSheet', "sprites/backgroundHouse.json");


        setTimeout(() => {
            app.loader
                .load((loader, resources) => {
                    windows = new Windows(app);
                    windows.setUpInstruct();
                });

            setTimeout(() => {
                done();
            }, 300);
        }, 300);
    });

    it('should put invisiDiv offscreen', async () => {
        windows.invisDiv.style.left = "50%";
        windows.removeInstruct();

        expect(windows.invisDiv.style.left).to.equal("-999%")
    });
});

describe('Windows setUpLose tests', async () => {
    let app;
    let windows;

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
        window.speedScale = 1.0;

        let holder = document.createElement('div');
        holder.innerHTML = `
        <body>
          <div class="laundr-game" id="laundr-game" style="position: relative;">
        <canvas class="pixiCanvas" id="pixiCanvas" , style="width:100%;"></canvas>

        <!-- html version of social sharing options -->
        <div class="socials" id="socials" style="width: 25%; min-width: 70px;">
          <div class="twtDiv" id="twtDiv" style="display: inline-block; vertical-align: top; min-width:40%;"></div>
          <div id="fb-root" style="display: inline-block; vertical-align: top; width:0%;"></div>
          <div class="fbDiv fb-share-button" id="fbDiv" data-href="https://www.laundr.io/404" data-layout="button"
            data-size="small" style="display: inline-block; vertical-align: top; min-width:40%;"><a target="_blank"
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.laundr.io%2F404&amp;src=sdkpreparse"
              class="fb-xfbml-parse-ignore">Share</a></div>
        </div>

      </div>`;
        document.body.appendChild(holder);

        let newScript = document.createElement("script");
        newScript.src = "https://platform.twitter.com/widgets.js";
        holder.appendChild(newScript);

        app.loader
            .add('tokenSheet', "sprites/LaundrBombSprite.json")
            .add('houseSheet', "sprites/backgroundHouse.json");


        setTimeout(() => {
            app.loader
                .load((loader, resources) => {
                    windows = new Windows(app);
                    windows.setUpInstruct();
                });

            setTimeout(() => {
                done();
            }, 300);
        }, 300);
    });

    it('should set pun text and style', async () => {
        windows.pun.text = "test";
        windows.pun.style = null;
        windows.setUpLose();

        expect(windows.pun.text).to.not.equal("test");
        expect(windows.pun.style).to.not.be.null;
    });

});

describe('Windows setUpWin tests', async () => {
    let app;
    let windows;

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
        window.speedScale = 1.0;

        let holder = document.createElement('div');
        holder.innerHTML = `
        <body>
          <div class="laundr-game" id="laundr-game" style="position: relative;">
        <canvas class="pixiCanvas" id="pixiCanvas" , style="width:100%;"></canvas>

        <!-- html version of social sharing options -->
        <div class="socials" id="socials" style="width: 25%; min-width: 70px;">
          <div class="twtDiv" id="twtDiv" style="display: inline-block; vertical-align: top; min-width:40%;"></div>
          <div id="fb-root" style="display: inline-block; vertical-align: top; width:0%;"></div>
          <div class="fbDiv fb-share-button" id="fbDiv" data-href="https://www.laundr.io/404" data-layout="button"
            data-size="small" style="display: inline-block; vertical-align: top; min-width:40%;"><a target="_blank"
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.laundr.io%2F404&amp;src=sdkpreparse"
              class="fb-xfbml-parse-ignore">Share</a></div>
        </div>

      </div>`;
        document.body.appendChild(holder);

        let newScript = document.createElement("script");
        newScript.src = "https://platform.twitter.com/widgets.js";
        holder.appendChild(newScript);

        app.loader
            .add('tokenSheet', "sprites/LaundrBombSprite.json")
            .add('houseSheet', "sprites/backgroundHouse.json");


        setTimeout(() => {
            app.loader
                .load((loader, resources) => {
                    windows = new Windows(app);
                    windows.setUpInstruct();
                });

            setTimeout(() => {
                done();
            }, 300);
        }, 300);
    });

    it('should set pun text and style', async () => {
        windows.pun.text = "test";
        windows.pun.style = null;
        windows.setUpWin();

        expect(windows.pun.text).to.not.equal("test");
        expect(windows.pun.style).to.not.be.null;
    });

    it('should set coupon surrounding text', async () => {
        windows.topMessageCoupon.x = -100;
        windows.bottomMessageCoupon.x = -100;
        windows.setUpWin();

        expect(windows.topMessageCoupon.x).to.equal(WIDTH / 2);
        expect(windows.bottomMessageCoupon.x).to.equal(WIDTH / 2);
    });

});

describe('Windows showCredits tests', async () => {
    let app;
    let windows;

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
        window.speedScale = 1.0;

        let holder = document.createElement('div');
        holder.innerHTML = `
        <body>
          <div class="laundr-game" id="laundr-game" style="position: relative;">
        <canvas class="pixiCanvas" id="pixiCanvas" , style="width:100%;"></canvas>

        <!-- html version of social sharing options -->
        <div class="socials" id="socials" style="width: 25%; min-width: 70px;">
          <div class="twtDiv" id="twtDiv" style="display: inline-block; vertical-align: top; min-width:40%;"></div>
          <div id="fb-root" style="display: inline-block; vertical-align: top; width:0%;"></div>
          <div class="fbDiv fb-share-button" id="fbDiv" data-href="https://www.laundr.io/404" data-layout="button"
            data-size="small" style="display: inline-block; vertical-align: top; min-width:40%;"><a target="_blank"
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.laundr.io%2F404&amp;src=sdkpreparse"
              class="fb-xfbml-parse-ignore">Share</a></div>
        </div>

      </div>`;
        document.body.appendChild(holder);

        let newScript = document.createElement("script");
        newScript.src = "https://platform.twitter.com/widgets.js";
        holder.appendChild(newScript);

        app.loader
            .add('tokenSheet', "sprites/LaundrBombSprite.json")
            .add('houseSheet', "sprites/backgroundHouse.json");


        setTimeout(() => {
            app.loader
                .load((loader, resources) => {
                    windows = new Windows(app);
                    windows.setUpInstruct();
                });

            setTimeout(() => {
                done();
            }, 300);
        }, 300);
    });

    it('should set credits text', async () => {
        windows.setUpWin();
        windows.titles = "test";
        windows.credits = "test";
        windows.showCredits();

        expect(windows.titles).to.not.equal("test");
        expect(windows.credits).to.not.equal("test");
    });

    it('should bring credits on screen', async () => {
        windows.setUpWin();
        windows.titleMessage.x = -100;
        windows.creditsMessage.x = -100;
        windows.showCredits();

        expect(windows.titleMessage.x).to.equal(WIDTH / 2.3);
        expect(windows.creditsMessage.x).to.equal(WIDTH / 2);
    });

    it('should switch sizes when appropriate', async () => {
        windows.socials.smallScreen = false;
        windows.canvasSize = 600;
        windows.setUpWin();

        expect(windows.socials.smallScreen).to.equal(true);

        windows.socials.smallScreen = true;
        windows.canvasSize = 1200;
        windows.setUpWin();

        expect(windows.socials.smallScreen).to.equal(false);
    });

});