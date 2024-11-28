let randomY = [];
let randomX = [];
let numPts = 25;
function single(p){

  p.setup = function () {
    createCanvas(400, 400);
    
    for(let i =0; i< numPts; i++){
     randomY.push(random(100,300)); 
    }
  }
  
  p.draw = function (randomY) {
    background(220);
    this.randomY = randomY
    drawLines();
    drawEllipses();
  }
  
  p.drawEllipses = function (){
    noStroke();
      // draw ellipses
    for(let i =0; i < randomY.length; i++){
      let x = i * (width / (numPts-1));
      let y = randomY[i];
      ellipse(x, y, 7);
    }
  }
  
  p.drawLines = function (){
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
}


function many(p){

  p.setup = function () {
    createCanvas(400, 400);
    
    for(let i =0; i< numPts; i++){
      randomX.push(random(100,300)); 
    }
  }
  
  p.draw = function (randomX) {
    background(220);
    this.randomX = randomX
    drawLines();
    drawEllipses();
  }
  
  p.drawEllipses = function (){
    noStroke();
      // draw ellipses
    for(let i =0; i < randomX.length; i++){
      let x = i * (width / (numPts-1));
      let y = randomX[i];
      ellipse(x, y, 7);
    }
  }
  
  p.drawLines = function (){
    stroke(0);
   // draw lines
    let px = 0;
    let py = randomX[0];
    for(let i =0; i < randomX.length; i++){
      let x = i * (width / (numPts-1));
      let y = randomX[i];
      line(px, py, x, y);
      
      //store the last position
      px = x;
      py = y;
    } 
  }
}

