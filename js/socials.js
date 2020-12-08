

export default class socials {

    constructor(app) {
        this.app = app;
        this.socialsDiv = document.getElementById('socials');
        this.twtDiv = document.getElementById('twtDiv');
        this.fbDiv = document.getElementById('fbDiv');

        if (WIDTH < 540) this.smallScreen = true;
        this.smallScreenSetup();
        this.setupHTMLBtns();
        setTimeout(this.checkForBlock2.bind(this), 200);
    }

    endGame() {
        //html method
        this.bringOnScreen(false);
        this.renderTwt();
    }

    switchSizes() {
        this.smallScreen = !this.smallScreen;
        this.resetGame();
        this.bringOnScreen(false);
    }

    resetGame() {
        //html method
        this.socialsDiv.style.left = "-100%";
        if (this.adBlock) this.backupSocialsDiv.style.left = "-100%";
        this.smallScreenDiv.style.left = "-100%";
        this.sSMenu.style.left = "-100%";
    }

    restartGame() {
        this.resetGame();
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

    //html method
    setupHTMLBtns() {
        this.socialsDiv.style.position = "absolute";
        this.socialsDiv.style.zIndex = "10";
        this.socialsDiv.style.textAlign = "center";

        this.socialsDiv.style.left = "-999%";

        this.renderTwt();
        //this.endGame();

    }
    bringOnScreen(center) {
        let yVal;
        if (center) yVal = "50%";
        else yVal = "78%";

        if (center || !this.smallScreen) {
            if (!this.adBlock) {
                this.socialsDiv.style.top = yVal;
                this.socialsDiv.style.left = "50%";
                this.socialsDiv.style.transform = "translate(-50%, -50%)";
            } else {
                this.backupSocialsDiv.style.top = yVal;
                this.backupSocialsDiv.style.left = "50%";
                this.backupSocialsDiv.style.transform = "translate(-50%, -50%)";
            }
        } else if (this.smallScreen) {
            this.smallBringOnScreen();
        }
    }

    smallBringOnScreen() {
        this.smallScreenDiv.style.top = '77%';
        this.smallScreenDiv.style.left = "50%";
        this.smallScreenDiv.style.transform = "translate(-50%, -50%)";
    }

    renderTwt() {
        if (!this.adBlock) {
            this.score = SCORE;
            this.twtDiv.innerHTML = "";
            let text = `I just got a score of ` + this.score + ` on @LaundrOfficial's hidden #laundr404game!\n\nThink you can do better? Take it for a spin here:\n`;
            twttr.widgets.createShareButton('https://www.laundr.io/404', this.twtDiv, {
                text: text
            });
        } else {
            this.twtBackupDiv.onclick = function () {
                let link = "https://twitter.com/share?text=I%20just%20got%20a%20score%20of%20" + SCORE + "%20on%20%40LaundrOfficial%27s%20hidden%20%23laundr404game%21%0A%0AThink%20you%20can%20do%20better%3F%20Take%20it%20for%20a%20spin%20here%3A";

                window.open(link);
            };
        }

    }

    smallScreenSetup() {
        this.laundrDiv = document.getElementById('laundr-game');
        this.smallScreenDiv = document.createElement('div');
        this.smallScreenDiv.classList.add("smallScreenDiv");
        this.smallScreenDiv.style.width = "17%";
        this.smallScreenDiv.style.minWidth = "17%";
        this.smallScreenDiv.style.position = "absolute";
        this.smallScreenDiv.style.textAlign = "center";
        this.smallScreenDiv.innerHTML = "Share your Score!";
        this.smallScreenDiv.style.padding = "0.4vw";
        this.smallScreenDiv.style.cursor = 'pointer';
        this.smallScreenDiv.style.fontSize = "2vw";
        this.smallScreenDiv.style.margin = "0px";
        this.smallScreenDiv.style.backgroundColor = "#01C9E1";
        this.smallScreenDiv.style.color = "white";
        this.laundrDiv.appendChild(this.smallScreenDiv);

        this.smallScreenDiv.style.left = "-999%";

        this.smallScreenDiv.onclick = this.smallScreenPopup.bind(this);

        this.sSMenu = document.createElement('div');
        this.sSMenu.classList.add("sSMenu");
        this.sSMenu.style.width = "5%";
        this.sSMenu.style.position = "absolute";
        this.sSMenu.style.padding = "10vw";
        this.sSMenu.style.margin = "0px";
        this.sSMenu.style.backgroundColor = "#F9F9F9";
        this.sSMenu.style.zIndex = "3";
        this.laundrDiv.appendChild(this.sSMenu);

        this.sSMenu.style.top = '50%';
        this.sSMenu.style.left = "-999%";

        this.xButton = document.createElement('div');
        this.xButton.classList.add('xButton');
        this.xButton.innerHTML = "×";
        this.xButton.style.fontSize = "4vw";
        this.xButton.style.fontWeight = "900";
        this.xButton.style.fontFamily = "Impact";
        this.xButton.style.position = "absolute";
        this.xButton.style.cursor = 'pointer';
        this.sSMenu.appendChild(this.xButton);

        this.xButton.style.top = "10%";
        this.xButton.style.left = "95%";
        this.xButton.style.transform = "translate(-50%, -50%)";

        this.xButton.onclick = this.smallScreenReset.bind(this);

    }

    smallScreenPopup() {
        this.laundrDiv = document.getElementById('laundr-game');

        this.sSMenu.style.top = '48%';
        this.sSMenu.style.left = "50%";
        this.sSMenu.style.transform = "translate(-50%, -50%)";

        this.bringOnScreen(true);
    }

    smallScreenReset() {
        this.sSMenu.style.left = "-999%";
        this.resetGame();
        this.smallBringOnScreen();
    }

    resetTwtDiv() {
        if (!this.adBlock) this.twtDiv.innerHTML = "";
    }

    checkForBlock2() {
        if (this.twtDiv.innerHTML === "") {
            this.backup();
        }
    }

    backup() {
        this.adBlock = true;

        this.laundrDiv = document.getElementById('laundr-game');

        this.backupSocialsDiv = document.createElement('div');
        this.backupSocialsDiv.classList.add("backupsocials");
        this.backupSocialsDiv.style.width = "25%";
        this.backupSocialsDiv.style.position = "absolute";
        this.backupSocialsDiv.style.zIndex = "5";
        this.backupSocialsDiv.style.textAlign = "center";
        this.laundrDiv.appendChild(this.backupSocialsDiv);


        this.twtBackupDiv = document.createElement('div');
        this.twtBackupDiv.innerHTML = "Twitter";
        this.twtBackupDiv.classList.add("backupbird");
        this.twtBackupDiv.style.display = "inline-block";
        this.twtBackupDiv.style.verticalAlign = "top";
        this.twtBackupDiv.style.minWidth = "40%";
        this.twtBackupDiv.style.color = "blue";
        this.twtBackupDiv.style.textDecoration = "underline";
        this.twtBackupDiv.style.fontSize = "2vw";
        this.backupSocialsDiv.appendChild(this.twtBackupDiv);
        this.twtBackupDiv.style.cursor = 'pointer';
        this.twtBackupDiv.onclick = function () {
            let link = "https://twitter.com/share?text=I%20just%20got%20a%20score%20of%20" + SCORE + "%20on%20%40LaundrOfficial%27s%20hidden%20%23laundr404game%21%0A%0AThink%20you%20can%20do%20better%3F%20Take%20it%20for%20a%20spin%20here%3A";

            window.open(link);
        };

        this.fbBackupDiv = document.createElement('div');
        this.fbBackupDiv.innerHTML = "Facebook";
        this.fbBackupDiv.classList.add("backupbird");
        this.fbBackupDiv.style.display = "inline-block";
        this.fbBackupDiv.style.verticalAlign = "top";
        this.fbBackupDiv.style.minWidth = "40%";
        this.fbBackupDiv.style.color = "blue";
        this.fbBackupDiv.style.textDecoration = "underline";
        this.fbBackupDiv.style.fontSize = "2vw";
        this.backupSocialsDiv.appendChild(this.fbBackupDiv);
        this.fbBackupDiv.style.cursor = 'pointer';
        this.fbBackupDiv.onclick = function () {
            let link = "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.laundr.io%2F404&amp;src=sdkpreparse";

            window.open(link);
        };

        this.backupSocialsDiv.style.left = "-999%";

    }
}