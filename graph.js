import { Simulation } from "./algorithms.js";
const W = 650, H = 650; // dimensions of canvas
const padding = 25; 
const time = W; // number of x tick values
const step = W/time; // time step

const COLOURS_HEX = [
    '#FA2A55',//'red': 
    '#663399',//rebecca purple': '
    "#CCCCFF" ,//'lavenderish': 
    '#009193',//'teal': 
    '#FF991C',//'organge': 
    '#02590F'//'gram': 
]
let colours = []
let posy, fx, f;

let graphs = []
let finished_graphs = []

class Graph{
  constructor(simulation, colour){
    this.sequence = simulation.newSequence;
    this.data = []
    this.points = []
    this.index = 0;
    this.head = this.sequence[this.index];
    this.target = this.sequence[this.index];
    this.left = false;
    this.colour = colour;
  }
}


var start = false;
var graph = function(p){

  p.setup = function() {
    let canvas = p.createCanvas(W, H);
    p.fill(255, 30, 70, 90);


    // array containing the y positions of the line graph, scaled to fit the canvas
    posy = Float32Array.from({ length: time }, (_, i) => p.map(i, 0, time, padding, W));
    
    // function to map sequence to x coordinates on canvas
    fx = _ => p.map(_, 0, 199, padding, W-padding);
    
    // initialize colour objects
    COLOURS_HEX.forEach((hex) =>{
      let colour = p.color(hex)
      colours.push(colour)
    })

    //append graphs to their graph containers.
    let graph_containers = document.querySelectorAll('.graph-container')
    for (let container of graph_containers){
      if (!container.hasChildNodes()){
        canvas.parent(container.getAttribute('id'))
      }
    }

  }

  //gets a new target for graph to draw towards. essentialy iterates the sequence.
  p.get_new_target = function(graph){
    graph.target = graph.sequence[++graph.index]
    if(graph.target == undefined){
      p.draw_points(graph)
      p.stop_drawing(graph)
    }
  }

  //handles all drawing.
  //p5 constantly tries to call this.
  p.draw = function() {
    if(graphs.length){
      p.background('#fff');
      p.draw_axis()

      // this section populates the plotting area while redrawing the graph to make it look lke its animating.
      graphs.forEach((graph) =>
      {

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
        }
        

        //actualy draw the graphs
        p.draw_graph(graph)
        p.draw_points(graph)
  
      })


      //draw graphs that are finished.
      finished_graphs.forEach((graph)=>
      {
        
        p.draw_graph(graph)
        p.draw_points(graph)
      })
      
    }
  }

  //resets the state of the canvas and graphs
  p.reset_graph = function(){
    
    p.background('#fff');
    finished_graphs = []
    graphs = [];
  }

  //stop drawing a graph and save the info somewhere so we can persist the graph while other graphs are drawing.
  p.stop_drawing = function(graph){
    let g = graphs.splice(graphs.indexOf(graph),1)
    finished_graphs = finished_graphs.concat(g)
    
  }

  p.start_drawing = function(simulations){
    p.reset_graph()

    for (let i = 0; i < simulations.length ; i++){
      let graph = new Graph(simulations[i],colours[i]);
      graphs.push(graph)
    }
    start = true
  }

  //specifically draw the axis at hte top.
  p.draw_axis = function(){
    p.strokeWeight(1.0)
    p.line(padding, padding, W - padding, padding)
    // line(padding/2, 0, padding/2, H)
    // for (tick in H/)
  }

  //draw these specific points with a coloured circle and a line extending to the top .
  p.draw_points = function(graph){
    graph.points.forEach((point) =>{
      let x1 = fx(point.x);
      let y1 = point.y;
      p.strokeWeight(0.2);
      p.line(x1, 0, x1, y1);
      p.fill(graph.colour)
      p.ellipse(x1, y1, 10, 10);
      p.fill('black')
      p.text(point.text.content,point.text.x,point.text.y);
    })


  }

  p.draw_graph = function(graph){
    
    // iterate over data list to rebuild curve at each frame
    for (let i = 0; i < graph.l; i++) {
      
      let x1 = fx(graph.data[i]);
      let x2 = fx(graph.data[i+1]);
      let y1 = posy[i];
      let y2 = posy[i+1];

      p.strokeWeight(2);
      p.line(x1, y1, x2, y2);

      //makes the drawing point a little more visible. maybe remove if laggy.
      p.ellipse(fx(graph.data[graph.l]), posy[graph.l], 4, 4);
    }
  }
}


export{graph}