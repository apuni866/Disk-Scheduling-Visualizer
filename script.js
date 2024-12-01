import { Simulation, runFCFS, runScan } from './algorithms.js';
/**
 * The main entry point for the application.
 * Uses DOM manipulation to add event listeners to the buttons and form elements.
 */
document.addEventListener('DOMContentLoaded', () => {
    let selectedAlgorithm = null;
    const COMPARE_ALL_FLAG = true;
    const RUN_SINGLE_FLAG = false;

    const startSimulationButton = document.querySelector('#start-simulation');
    const algorithms = ['fcfs', 'scan', 'cscan', 'look', 'clook', 'sstf'];
    const compareAllButton = document.querySelector('#compare-all');
    const homeButton = document.querySelector('#home-button');
    const homeButtonAll = document.querySelector('#home-button-all');
    //const homeButtons = document.querySelectorAll('.home-button');

    const initialHeadPositionInput = document.querySelector('#initial-head-position');
    const diskRequestSequenceInput = document.querySelector('#disk-request-sequence');

    algorithms.forEach(algorithm => {
        document.querySelector(`#${algorithm}`).addEventListener('click', () => {
            if (selectedAlgorithm === algorithm) {
                selectedAlgorithm = null;
                document.querySelector(`#${algorithm}`).classList.remove('glowing-border');
                transformButton(true, 'Select an Algorithm', startSimulationButton);
            } else {
                selectedAlgorithm = algorithm;
                algorithms.forEach(algo => {
                    document.querySelector(`#${algo}`).classList.remove('glowing-border');
                });
                document.querySelector(`#${algorithm}`).classList.add('glowing-border');
            }
            let valid = validateUserInput(initialHeadPositionInput, diskRequestSequenceInput);
            updateButtonState(valid, RUN_SINGLE_FLAG, startSimulationButton, selectedAlgorithm);
            updateButtonState(valid, COMPARE_ALL_FLAG, compareAllButton, selectedAlgorithm);
        });
    });
    initialHeadPositionInput.addEventListener('input', () => {
        let valid = validateUserInput(initialHeadPositionInput, diskRequestSequenceInput);
        updateButtonState(valid, RUN_SINGLE_FLAG, startSimulationButton, selectedAlgorithm);
        updateButtonState(valid, COMPARE_ALL_FLAG, compareAllButton, selectedAlgorithm);
    });
    diskRequestSequenceInput.addEventListener('input', () => {
        let valid = validateUserInput(initialHeadPositionInput, diskRequestSequenceInput);
        updateButtonState(valid, RUN_SINGLE_FLAG, startSimulationButton, selectedAlgorithm);
        updateButtonState(valid, COMPARE_ALL_FLAG, compareAllButton, selectedAlgorithm);
    });
    document.querySelector('#simulation-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const clickedButton = event.submitter;

        if (validateUserInput(initialHeadPositionInput, diskRequestSequenceInput)) {
            const initialHeadPosition = parseInt(initialHeadPositionInput.value);
            const diskRequestSequence = diskRequestSequenceInput.value.split(',').map(Number);

            // Check which button was clicked based on its ID
            if (clickedButton.id === 'start-simulation' && selectedAlgorithm) {
                // Handle the logic for the 'start-simulation' button
                startSimulation(selectedAlgorithm, initialHeadPosition, diskRequestSequence);
            } else if (clickedButton.id === 'compare-all') {
                // Handle the logic for the 'compare-all' button
                compareAllSimulations(initialHeadPosition, diskRequestSequence);
            }
        }
    });
    homeButton.addEventListener('click', () => {
        switchView("simulation-page", "home-page");
    });
    homeButtonAll.addEventListener('click', () => {
        switchView("simulation-page-all", "home-page");
    });
});
/**
 * Updates the state of a button based on the validity of input and the selected algorithm.
 *
 * @param {boolean} valid - Indicates whether the input parameters are valid.
 * @param {boolean} isAllButton - Indicates whether the button is the 'Compare All' button.
 * @param {HTMLButtonElement} button - The button element to be updated.
 * @param {string} selectedAlgorithm - The name of the selected disk scheduling algorithm.
 */
function updateButtonState(valid, isAllButton, button, selectedAlgorithm) {

    if (isAllButton) {
        if (valid) {
            transformButton(false, `Compare All`, button);
        }
        else {
            transformButton(true, "Enter Parameters", button);
        }
        return;
    }

    if (!selectedAlgorithm) return;

    if (valid) {
        console.log(selectedAlgorithm);
        transformButton(false, `Start ${selectedAlgorithm.toUpperCase()} Simulation`, button);
        updateStartButton(button, selectedAlgorithm);
    }
    else {
        transformButton(true, 'Enter Parameters', button);
    }
}
/**
 * Transforms the appearance and state of a button element.
 *
 * @param {boolean} disabledValue - Determines whether the button should be disabled.
 * @param {string} text - The text content to set for the button via textContent.
 * @param {HTMLButtonElement} button - The button element to be transformed.
 */
