#	Blipsy

<p align="center">
	<img src="maskable-icon.png" width="200"/>
</p>

Blipsy is a tool for making tiny games. You are able to do all of your programming and art right in the simple to understand editor. You can also share programs made with Blipsy with others though json files and soon web exports. Blipsy is still in VERY early alpha but it should have enough to create simple fun games.

##	TODO
*	~Web exports~
*	Map editor (maybe)
*	Making it a PWA
*	IDK what else

##	Specs
*	64x64 pixels
*	13 sprite slots
*	One sinewave oscillator
*	JS scripting
*	2 color pallete


##	Your average Blipsy program

```js
var x;
Blipsy.boot = () => {
	//Runs when Blipsy is booted/restarted
	x = 0;
};

Blipsy.update = () => {
	//Runs very tick
	x++;
    Blipsy.clearScreen();
	Blipsy.drawSprite(0, x,0);
};

```

##	A simple API

```js
//Draws the sprite that is stored in it's respective ID at x and y
Blipsy.drawSprite(id, x, y)

//Draws pixel at x and y
Blipsy.drawPixel(x, y)

//Clears screen
Blipsy.clearScreen()

//Get the mouse x and y
Blipsy.mouse.x
Blipsy.mouse.y

//Check is a key is pressed
Blipsy.keys["ArrowUp"] //ArrowUp, ArrowDown, Space, etc

//Plays a tone for a split second
Blipsy.beepTone(hertz)

//Yep, that is all you need to start making programs with blipsy!
```