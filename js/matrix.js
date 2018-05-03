
var numberLines = 30;
var numberColumns = 30;
var xFontSize = 12;
var xFrameRate = 30;
var xCharColor = '#66af11';
var xDefOpacity = 255;
var xCanHeight = numberLines*xFontSize+200;
var xCanWidth = numberColumns*xFontSize;
var xSeconds = 0;
var xFrame = 0;
var xTimems = 0;
var xOffset = 1;

function setup() {
  createCanvas(xCanWidth, xCanHeight);
  stroke(255);     // Set line drawing color to white
  frameRate(xFrameRate);
  mtx = new Matrix(numberColumns);
  mtx.fillMatrix();
}

function draw() {
  noStroke();
  background(0);
  mtx.updateCycle();

}

function Character(letter, number, startX, speed, first) {
  this.x = startX;
  this.y = number*(xFontSize+xOffset);
  //this.y = startY;
  this.letter = letter;
  this.opacity = xDefOpacity;
  this.color = xCharColor;
  this.speed = speed;
  this.switchInterval = round(random(2, 25));
  this.first = first;

  this.setToRandomSymbol = function() {
    var charType = round(random(0, 5));
    if (frameCount % this.switchInterval == 0) {
      if (charType > 1) {
        this.letter = String.fromCharCode(
          0x30A0 + round(random(0, 96))
        );
      } else {
        // set it to numeric
        this.letter = round(random(0,9));
      }
    }
  }

  this.rain = function() {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }
}

function Stream(count) {
  this.lengthobj = random(20,40);
  this.startX = count*(xFontSize+xOffset); // count --> which number of line
  this.speed = random(1,2);
  this.characters = [];
  this.first;

  var first = true;

    for (var i = 0; i < this.lengthobj; i++) {
      var ch = new Character(char(random(256)), i, this.startX, this.speed, first);
      ch.setToRandomSymbol();
      this.characters.push(ch);
      first = false;
      //console.log(ch);
    }

  this.updateCycle = function () {
    for (var i = 0; i < this.characters.length; i++) {
      var symbol = this.characters[i];
      text(symbol.letter, symbol.x, symbol.y);
      if (symbol.first) {
        fill(255, 255, 255, symbol.opacity);
      } else {
        fill(30, 197, 3, symbol.opacity);
      }

      symbol.rain();
      symbol.setToRandomSymbol();

    }
  }
}


function Matrix(columns) {
  this.columns = columns;

  this.codelines = [];
  this.currLine = 0;

  this.fillMatrix = function () {
    for (var i = 0; i < this.columns; i++) {
      var cdl = new Stream(i);
      //console.log(cdl);
      this.codelines.push(cdl);
    }
  }

  this.updateCycle = function () {
    for (var i = 0; i < this.codelines.length; i++) {
      this.codelines[i].updateCycle();
    }
  }

}