function transformButton(disabledValue, text, button) {
    button.disabled = disabledValue;
    if (disabledValue) {
        button.classList.add('bg-gray-500', 'cursor-not-allowed');
        button.classList.remove('bg-blue-700', 'hover:bg-blue-800');
    }
    else {
        button.classList.remove('bg-gray-500', 'cursor-not-allowed');
        button.classList.add('bg-blue-700', 'hover:bg-blue-800');
    }
    button.textContent = text;
}

/**
 * Validates the user input for the initial head position and disk request sequence.
 *
 * @param {HTMLInputElement} initialHeadPositionInput - The input element for the initial head position.
 * @param {HTMLInputElement} diskRequestSequenceInput - The input element for the disk request sequence.
 * @returns {boolean} - Returns true if the input is valid, otherwise false.
 */
function validateUserInput(initialHeadPositionInput, diskRequestSequenceInput) {
    const initialHeadPosition = parseFloat(initialHeadPositionInput.value);  // Parse as float
    const diskRequestSequence = diskRequestSequenceInput.value
        .split(',')
        .filter(str => str.trim() !== '') // Filter out empty strings
        .map(Number);

    console.log(`pos: ${initialHeadPosition}, seq: ${diskRequestSequence}`);
    // Check if initialHeadPosition is a valid integer and falls within the valid range
    if (!Number.isInteger(initialHeadPosition) || initialHeadPosition < 0 || initialHeadPosition > 99 || !initialHeadPositionInput) {
        console.log("bye");
        return false;
    }

    if (diskRequestSequence.length === 0) return false;

    const isValidDiskRequestSequence = diskRequestSequence.every(num =>
        Number.isInteger(num) && num >= 0 && num <= 299);

    return isValidDiskRequestSequence;
}
/**
 * Updates the text content of the start button to indicate the selected disk scheduling algorithm.
 *
 * @param {HTMLButtonElement} button - The button element to update.
 * @param {string} selectedAlgorithm - The key representing the selected disk scheduling algorithm.
 */
function updateStartButton(button, selectedAlgorithm) {
    const algorithmNames = {
        'fcfs': 'FCFS',
        'scan': 'SCAN',
        'cscan': 'C-SCAN',
        'look': 'LOOK',
        'clook': 'C-LOOK',
        'sstf': 'SSTF'
    };
    button.textContent = `Start ${algorithmNames[selectedAlgorithm]} Simulation`;
}

/**
 * Starts the disk scheduling simulation with the specified algorithm.
 *
 * @param {string} algorithm - The disk scheduling algorithm to use.
 * @param {number} initialHeadPosition - The initial position of the disk head.
 * @param {number[]} diskRequestSequence - An array of track numbers representing the disk request sequence.
 */
