import { Simulation } from "./algorithms.js";
const W = 650, H = 650; // dimensions of canvas
const padding = 25; 
const time = W; // number of x tick values
const step = W/time; // time step

let data = []; // to store number of infected people
// let count = 0; // steps counter
let posy, fx, l, f;

let minH = 650;
let sequence = [10, 20, 40, 199, 50, 75, 20, 133, 155, 170, 0, 30, 40, 199, 50, 75, 20, 120, 155, 178]
let head = 30;// starting head
let index = 0;// 
// let target = sequence[index];
let left = true;
let points = []
let graphs = []

class Graph{
  constructor(simulation){
    this.sequence = simulation.newSequence;
    this.data = []
    this.points = []
    this.index = 0;
    this.head = this.sequence[this.index];
    this.target = this.sequence[this.index];
    this.left = false;
  }
}


var start = false;
var single = function(p){

  p.setup = function() {
    p.createCanvas(W, H);
    p.fill(255, 30, 70, 90);


    // array containing the y positions of the line graph, scaled to fit the canvas
    posy = Float32Array.from({ length: time }, (_, i) => p.map(i, 0, time, padding, W));
    
    // function to map sequence to x coordinates on canvas
    fx = _ => p.map(_, 0, 199, padding, W-padding);
    
      
  }

  p.get_new_target = function(graph){
    graph.target = graph.sequence[++graph.index]
    if(graph.target == undefined){
      console.log()
      graphs.splice(graphs.findIndex((g) => g = graph),1)
    }
  }

  p.draw = function() {
    if(graphs.length){
      console.log(graphs.length)
      graphs.forEach((graph) =>
      {
        p.background('#fff');
      
        // length of data list -1 (to access last item of data list)
        graph.l = graph.data.length -1 ;

  
        // frameCount
        f = p.frameCount;
        //fills points array with important points as it passees them.
        if(graph.left && graph.head > graph.target)
          graph.head -= 1.5;
        else if(!graph.left && graph.head < graph.target)
          graph.head += 1.5;
        else{
          let point = { 'x':graph.target,
                        'y':posy[graph.l], 
                        'text': {'content':graph.target.toString(),
                                  'x': fx(graph.target) + 2,
                                  // 'y': posy[l] - 3
                                  'y': padding/2 + 3
                                }  
                      };
                      graph.points.push(point);
          p.get_new_target(graph);
          graph.left = (graph.target < graph.head);
        }
  
        // fills x-axis data : data[]
        // store that number at each step (the x-axis tick values)
        if (f&step) {
          graph.data.push(graph.head);
          // count += 1;
        }
        
        p.draw_graph(graph)
        p.draw_points(graph)
  
      })
      
      p.draw_axis()
    }
  }

  // p.reset_graph = function(){
  //   // reset data and count
  //   points = []
  //   data = [];
  //   // count = 0;
  //   index = 0;
  //   target = sequence[index]; 
  //   head = sequence[index];
  // }

  p.stop_drawing = function(){
    graphs.pop()
    
  }

  p.start_drawing = function(simulations){
    console.log('start')
    // p.reset_graph()
    console.log(simulations)
    graphs = [];
    simulations.forEach((simulation) =>
    {
      let graph = new Graph(simulation);
      let graph2 = new Graph({'newSequence':[10, 20, 40, 199, 50, 75, 20, 133, 155, 170, 0, 30, 40, 199, 50, 75, 20, 120, 155, 178]});
      graphs.push(graph2);
      graphs.push(graph);
    })
    start = true
  }

  p.draw_axis = function(){
    p.strokeWeight(1.0)
    p.line(padding, padding, W - padding, padding)
    // line(padding/2, 0, padding/2, H)
    // for (tick in H/)
  }

  p.draw_points = function(graph){
    graph.points.forEach((point) =>{
      let red = p.color('rgba(255, 30, 70, 90)')
      let x1 = fx(point.x);
      let y1 = point.y;
      p.strokeWeight(0.2);
      p.line(x1, 0, x1, y1);
      p.fill(red)
      p.ellipse(x1, y1, 10, 10);
      p.fill('black')
      p.text(point.text.content,point.text.x,point.text.y);
    })

    // draw ellispe at last data point
    // if (count > 1) {
      p.ellipse(fx(graph.data[graph.l]), posy[graph.l], 4, 4);
    // }
  }

  p.draw_graph = function(graph){
    
    // iterate over data list to rebuild curve at each frame
    for (let i = 0; i < graph.l; i++) {
      
      let x1 = fx(graph.data[i]);
      let x2 = fx(graph.data[i+1]);
      let y1 = posy[i];
      let y2 = posy[i+1];

      console.log(x1, y1, x2, y2)
      p.strokeWeight(2);
      p.line(x1, y1, x2, y2);
    }
  }
}
// var multi = function(p){
//   p.setup = function() {
//     p.createCanvas(W, H);
//     p.fill(255, 30, 70, 90);
//     let graph_container = document.querySelector('#graph-container');
//     let canvas = document.querySelector('canvas');
    
