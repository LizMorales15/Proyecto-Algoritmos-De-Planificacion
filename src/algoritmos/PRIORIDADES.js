export class PRIORIDADES {
  processes;
  queue;

  constructor(processes) {
    this.processes = processes;
    this.clonedProcesses = [...processes];
    this.queue = [];
  }

  schedule() {
    console.log('hola');
    /* Sort the processes by priority and arrival time
        so the ones with same priority gets an order by
        arrival time
    */
    this.clonedProcesses.sort((a, b) => {
      if (a.priority === b.priority) {
        return a.time - b.time;
      }
      return a.priority - b.priority;
    });

    let currentTime = 0;
    let previousTR = 0;

    for (let i = 0; i < this.clonedProcesses.length; i++) {
      const currentProcess = this.clonedProcesses[i];

      // Check if the process has arrived
      if (currentProcess.time <= currentTime) {
        // Find other processes with the same priority and arrival time
        const sameArrivalTimeAndPriorityProcesses = this.clonedProcesses.filter(process =>
          process.time === currentProcess.time && process.priority === currentProcess.priority);

        if (sameArrivalTimeAndPriorityProcesses.length > 1) {
          // If there are multiple processes with the same arrival time and priority, choose the one that arrived first
          sameArrivalTimeAndPriorityProcesses.sort((a, b) => a.time - b.time);
        }

        // Ensure the properties are treated as numbers
        currentProcess.burstTime = Number(currentProcess.burstTime);
        currentProcess.time = Number(currentProcess.time);
        // Calculate TE (waiting time) for each process
        currentProcess.TE = currentTime - currentProcess.time;
        if (currentProcess.TE < 0) {
          currentTime = currentProcess.time;
          currentProcess.TE = 0;
        }

        // Calculate TR (response time) for each process
        currentProcess.TR = currentProcess.burstTime + previousTR;

        // Calculate TP (completion time) for each process
        currentProcess.TP = currentProcess.TE + currentProcess.burstTime;


        const chosenProcess = sameArrivalTimeAndPriorityProcesses[0];


        // Update the current time and previous TR
        chosenProcess.TE = currentTime - chosenProcess.time;
        if (chosenProcess.TE < 0) {
          currentTime = chosenProcess.time;
          chosenProcess.TE = 0;
        }
        chosenProcess.TR = chosenProcess.burstTime + previousTR;
        chosenProcess.TP = chosenProcess.TE + chosenProcess.burstTime;
        currentTime += chosenProcess.burstTime;
        previousTR = chosenProcess.TR;

        // Add the chosen process to the queue
        this.queue.push(chosenProcess);

        // Remove the chosen process from the processes array
        this.clonedProcesses.splice(this.clonedProcesses.indexOf(chosenProcess), 1);

        // Reset the loop to re-evaluate the remaining processes
        i = -1;
      }
    }

    // Calculate the average values for TE, TR, and TP
    const averageTE = this.queue.reduce((sum, process) => sum + process.TE, 0) / this.queue.length;
    const averageTR = this.queue.reduce((sum, process) => sum + process.TR, 0) / this.queue.length;
    const averageTP = this.queue.reduce((sum, process) => sum + process.TP, 0) / this.queue.length;

    // Set the calculated values as properties of the PRIORIDADES instance
    this.averageTE = averageTE;
    this.averageTR = averageTR;
    this.averageTP = averageTP;

    this.queue = this.queue.concat(this.clonedProcesses);

    // Display the results in the desired format
    console.log('\tTE\tTR\tTP');
    for (let process of this.queue) {
      console.log(`${process.name}\t${process.TE}\t${process.TR}\t${process.TP}`);
    }

    console.log(`PROMEDIO\t${averageTE.toFixed(1)} u.t\t${averageTR.toFixed(1)} u.t\t${averageTP.toFixed(1)} u.t`);
  }
}
