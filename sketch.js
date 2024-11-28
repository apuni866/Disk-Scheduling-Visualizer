/* eslint-disable no-undef */
// import p5 from "libraries/p5.mjs"
{/* <script src="libraries/p5.min.js"></script>
<script src="libraries/p5.sound.min.js"></script> */}
let randomY = [];
let randomX = [];
let numPts = 25;
var started = false;
var p1, p2;

function sketch1(p){
  p.setup = function () {
    p.createCanvas(400, 400);  
    let canvas = document.querySelector('#defaultCanvas0');
    let div = document.querySelectorAll('div')[9];
    div.append(canvas)
    for(let i =0; i< numPts; i++){
    randomY.push(p.random(100,300)); 
    }
  }

   p.draw = function () {
    if(started){
    p.background(220);
    p.drawLines();
    p.drawEllipses();
    }
  }

   p.drawEllipses = function(){
    p.noStroke();
      // draw ellipses
    for(let i =0; i < randomY.length; i++){
      let x = i * (p.width / (numPts-1));
      let y = randomY[i];
      p.ellipse(x, y, 7);
    }
  }

  p.drawLines = function(){
    p.stroke(0);
  // draw lines
    let px = 0;
    let py = randomY[0];
    for(let i =0; i < randomY.length; i++){
      let x = i * (p.width / (numPts-1));
      let y = randomY[i];
      p.line(px, py, x, y);
      
      //store the last position
      px = x;
      py = y;
    } 
  }
}

function sketch2(p){
  p.setup = function () {
    p.createCanvas(400, 400);  
    let canvas = document.querySelector('#defaultCanvas1');
    let div = document.querySelector('div');
    div.append(canvas)
    for(let i =0; i< numPts; i++){
    randomX.push(p.random(100,300)); 
    }
  }

   p.draw = function () {
    if(started){
    p.background(220);
    p.drawLines();
    p.drawEllipses();
    }
  }

   p.drawEllipses = function(){
    p.noStroke();
      // draw ellipses
    for(let i =0; i < randomX.length; i++){
      let x = i * (p.width / (numPts-1));
      let y = randomX[i];
      p.ellipse(x, y, 7);
    }
  }

  p.drawLines = function(){
    p.stroke(0);
  // draw lines
    let px = 0;
    let py = randomX[0];
    for(let i =0; i < randomX.length; i++){
      let x = i * (p.width / (numPts-1));
      let y = randomX[i];
      p.line(px, py, x, y);
      
      //store the last position
      px = x;
      py = y;
    } 
  }
}
function start(){
   started = true;
   p = new p5(sketch1);
   p2 = new p5(sketch2);
}
