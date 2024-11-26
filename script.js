import { Request, runFCFS } from './algorithms.js';

document.addEventListener('DOMContentLoaded', () => {
    let selectedAlgorithm = null;
    const algorithms = ['fcfs', 'scan', 'cscan', 'look', 'clook', 'sstf'];
    const startSimulationButton = document.querySelector('#start-simulation');

    algorithms.forEach(algorithm => {
        document.querySelector(`#${algorithm}`).addEventListener('click', () => {
            selectedAlgorithm = algorithm;
            algorithms.forEach(algo => {
                document.querySelector(`#${algo}`).classList.remove('glowing-border');
            });
            document.querySelector(`#${algorithm}`).classList.add('glowing-border');
            startSimulationButton.disabled = false;
            startSimulationButton.classList.remove('bg-gray-400', 'cursor-not-allowed');
            startSimulationButton.classList.add('bg-blue-700', 'hover:bg-blue-800');
            updateStartButton(selectedAlgorithm);
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

    document.querySelector('#reset-form').addEventListener('click', () => {
        document.querySelector('#simulation-form').reset();
        selectedAlgorithm = null;
        algorithms.forEach(algo => {
            document.querySelector(`#${algo}`).classList.remove('glowing-border');
        });
        startSimulationButton.disabled = true;
        startSimulationButton.classList.add('bg-gray-400', 'cursor-not-allowed');
        startSimulationButton.classList.remove('bg-blue-700', 'hover:bg-blue-800');
        //startSimulationButton.textContent = 'Start Simulation';
    });
});
/**
 * Set the text content of the start simulation button based on the
 * @param {string} selectedAlgorithm 
 */
function updateStartButton(selectedAlgorithm) {
    const startSimulationButton = document.querySelector('#start-simulation');
    const algorithmNames = {
        'fcfs': 'FCFS',
        'scan': 'SCAN',
        'cscan': 'C-SCAN',
        'look': 'LOOK',
        'clook': 'C-LOOK',
        'sstf': 'SSTF'
    };
    startSimulationButton.textContent = `Run ${algorithmNames[selectedAlgorithm]} Simulation`;
}

function startSimulation(algorithm, initialHeadPosition, diskRequestSequence) {
    console.log(`Starting simulation with ${algorithm} algorithm`);
    const requests = diskRequestSequence.map(trackNumber => new Request(trackNumber));
    if (algorithm === 'fcfs') {
        console.log('Starting FCFS simulation');
        runFCFS(requests, initialHeadPosition);
    } else if (algorithm === 'scan') {
        // Call the appropriate function for SCAN
        console.log('SCAN algorithm not implemented yet');
    }
    // Add other conditions for different algorithms
}
