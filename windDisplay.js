class windCircles {
  constructor(truespeed, degree, t){
    this.x = random(400)
    this.y = random(400)
    this.diameter = random(3,8)
    this.truespeed = truespeed 
    this.speed = this.truespeed + random(-truespeed/2,truespeed/2) 
    this.transparency = random(50,255)
    this.vx = cos(degree); 
    this.vy = sin(degree); 

    if (t > 80) {
      this.r = 255;
    } else {
      this.r = 0;
    } 

    if (t > 30 && t <= 80) {
      this.g = 255;
    } else {
      this.g = 0;
    }

    if (t <= 30) {
      this.b = 255;
    } else {
      this.b = 0;
    }
    
    if(this.speed<1){this.speed = this.truespeed}
  }
  display(){
    noStroke()
   fill(this.r, this.g, this.b, this.transparency)
    circle(this.x,this.y,this.diameter)
  }
  locationUpdate(){
    this.x+= this.vx*this.speed
    this.y+= this.vy*this.speed 
    this.diameter-= 0.005
    if(this.speed>this.truespeed-5&&this.truespeed-5>0){this.speed-= 0.005}
    
    if(this.x>width+50){this.x = -50; this.reset()}
    if(this.x<-50){this.x = width+50; this.reset()}
    if(this.y>height+50){this.y = -50; this.reset()}
    if(this.y<-50){this.y = height+50; this.reset()}
  }
  reset(){
    if(this.diameter<2){this.diameter=random(3,8)}
    if(this.speed<this.truespeed-5){this.speed= this.truespeed + random(-3,3)}
  }
}

let circles = [];

function setup() {
  angleMode(DEGREES);
  let cnv = createCanvas(400, 400);
  cnv.id('p5Canvas');
  cnv.parent('windCanvas');
}

function updateCircles() {
  circles = [];
  for (let i = 0; i < 50; i++) {
    circles[i] = new windCircles(windSpeed, windDegree, perceivedTemp);
  }
  
}

function draw() {
  background(220, 150);
  textAlign(CENTER)
  textSize(16)
  
  for (let i = 0; i < circles.length; i++) {
    circles[i].display();
    circles[i].locationUpdate();
  }
  fill(0)
  text(`North`, width/2, 20)
  text(`South`, width/2, height-10)
  text(`East`, width-30, height/2)
  text(`West`, 30, height/2)
  text(`${windSpeed} mph`, width/2, height-30)
  
}

