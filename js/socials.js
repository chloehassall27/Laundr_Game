export default class socials {
    app;
    tweet;
    fbShare;
    score;

    twtDiv;
    fbDiv;
    socialsDiv;
    twtTemplate;
    fbTemplate;

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

        //other method (still in progress, does not work right now)
        //this.renderhtml(this.twtTemplate, document.querySelector('#twt'));
        //this.renderhtml(this.fbTemplate, document.querySelector('#fb'));
    }

    resetGame() {
        this.app.stage.removeChild(this.tweet);
        this.app.stage.removeChild(this.fbShare);
    }

    onClickTweet() {
        let link = "https://twitter.com/share?text=I%20just%20got%20a%20score%20of%20" + this.score + "%20on%20%40LaundrOfficial%27s%20hidden%20%23laundr404game%21%0A%0AThink%20you%20can%20do%20better%3F%20Take%20it%20for%20a%20spin%20here%3A";

        window.open(link);
    }

    onClickFBShare() {
        //we can't prefill text for a facebook post - not only is there no known way to do so, but it's literally against fb's tos, so we shouldn't even try. best we can do is link to the 404 page.
        let link = "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.laundr.io%2F404&amp;src=sdkpreparse";

        window.open(link);
    }

    //pixi button-enabled sprites method. works, not sure if it's the "correct" method though
    setupPixiBtns() {
        //let tweetTexture = PIXI.Texture.from("../sprites/Twitter_Icon_resize.png");
        let tweetTexture = PIXI.Texture.from("../sprites/social_icons/Twitter_Icon_Circle.png");
        this.tweet = new PIXI.Sprite(tweetTexture);

        this.tweet.scale.set(SCALE * 0.05);
        this.tweet.anchor.set(0.5);
        this.tweet.x = WIDTH / 2.1;
        this.tweet.y = HEIGHT / 1.25;
        this.tweet.interactive = true;
        this.tweet.buttonMode = true;
        this.tweet.on('pointerdown', this.onClickTweet.bind(this));

        let fbTexture = PIXI.Texture.from("../sprites/social_icons/Facebook_Icon.png");
        this.fbShare = new PIXI.Sprite(fbTexture);

        this.fbShare.scale.set(SCALE * 0.05);
        this.fbShare.anchor.set(0.5);
        this.fbShare.x = WIDTH / 1.92;
        this.fbShare.y = HEIGHT / 1.25;
        this.fbShare.interactive = true;
        this.fbShare.buttonMode = true;
        this.fbShare.on('pointerdown', this.onClickFBShare.bind(this));
    }

    //experimental, rendering html elements on top of the canvas. not even remotely close to working >.>
    setupHTMLBtns() {
        this.socialsDiv = document.getElementById('socials');
        this.socialsDiv.style.position = "absolute";
        this.socialsDiv.style.zIndex = "10";
        this.socialsDiv.style.top = "50%";
        this.socialsDiv.style.width = "100%";
        this.socialsDiv.style.textAlign = "center";
        this.socialsDiv.style.height = HEIGHT;

        this.twtTemplate = '<h4>owo</h4>';
        this.fbTemplate = '<h4>uwu</h4>';
    }

    renderhtml(template, node) {
        node.innerHTML = template;
    }
}