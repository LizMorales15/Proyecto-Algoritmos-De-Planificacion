export class FCFS {
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

    for (let process of this.processes) {
      // Ensure the properties are treated as numbers
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
    }

    // Calculate the average values for TE, TR, and TP
    const averageTE = this.processes.reduce((sum, process) => sum + Number(process.TE), 0) / this.processes.length;
    const averageTR = this.processes.reduce((sum, process) => sum + Number(process.TR), 0) / this.processes.length;
    const averageTP = this.processes.reduce((sum, process) => sum + Number(process.TP), 0) / this.processes.length;

    // Set the calculated values as properties of the FCFS instance
    this.averageTE = averageTE;
    this.averageTR = averageTR;
    this.averageTP = averageTP;

    // Set the queue as the sorted processes
    this.queue = [...this.processes];

    // Display the results in the desired format
    console.log('\tTE\tTR\tTP');

    for (let process of this.processes) {
      console.log(`${process.name}\t${process.TE}\t${process.TR}\t${process.TP}`);
    }

    console.log(`PROMEDIO\t${averageTE.toFixed(1)} u.t\t${averageTR.toFixed(1)} u.t\t${averageTP.toFixed(1)} u.t`);
  }






}
