import { Simulation, runFCFS, runScan, runCScan, runCLook, runSSTF, runLook } from './algorithms.js';
import { graph } from './graph.js';
/**
 * The main entry point for the application.
 * Uses DOM manipulation to add event listeners to the buttons and form elements.
 */
document.addEventListener('DOMContentLoaded', () => {

    let selectedAlgorithm = null;
    let single_graph = new p5(graph);
    let multi_graph = new p5(graph);

    const startSimulationButton = document.querySelector('#start-simulation');
    const algorithms = ['fcfs', 'scan', 'cscan', 'look', 'clook', 'sstf'];
    const compareAllButton = document.querySelector('#compare-all');
    const homeButton = document.querySelector('#home-button');
    const homeButtonAll = document.querySelector('#home-button-all');

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
                    document.querySelector(`#${algo}`).classList.add('hover:shadow-lg');
                });
                document.querySelector(`#${algorithm}`).classList.remove('hover:shadow-lg');
                document.querySelector(`#${algorithm}`).classList.add('glowing-border');
            }
            updateButtons(initialHeadPositionInput, diskRequestSequenceInput,
                startSimulationButton, compareAllButton, selectedAlgorithm);
        });
    });
    initialHeadPositionInput.addEventListener('input', () => {
        updateButtons(initialHeadPositionInput, diskRequestSequenceInput,
            startSimulationButton, compareAllButton, selectedAlgorithm);
    });
    diskRequestSequenceInput.addEventListener('input', () => {
        updateButtons(initialHeadPositionInput, diskRequestSequenceInput,
            startSimulationButton, compareAllButton, selectedAlgorithm);
    });
    document.querySelector('#simulation-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const clickedButton = event.submitter;

        if (validateUserInput(initialHeadPositionInput, diskRequestSequenceInput)) {
            const initialHeadPosition = parseInt(initialHeadPositionInput.value);
            const diskRequestSequence = diskRequestSequenceInput.value.split(',').map(Number);

            if (clickedButton.id === 'start-simulation' && selectedAlgorithm) {
                startSimulation(selectedAlgorithm, initialHeadPosition, diskRequestSequence, single_graph);

            } else if (clickedButton.id === 'compare-all') {
                compareAllSimulations(initialHeadPosition, diskRequestSequence, multi_graph);
            }
        }
    });
    homeButton.addEventListener('click', () => { switchView("simulation-page", "home-page"); });
    homeButtonAll.addEventListener('click', () => { switchView("simulation-page-all", "home-page"); });
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
        if (valid) transformButton(false, `Compare All`, button);
        else transformButton(true, "Enter Parameters", button);

        return;
    }

    if (!selectedAlgorithm) return;

    if (valid) {
        transformButton(false, `Start ${selectedAlgorithm.toUpperCase()} Simulation`, button);
        updateStartButton(button, selectedAlgorithm);
    }
    else transformButton(true, 'Enter Parameters', button);

}
/**
 * Helper function, basically a wrapper for updateButtonState and input validation.
 * @param {*} initialHeadPositionInput 
 * @param {*} diskRequestSequenceInput 
 * @param {*} startSimulationButton 
 * @param {*} compareAllButton 
 * @param {*} selectedAlgorithm 
 */
