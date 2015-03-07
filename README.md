# activeloop proof of concept

This simple demo shows how socket.io and some HTML5 APIs can be used to connect together:

   * a desktop browser with a fullscreen interactive display
   * multiple mobile phone browsers acting like Wii-mote style controllers

all connected on a local WiFi network and communicating via a Node.js server.


## Running the Server

1. Chrome Browser

	Download and Install from http://chrome.google.com/


2. Node.js

	Download and Install from http://nodejs.org/download/


3. ActiveLoop

	Either check out the software using git

	Or download and unzip from https://github.org/woodcoder/activeloop/downloads


4. Install

	In a Terminal or Start->Node.js command prompt:

		cd activeloop-demo
		npm install


5. Compile

	Run (Mac)

		./node_modules/.bin/coffee -o static/js/ -c src/

	Or (Windows)

		node_modules\.bin\coffee -o static\js\ -c src\

	[Use `-cw` if you're developing and you want it to watch the file for changes]


6. Run Server

		node app.js


7. Point desktop Chrome at the URL shown in the console


8. Point a mobile browser or two at the URL shown in desktop Chrome

    This assumes your phone is connected to the same network and there aren't any firewalls in the way.


9. Play, Together



## Credits

The desktop Chrome display is based on the [Plasmatic Isosurface](https://github.com/soulwire/Plasmatic-Isosurface) demo by Justin Windle which uses his [sketch.js](https://github.com/soulwire/sketch.js) library.  [See the original](http://soulwire.github.com/Plasmatic-Isosurface/)!

