package diskSchedulingAlgorithmsCOMP3659;

public class Request {
	
	private int trackNumber;
	
	public Request (int userChoice) { this.trackNumber = userChoice; }
	
	public int getTrackNumber(){ return trackNumber; }
	
	@Override
    public String toString() {
        return String.valueOf(this.trackNumber);  
    }
}
