# Test Log

### Input Validation Test Log

These will NOT let the user select the buttons as inputs are invalid.


#### Test Case 1: Valid Input
- **Initial Head Position**: `50`
- **Disk Request Sequence**: `10,20,30,40,50`
- **Expected Result**: `true`
- **Actual Result**: `true`

#### Test Case 2: Invalid Initial Head Position (Out of Range)
- **Initial Head Position**: `150`
- **Disk Request Sequence**: `10,20,30,40,50`
- **Expected Result**: `false`
- **Actual Result**: `false`

#### Test Case 3: Invalid Disk Request Sequence (Out of Range)
- **Initial Head Position**: `50`
- **Disk Request Sequence**: `10,20,300,40,50`
- **Expected Result**: `false`
- **Actual Result**: `false`

#### Test Case 4: Invalid Disk Request Sequence (EMPTY request sequence)
- **Initial Head Position**: `50`
- **Disk Request Sequence**: ``
- **Expected Result**: `false`
- **Actual Result**: `false`

#### Test Case 5: Invalid Disk Request Sequence (Trailing Comma)
NOTE: This one will run but it replaces the comma with a zero. (Limitation)
- **Initial Head Position**: `50`
- **Disk Request Sequence**: `10,20,30,40,50,`
- **Expected Result**: `false`
- **Actual Result**: `10,20,30,40,50,0` This is what the Sequence is treated as.

#### FAILS
#### Test Case 6: Non-integer Initial Head Position
- **Initial Head Position**: `50.5`
- **Disk Request Sequence**: `10,20,30,40,50`
- **Expected Result**: `false`
- **Actual Result**: `true`

#### Test Case 7: Non-integer Disk Request Sequence
- **Initial Head Position**: `50`
- **Disk Request Sequence**: `10,20,30.5,40,50`
- **Expected Result**: `false`
- **Actual Result**: `false`


#### Test Case 8: Negative Disk Request Sequence
- **Initial Head Position**: `50`
- **Disk Request Sequence**: `10,-20,30,40,50`
- **Expected Result**: `false`
- **Actual Result**: `false`

### Test Case 9: Single Request
- **Initial Head Position**: `50`
- **Disk Request Sequence**: `100`

- **Expected Result FCFS**: `50`
- **Expected Result SCAN**: `150`
- **Expected Result C-SCAN**: `348`
- **Expected Result LOOK**: `50`
- **Expected Result C-LOOK**: `50`
- **Expected Result SSTF**: `50`

- **Actual Result FCFS**: `50`
- **Actual Result SCAN**: `150`
- **Actual Result C-SCAN**: `348`
- **Actual Result LOOK**: `50`
- **Actual Result C-LOOK**: `50`
- **Actual Result SSTF**: `50`


### Test Case 10: Empty Queue with valid Head Position ###
- **Initial Head Position**: `"50"`
- **Disk Request Sequence**: `" "`
- **Expected Result**: `false`
- **Actual Result**: `false`


### Test Case 11: Empty Queue With Empty Head Position ###
- **Initial Head Position**: `" "`
- **Disk Request Sequence**: `" "`
- **Expected Result**: `false`
- **Actual Result**: `false`


### Test Case 12: Empty Head Position with valid Queue### 
- **Initial Head Position**: `" "`
- **Disk Request Sequence**: `"50"`
- **Expected Result**: `false`
- **Actual Result**: `false`

## These test cases below will have VALID inputs and test the funtionality of all algorithms ##

### Test Case 13: Randomized Locations (some are purposefully close together and head is somewhere in middle) ####
- **Initial Head Position**: `"70"`
- **Disk Request Sequence**: `"20,25,30,0,150,110"`

 **Expected Result FCFS**: `280`
- **Expected Result SCAN**: `220`
- **Expected Result C-SCAN**: `358`
- **Expected Result LOOK**: `220`
- **Expected Result C-LOOK**: `260`
- **Expected Result SSTF**: `220`

- **Actual Result FCFS**: `280`
- **Actual Result SCAN**: `220`
- **Actual Result C-SCAN**: `358`
- **Actual Result LOOK**: `220`
- **Actual Result C-LOOK**: `260`
- **Actual Result SSTF**: `220`


### Test Case 14 Wide Locations (Head position roughly in middle) ####
- **Initial Head Position**: `"99"`
- **Disk Request Sequence**: `"90,10,140,60,0,190"`

 **Expected Result FCFS**: `549`
- **Expected Result SCAN**: `289`
- **Expected Result C-SCAN**: `357`
- **Expected Result LOOK**: `289`
- **Expected Result C-LOOK**: `339`
- **Expected Result SSTF**: `289`

- **Actual Result FCFS**: `549`
- **Actual Result SCAN**: `289`
- **Actual Result C-SCAN**: `357`
- **Actual Result LOOK**: `289`
- **Actual Result C-LOOK**: `339`
- **Actual Result SSTF**: `289`

### Test Case 15 Narrow Locations (Head position roughly in middle) ###
- **Initial Head Position**: `"99"`
- **Disk Request Sequence**: `"34,23,45,0,60,50,75,27"`

 **Expected Result FCFS**: `286`
- **Expected Result SCAN**: `99`
- **Expected Result C-SCAN**: `298`
- **Expected Result LOOK**: `99`
- **Expected Result C-LOOK**: `99`
- **Expected Result SSTF**: `99`

- **Actual Result FCFS**: `286`
- **Actual Result SCAN**: `99`
- **Actual Result C-SCAN**: `298`
- **Actual Result LOOK**: `99`
- **Actual Result C-LOOK**: `99`
- **Actual Result SSTF**: `99`

### Test Case 16 Consecutive locations  ###
- **Initial Head Position**: `"50"`
- **Disk Request Sequence**: `"51,52,53,54,55,56,57"`

 **Expected Result FCFS**: `7`
- **Expected Result SCAN**: `107`
- **Expected Result C-SCAN**: `397`
- **Expected Result LOOK**: `7`
- **Expected Result C-LOOK**: `13`
- **Expected Result SSTF**: `7`

- **Actual Result FCFS**: `7`
- **Actual Result SCAN**: `107`
- **Actual Result C-SCAN**: `397`
- **Actual Result LOOK**: `7`
- **Actual Result C-LOOK**: `13`
- **Actual Result SSTF**: `7`

### Test Case 17 Extreme Ends  ###
- **Initial Head Position**: `"50"`
- **Disk Request Sequence**: `"0,199,1,198,50"`

 **Expected Result FCFS**: `792`
- **Expected Result SCAN**: `249`
- **Expected Result C-SCAN**: `398`
- **Expected Result LOOK**: `249`
- **Expected Result C-LOOK**: `398`
- **Expected Result SSTF**: `249`

- **Actual Result FCFS**: `792`
- **Actual Result SCAN**: `249`
- **Actual Result C-SCAN**: `398`
- **Actual Result LOOK**: `249`
- **Actual Result C-LOOK**: `398`
- **Actual Result SSTF**: `249`

### Test Case 18 Extreme Ends and Some Cluster in the Middle  ###
- **Initial Head Position**: `"50"`
- **Disk Request Sequence**: `"0,199,23,19,30,35,1,198"`

 **Expected Result FCFS**: `676`
- **Expected Result SCAN**: `249`
- **Expected Result C-SCAN**: `250`
- **Expected Result LOOK**: `249`
- **Expected Result C-LOOK**: `250`
- **Expected Result SSTF**: `249`

- **Actual Result FCFS**: `676`
- **Actual Result SCAN**: `249`
- **Actual Result C-SCAN**: `250`
- **Actual Result LOOK**: `249`
- **Actual Result C-LOOK**: `250`
- **Actual Result SSTF**: `249`


### Test Case 19 Multiple Identical Requests ###
- **Initial Head Position**: `"50"`
- **Disk Request Sequence**: `"50,50,50,50,50"`

 **Expected Result FCFS**: `0`
- **Expected Result SCAN**: `100`
- **Expected Result C-SCAN**: `398`
- **Expected Result LOOK**: `0`
- **Expected Result C-LOOK**: `0`
- **Expected Result SSTF**: `0`

- **Actual Result FCFS**: `0`
- **Actual Result SCAN**: `100`
- **Actual Result C-SCAN**: `398`
- **Actual Result LOOK**: `0`
- **Actual Result C-LOOK**: `0`
- **Actual Result SSTF**: `0`


### Test Case 20 Multiple Identical Requests but only between Extreme ends ###
- **Initial Head Position**: `"0"`
- **Disk Request Sequence**: `"0,199,0,199,0"`

 **Expected Result FCFS**: `796`
- **Expected Result SCAN**: `199`
- **Expected Result C-SCAN**: `398`
- **Expected Result LOOK**: `199`
- **Expected Result C-LOOK**: `398`
- **Expected Result SSTF**: `199`

- **Actual Result FCFS**: `796`
- **Actual Result SCAN**: `199`
- **Actual Result C-SCAN**: `398`
- **Actual Result LOOK**: `199`
- **Actual Result C-LOOK**: `398`
- **Actual Result SSTF**: `199`


### Test Case 21 Demonstrates Starvation for SSTF  ###
With this case, we are able to see that the SSTF algorithm selects the request closest to the current head position.
So it inadvertantly goes all the way to 199, then jumps back to service 2
- **Initial Head Position**: `"21"`
- **Disk Request Sequence**: `"109,2,45,199,42,78,27,99,126,12,0,0,2,9"`

 **Expected Result FCFS**: `870`
- **Expected Result SCAN**: `220`
- **Expected Result C-SCAN**: `392`
- **Expected Result LOOK**: `220`
- **Expected Result C-LOOK**: `392`
- **Expected Result SSTF**: `377`

- **Actual Result FCFS**: `870`
- **Actual Result SCAN**: `220`
- **Actual Result C-SCAN**: `392`
- **Actual Result LOOK**: `220`
- **Actual Result C-LOOK**: `392`
- **Actual Result SSTF**: `377`

