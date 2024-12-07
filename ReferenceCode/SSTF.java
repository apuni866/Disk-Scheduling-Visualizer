package diskSchedulingAlgorithmsCOMP3659;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class SSTF {
	
public static List<Integer> runCLook(List<Integer> queue, int head){
		
		int MAX = 200;
		
		System.out.println("* * * * * Running the SSTF algorithm * * * * *\n");

		
		List<Integer> left = new ArrayList<>();
        List<Integer> right = new ArrayList<>();

		
		//sort array smallest to largest
		//compare head until you find an element greater than > head
		// move each element that is less than head into the left part
		// do the algorithm for the remaining elements inside of the queue
		// or save the index at that location and run 2 loops?
		// switch to the left part and do those ... ? 
		//Collections.sort(queue);
		
		// algorithms return arrays
		// seek time calculation should be in a separate function
		
		int i = 0;
		while ( i < queue.size()) {
			int qElement = queue.get(i);
			
			if (qElement < head){
				 left.add(qElement);
			}
			else {
				right.add(qElement);
			}
			i++;
		}
			
		//Collections.sort(left,Collections.reverseOrder());
		Collections.sort(left);
		
		Collections.sort(right);
		List<Integer> fullSequence = new ArrayList<>();
		fullSequence.add(head);
		
		
		int j = 0;
		while (j < right.size()) {
			fullSequence.add(right.get(j));
			j++;
		}
		 
		i = 0;
		while(i < left.size()) {
			fullSequence.add(left.get(i));
			i++;
		}
		
		int seekTime = calculateSeekTime(fullSequence,head);
		
		
		System.out.println("Left Array:");
		for (i = 0; i < left.size(); i++) {
		    System.out.print(left.get(i) + " ");
		}
		System.out.println(); // New line for separation

		System.out.println("Right Array:");
		for (i = 0; i < right.size(); i++) {
		    System.out.print(right.get(i) + " ");
		}
		System.out.println(); // New line for separation
		
		
		for (i = 0; i < fullSequence.size(); i++){
			System.out.print(fullSequence.get(i) + " ");
		}
		
		System.out.println("\nSeek time was: " + seekTime);
			
		
		return fullSequence; //fully built array
	
	}
	
	
	/**
     * Calculates the total seek time and optionally generates the seek sequence.
     *
     * @param queue The list of track numbers to process.
     * @param head The starting position of the head.
     * @param seekSequence A list to store the seek sequence; pass null if not needed.
     * @return The total seek time.
     */
    public static int calculateSeekTime(List<Integer> queue, int head) {
        int seekCounter = 0;

        //for (int track : queue) {
        for (int i = 1; i < queue.size(); i++) { //
        	int track = queue.get(i);
            int distance = Math.abs(track - head); // Calculate the seek distance
            seekCounter += distance; // Accumulate total seek time
            head = track; 
        }

        return seekCounter;
    }
    // 176,79,34,60,92,11,41,114
	

}
