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


### Test Case 9: Single Request
- **Initial Head Position**: `50`
- **Disk Request Sequence**: `100`
- **For All Algorithms**:
- **Expected Result**: `50`
- **Actual Result**: `50`

### Test Case 10: Empty Queue With Head Position
- **Initial Head Position**: `"50"`
- **Disk Request Sequence**: `" "`
- **This will not get past the front end error handling**:

### Test Case 11: Empty Queue With Empty Head Position
- **Initial Head Position**: `" "`
- **Disk Request Sequence**: `" "`
- **This will not get past the front end error handling**:






