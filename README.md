**Project: Disk Scheduling Algorithm Visualizer**
****
***Amtoj Punia, Henry Nguyen, Evan Wushke***

[View Our Project on Github Pages](https://apuni866.github.io/Disk-Scheduling-Visualizer/)

[View our Project Governace](https://docs.google.com/document/d/1UCeY2iLomhVSKzFggaktWNOsTkYY99SSWvBjRraaan4/edit?usp=sharing)

### Overview
This project proposes the development of an interactive Disk Scheduling Algorithm Visualizer that simulates and compares six fundamental disk scheduling algorithms: First-Come-First-Serve (FCFS), SCAN, Circular SCAN (CSCAN), LOOK, Cicular LOOK (CLOOK) and Shortest Seek Time First (SSTF).


### Important Files for this project ###
We did some of the implementation in Java before JavaScript to make sure the algorithms were working,
so there is a Java folder with code for for the algorithms. We translated them over afterwards into JS.


### Objective and Functionality

- **Demonstrate Disk Scheduling Algorithms**:
 Users will be able to observe how FCFS, SCAN, CSCAN, LOOK, C-LOOK, and SSTF algorithms manage and process disk requests. This will help us understand the unique characteristics of each method and their respective trade-offs in terms of efficiency and resource utilization.
- **Interactive Parameter Adjustment**: Users can input custom sequences of disk requests and modify parameters such as number of requests, and initial head position. This flexibility allows users to experiment with different scenarios and gain a deeper understanding of each algorithm’s behavior.
- **Real-Time Metrics and Visualization**: The visualizer will provide real-time feedback on performance metrics such as seek time, total head movement. Graphical representations will display the movement of the disk head as it processes each request, showing how each algorithm minimizes or maximizes seek time under various conditions.

The visualizer will provide a clear side-by-side comparison of FCFS, SCAN, and CSCAN. In particular:
- **FCFS**: Illustrates the simplest approach, processing requests in the order they arrive. While straightforward, this algorithm may lead to longer seek times when requests are scattered across the disk.
- **SCAN**: Also known as the “elevator” algorithm, it moves the disk head back and forth across the disk, reducing the average seek time by fulfilling requests in both directions. This approach balances efficiency with fairness, reducing the issue of long waits for requests located far from the current head position.
- **CSCAN**: A variation of SCAN, CSCAN (Circular SCAN) only processes requests in one direction before resetting to the start. This method improves fairness by ensuring that each request gets processed within a predictable time frame, though it may involve higher total head movement compared to SCAN.
- **LOOK**: The LOOK algorithm processes disk requests in a linear fashion. The disk head moves from the initial position to the end of the lowest request number (i.e. left-first direction), then reverses direction and moves to the other end up to the highest request. The total head movement is the sum of the absolute differences between the track numbers in the request sequence.
- **CLOOK**: C Look Algorithm is similar to C-SCAN algorithm to some extent. In this algorithm, the arm of the disk moves outwards servicing requests until it reaches the highest request cylinder, then it jumps to the lowest request cylinder without servicing any request then it again start moving outwards servicing the remaining requests.
- **SSTF**: The Shortest Seek Time First (SSTF) algorithm processes disk requests based on the shortest seek time. The disk head moves to the closest request in the sequence before moving to the next closest request. The total head movement is the sum of the absolute differences between the track numbers in the request sequence.

## Features that would be nice to have time permitting
- **Different types of graphs that comapred the seek times. For example a bar graph.**
- **Choose any algorithms to comapre. For example: If user wanted to comapre SSTF FCFS and LOOK they would have the option to select any algorithms they want to comapre**
- **Choosing custom colours to comapre**
- **Hover over a point on the graph and get metrics at that plotted point.**





### Relevance to OS Concepts
The visualizer demonstrates fundamental OS concepts, particularly in I/O management and disk scheduling. Disk scheduling is an essential part of operating system design, impacting how quickly data can be accessed from storage and, consequently, the performance of applications relying on disk I/O. By providing users with the ability to test different scheduling algorithms, this project highlights the trade-offs inherent in each approach, such as balancing seek time. We chose to focus on these topics to learn about optimizing resource allocation and overall system performance in an OS. The visualizer will offer students and users an experiential learning opportunity to observe the effects of scheduling choices in real time, helping them grasp why specific algorithms are favored under particular workloads or system constraints.

## Testing
There is a formal testing document,`test_log.md`, included for this project. It has many test cases that test the functionality of the algorithms. There are many scenarios depicted for the request seqences and also the expected + actual seek times are listed for each algotithm. This makes it easy to understand from a quick glance the short-comings of some of the algorithms.