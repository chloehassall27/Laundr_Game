## HamperMan Game
The HamperMan game is a Laundr-themed version of Google Chrome’s dino game. It is available on desktop and mobile browsers. The game is built on the pixi-js framework, allowing for wide compatibility and solid performance.

## Motivation
This project was built to give users of the Laundr website a fun way to interact with the site when they run into a 404 page. 

## Build status
Check for the active build deployments under the environments tab. The [main build](http://laundr-game.herokuapp.com/) is the deployment of the most recent master commit.

## Tech/framework used
Game code was created using Javascript. Active deployments are created with [heroku](https://www.heroku.com/).

<b>Built with</b>
- [Pixi.js](https://github.com/pixijs)
- [pixi-sound](https://github.com/pixijs/pixi-sound)

## Features
* Jumping
* Ducking
* Display of high score and current score 
* Random obstacle spawning
* Score bonus tokens aka Laundr bombs 
* Restart functionality
* Share high score to Twitter and Facebook
* Mute functionality 
* Coupon code displayed on a win
* Puns displayed on game over screens
* Display credits on a win
* Lose game
* Win game
* Compatible with mobile 
* Auto pause when game tab loses focus
* Sound Effects on jumping, collecting a token, losing, and winning	

## Installation
To install all necessary files required for further development, run ```
npm i
```
Optionally, run ```
npm run-script env
``` to change the port the npm runs on

To start, run ```
npm start
```

## Integration
To integrate the game into the Laundr website, add all files from our project into your directory, ensuring that pathways remain intact. For example, if you must  move the .js files from the js folder, ensure all import statements at the top of game.js are updated to remain accurate.

In the main index.html page of the Laundr website, several things will have to be added. In the <header> of the html file, add the following scripts:

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.3.3/pixi.min.js"></script>
<script>
    if (typeof PIXI == 'undefined') {
      document.write('<script src="js/pixi.min.js">\x3C/script>');
    }
  </script>

<script src="/node_modules/pixi-sound/dist/pixi-sound.js"></script>
```

At the top of the <body> in the html file, add these additional scripts. They must be added in the <body> tag rather than the <header> to improve the response time between the Laundr website and the social media API. If these scripts are already present in the Laundr html file, they do not need to be added a second time.

```
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

  <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v9.0"
    nonce="nU5nxJVO"></script> 
```

To add the game itself, the following html will need to be added inside the <body> element.

```
<div class="container">
      <div class="laundr-game" id="laundr-game" style="position: relative;">
        <canvas class="pixiCanvas" id="pixiCanvas" , style="width:100%;"></canvas>

        <div class="socials" id="socials" style="width: 25%; min-width: 70px;">
          <div class="twtDiv" id="twtDiv" style="display: inline-block; vertical-align: top; min-width:40%;"></div>
          <div id="fb-root" style="display: inline-block; vertical-align: top; width:0%;"></div>
          <div class="fbDiv fb-share-button" id="fbDiv" data-href="https://www.laundr.io/404" data-layout="button"
            data-size="small" style="display: inline-block; vertical-align: top; min-width:40%;"><a target="_blank"
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.laundr.io%2F404&amp;src=sdkpreparse"
              class="fb-xfbml-parse-ignore">Share</a></div>
        </div>

      </div>
    </div>
```

If you would like for the game to display in the same location as we have set it up in the gameDemo deployment, please open that branch. The Laundr 404 page has been downloaded and modified in our gameDemo.html file. Our code has been indicated with large comment blocks; you may find the location of where to insert the above code by finding these comment blocks. 

## API Reference
The [Tweet Button](https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview) from Twitter was used to allow players to share their score to Twitter. 

The [Share Button](https://developers.facebook.com/docs/plugins/share-button/) from Facebook was used to allow players to share their score to Facebook.

## Tests
Unit tests were created using [Canvest](https://github.com/TyrealGray/Canvest) to allow for tests that interact with canvas elements. To run the tests, use the untiTests branch. 

Ensure that the directory used has no spaces in it. For example, use C:/unitTests, not C:/unit Tests, as canvest will not automatically convert this directory to C:/”unit Tests” for you and will be unable to find your project.

Run ```
npm i @canvest/canvest-cli --save-dev
```

as well as ```
npm install pixi.js
```

After all files have installed, run ```
npm test
```

If you encounter permissions errors, try running powershell as an administrator. 

If canvest runs successfully, a browser tab will open with the results of the tests. It will take some time for all tests to be generated, as many tests require short timeOut statements that all add up to several long seconds of tests. 

To add additional tests, ensure that every test file is in the fileName.canvest.js format, and placed within the canvest folder in the project directory.

Functional tests can all be conducted by opening the [main heroku deployment](http://laundr-game.herokuapp.com/) and playing the game. 

##How to play?
To play the game on desktop, press ‘space’ or ‘up’ to make the player character jump, and ‘down’ to make the player duck. To successfully duck under obstacles, ‘down’ will have to be pressed and held, as the player will exit the duck as soon as ‘down’ has been released. For longer air-time to help clear larger obstacles, press and hold the jump button. To accelerate the player’s fall from a jump, press the duck button while mid-jump. Use these controls to avoid the various obstacles, which include washing machines, hampers of dirty laundry, and flying clothes irons. 

To pick up score bonus tokens, move the player character so it collides with the golden Laundr bomb sprites. 

If the player collides with an obstacle, they will die instantly. Restart the game by pressing the jump button or by clicking on the blue restart button on the screen. If the player is able to avoid all obstacles for a continuous five minutes, they will win the game.

To play the game on mobile, tap the space above the road to jump, and tap the space below the road to duck. Press and hold to simulate holding down a key.

## Credits
This game was inspired by the [Google Chrome dino game](https://chromedino.com/). 

The people who worked on this project include:
**Kyle Hassall** - [kylehassall27](https://github.com/kylehassall27)
* Scrum Master
* Canvas setup
* Resizing
* Jumping and ducking
* Keyboard and touch input
* House spawning
* Mute
* Heroku deployment
**Oliver Thomas** - [thomasoliver2021](https://github.com/thomasoliver2021)
* Product Owner
* Obstacle spawning
* End-screen and instruction windows
* Collision
* Audio
**Olivia Jacques-Baker** - [piptstc](https://github.com/piptstc)
* Obstacle spawning
* Social media integration
* Player sprites
* Collision
* Unit testing
* Win functionality and sequence
**Simran Patel** - [simranpatel-coder](https://github.com/simranpatel-coder)
* Jumping
* Coupon code 
* Obstacle sprites
* Background sprites
* Score and highscore
* Restart functionality
**Michael Zinn** - [mzinn18](https://github.com/mzinn18)
* Token sprite
* Button sprite
* Canvas setup
* Game demo page
* Puns and random pun generator

## License
This game was created for Laundr LLC.