function startSimulation(algorithm, initialHeadPosition, diskRequestSequence) {
    console.log(`Starting simulation with ${algorithm} algorithm`);
    //const requests = diskRequestSequence.map(trackNumber => new Request(trackNumber));
    const homeButton = document.querySelector('#home-button');

    switchView("home-page", "simulation-page");

    let heading = document.querySelector("#simulation-page h3");
    let description = document.querySelector("#simulation-page p");
    //let simulation = null;
    let simulation = new Simulation([12, 34, 24, 76, 10], [31, 12, 32, 13, 42], 42, [31, 12, 32, 13, 42]);
    //Remove this later

    if (algorithm === 'fcfs') {
        heading.textContent = 'First-Come, First-Served (FCFS) Simulation';
        description.textContent = 'The First-Come, First-Served (FCFS) algorithm processes disk requests in the order they arrive. The disk head moves from the initial position to the first request in the sequence, then to the second request, and so on. The total head movement is the sum of the absolute differences between the track numbers in the request sequence.';
        console.log('Starting FCFS simulation');
        //simulation = runFCFS(requests, initialHeadPosition);
    } else if (algorithm === 'scan') {
        // Call the appropriate function for SCAN
        heading.textContent = 'SCAN Simulation';
        description.textContent = 'The SCAN algorithm processes disk requests in a linear fashion. The disk head moves from the initial position to the end of the disk, then reverses direction and moves to the other end. The total head movement is the sum of the absolute differences between the track numbers in the request sequence.';
        //simulation = runScan(requests, initialHeadPosition);

        console.log('SCAN algorithm not implemented yet');
    }
    else if (algorithm === 'cscan') {
        // Call the appropriate function for C-SCAN
        console.log('C-SCAN algorithm not implemented yet');
    }
    else if (algorithm === 'look') {
        // Call the appropriate function for LOOK
        console.log('LOOK algorithm not implemented yet');
    }
    else if (algorithm === 'clook') {
        // Call the appropriate function for C-LOOK
        console.log('C-LOOK algorithm not implemented yet');
    }
    else if (algorithm === 'sstf') {
        // Call the appropriate function for SSTF
        console.log('SSTF algorithm not implemented yet');
    }
    displaySimulationResults(simulation);



    // Add other conditions for different algorithms
}
function compareAllSimulations(initialHeadPosition, diskRequestSequence) {
    //const homeButton = document.querySelector('#home-button');

    switchView("home-page", "simulation-page-all");
    console.log("click");
    const seekTimes = [];

    //const simulations = {};
    //simulations['FCFS'] = runFCFS(diskRequestSequence, initialHeadPosition);

    const simulations = {
        "FCFS": new Simulation([45, 20, 10, 80, 30], [10, 20, 30, 45, 80], 250, [45, 20, 10, 80, 30]),
        "SCAN": new Simulation([75, 30, 60, 20, 40], [20, 30, 40, 60, 75], 300, [40, 30, 60, 20, 75]),
        "CSCAN": new Simulation([50, 10, 90, 30, 60], [10, 30, 50, 60, 90], 280, [50, 10, 90, 30, 60]),
        "LOOK": new Simulation([40, 10, 80, 60, 30], [10, 30, 40, 60, 80], 260, [40, 10, 80, 60, 30]),
        "C-LOOK": new Simulation([25, 55, 100, 85, 10], [10, 25, 55, 85, 100], 220, [55, 100, 85, 10, 25]),
        "SSTF": new Simulation([60, 80, 20, 40, 70], [20, 40, 60, 70, 80], 150, [60, 80, 20, 40, 70])
    };

    console.log("All Seek times:");
    for (let algorithm in simulations) {
        seekTimes.push(simulations[algorithm].seekTime);
        console.log(`${simulations[algorithm].seekTime}`);
    }
    let minValue = Math.min(...seekTimes);
    console.log(`min val is: ${minValue}`);
    displayAllResults(simulations, initialHeadPosition, diskRequestSequence, minValue);
    // ^ remove that later, just for testing before algorithms are implemented.

    //rest goes here
}
function displaySimulationResults(simulation) {
    if (!simulation) return;
    const oldSequence = document.querySelector('#old-sequence');
    const newSequence = document.querySelector('#new-sequence');
    const totalTime = document.querySelector('#total-seek-time');

    // const seekTimeElement = document.querySelector('#seek-time');
    // const drawingElement = document.querySelector('#drawing');

    // seekTimeElement.textContent = `Total Seek Time: ${simulation.seekTime}`;
    // drawingElement.textContent = `Drawing Sequence: ${simulation.drawingSequence.join(' -> ')}`;

    oldSequence.textContent = simulation.originalSequence;
    newSequence.textContent = simulation.newSequence;
    totalTime.textContent = simulation.seekTime;
}
function displayAllResults(simulations, position, sequence, minValue) {
    const oldSequence = document.querySelector('#old-sequence-all');
    writeTextContent(oldSequence, sequence);
    writeTotalSeekTimes(simulations);
    writeTextContent(document.querySelector('#minimum-seek-time-all'), minValue);


}
function writeTextContent(element, content) {
    element.textContent = `${content}`;
}
function writeTotalSeekTimes(simulations) {
    const resultsContainer = document.querySelector("#total-seek-times-all");

    // Clear any existing content
    resultsContainer.textContent = '';

    const header = document.createElement('h4');
    header.classList.add('text-lg', 'font-semibold'); // Adding classes for styling
    header.textContent = 'Total Seek Times'; // Set the text of the header
    resultsContainer.appendChild(header);

    // Iterate over the 'simulations' object
    for (let key in simulations) {
        if (simulations.hasOwnProperty(key)) {
            // Access the seekTime for each simulation (the third property in the Simulation constructor)
            let seekTime = simulations[key].seekTime;

            // Create a new text node with the key and seekTime
            const textNode = document.createElement('p');
            textNode.textContent = `${key}: ${seekTime}`;

            // Append the text node to the results container
            resultsContainer.appendChild(textNode);
        }
    }
}
/**
 * Manipulates the DOM to display other pages.
 * @param {string} currentView 
 * @param {string} newView 
 */
function switchView(currentView, newView) {
    const currentViewElement = document.querySelector(`#${currentView}`);
    const newViewElement = document.querySelector(`#${newView}`);

    currentViewElement.classList.add('hidden');
    newViewElement.classList.remove('hidden');
}

function henry(){
    // let canvas = document.querySelector('canvas');
    // console.log(canvas)
    randomY = []
    randomX = []
    for(let i =0; i< 25; i++){
        randomY.push(p.random(100,300)); 
    }
    for(let i =0; i< 25; i++){
        randomX.push(p2.random(100,300)); 
    }
    // draw()
}

// function start(){
//     setup();
//     draw();
// }
// start();
