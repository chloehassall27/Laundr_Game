/*
CURRENT BUGS:
-still stupidly fuzzy looking >:T
*/

export default class socials {
    // app;
    // bird;
    // thumbsupShare;
    // score;

    // twtDiv;
    // fbDiv;
    // socialsDiv;

    constructor(app) {
        this.app = app;
        //this.setupPixiBtns();
        this.setupHTMLBtns();

    }

    endGame() {
        //this.score = Math.round(score);

        //pixi interactable sprites method
        // this.app.stage.addChild(this.bird);
        // this.app.stage.addChild(this.thumbsupShare);

        //html method
        // this.renderTwt(this.twtDiv); //must be rendered every time to set text to include recent score
        this.socialsDiv.style.top = '80%';
        this.socialsDiv.style.left = "50%";
        this.socialsDiv.style.transform = "translate(-50%, -50%)";
    }

    resetGame() {
        //pixi interactable sprites method
        // this.app.stage.removeChild(this.bird);
        // this.app.stage.removeChild(this.thumbsupShare);

        //html method
        this.socialsDiv.style.left = "-100%";
        this.twtDiv.innerHTML = "";
    }

    onClickbird() {
        let link = "https://twitter.com/share?text=I%20just%20got%20a%20score%20of%20" + this.score + "%20on%20%40LaundrOfficial%27s%20hidden%20%23laundr404game%21%0A%0AThink%20you%20can%20do%20better%3F%20Take%20it%20for%20a%20spin%20here%3A";

        window.open(link);
    }

    onClickthumbsupShare() {
        //we can't prefill text for a facebook post - not only is there no known way to do so, but it's literally against thumbsup's tos, so we shouldn't even try

        let link = "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.laundr.io%2F404&amp;src=sdkpreparse";

        window.open(link);
    }

    //pixi button-enabled sprites method
    setupPixiBtns() {
        let birdTexture = PIXI.Texture.from("../sprites/social_icons/bird_small.png");
        birdTexture = new PIXI.Texture(birdTexture.baseTexture, new PIXI.Rectangle(170, 0, 650, 256));
        //birdTexture.baseTexture.setSize(256, 64, 2);
        birdTexture.baseTexture.mipmap = true;
        // birdTexture = new PIXI.Texture(birdTexture.baseTexture, new PIXI.Rectangle(42, 0, 162, 64));
        this.bird = new PIXI.Sprite(birdTexture);

        this.bird.anchor.set(0.5);
        this.bird.x = WIDTH / 2.2;
        this.bird.y = HEIGHT / 1.25;
        this.bird.interactive = true;
        this.bird.buttonMode = true;
        // this.bird.antialias = false;
        this.bird.resolution = 2;
        this.bird.scale.set(SCALE * 0.1);

        this.bird.on('pointerdown', this.onClickbird.bind(this));

        let thumbsupTexture = PIXI.Texture.from("../sprites/social_icons/thumbsup.png");
        thumbsupTexture = new PIXI.Texture(thumbsupTexture.baseTexture, new PIXI.Rectangle(170, 0, 650, 256));
        //thumbsupTexture.baseTexture.setSize(256, 256, 5);
        thumbsupTexture.baseTexture.mipmap = true;
        this.thumbsupShare = new PIXI.Sprite(thumbsupTexture);

        this.thumbsupShare.anchor.set(0.5);
        this.thumbsupShare.x = WIDTH / 1.85;
        this.thumbsupShare.y = HEIGHT / 1.25;
        this.thumbsupShare.interactive = true;
        this.thumbsupShare.buttonMode = true;
        this.bird.resolution = 2;
        this.thumbsupShare.scale.set(SCALE * 0.1);


        this.thumbsupShare.on('pointerdown', this.onClickthumbsupShare.bind(this));
    }

    //html method
    setupHTMLBtns() {
        this.socialsDiv = document.getElementById('socials');
        this.twtDiv = document.getElementById('twtDiv');
        this.fbDiv = document.getElementById('fbDiv');

        this.socialsDiv.style.position = "absolute";
        this.socialsDiv.style.zIndex = "10";
        this.socialsDiv.style.textAlign = "center";

        this.socialsDiv.style.left = "-999%";

        this.renderTwt();
        this.endGame();
    }

    renderTwt() {
        this.score = SCORE;
        this.twtDiv.innerHTML = "";
        let text = `I just got a score of ` + this.score + ` on @LaundrOfficial's hidden #laundr404game!\n\nThink you can do better? Take it for a spin here:\n`;
        twttr.widgets.createShareButton('https://www.laundr.io/404', this.twtDiv, {
            text: text
        });
    }

    resetTwtDiv() {
        this.twtDiv.innerHTML = "";
    }
}