class SRT {
  constructor(processes) {
    this.processes = processes;
    this.queue = [];
    this.averageTE = 0;
    this.averageTR = 0;
    this.averageTP = 0;
  }

  findWaitingTime(proc, n, wt) {
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

  findTurnAroundTime(proc, n, wt, tat) {
    // calculating turnaround time by adding
    // bt[i] + wt[i]
    for (let i = 0; i < n; i++)
      tat[i] = proc[i].bt + wt[i];
  }

  findavgTime(proc, n) {
    let wt = new Array(n);
    let tat = new Array(n);
    let total_wt = 0;
    let total_tat = 0;

    this.findWaitingTime(proc, n, wt);
    this.findTurnAroundTime(proc, n, wt, tat);

    console.log('\tTE\tTR\tTP');
    for (let process of this.queue) {
      console.log(`${process.pid}\t${process.burstTime}\t${process.art}\t${process.TE}\t${process.TR}\t${process.TP}`);
    }

    console.log(`PROMEDIO\t${this.averageTE.toFixed(1)} u.t\t${this.averageTR.toFixed(1)} u.t\t${this.averageTP.toFixed(1)} u.t`);
  }

  schedule() {
    this.processes.sort((a, b) => a.art - b.art);

    let currentTime = 0;
    let previousTR = 0;

    while (this.processes.length > 0) {
      let shortestIndex = 0;

      for (let i = 1; i < this.processes.length; i++) {
        if (this.processes[i].burstTime < this.processes[shortestIndex].burstTime &&
            this.processes[i].art <= currentTime) {
          shortestIndex = i;
        }
      }

      let process = this.processes[shortestIndex];

      process.TE = currentTime - process.art;
      if (process.TE < 0) {
        currentTime = process.art;
        process.TE = 0;
      }

      process.TR = currentTime - process.art; // Corregido el cálculo de TR

      process.TP = process.TE + process.burstTime;

      currentTime += process.burstTime;
      previousTR = process.TR;

      this.processes.splice(shortestIndex, 1);
      this.queue.push(process);
    }

    const averageTE = this.queue.reduce((sum, process) => sum + process.TE, 0) / this.queue.length;
    const averageTR = this.queue.reduce((sum, process) => sum + process.TR, 0) / this.queue.length;
    const averageTP = this.queue.reduce((sum, process) => sum + process.TP, 0) / this.queue.length;

    this.averageTE = averageTE;
    this.averageTR = averageTR;
    this.averageTP = averageTP;

    this.findavgTime(this.queue, this.queue.length);

  }
}

class Process {
  constructor(pid, art, burstTime) {
    this.pid = pid;
    this.art = art;
    this.burstTime = burstTime;
    this.TE = 0;
    this.TR = 0;
    this.TP = 0;
  }
}

const srt = new SRT(processes);
srt.schedule();