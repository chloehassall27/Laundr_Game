# HamperMan Game
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
* Instructions on game start
* Jumping and ducking
* Random obstacle spawning
* Display high score and current score
* Sound effects on player actions
* Mute functionality
* Auto pause when game tab loses focus
* Score bonus tokens
* Lose or win game
* Restart functionality
* Coupon code displayed on a win
* Puns displayed on game over screens
* Display credits on a win
* Share high score to Twitter and Facebook
* Compatible with mobile


## Installation
To install all necessary files required for further development, run: 
```
npm i
```
Optionally, run: 
```
npm run-script env
``` 
to change the port the npm runs on.

To start, run: 
```
npm start
```

## Integration
To integrate the game into the Laundr website, add all files from our project into your directory, ensuring that pathways remain intact. For example, if you must move the .js files from the js folder, ensure all import statements at the top of game.js are updated to remain accurate.

In the main index.html page of the Laundr website, only 3 lines of code need to be added.

To add the game itself, the following html will need to be added inside the <body> element.

```
<div style='position: relative; overflow: hidden; padding-top: 25%;'>
    <iframe src="index.html" title="404 - Game Found!" style='position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;' scrolling="no" frameborder="0"  onload="parent.resize(document.body.scrollHeight);"></iframe>
</div>
```

If you would like for the game to display in the same location as we have set it up in the gameDemo deployment, please open that branch. The Laundr 404 page has been downloaded and modified in our demo.htm file. Our code has been indicated with large comment blocks (stating “THIS IS OUR STUFF”); you may find the location of where to insert the above code by finding these comment blocks. 

There are also several elements of our game that can be edited easily, if there is a desire to change them before/after integration. These elements can be edited through three text files within the inputData folder:

* lose_puns.txt: Contains all of the puns that will be shown on a lose screen, separated by a newline character
* win_puns.txt: Contains all of the puns that will be shown on a win screen, separated by a newline character
* couponcode.txt: Contains the coupon code that will show on a win screen

To edit these files, open the relevant text file and edit the contents. Upon saving, the game will automatically include any changes that were made.

It is possible that the y location of the puns on the end-game screens will differ once fully integrated into your site. To change this y location:
  * Within the js/windows.js file go to line 67, which should read: ``` this.pun.y = HEIGHT / 2.5; ```
* Making “2.5” bigger will move the pun up, making it smaller will move the pun down.

## API Reference
The [Tweet Button](https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview) from Twitter was used to allow players to share their score to Twitter. 

The [Share Button](https://developers.facebook.com/docs/plugins/share-button/) from Facebook was used to allow players to share their score to Facebook.

## Tests
Unit tests were created using [Canvest](https://github.com/TyrealGray/Canvest) to allow for tests that interact with canvas elements. To run the tests, use the unitTests branch. 

Ensure that the directory used has no spaces in it. For example, use C:/unitTests, not C:/unit Tests, as canvest will not automatically convert this directory to C:/”unit Tests” for you and will be unable to find your project.

Run: 
```
npm i @canvest/canvest-cli --save-dev
```

as well as: 
```
npm install pixi.js
```

After all files have installed, run: 
```
npm test
```

If you encounter permissions errors, try running powershell as an administrator. 

If canvest runs successfully, a browser tab will open with the results of the tests. It will take some time for all tests to be generated, as many tests require short timeOut statements that all add up to several long seconds of tests. 

To add additional tests, ensure that every test file is in the fileName.canvest.js format, and placed within the canvest folder in the project directory.

Functional tests can all be conducted by opening the [main heroku deployment](http://laundr-game.herokuapp.com/) and playing the game. 

## How to play?
To play the game on desktop, press ‘space’ or ‘up’ to make the player character jump, and ‘down’ to make the player duck. To successfully duck under obstacles, ‘down’ will have to be pressed and held, as the player will exit the duck as soon as ‘down’ has been released. For longer air-time to help clear larger obstacles, press and hold the jump button. To accelerate the player’s fall from a jump, press the duck button while mid-jump. Use these controls to avoid the various obstacles, which include washing machines, hampers of dirty laundry, and flying clothes irons. 

To pick up score bonus tokens, move the player character so it collides with the golden Laundr bomb sprites. 

If the player collides with an obstacle, they will die instantly. Restart the game by pressing the jump button or by clicking on the blue restart button on the screen. If the player is able to avoid all obstacles for a continuous five minutes, they will win the game.

To play the game on mobile, tap the space above the road to jump, and tap the space below the road to duck. Press and hold to simulate holding down a key.

## Credits
This game was inspired by the [Google Chrome dino game](https://chromedino.com/). References used while building this project include [kittykatattack's Learning Pixi](https://github.com/kittykatattack/learningPixi) tutorial, as well as [Dower Chin's Pixi.js Video Series](https://www.youtube.com/user/dowerchin).

The people who worked on this project include:

**Kyle Hassall** - [kylehassall27](https://github.com/kylehassall27)
* Scrum Master
* Resizing
* Jumping and ducking
* Keyboard and touch input
* House spawning
* Mute
* Game demo page
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
* Game demo page
* End game puns

## License
This game was created for [Laundr LLC](https://www.laundr.io/).
