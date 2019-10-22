var capturecamera;
var myCuteButton; //red button
var myCuteButton1; //fuchsia button
var myCuteButton2; //green button
var _x;
var _y;
var _d;
var dist;
var c = 1; //variable
var camerawidth; //dimensioni immagine
var cameraheight; //dimensioni immagine
var sfondo;
var g = true;

//function preload() {} //useless in this exercise

function setup() {
  createCanvas(windowWidth, windowHeight); //create canvas
  imageMode(CENTER); //refer to the center of the picture
  rectMode(CENTER); //refer to the center of every rectangles

  capturecamera = createCapture(VIDEO); //initialize the camera and the video
  capturecamera.size(640 * c, 480 * c); //dimensions of the video
  capturecamera.hide(); //hiding video under the canvas

  camerawidth = 640 * c; //initialize camera width
  cameraheight = 480 * c; //initialize camera width
}




function draw() {
  var myText = "Red = close // Fuchsia = cool // green = full screen // (touch everywhere to refresh)";
  push();
  textFont("Major Mono Display");
  textSize(20);
  fill('#04ffe2');
  text(myText, 20, 40);
  pop();



  myCuteButton = new Button(windowWidth / 2 * c * 3 / 5, windowHeight / 9 * c, 12 * c, "#ff4d4a"); //red button
  myCuteButton1 = new Button(windowWidth / 2 * c * 3 / 5 + (12 * c * 2), windowHeight / 9 * c, 12 * c, "#ff3ac4"); //fuchsia button
  myCuteButton2 = new Button(windowWidth / 2 * c * 3 / 5 + (12 * c * 4), windowHeight / 9 * c, 12 * c, "#25eb02"); //green button

  //white page
  push();
  noStroke();
  rect(windowWidth / 2 * c, windowHeight / 9 * c + (20 * c / 2) + (490 * c / 2), 650 * c, 490 * c); //white page
  pop();

  //gray bar
  push();
  noStroke(); //no stroke
  fill("#cccac9"); //color
  rect(windowWidth / 2 * c, windowHeight / 9 * c, 650 * c, 20 * c); //gray bar
  pop();


  var myPicture = capturecamera.loadPixels();

  push()
  if (g == false) {
    filter(INVERT);
  } else if (g == true) {
    filter(INVERT);
    filter(INVERT);
  }

  image(myPicture, windowWidth / 2 * c, windowHeight / 9 * c + (20 * c / 2) + (490 * c / 2), camerawidth, cameraheight); // size of the image
  pop()


  myCuteButton.display(); //display the button
  myCuteButton1.display(); //display the button
  myCuteButton2.display(); //display the button

}

function mouseClicked() { //function mouse click 
  myCuteButton.clicked();
  myCuteButton1.clicked();
  myCuteButton2.clicked();
}



function Button(_x, _y, _d, _color) { //function button --> reusable
  this.x = _x;
  this.y = _y;
  this.d = _d;
  this.color = _color;

  this.display = function() {
    push();
    noStroke();
    fill(this.color);

    ellipse(this.x, this.y, this.d);
    pop();
  }

  this.clicked = function() {

    if (dist(windowWidth / 2 * c * 3 / 5, _y, mouseX, mouseY) < _d) { //clicking red(color) button
      g = true;
      c = 50; //not very clever but I wanted everything to disappear :( the clean() function isn't working

    } else if (dist(windowWidth / 2 * c * 3 / 5 + (12 * c * 2), _y, mouseX, mouseY) < _d) { //clicking fuchsia button
      g = false;
      background(color("red"));

    } else if (dist(windowWidth / 2 * c * 3 / 5 + (12 * c * 4), _y, mouseX, mouseY) < _d) { //clicking green button
      g = true;
      console.log(camerawidth);
      camerawidth = windowWidth; //the green button make the video full screen
      cameraheight = windowHeight + 100; //the green button make the video full screen

    } else { //clicking around the desktop
      g = true;
      background(color("blue"));
      c = 1; //set c with first value
      camerawidth = 640 * c; //initialize camera width
      cameraheight = 480 * c; //initialize camera width

    }
  }
}
