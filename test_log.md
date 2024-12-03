# Test Log

## Input Validation Tests

### Input Validation Test Log

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

#### Test Case 4: Empty Disk Request Sequence
- **Initial Head Position**: `50`
- **Disk Request Sequence**: ``
- **Expected Result**: `false`
- **Actual Result**: `false`

#### Test Case 5: Disk Request Sequence with Trailing Comma
- **Initial Head Position**: `50`
- **Disk Request Sequence**: `10,20,30,40,50,`
- **Expected Result**: `true`
- **Actual Result**: `true`

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
- **This will NOT let the user select the buttons as input is invalid**


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
- **ActualResult C-LOOK**: `50`
- **ActualResult SSTF**: `50`


### Test Case 10: Empty Queue With Head Position ###
- **Initial Head Position**: `"50"`
- **Disk Request Sequence**: `" "`
- **This will not get past the front end error handling**:

### Test Case 11: Empty Queue With Empty Head Position ###
- **Initial Head Position**: `" "`
- **Disk Request Sequence**: `" "`
- **This will not get past the front end error handling**:


### Test Case 12: Empty Queue With Empty Head Position ###$
- **Initial Head Position**: `" "`
- **Disk Request Sequence**: `" "`
- **This will not get past the front end error handling**:

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
- **ActualResult C-LOOK**: `260`
- **ActualResult SSTF**: `220`

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
- **ActualResult C-LOOK**: `339`
- **ActualResult SSTF**: `289`

