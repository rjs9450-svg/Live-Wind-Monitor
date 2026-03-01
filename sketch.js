class windCircles {
  constructor(x,y, diameter, speed, truespeed, transparency, vx, vy, r, g , b){
    this.x = random(400)
    this.y = random(400)
    this.diameter = random(3,8)
    this.truespeed = 2 //put the wind speed here when moving over to the site
    this.speed = this.truespeed + random(-3,3) 
    this.transparency = random(50,255)
    this.vx = 1 //use actual wind data to generate a number from 0-1
    this.vy = -0.5 //user actual wind data to generate a number from 0-1
    this.r = 0 //associate color with percieved temp
    this.g = 0
    this.b = 255
    
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

let circles =[]

function setup() {
  createCanvas(400, 400);
  
 for (let i = 0; i < 50; i ++){
    circles[i] = new windCircles()
  }
  print(circles)
}

function draw() {
  background(220,150);
  for (let i = 0; i < 50; i ++){
    circles[i].display()
    circles[i].locationUpdate()
  }
}