/**
 * Represents a simulation of disk scheduling algorithms.
 */
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
/**
 * Runs the First-Come-First-Serve (FCFS) disk scheduling algorithm.
 * @param {Array} queue 
 * @param {Number} head 
 * @returns none
 */
function runFCFS(queue, head) {

    let currentLocation;
    let seekCounter = 0;
    let distance = 0;

    let initialHead = head;

    for (let i = 0; i < queue.length; i++) {
        currentLocation = queue[i];
        distance = Math.abs(currentLocation - head);  // Corrected distance calculation
        seekCounter += distance;
        head = currentLocation;
    }
    let newSequence = Array.from(queue);
    newSequence.unshift(initialHead);
    //unshift adds the initial head to the beginning of the array

    let simulation = new Simulation(queue, newSequence, 0, queue);
    simulation.calculateSeekTime();

    return simulation;
}

/**
 * Runs the SCAN disk scheduling algorithm on the given queue starting from the head position.
 * The SCAN algorithm moves the disk arm towards one end, servicing all requests until it reaches the end,
 * then reverses direction and services the remaining requests.
 *
 * @param {number[]} queue - An array of disk track positions to be serviced.
 * @param {number} head - The initial position of the disk arm.
 * @returns {Simulation} - A Simulation object containing the original queue, the full sequence of traversal,
 *                         the seek time, and the final queue state.
 */
function runScan(queue, head) {

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

    let simulation = new Simulation(oldqueue, fullSequence, 0, queue);
    simulation.calculateSeekTime();

    return simulation;
}
/**
 * Simulates the C-SCAN (Circular SCAN) disk scheduling algorithm.
 * 
 * @param {number[]} queue - An array of integers representing the queue of disk track requests.
 * @param {number} head - The initial position of the disk head.
 * @returns {Simulation} - An instance of the Simulation class containing the seek sequence and calculated seek time.
 */
function runCScan(queue, head) {
    const MAX = 200;

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
    right.sort((a, b) => b - a);

    let fullSequence = [head];
    fullSequence.push(...left);
    fullSequence.push(0);
    //Simulates the disk head moving to the end of the disk
    fullSequence.push(MAX - 1);
    fullSequence.push(...right);

    let simulation = new Simulation(oldqueue, fullSequence, 0, queue);
    simulation.calculateSeekTime();

    return simulation;
}
/**
 * Runs the LOOK disk scheduling algorithm on the given queue starting from the given head position.
 * The LOOK algorithm services requests in one direction until it reaches the end, then reverses direction.
 *
 * @param {number[]} queue - An array of disk track numbers representing the queue of disk access requests.
 * @param {number} head - The initial position of the disk head.
 * @returns {Simulation} - An instance of the Simulation class containing the results of the LOOK algorithm.
 */
function runLook(queue, head) {

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
    fullSequence.push(...left);
    fullSequence.push(...right);

    let simulation = new Simulation(oldqueue, fullSequence, 0, queue);
    simulation.calculateSeekTime();

    return simulation;
}
/**
 * Runs the C-LOOK disk scheduling algorithm on the provided queue.
 *
 * @param {number[]} queue - An array of integers representing the disk queue.
 * @param {number} head - The initial position of the disk head.
 * @returns {Simulation} - A Simulation object containing the results of the C-LOOK algorithm.
 */
function runCLook(queue, head) {

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
    right.sort((a, b) => b - a);

    let fullSequence = [head];
    fullSequence.push(...left);
    fullSequence.push(...right);

    let simulation = new Simulation(oldqueue, fullSequence, 0, queue);
    simulation.calculateSeekTime();

    return simulation;
}
/**
 * Runs the Shortest Seek Time First (SSTF) disk scheduling algorithm.
 * 
 * @param {number[]} queue - An array of disk track requests.
 * @param {number} head - The initial position of the disk head.
 * @returns {Simulation} - An object containing the simulation results, including the full sequence of head movements and the total seek time.
 */
function runSSTF(queue, head) {

    let oldqueue = Array.from(queue);
    let sortedRequests = Array.from(queue);
    let fullSequence = [head];
    let totalSeekTime = 0;

    while (sortedRequests.length > 0) {
        let minDiff = Number.MAX_SAFE_INTEGER;
        let minIndex = -1;

        sortedRequests.forEach((qElement, index) => {
            let diff = Math.abs(head - qElement);
            if (diff < minDiff) {
                minDiff = diff;
                minIndex = index;
            }
        });
        totalSeekTime += minDiff;
        head = sortedRequests[minIndex];
        fullSequence.push(head);
        sortedRequests.splice(minIndex, 1);
    }
    let simulation = new Simulation(oldqueue, fullSequence, 0, queue);
    simulation.calculateSeekTime();

    return simulation;
}

export { Simulation, runFCFS, runScan, runCScan, runLook, runCLook, runSSTF };