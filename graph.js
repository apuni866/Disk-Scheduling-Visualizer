const W = 650, H = 650; // dimensions of canvas
const padding = 10;
const time = W; // number of x tick values
const step = W/time; // time step

let data = []; // to store number of infected people
let count = 0; // steps counter
let posy, fy, fx, c, infected, colors, maxH, l, f;

let sequence = [10, 20, 40, 199, 50, 75, 20, 175, 155, 170, 0, 20, 40, 199, 50, 75, 20, 175, 155, 170]
let head = 30;
let index = 0;
let target = sequence[index];
let left = true;
let points = []

function setup() {
  createCanvas(W, H);
  fill(255, 30, 70, 90);
  let graph_container = document.querySelector('#graph-container');
  console.log(graph_container.offsetHeight);
  console.log(graph_container.offsetWidth);
  let canvas = document.querySelector('canvas');
  
  // graph_container.append(canvas);


  // array containing the x positions of the line graph, scaled to fit the canvas
  posy = Float32Array.from({ length: time }, (_, i) => map(i, 0, time, padding, W));
  
  // function to map the number of infected people to a specifiec height (here the height of the canvas)
  fy = _ => map(_, 3, 0, H, 10);

  fx = _ => map(_, 0, 199, 0, W);
  
    
}

function get_new_target(){
  target = sequence[++index]
  if(target == undefined)
    console.log('done'); /////// this is where i stop the drawing.
}
function draw() {
  background('#fff');
  
  // length of data list -1 (to access last item of data list)
  l = data.length -1 ;

  // frameCount
  f = frameCount;
  
  // number of infected people (noised gaussian curved)
  // c = sin(f*0.008);
  // infected = (exp(-c*c/2.0) / sqrt(TWO_PI) / 0.2)  + map(noise(f*0.02), 0, 1, -1, 1);
  
  if(left && head > target)
    head -= 1.5;
  else if(!left && head < target)
    head += 1.5;
  else{
    get_new_target();
    left = (target < head)
    points.push({'x': head,'y':posy[l]});
    // console.log(points)
  }

  // store that number at each step (the x-axis tick values)
  if (f&step) {
    data.push(head);
    count += 1;
  }
  
  
    
  // iterate over data list to rebuild curve at each frame
  for (let i = 0; i < l; i++) {
    
    x1 = fx(data[i]);
    x2 = fx(data[i+1]);
    y1 = posy[i];
    y2 = posy[i+1];
    
    // // vertical lines (x-values)
  
    // polyline
    strokeWeight(2);
    // stroke(colors[Math.floor(map(y1, H, 10, H, 0))] );
    line(x1, y1, x2, y2);
    
  }

  for (let i = 0 ; i < points.length ; i++){
    x1 = fx(points[i].x);
    y1 = points[i].y;

    strokeWeight(0.2);
    line(x1, 0, x1, y1);
    ellipse(x1, y1, 10, 10);
  }
  // draw ellispe at last data point
  if (count > 1) {
    ellipse(fx(data[l]), posy[l], 4, 4);
  }
  
  // reset data and count
  // if (count%time===0) {
  //   data = [];
  //   count = 0;
  // }

}
