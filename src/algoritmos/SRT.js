export class SRT {
  processes;
  queue;

  constructor(processes) {
    this.processes = processes;
    this.queue = [];
  }

  schedule() {
    let currentTime = 0;
    let processQueue = [...this.processes];

    processQueue.sort((a, b) => {
      if (a.time === b.time) {
        return a.priority - b.priority;
      }
      return a.time - b.time;
    });

    while (processQueue.length > 0) {
      let process = processQueue.reduce((shortest, process) => {
        if (process.time <= currentTime && (shortest === null || process.burstTime < shortest.burstTime)) {
          return process;
        } else {
          return shortest;
        }
      }, null);

      if (process !== null) {
        process.burstTime--;
        currentTime++;

        if (!process.TE) {
          process.TE = currentTime - process.time;
        }

        if (!process.TR) {
          if (this.queue.length > 0) {
            let previousProcess = this.queue[this.queue.length - 1];
            process.TR = currentTime - previousProcess.TR - previousProcess.burstTime;
          } else {
            process.TR = currentTime - process.time;
          }
        }

        if (process.burstTime === 0) {
          process.TP = process.TE + process.burstTime;
          this.queue.push(process);
          processQueue = processQueue.filter(p => p !== process);
        }
      } else {
        currentTime++;
      }
    }

    const averageTE = this.queue.reduce((sum, process) => sum + Number(process.TE), 0) / this.queue.length;
    const averageTR = this.queue.reduce((sum, process) => sum + Number(process.TR), 0) / this.queue.length;
    const averageTP = this.queue.reduce((sum, process) => sum + Number(process.TP), 0) / this.queue.length;

    this.averageTE = averageTE;
    this.averageTR = averageTR;
    this.averageTP = averageTP;
  }
}