import { Request, runFCFS } from './algorithms.js';
/**
 * The main entry point for the application.
 * Uses DOM manipulation to add event listeners to the buttons and form elements.
 */
document.addEventListener('DOMContentLoaded', () => {
    let selectedAlgorithm = null;
    const COMPARE_ALL_FLAG = true;
    const RUN_SINGLE_FLAG = false;

    const algorithms = ['fcfs', 'scan', 'cscan', 'look', 'clook', 'sstf'];
    const startSimulationButton = document.querySelector('#start-simulation');
    const compareAllButton = document.querySelector('#compare-all');
    const homeButton = document.querySelector('#home-button');
    
    const initialHeadPositionInput = document.querySelector('#initial-head-position');
    const diskRequestSequenceInput = document.querySelector('#disk-request-sequence');
    //switchView("home-page", "simulation-page");
    algorithms.forEach(algorithm => {
        document.querySelector(`#${algorithm}`).addEventListener('click', () => {
            selectedAlgorithm = algorithm;
            algorithms.forEach(algo => {
                document.querySelector(`#${algo}`).classList.remove('glowing-border');
            });
            document.querySelector(`#${algorithm}`).classList.add('glowing-border');
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
        if (selectedAlgorithm && 
            validateUserInput(initialHeadPositionInput, diskRequestSequenceInput)){

            const initialHeadPosition = parseInt(initialHeadPositionInput.value);
            const diskRequestSequence = diskRequestSequenceInput.value.split(',').map(Number);
            startSimulation(selectedAlgorithm, initialHeadPosition, diskRequestSequence);
        } 
    });
    homeButton.addEventListener('click', () => {
        switchView("simulation-page", "home-page");
        algorithms.forEach(algo => {
            document.querySelector(`#${algo}`).classList.remove('glowing-border');
        });
        resetForm(startSimulationButton);
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

    if (isAllButton && valid) {
        transformButton(false, `Compare All`, button);
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
        button.classList.add('bg-gray-400', 'cursor-not-allowed');
        button.classList.remove('bg-blue-700', 'hover:bg-blue-800');
    }
    else {
        button.classList.remove('bg-gray-400', 'cursor-not-allowed');
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
    const initialHeadPosition = parseInt(initialHeadPositionInput.value);
    const diskRequestSequence = diskRequestSequenceInput.value
                                .split(',')
                                .filter(str => str.trim() !== '') // Filter out empty strings
                                .map(Number);

    if (!initialHeadPosition) return false;

    const isValidHeadPosition = Number.isInteger(initialHeadPosition) && 
                                initialHeadPosition >= 1 && initialHeadPosition <= 99;

    if (diskRequestSequence.length === 0) return false;

    const isValidDiskRequestSequence = diskRequestSequence.every(num => 
                                Number.isInteger(num) && num >= 0 && num <= 299);    
    console.log(`diskRequestSequence ${diskRequestSequence}`);
    if (diskRequestSequence == '') {console.log(`hi`);}
    console.log(`initialHeadPosition: ${isValidHeadPosition}`);
    console.log(`isValidDiskPos: ${isValidDiskRequestSequence}`);

    return isValidHeadPosition && isValidDiskRequestSequence;
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
    const requests = diskRequestSequence.map(trackNumber => new Request(trackNumber));
    const homeButton = document.querySelector('#home-button');
    switchView("home-page", "simulation-page");
    
    let heading = document.querySelector("#simulation-page h3");
    let description = document.querySelector("#simulation-page p");
    
    if (algorithm === 'fcfs') {
        heading.textContent = 'First-Come, First-Served (FCFS) Simulation';
        description.textContent = 'The First-Come, First-Served (FCFS) algorithm processes disk requests in the order they arrive. The disk head moves from the initial position to the first request in the sequence, then to the second request, and so on. The total head movement is the sum of the absolute differences between the track numbers in the request sequence.';
        console.log('Starting FCFS simulation');
        runFCFS(requests, initialHeadPosition);
    } else if (algorithm === 'scan') {
        // Call the appropriate function for SCAN
        console.log('SCAN algorithm not implemented yet');
    }
    //article.appendChild(heading);
    //article.appendChild(description);
    // Add other conditions for different algorithms
}

function switchView(currentView, newView) {
    const currentViewElement = document.querySelector(`#${currentView}`);
    const newViewElement = document.querySelector(`#${newView}`);

    currentViewElement.classList.add('hidden');
    newViewElement.classList.remove('hidden');
}
function resetForm(button) {
    document.querySelector('#simulation-form').reset();
    button.disabled = true;
    button.classList.add('bg-gray-400', 'cursor-not-allowed');
    button.classList.remove('bg-blue-700', 'hover:bg-blue-800');
    button.textContent = 'Enter Parameters';
}