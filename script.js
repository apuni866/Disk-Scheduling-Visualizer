class Request {
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

class FCFS {
    static doFCFS(queue, head) {
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
    }
}

// Example usage
const initialHeadPosition = 40; // Example initial head position
const input = "40,20,67,89,8"; // Example disk request sequence

const inputArray = input.split(',');
const requests = inputArray.map(trackNumber => new Request(parseInt(trackNumber)));

FCFS.doFCFS(requests, initialHeadPosition);