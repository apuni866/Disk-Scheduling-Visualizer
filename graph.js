/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const W = 650, H = 650; // dimensions of canvas
const padding = 25; 
const time = W; // number of x tick values
const step = W/time; // time step

let data = []; // to store number of infected people
let count = 0; // steps counter
let posy, fx, c, infected, colors, maxH, l, f;

let sequence = [10, 20, 40, 199, 50, 75, 20, 133, 155, 170, 0, 30, 40, 199, 50, 75, 20, 120, 155, 178]
let head = 30;// starting head
let index = 0;// 
let target = sequence[index];
let left = true;
let points = []

var start = false;

function setup() {
  createCanvas(W, H);
  fill(255, 30, 70, 90);
  let graph_container = document.querySelector('#graph-container');
  let canvas = document.querySelector('canvas');
  
  graph_container.append(canvas);


  // array containing the y positions of the line graph, scaled to fit the canvas
  posy = Float32Array.from({ length: time }, (_, i) => map(i, 0, time, padding, W));
  
  // function to map sequence to x coordinates on canvas
  fx = _ => map(_, 0, 199, padding, W-padding);
  
    
}

function get_new_target(){
  target = sequence[++index]
  if(target == undefined){
     stop_drawing() 
  }
}

function draw() {
  if(start){

    
    background('#fff');
    
    // length of data list -1 (to access last item of data list)
    l = data.length -1 ;

    // frameCount
    f = frameCount;
    
    //fills points array with important points as it passees them.
    if(left && head > target)
      head -= 1.5;
    else if(!left && head < target)
      head += 1.5;
    else{
      let old_target = target
      let point = { 'x': target,
                    'y':posy[l], 
                    'text': {'content':target.toString(),
                              'x': fx(target) + 2,
                              // 'y': posy[l] - 3
                              'y': padding/2 + 3
                            }  
                  };
      points.push(point);
      get_new_target();
      left = (target < head)
    }

    // fills x-axis data : data[]
    // store that number at each step (the x-axis tick values)
    if (f&step) {
      data.push(head);
      count += 1;
    }
    
    draw_graph()
    draw_points()
    draw_axis()

  }
}

function reset_graph(){
  // reset data and count
  points = []
  data = [];
  count = 0;
  index = 0;
  target = sequence[index]; 
  head = sequence[index];
  print(sequence)
  print(head)
  print(target)
  //head shoudl be reset in script.js
  //new sequence shoudl be loaded in script.js
}

function stop_drawing(){
  start = false
  
}

function start_drawing(){
  reset_graph()
  start = true
}

function draw_axis(){
  strokeWeight(1.0)
  line(padding, padding, W - padding, padding)
  // line(padding/2, 0, padding/2, H)
  // for (tick in H/)
}

function draw_points(){
  points.forEach((point) =>{
    let red = color('rgba(255, 30, 70, 90)')
    x1 = fx(point.x);
    y1 = point.y;
    strokeWeight(0.2);
    line(x1, 0, x1, y1);
    fill(red)
    ellipse(x1, y1, 10, 10);
    fill('black')
    text(point.text.content,point.text.x,point.text.y);
  })

  // draw ellispe at last data point
  if (count > 1) {
    ellipse(fx(data[l]), posy[l], 4, 4);
  }
}

function draw_graph(){
  
  // iterate over data list to rebuild curve at each frame
  for (let i = 0; i < l; i++) {
    
    x1 = fx(data[i]);
    x2 = fx(data[i+1]);
    y1 = posy[i];
    y2 = posy[i+1];
    
    strokeWeight(2);
    line(x1, y1, x2, y2);
  }
}