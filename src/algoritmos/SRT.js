export class SRT {
  processes;
  queue;
  waitingQueue;

  constructor(processes) {
    this.processes = processes;
    this.queue = [];
    this.waitingQueue = [];
  }

  schedule() {
    let currentTime = 0;
    let previousTR = 0;

    while (this.processes.length > 0 || this.waitingQueue.length > 0) {
      // Check if there are new processes that have arrived
      while (this.processes.length > 0 && this.processes[0].time <= currentTime) {
        const newProcess = this.processes.shift();
        newProcess.burstTime = Number(newProcess.burstTime);
        newProcess.time = Number(newProcess.time);
        this.waitingQueue.push(newProcess);
      }

      // Choose the process with the smallest remaining burst time
      let shortestIndex = -1;
      for (let i = 0; i < this.waitingQueue.length; i++) {
        if (shortestIndex === -1 || this.waitingQueue[i].burstTime < this.waitingQueue[shortestIndex].burstTime) {
          shortestIndex = i;
        }
      }

      if (shortestIndex !== -1) {
        const process = this.waitingQueue[shortestIndex];

        // Calculate TE (waiting time) for each process
        process.TE = currentTime - process.time;

        // Calculate TR (response time) for each process
        process.TR = process.burstTime + previousTR - process.time;

        // Calculate TP (completion time) for each process
        process.TP = process.TE + process.burstTime;

        // Update the current time and previous TR
        currentTime += process.burstTime;
        previousTR = process.TR;

        // Remove the process from the waiting queue and add it to the queue
        this.waitingQueue.splice(shortestIndex, 1);
        this.queue.push(process);
      } else {
        // If there are no processes in the waiting queue, increment the time
        currentTime++;
      }
    }

    // Calculate the average values for TE, TR, and TP
    const averageTE = this.queue.reduce((sum, process) => sum + Number(process.TE), 0) / this.queue.length;
    const averageTR = this.queue.reduce((sum, process) => sum + Number(process.TR), 0) / this.queue.length;
    const averageTP = this.queue.reduce((sum, process) => sum + Number(process.TP), 0) / this.queue.length;

    // Set the calculated values as properties of the SRT instance
    this.averageTE = averageTE;
    this.averageTR = averageTR;
    this.averageTP = averageTP;

    // Display the results in the desired format
    console.log('\tTE\tTR\tTP');
    for (let process of this.queue) {
      console.log(`${process.name}\t${process.TE}\t${process.TR}\t${process.TP}`);
    }

    console.log(`PROMEDIO\t${averageTE.toFixed(1)} u.t\t${averageTR.toFixed(1)} u.t\t${averageTP.toFixed(1)} u.t`);
  }

  // Function to put a process in the waiting queue
  putInWaitingQueue(process) {
    process.burstTime = Number(process.burstTime);
    process.time = Number(process.time);
    this.waitingQueue.push(process);
  }
}

