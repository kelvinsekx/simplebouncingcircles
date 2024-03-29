function Person (first, last, age,gender,interests){
    this.name={
        first,
        last
    }
    this.age    =age;
    this.gender =gender;
    this.interests=interests;
}
function Teacher (first,last,age,gender,interests,subject){
    Person.call(this, first,last,gender,interests)
    this.subject= subject;
}
Teacher.prototype = Object.create(Person.prototype);
Object.defineProperty(Teacher.prototype, 'constructor', { 
    value: Teacher, 
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true });









    var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min+1)) + min;
  return num;
}

function Ball(x,y,velX,velY,color,size){
    this.x   = x;
    this.y   = y;
    this.velX= velX;
    this.velY= velY;
    this.color= color;
    this.size= size;
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

    if((this.x + this.size) >= height){
        this.velY = -(this.velY)
    }

    if((this.x - this.size) <= 0){
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
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
        size
    )
    balls.push(ball)
}
function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);
  
    for (var i = 0; i < balls.length; i++) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  
    requestAnimationFrame(loop);
  }
  loop();