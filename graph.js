let randomY = [];
let numPts = 25;

function setup() {
  createCanvas(400, 400);
  
  for(let i =0; i< numPts; i++){
   randomY.push(random(100,300)); 
  }
}

function draw() {
  background(220);
  
  drawLines();
  drawEllipses();
}

function drawEllipses(){
  noStroke();
    // draw ellipses
  for(let i =0; i < randomY.length; i++){
    let x = i * (width / (numPts-1));
    let y = randomY[i];
    ellipse(x, y, 7);
  }
}

function drawLines(){
  stroke(0);
 // draw lines
  let px = 0;
  let py = randomY[0];
  for(let i =0; i < randomY.length; i++){
    let x = i * (width / (numPts-1));
    let y = randomY[i];
    line(px, py, x, y);
    
  	//store the last position
    px = x;
    py = y;
  } 
}

