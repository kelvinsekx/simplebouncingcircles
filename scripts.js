var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min+1)) + min;
  return num;
};

//EvilCircle magic
function EvilCircle(x,y,exists){
   Shape.call(this,x,y,20,20,exists);
   this.color = "#fff";
   this.size= 15;
};
EvilCircle.prototype = Object.create(Shape.prototype);
// Object.defineProperty(EvilCircle.prototype, "constructor",{
//   value: EvilCircle,
//   enumerable :false,
//   writable: true
// });
EvilCircle.prototype.constructor = EvilCircle

EvilCircle.prototype.draw = function (){
    ctx.beginPath();
    ctx.lineWidth =5
    ctx.strokeStyle = this.color
    ctx.arc(this.x,this.y,this.size,0, 2 * Math.PI)
    ctx.stroke();
}
EvilCircle.prototype.checkBounds = function(){
  if((this.x + this.size) >= width){
    this.x -= this.size;
  }

  if((this.x - this.size) <= 0){
      this.x += this.size;
  }

  if((this.y + this.size) >= height){
      this.y -= this.size;
  }

  if((this.y - this.size) <= 0){
      this.y += this.size;
  }
}
EvilCircle.prototype.setControls = function (){
  var _this = this;
  window.onkeydown = function(e){
    if(e.keyCode === 65){
      _this.x -= _this.velX;
    }else if (e.keyCode === 68){
      _this.x += _this.velX;
    }else if (e.keyCode === 87){
      _this.y -= _this.velY;
    }else if (e.keyCode === 83){
      _this.y += _this.velY;
    }
  }
};
EvilCircle.prototype.collisionDetect = function(){
  for (var j = 0; j < balls.length; j++) {
    if (balls[j].exists) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists= false;
      }
    }
  }
}

//Ball magic
function Ball(x,y,velX,velY,exists,color,size){
    Shape.call(this,x,y,velX,velY,exists)
    this.color= color;
    this.size= size;
}
Ball.prototype = Object.create(Shape.prototype);
// Object.defineProperty(Ball.prototype, 'constructor', { 
//   value: Ball, 
//   enumerable: false, // so that it does not appear in 'for in' loop
//   writable: true });
Ball.prototype.constructor = Ball


//Shape magic
function Shape(x,y,velX,velY,exists){
    this.x   = x;
    this.y   = y;
    this.velX= velX;
    this.velY= velY;
    this.exists = true
}
Ball.prototype.draw = function(){
    ctx.beginPath();
    ctx.fillStyle = this.color
    ctx.arc(this.x,this.y,this.size,0, 2 * Math.PI)
    ctx.fill();
}

Ball.prototype.update = function (){
    if((this.x + this.size) >= width){
        this.velX = -(this.velX)
    }

    if((this.x - this.size) <= 0){
        this.velX = -(this.velX)
    }

    if((this.y + this.size) >= height){
        this.velY = -(this.velY)
    }

    if((this.y- this.size) <= 0){
        this.velY = -(this.velY)
    }

    this.x += this.velX;
    this.y += this.velY;

}
Ball.prototype.collisionDetect = function() {
    for (var j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        var dx = this.x - balls[j].x;
        var dy = this.y - balls[j].y;
        var distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
        }
      }
    }
  }


var balls = []

while(balls.length < 25){
    var size = random(10,20);
    var ball = new Ball(
        random(0 + size, width-size),
        random(0 + size,height - size),
        random(-7,7),
        random(-7,7),
        true,
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
        size
    )
    balls.push(ball)
}
if(balls.length == 20)
console.log("lola i love you")

    var evilCircle = new EvilCircle(173,160,true)
    evilCircle.setControls()
function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);//(x,y,velX,velY,color,size,exists
    
    for (var i = 0; i < balls.length; i++) {
      if(balls[i].exists)
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
     
    }
    

      evilCircle.draw()
      evilCircle.checkBounds()
      evilCircle.collisionDetect();
  
      requestAnimationFrame(loop);
  }
  loop();
  
