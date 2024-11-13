package diskSchedulingAlgorithmsCOMP3659;

import java.util.List;
import java.util.ArrayList;
import java.util.Scanner;

public class Main {

	public static void main (String[] args) {
		
		// get user input on the sequence they want (e.g 10,45,34,23) and a head position
		// parse the requests (split them by a ',' 
		// then convert them to integers and add them to an ArrayList of request class
		
		Scanner scanner = new Scanner(System.in);
		System.out.print("Enter the initial head position: ");
        int initialHeadPosition = scanner.nextInt();
		
        System.out.print("Enter the disk request sequence (comma-separated track numbers): ");
        scanner.nextLine();  
        String[] input = scanner.nextLine().split(",");
        
        List<Request> requests = new ArrayList<>();
        for (int i = 0; i < input.length; i++) {
            String s = input[i];
            int trackNumber = Integer.parseInt(s);
            requests.add(new Request(trackNumber));
        }
		

        FCFS.doFCFS(requests, initialHeadPosition);
        
	}
}
