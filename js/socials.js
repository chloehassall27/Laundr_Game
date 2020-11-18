/*
CURRENT BUGS:
-still stupidly fuzzy looking >:T
*/

export default class socials {
    app;
    tweet;
    fbShare;
    score;

    twtDiv;
    fbDiv;
    socialsDiv;

    constructor(app) {
        this.app = app;
        this.setupPixiBtns();
        //this.setupHTMLBtns();

    }

    endGame(score) {
        this.score = Math.round(score);

        //pixi interactable sprites method
        this.app.stage.addChild(this.tweet);
        this.app.stage.addChild(this.fbShare);

        //html method
        // this.renderTwt(this.twtDiv);
        // this.fbDiv.style.opacity = "1";
        // this.fbDiv.style.pointerEvents = "fill";
    }

    resetGame() {
        this.app.stage.removeChild(this.tweet);
        this.app.stage.removeChild(this.fbShare);

        // this.twtDiv.innerHTML = "";
        // this.fbDiv.style.opacity = "0";
        // this.fbDiv.style.pointerEvents = "none";
    }

    onClickTweet() {
        let link = "https://twitter.com/share?text=I%20just%20got%20a%20score%20of%20" + this.score + "%20on%20%40LaundrOfficial%27s%20hidden%20%23laundr404game%21%0A%0AThink%20you%20can%20do%20better%3F%20Take%20it%20for%20a%20spin%20here%3A";

        window.open(link);
    }

    onClickFBShare() {
        //we can't prefill text for a facebook post - not only is there no known way to do so, but it's literally against fb's tos, so we shouldn't even try

        let link = "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.laundr.io%2F404&amp;src=sdkpreparse";

        window.open(link);
    }

    //pixi button-enabled sprites method
    setupPixiBtns() {
        let tweetTexture = PIXI.Texture.from("../sprites/social_icons/tweet_button_small.png");
        tweetTexture = new PIXI.Texture(tweetTexture.baseTexture, new PIXI.Rectangle(170, 0, 650, 256));
        //tweetTexture.baseTexture.setSize(256, 64, 2);
        tweetTexture.baseTexture.mipmap = true;
        // tweetTexture = new PIXI.Texture(tweetTexture.baseTexture, new PIXI.Rectangle(42, 0, 162, 64));
        this.tweet = new PIXI.Sprite(tweetTexture);

        this.tweet.anchor.set(0.5);
        this.tweet.x = WIDTH / 2.2;
        this.tweet.y = HEIGHT / 1.25;
        this.tweet.interactive = true;
        this.tweet.buttonMode = true;
        // this.tweet.antialias = false;
        this.tweet.resolution = 2;
        this.tweet.scale.set(SCALE * 0.1);

        this.tweet.on('pointerdown', this.onClickTweet.bind(this));

        let fbTexture = PIXI.Texture.from("../sprites/social_icons/fb_button.png");
        fbTexture = new PIXI.Texture(fbTexture.baseTexture, new PIXI.Rectangle(170, 0, 650, 256));
        //fbTexture.baseTexture.setSize(256, 256, 5);
        fbTexture.baseTexture.mipmap = true;
        this.fbShare = new PIXI.Sprite(fbTexture);

        this.fbShare.anchor.set(0.5);
        this.fbShare.x = WIDTH / 1.85;
        this.fbShare.y = HEIGHT / 1.25;
        this.fbShare.interactive = true;
        this.fbShare.buttonMode = true;
        this.tweet.resolution = 2;
        this.fbShare.scale.set(SCALE * 0.1);


        this.fbShare.on('pointerdown', this.onClickFBShare.bind(this));
    }

    //html method
    setupHTMLBtns() {
        this.socialsDiv = document.getElementById('socials');
        this.twtDiv = document.getElementById('twtDiv');
        this.fbDiv = document.getElementById('fbDiv');

        this.socialsDiv.style.position = "absolute";
        this.socialsDiv.style.zIndex = "10";
        this.socialsDiv.style.top = "80%";
        this.socialsDiv.style.left = "50%";
        this.socialsDiv.style.transform = "translate(-50%, -50%)";
        this.socialsDiv.style.textAlign = "center";

        this.fbDiv.style.opacity = "0";
        this.fbDiv.style.pointerEvents = "none";
    }

    renderTwt(node) {
        let text = `I just got a score of ` + this.score + ` on @LaundrOfficial's hidden #laundr404game!\n\nThink you can do better? Take it for a spin here:\n`;
        twttr.widgets.createShareButton('https://www.laundr.io/404', node, {
            text: text
        });
    }
}