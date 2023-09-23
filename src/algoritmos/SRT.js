export class SRT {
  processes;
  queue;

  constructor(processes) {
    this.processes = processes;
    this.queue = [];
  }

  schedule() {
    // Sort the processes by their arrival time (time property)
    this.processes.sort((a, b) => a.time - b.time);

    let currentTime = 0;
    let previousTR = 0;

    while (this.processes.length > 0) {
      // Choose the process with the smallest burst time
      let shortestIndex = 0;
      for (let i = 1; i < this.processes.length; i++) {
        if (this.processes[i].burstTime < this.processes[shortestIndex].burstTime &&
          this.processes[i].time <= currentTime) {
          shortestIndex = i;
        }
      }

      let process = this.processes[shortestIndex];
      // Make sure the properties are treated as numbers
      process.burstTime = Number(process.burstTime);
      process.time = Number(process.time);

      // Calculate TE (waiting time) for each process
      process.TE = currentTime - process.time;
      if (process.TE < 0) {
        currentTime = process.time;
        process.TE = 0;
      }

      // Calculate TR (response time) for each process
      process.TR = process.burstTime + previousTR;

      // Calculate TP (completion time) for each process
      process.TP = process.TE + process.burstTime;

      // Update the current time and previous TR
      currentTime += process.burstTime;
      previousTR = process.TR;

      // Remove the process from the array and add it to the queue
      this.processes.splice(shortestIndex, 1);
      this.queue.push(process);
    }

    // Calculate the average values for TE, TR, and TP
    const averageTE = this.queue.reduce((sum, process) => sum + Number(process.TE), 0) / this.queue.length;
    const averageTR = this.queue.reduce((sum, process) => sum + Number(process.TR), 0) / this.queue.length;
    const averageTP = this.queue.reduce((sum, process) => sum + Number(process.TP), 0) / this.queue.length;

    // Set the calculated values as properties of the SRT instance
    this.averageTE = averageTE;
    this.averageTR = averageTR;
    this.averageTP = averageTP;
  }


}
