package diskSchedulingAlgorithmsCOMP3659;

import java.util.List;

public class FCFS {

	
	public static void doFCFS(List<Request> queue, int head) {

		int currentLocation;
		int seekCounter = 0;
		int distance = 0;
		int i;
		
		for (i = 0; i < queue.size(); i++){
			
		currentLocation = queue.get(i).getTrackNumber();
		distance = Math.abs(distance - head);  //we just need the magnitude (no negatives) thats why I used abs val
		seekCounter += distance;
		head = currentLocation;
			
		}
		
		System.out.println("Total Number of seek operations = " + seekCounter);
		System.out.println("The Seek Sequence is");
		for (i = 0; i < queue.size(); i++){
		 System.out.println(queue.get(i));
		}
	}
	
}
