import { Request, runFCFS } from './algorithms.js';

document.addEventListener('DOMContentLoaded', () => {
    let selectedAlgorithm = null;
    const algorithms = ['fcfs', 'scan', 'cscan', 'look', 'clook', 'sstf'];
    const startSimulationButton = document.querySelector('#start-simulation');
    const compareAllButton = document.querySelector('#compare-all');
    const initialHeadPositionInput = document.querySelector('#initial-head-position');
    const diskRequestSequenceInput = document.querySelector('#disk-request-sequence');

    algorithms.forEach(algorithm => {
        document.querySelector(`#${algorithm}`).addEventListener('click', () => {
            selectedAlgorithm = algorithm;
            algorithms.forEach(algo => {
                document.querySelector(`#${algo}`).classList.remove('glowing-border');
            });
            document.querySelector(`#${algorithm}`).classList.add('glowing-border');
            updateButtonState();
        });
    });

    initialHeadPositionInput.addEventListener('input', updateButtonState);
    diskRequestSequenceInput.addEventListener('input', updateButtonState);

    document.querySelector('#simulation-form').addEventListener('submit', (event) => {
        event.preventDefault();
        if (selectedAlgorithm && validateUserInput()) {
            const initialHeadPosition = parseInt(initialHeadPositionInput.value);
            const diskRequestSequence = diskRequestSequenceInput.value.split(',').map(Number);
            startSimulation(selectedAlgorithm, initialHeadPosition, diskRequestSequence);
        } else {
            alert('Please select an algorithm and enter valid parameters.');
        }
    });

    document.querySelector('#reset-form').addEventListener('click', () => {
        document.querySelector('#simulation-form').reset();
        selectedAlgorithm = null;
        algorithms.forEach(algo => {
            document.querySelector(`#${algo}`).classList.remove('glowing-border');
        });
        //startSimulationButton.disabled = true;
        //startSimulationButton.classList.add('bg-gray-400', 'cursor-not-allowed');
        //startSimulationButton.classList.remove('bg-blue-700', 'hover:bg-blue-800');
        //startSimulationButton.textContent = 'Enter Parameters';
        transformButton(true, 'Enter Parameters');
    });

    function updateButtonState() {
        if (!selectedAlgorithm) return;

        if (validateUserInput()) {
            //startSimulationButton.disabled = false;
            //startSimulationButton.classList.remove('bg-gray-400', 'cursor-not-allowed');
            //startSimulationButton.classList.add('bg-blue-700', 'hover:bg-blue-800');
            transformButton(false, `Start ${selectedAlgorithm.toUpperCase()} Simulation`);

            updateStartButton(selectedAlgorithm);
        } 
        else {
            //startSimulationButton.disabled = true;
            //startSimulationButton.classList.add('bg-gray-400', 'cursor-not-allowed');
            //startSimulationButton.classList.remove('bg-blue-700', 'hover:bg-blue-800');
            //startSimulationButton.textContent = 'Enter Parameters';
            transformButton(true, 'Enter Parameters');
        }
        /*
        if (selectedAlgorithm && validateUserInput()) {
            startSimulationButton.disabled = false;
            startSimulationButton.classList.remove('bg-gray-400', 'cursor-not-allowed');
            startSimulationButton.classList.add('bg-blue-700', 'hover:bg-blue-800');
            updateStartButton(selectedAlgorithm);
        } else {
            startSimulationButton.disabled = true;
            startSimulationButton.classList.add('bg-gray-400', 'cursor-not-allowed');
            startSimulationButton.classList.remove('bg-blue-700', 'hover:bg-blue-800');
            startSimulationButton.textContent = 'Enter Parameters';
        }*/
    }
    function transformButton(disabledValue, textContent) {
        startSimulationButton.disabled = disabledValue;
        if (disabledValue) {
            startSimulationButton.classList.add('bg-gray-400', 'cursor-not-allowed');
            startSimulationButton.classList.remove('bg-blue-700', 'hover:bg-blue-800');
        }
        else {
            startSimulationButton.classList.remove('bg-gray-400', 'cursor-not-allowed');
            startSimulationButton.classList.add('bg-blue-700', 'hover:bg-blue-800');
        }
        startSimulationButton.textContent = textContent;
    }
    function validateUserInput() {
        const initialHeadPosition = parseInt(initialHeadPositionInput.value);
        const diskRequestSequence = diskRequestSequenceInput.value
                                    .split(',')
                                    .filter(str => str.trim() !== '') // Filter out empty strings
                                    .map(Number);

        if (!initialHeadPosition) return false;

        const isValidHeadPosition = Number.isInteger(initialHeadPosition) && initialHeadPosition >= 1 && initialHeadPosition <= 99;

        if (diskRequestSequence.length === 0) return false;
        const isValidDiskRequestSequence = diskRequestSequence.every(num => Number.isInteger(num));
        console.log(`diskRequestSequence ${diskRequestSequence}`);
        if (diskRequestSequence == '') {console.log(`hi`);}
        console.log(`initialHeadPosition: ${isValidHeadPosition}`);
        console.log(`isValidDiskPos: ${isValidDiskRequestSequence}`);
        return isValidHeadPosition && isValidDiskRequestSequence;
    }

    function updateStartButton(selectedAlgorithm) {
        const algorithmNames = {
            'fcfs': 'FCFS',
            'scan': 'SCAN',
            'cscan': 'C-SCAN',
            'look': 'LOOK',
            'clook': 'C-LOOK',
            'sstf': 'SSTF'
        };
        startSimulationButton.textContent = `Start ${algorithmNames[selectedAlgorithm]} Simulation`;
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
});
