/*class Request {
    constructor(trackNumber) {
        this.trackNumber = trackNumber;
    }

    getTrackNumber() {
        return this.trackNumber;
    }

    toString() {
        return String(this.trackNumber);
    }
}

function runFCFS(queue, head) {
    let currentLocation;
    let seekCounter = 0;
    let distance = 0;

    for (let i = 0; i < queue.length; i++) {
        currentLocation = queue[i].getTrackNumber();
        distance = Math.abs(currentLocation - head);  // Corrected distance calculation
        seekCounter += distance;
        head = currentLocation;
    }

    console.log("Total Number of seek operations = " + seekCounter);
    console.log("The Seek Sequence is");
    for (let i = 0; i < queue.length; i++) {
        console.log(queue[i].toString());
    }
}*/

// Example usage
/*
const initialHeadPosition = 40; // Example initial head position
const input = "40,20,67,89,8"; // Example disk request sequence

const inputArray = input.split(',');
const requests = inputArray.map(trackNumber => new Request(parseInt(trackNumber)));

runFCFS(requests, initialHeadPosition);
*/
// Export the class and function if using modules
//
class Simulation {
    constructor(originalSequence = [], newSequence = [], seekTime = 0, drawingSequence = []) {
        this.originalSequence = originalSequence;
        this.newSequence = newSequence;
        this.seekTime = seekTime;
        this.drawingSequence = drawingSequence;
    }

    // Example method to modify the new sequence
    updateNewSequence(newSeq) {
        this.newSequence = newSeq;
    }

    // Example method to calculate seek time (you can implement actual logic based on your requirements)
    calculateSeekTime() {
        // Placeholder logic: sum of absolute differences between adjacent elements in the newSequence
        let totalSeekTime = 0;
        for (let i = 1; i < this.newSequence.length; i++) {
            totalSeekTime += Math.abs(this.newSequence[i] - this.newSequence[i - 1]);
        }
        this.seekTime = totalSeekTime;
        return this.seekTime;
    }

    // Example method to update the drawing sequence
    updateDrawingSequence(seq) {
        this.drawingSequence = seq;
    }

    // Example method to reset the simulation
    resetSimulation() {
        this.originalSequence = [];
        this.newSequence = [];
        this.seekTime = 0;
        this.drawingSequence = [];
    }
}
function runFCFS(queue, head) { return null; }
/* Amtooj do this */
function runScan(queue, head) {

    const MAX = 200;

    console.log("* * * * * Running the SCAN algorithm * * * * *\n");
    let oldqueue = Array.from(queue);
    let left = [];
    let right = [];

    // Separate the elements into left and right based on the head position
    queue.forEach((qElement) => {
        if (qElement < head) {
            left.push(qElement);
        } else {
            right.push(qElement);
        }
    });

    // Sort the left array in descending order and right array in ascending order
    left.sort((a, b) => b - a);
    right.sort((a, b) => a - b);

    // Create the full sequence of traversal
    let fullSequence = [head];
    fullSequence.push(...left);
    fullSequence.push(0); // Since we're doing a left traversal, include 0
    fullSequence.push(...right);

    // Calculate seek time
    let seekTime = this.calculateSeekTime(fullSequence, head);

    console.log("Left Array:", left);
    console.log("Right Array:", right);
    console.log("Full Sequence:", fullSequence);
    console.log("Seek time was:", seekTime);

    return new Simulation(oldqueue, queue, seekTime, queue); // Fully built array
}
function runCScan(queue, head) {
    const MAX = 200; 

    console.log("* * * * * Running the C-SCAN algorithm * * * * *\n");
    let oldqueue = Array.from(queue);
    let left = [];
    let right = [];

    
    queue.forEach((qElement) => {
        if (qElement < head) {
            left.push(qElement);
        } else {
            right.push(qElement);
        }
    });

    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);

    let fullSequence = [head];
    fullSequence.push(...right); 
    fullSequence.push(MAX - 1); 
    fullSequence.push(0);       
    fullSequence.push(...left); 

    let seekTime = this.calculateSeekTime(fullSequence, head);

    console.log("Left Array:", left);
    console.log("Right Array:", right);
    console.log("Full Sequence:", fullSequence);
    console.log("Seek time was:", seekTime);

    return new Simulation(oldqueue, queue, seekTime, queue); 
}

function runLook(queue, head) {
    console.log("* * * * * Running the LOOK algorithm * * * * *\n");

    let oldqueue = Array.from(queue);
    let left = [];
    let right = [];

    queue.forEach((qElement) => {
        if (qElement < head) {
            left.push(qElement);
        } else {
            right.push(qElement);
        }
    });

    left.sort((a, b) => b - a);
    right.sort((a, b) => a - b);

    let fullSequence = [head];
    fullSequence.push(...right); 
    fullSequence.push(...left); 

    let seekTime = this.calculateSeekTime(fullSequence, head);

    console.log("Left Array:", left);
    console.log("Right Array:", right);
    console.log("Full Sequence:", fullSequence);
    console.log("Seek time was:", seekTime);

    return new Simulation(oldqueue, queue, seekTime, queue); 
}

function runCLook(queue, head) {
    console.log("* * * * * Running the C-LOOK algorithm * * * * *\n");

    let oldqueue = Array.from(queue);
    let left = [];
    let right = [];


    queue.forEach((qElement) => {
        if (qElement < head) {
            left.push(qElement);
        } else {
            right.push(qElement);
        }
    });


    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);


    let fullSequence = [head];
    fullSequence.push(...right); 
    fullSequence.push(...left); 

    let seekTime = this.calculateSeekTime(fullSequence, head);

    console.log("Left Array:", left);
    console.log("Right Array:", right);
    console.log("Full Sequence:", fullSequence);
    console.log("Seek time was:", seekTime);

    return new Simulation(oldqueue, queue, seekTime, queue); 
}

function runFCFS(queue, head) {
    console.log("* * * * * Running the FCFS algorithm * * * * *\n");

    let seekCounter = 0;
    let distance = 0;
    let fullSequence = [head]; 

    queue.forEach((currentLocation) => {
        distance = Math.abs(head - currentLocation); 
        seekCounter += distance; 
        head = currentLocation; 
        fullSequence.push(currentLocation); 
    });

    console.log("Total Number of seek operations =", seekCounter);
    console.log("The Seek Sequence is:");
    console.log(fullSequence.join(" -> ")); 

    return new Simulation(queue, queue, seekCounter, fullSequence); 
}
/**
 * Calculates the total seek time and generates the seek sequence.
 *
 * @param {number[]} queue The list of track numbers to process.
 * @param {number} head The starting position of the head.
 * @return {number} The total seek time.
 */
//static calculateSeekTime(queue, head) {
//    let seekCounter = 0;
//
//    for (let i = 1; i < queue.length; i++) {
//        let track = queue[i];
//        let distance = Math.abs(track - head); // Calculate the seek distance
//        seekCounter += distance; // Accumulate total seek time
//        head = track;
//    }
//
//    return seekCounter;
//}


// Example usage:
//const queue = [82, 170, 43, 140, 24, 16, 190];
//const head = 50;
//const result = SCAN.runScan(queue, head);
//
//console.log("Resulting sequence:", result);
export { Simulation, runFCFS, runScan };