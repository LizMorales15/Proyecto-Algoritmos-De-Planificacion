export class SRT {
  processes: Process[];
  queue: Process[];
  averageTE: number;
  averageTR: number;
  averageTP: number;

  constructor(processes: Process[]) {
    this.processes = processes;
    this.queue = [];
    this.averageTE = 0;
    this.averageTR = 0;
    this.averageTP = 0;
  }

  private findWaitingTime(proc: Process[], n: number, wt: number[]) {
        let rt = new Array(n);

        // Copy the burst time into rt[]
        for (let i = 0; i < n; i++)
          rt[i] = proc[i].bt;

        let complete = 0, t = 0, minm = Number.MAX_VALUE;
        let shortest = 0, finish_time;
        let check = false;

        // Process until all processes gets
        // completed
        while (complete != n) {

          // Find process with minimum
          // remaining time among the
          // processes that arrives till the
          // current time`
          for (let j = 0; j < n; j++)
          {
            if ((proc[j].art <= t) &&
                (rt[j] < minm) && rt[j] > 0) {
              minm = rt[j];
              shortest = j;
              check = true;
            }
          }

          if (check == false) {
            t++;
            continue;
          }

          // Reduce remaining time by one
          rt[shortest]--;

          // Update minimum
          minm = rt[shortest];
          if (minm == 0)
            minm = Number.MAX_VALUE;

          // If a process gets completely
          // executed
          if (rt[shortest] == 0) {

            // Increment complete
            complete++;
            check = false;

            // Find finish time of current
            // process
            finish_time = t + 1;

            // Calculate waiting time
            wt[shortest] = finish_time -
                proc[shortest].bt -
                proc[shortest].art;

            if (wt[shortest] < 0)
              wt[shortest] = 0;
          }
          // Increment time
          t++;
        }
  }

  private findTurnAroundTime(proc: Process[], n: number, wt: number[], tat: number[]) {
        // calculating turnaround time by adding
        // bt[i] + wt[i]
        for (let i = 0; i < n; i++)
          tat[i] = proc[i].bt + wt[i];
  }

  private findavgTime(proc: Process[], n: number) {
        let wt = new Array(n), tat = new Array(n);
        let  total_wt = 0, total_tat = 0;

        // Function to find waiting time of all
        // processes
        findWaitingTime(proc, n, wt);

        // Function to find turn around time for
        // all processes
        findTurnAroundTime(proc, n, wt, tat);

        // Display processes along with all
        // details
        document.write("Processes " +
            " Burst time " +
            " Waiting time " +
            " Turn around time<br>");

        // Calculate total waiting time and
        // total turnaround time
        for (let i = 0; i < n; i++) {
          total_wt = total_wt + wt[i];
          total_tat = total_tat + tat[i];
          document.write(" " + proc[i].pid +
              " "
              + proc[i].bt + " " + wt[i]
              + " " + tat[i]+"<br>");
    }

    document.write("Average waiting time = " +
        total_wt / n+"<br>");
    document.write("Average turn around time = " +
        total_tat / n+"<br>");
  }

  schedule() {
    // Sort the processes by their arrival time (time property)
    this.processes.sort((a, b) => a.art - b.art);

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


    // Calculate the average values for TE, TR, and TP
    this.findavgTime(this.queue, this.queue.length);

    // Display the results in the desired format
    console.log('\tTE\tTR\tTP');
    for (let process of this.queue) {
      console.log(`${process.pid}\t${process.bt}\t${process.art}\t${process.TE}\t${process.TR}\t${process.TP}`);
    }

    console.log(`PROMEDIO\t${this.averageTE.toFixed(1)} u.t\t${this.averageTR.toFixed(1)} u.t\t${this.averageTP.toFixed(1)} u.t`);
  }
}