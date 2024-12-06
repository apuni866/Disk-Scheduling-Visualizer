**Project Proposal: Disk Scheduling Algorithm Visualizer**
****
***Amtoj Punia, Henry Nguyen, Evan Wushke***

### Overview
This project proposes the development of an interactive Disk Scheduling Algorithm Visualizer that simulates and compares three fundamental disk scheduling algorithms: First-Come-First-Serve (FCFS), SCAN, and Circular SCAN (CSCAN). We are open to choosing different algorithms—we picked these because the textbook mentions these three algorithms for how operating systems manage I/O operations to optimize disk access times and improve system efficiency. The visualizer will provide users with insights (through a graph or some other visuals) into how each algorithm handles disk requests and how scheduling choices directly impact performance metrics like seek time and total head movement.

### Objective and Functionality

- **Demonstrate Disk Scheduling Algorithms**:
 Users will be able to observe how FCFS, SCAN, and CSCAN algorithms manage and process disk requests. This will help us understand the unique characteristics of each method and their respective trade-offs in terms of efficiency and resource utilization.
- **Interactive Parameter Adjustment**: Users can input custom sequences of disk requests and modify parameters such as disk size, number of requests, and initial head position. This flexibility allows users to experiment with different scenarios and gain a deeper understanding of each algorithm’s behavior.
- **Real-Time Metrics and Visualization**: The visualizer will provide real-time feedback on performance metrics such as seek time, total head movement, and response time. Graphical representations will display the movement of the disk head as it processes each request, showing how each algorithm minimizes or maximizes seek time under various conditions.

The visualizer will provide a clear side-by-side comparison of FCFS, SCAN, and CSCAN. In particular:
- **FCFS**: Illustrates the simplest approach, processing requests in the order they arrive. While straightforward, this algorithm may lead to longer seek times when requests are scattered across the disk.
- **SCAN**: Also known as the “elevator” algorithm, it moves the disk head back and forth across the disk, reducing the average seek time by fulfilling requests in both directions. This approach balances efficiency with fairness, reducing the issue of long waits for requests located far from the current head position.
- **CSCAN**: A variation of SCAN, CSCAN (Circular SCAN) only processes requests in one direction before resetting to the start. This method improves fairness by ensuring that each request gets processed within a predictable time frame, though it may involve higher total head movement compared to SCAN.

### Relevance to OS Concepts
The visualizer demonstrates fundamental OS concepts, particularly in I/O management and disk scheduling. Disk scheduling is an essential part of operating system design, impacting how quickly data can be accessed from storage and, consequently, the performance of applications relying on disk I/O. By providing users with the ability to test different scheduling algorithms, this project highlights the trade-offs inherent in each approach, such as balancing seek time and throughput.

We chose to focus on these topics to learn about optimizing resource allocation and overall system performance in an OS. The visualizer will offer students and users an experiential learning opportunity to observe the effects of scheduling choices in real time, helping them grasp why specific algorithms are favored under particular workloads or system constraints.


### Implementation
We would prefer to develop a web-based application, using HMTL, CSS, and JavaScript for the bulk of the project. We would also be open to using C, but we aren't sure how that would work with the visual output.


## Testing
There is a formal testing document,`test_log.md`, included for this project. It has many test cases that test the functionality of the algorithms. There are many scenarios depicted for the request seqences and also the expected + actual seek times are listed for each algotithm. This makes it easy to understand from a quick glance the short-comings of some of the algorithms.