//     graph_container.append(canvas);


//     // array containing the y positions of the line graph, scaled to fit the canvas
//     posy = Float32Array.from({ length: time }, (_, i) => p.map(i, 0, time, padding, W));
    
//     // function to map sequence to x coordinates on canvas
//     fx = _ => p.map(_, 0, 199, padding, W-padding);
    
      
//   }

//   p.get_new_target = function(){
//     target = sequence[++index]
//     if(target == undefined){
//       p.stop_drawing() 
//     }
//   }

//   p.draw = function() {
//     if(start){

      
//       p.background('#fff');
      
//       // length of data list -1 (to access last item of data list)
//       l = data.length -1 ;

//       // frameCount
//       f = p.frameCount;
      
//       //fills points array with important points as it passees them.
//       if(left && head > target)
//         head -= 1.5;
//       else if(!left && head < target)
//         head += 1.5;
//       else{
//         let old_target = target
//         let point = { 'x': target,
//                       'y':posy[l], 
//                       'text': {'content':target.toString(),
//                                 'x': fx(target) + 2,
//                                 // 'y': posy[l] - 3
//                                 'y': padding/2 + 3
//                               }  
//                     };
//         points.push(point);
//         p.get_new_target();
//         left = (target < head)
//       }

//       // fills x-axis data : data[]
//       // store that number at each step (the x-axis tick values)
//       if (f&step) {
//         data.push(head);
//         count += 1;
//       }
      
//       p.draw_graph()
//       p.draw_points()
//       p.draw_axis()

//     }
//   }

//   p.reset_graph = function(){
//     // reset data and count
//     points = []
//     data = [];
//     count = 0;
//     index = 0;
//     target = sequence[index]; 
//     head = sequence[index];
//     // print(sequence)
//     // print(head)
//     // print(target)
//     //head shoudl be reset in script.js
//     //new sequence shoudl be loaded in script.js
//   }

//   p.stop_drawing = function(){
//     start = false
    
//   }

//   p.start_drawing = function([simulations]){
//     console.log('start')
//     p.reset_graph()
//     start = true
//   }

//   p.draw_axis = function(){
//     p.strokeWeight(1.0)
//     p.line(padding, padding, W - padding, padding)
//     // line(padding/2, 0, padding/2, H)
//     // for (tick in H/)
//   }

//   p.draw_points = function(){
//     points.forEach((point) =>{
//       let red = p.color('rgba(255, 30, 70, 90)')
//       x1 = fx(point.x);
//       y1 = point.y;
//       p.strokeWeight(0.2);
//       p.line(x1, 0, x1, y1);
//       p.fill(red)
//       p.ellipse(x1, y1, 10, 10);
//       p.fill('black')
//       p.text(point.text.content,point.text.x,point.text.y);
//     })

//     // draw ellispe at last data point
//     if (count > 1) {
//       p.ellipse(fx(data[l]), posy[l], 4, 4);
//     }
//   }

//   p.draw_graph = function(){
    
//     // iterate over data list to rebuild curve at each frame
//     for (let i = 0; i < l; i++) {
      
//       x1 = fx(data[i]);
//       x2 = fx(data[i+1]);
//       y1 = posy[i];
//       y2 = posy[i+1];
      
//       p.strokeWeight(2);
//       p.line(x1, y1, x2, y2);
//     }
//   }
// }
export{single}