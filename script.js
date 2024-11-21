// import { Request, runFCFS } from './algorithms.js';



// function setup() {
//     createCanvas(400, 400);
//   }
  
// function draw() {
//     background(220);
// }
document.addEventListener('DOMContentLoaded', () => {
    let selectedAlgorithm = null;
    const algorithms = ['fcfs', 'scan', 'cscan', 'look', 'clook', 'sstf'];

    algorithms.forEach(algorithm => {
        document.querySelector(`#${algorithm}`).addEventListener('click', () => {
            selectedAlgorithm = algorithm;
            algorithms.forEach(algo => {
                document.querySelector(`#${algo}`).classList.remove('glowing-border');
            });
            document.querySelector(`#${algorithm}`).classList.add('glowing-border');
        });
    });

    document.querySelector('#simulation-form').addEventListener('submit', (event) => {
        event.preventDefault();
        if (selectedAlgorithm) {
            const initialHeadPosition = parseInt(document.querySelector('#initial-head-position').value);
            const diskRequestSequence = document.querySelector('#disk-request-sequence').value.split(',').map(Number);
            startSimulation(selectedAlgorithm, initialHeadPosition, diskRequestSequence);
        } else {
            alert('Please select an algorithm first.');
        }
    });
});

function startSimulation(algorithm, initialHeadPosition, diskRequestSequence) {
    console.log(`Starting simulation with ${algorithm} algorithm`);
    const requests = diskRequestSequence.map(trackNumber => new Request(trackNumber));
    // Change page view if valid algorithm is selected !!!
    if (algorithm === 'fcfs') {
        console.log('Starting FCFS simulation');
        runFCFS(requests, initialHeadPosition);
    } else if (algorithm === 'scan') {
        // Call the appropriate function for SCAN
        console.log('SCAN algorithm not implemented yet');
    }
    // Add other conditions for different algorithms


    // setup()
    // draw()

}


  