function updateButtons(initialHeadPositionInput, diskRequestSequenceInput, startSimulationButton, compareAllButton, selectedAlgorithm) {
    const COMPARE_ALL_FLAG = true;
    const RUN_SINGLE_FLAG = false;

    let valid = validateUserInput(initialHeadPositionInput, diskRequestSequenceInput);
    updateButtonState(valid, RUN_SINGLE_FLAG, startSimulationButton, selectedAlgorithm);
    updateButtonState(valid, COMPARE_ALL_FLAG, compareAllButton, selectedAlgorithm);
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
    const initialHeadPosition = parseFloat(initialHeadPositionInput.value);
    const diskRequestSequence = diskRequestSequenceInput.value
        .split(',')
        .filter(str => str.trim() !== '')
        .map(Number);

    if (!Number.isInteger(initialHeadPosition) || initialHeadPosition < 0 ||
        initialHeadPosition > 199 || !initialHeadPositionInput) {
        return false;
    }

    if (diskRequestSequence.length === 0) return false;

    const isValidDiskRequestSequence = diskRequestSequence.every(num =>
        Number.isInteger(num) && num >= 0 && num <= 199);

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
function startSimulation(algorithm, initialHeadPosition, diskRequestSequence, single_graph) {

    const homeButton = document.querySelector('#home-button');
    switchView("home-page", "simulation-page");

    let heading = document.querySelector("#simulation-page h3");
    let description = document.querySelector("#simulation-page p");
    let simulation = null;

    if (algorithm === 'fcfs') {
        heading.textContent = 'First-Come, First-Served (FCFS) Simulation';
        description.textContent = 'The First-Come, First-Served (FCFS) algorithm processes disk requests in the order they arrive. The disk head moves from the initial position to the first request in the sequence, then to the second request, and so on. The total head movement is the sum of the absolute differences between the track numbers in the request sequence.';
        simulation = runFCFS(diskRequestSequence, initialHeadPosition);

    } else if (algorithm === 'scan') {
        heading.textContent = 'SCAN Simulation';
        description.textContent = 'The SCAN algorithm processes disk requests in a linear fashion. The disk head moves from the initial position to the end of the disk, then reverses direction and moves to the other end. The total head movement is the sum of the absolute differences between the track numbers in the request sequence.';
        simulation = runScan(diskRequestSequence, initialHeadPosition);
    }
    else if (algorithm === 'cscan') {

        heading.textContent = 'C-SCAN Simulation';
        description.textContent = 'The C-SCAN algorithm processes disk requests in a circular fashion. The disk head moves from the initial position to the end of the disk, then jumps to the other end without servicing any requests in between. The total head movement is the sum of the absolute differences between the track numbers in the request sequence.';
        simulation = runCScan(diskRequestSequence, initialHeadPosition);
    }
    else if (algorithm === 'look') {

        heading.textContent = 'LOOK Simulation';
        description.textContent = 'The LOOK algorithm processes disk requests in a linear fashion. The disk head moves from the initial position to the end of the disk, then reverses direction and moves to the other end. The total head movement is the sum of the absolute differences between the track numbers in the request sequence.';
        simulation = runLook(diskRequestSequence, initialHeadPosition);
    }
    else if (algorithm === 'clook') {

        heading.textContent = 'C-LOOK Simulation';
        description.textContent = 'The C-LOOK algorithm processes disk requests in a circular fashion. The disk head moves from the initial position to the end of the disk, then jumps to the other end without servicing any requests in between. The total head movement is the sum of the absolute differences between the track numbers in the request sequence.';
        simulation = runCLook(diskRequestSequence, initialHeadPosition);
    }
    else if (algorithm === 'sstf') {

        heading.textContent = 'Shortest Seek Time First (SSTF) Simulation';
        description.textContent = 'The Shortest Seek Time First (SSTF) algorithm processes disk requests based on the shortest seek time. The disk head moves to the closest request in the sequence before moving to the next closest request. The total head movement is the sum of the absolute differences between the track numbers in the request sequence.';
        simulation = runSSTF(diskRequestSequence, initialHeadPosition);
    }
    start_draw([simulation], single_graph);
    displaySimulationResults(simulation);
}
/**
 * Compares the seek times of all disk scheduling algorithms using the same disk request sequence.
 * 
 * @param {number} initialHeadPosition - The initial position of the disk head.
 * @param {number[]} diskRequestSequence - An array of track numbers representing the disk request sequence.
 */
function compareAllSimulations(initialHeadPosition, diskRequestSequence, multi_graph) {

    switchView("home-page", "simulation-page-all");
    const seekTimes = [];

    const simulations = {};
    simulations['FCFS'] = runFCFS(diskRequestSequence, initialHeadPosition);
    simulations['SCAN'] = runScan(diskRequestSequence, initialHeadPosition);
    simulations['CSCAN'] = runCScan(diskRequestSequence, initialHeadPosition);
    simulations['LOOK'] = runLook(diskRequestSequence, initialHeadPosition);
    simulations['CLOOK'] = runCLook(diskRequestSequence, initialHeadPosition);
    simulations['SSTF'] = runSSTF(diskRequestSequence, initialHeadPosition);

    for (let algorithm in simulations) {
        seekTimes.push(simulations[algorithm].seekTime);
    }

    let minValue = Math.min(...seekTimes);
    displayAllResults(simulations, initialHeadPosition, diskRequestSequence, minValue);
    start_draw(Object.values(simulations), multi_graph)
}
/**
 * Displays the simulation results on the webpage.
 * @param {Object} simulation - The simulation object containing the results.
 */
function displaySimulationResults(simulation) {
    if (!simulation) return;

    const oldSequence = document.querySelector('#old-sequence');
    const newSequence = document.querySelector('#new-sequence');
    const totalTime = document.querySelector('#total-seek-time');

    oldSequence.textContent = simulation.originalSequence;
    newSequence.textContent = simulation.newSequence;
    totalTime.textContent = simulation.seekTime;
}
/**
 * Displays all the results of the disk scheduling simulations.
 * 
 * @param {Array} simulations - An array of simulation results.
 * @param {number} position - The initial position of the disk head.
 * @param {Array} sequence - The sequence of disk requests.
 * @param {number} minValue - The minimum seek time among all simulations.
 */
function displayAllResults(simulations, position, sequence, minValue) {

    const oldSequence = document.querySelector('#old-sequence-all');
    writeTextContent(oldSequence, sequence);
    writeTotalSeekTimes(simulations, minValue);
    writeTextContent(document.querySelector('#minimum-seek-time-all'), minValue);
}
/**
 * Wrapper function for writing text content to an HTML element.
 * @param {*} element 
 * @param {*} content 
 */
function writeTextContent(element, content) {
    element.textContent = `${content}`;
}
/**
 * Writes the total seek times for each simulation to the results container.
 * @param {Object} simulations - An object containing the simulation results.
 * @param {number} minValue - The minimum seek time value.
 */
function writeTotalSeekTimes(simulations, minValue) {

    const resultsContainer = document.querySelector("#total-seek-times-all");
    resultsContainer.textContent = '';

    const header = document.createElement('h4');
    header.classList.add('text-lg', 'font-semibold');
    header.textContent = 'Total Seek Times';
    resultsContainer.appendChild(header);

    for (let key in simulations) {
        if (simulations.hasOwnProperty(key)) {

            let seekTime = simulations[key].seekTime;
            const textNode = document.createElement('p');
            textNode.textContent = `${key}: ${seekTime}`;

            if (seekTime == minValue) textNode.style.color = "#FFFF00";

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
    const header = document.querySelector('header');

    currentViewElement.classList.add('hidden');
    newViewElement.classList.remove('hidden');

    if (newView !== 'home-page') {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
}
/**
 * Starts a single draw simulation.
 *
 * @param {object} simulation - The simulation object.
 */
function start_draw(simulations, graph) {
    graph.start_drawing(simulations)
}