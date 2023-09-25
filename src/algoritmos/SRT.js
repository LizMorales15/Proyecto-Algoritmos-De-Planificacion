export class SRT {
  constructor(processes) {
    this.processes = processes;
    this.burst_remaining = [];
    this.is_completed = [];
    this.total_turnaround_time = 0;
    this.total_waiting_time = 0;
    this.total_response_time = 0;
    this.total_idle_time = 0;
  }

  schedule() {
    for (let i = 0; i < this.processes.length; i++) {
      this.burst_remaining[i] = this.processes[i].burstTime;
      this.is_completed[i] = false;
    }

    let current_time = 0;
    let completed = 0;
    let prev = 0;

    while (completed !== this.processes.length) {
      let idx = -1;
      let mn = Number.MAX_VALUE;

      for (let i = 0; i < this.processes.length; i++) {
        if (this.processes[i].arrivalTime <= current_time && this.is_completed[i] === false) {
          if (this.burst_remaining[i] < mn) {
            mn = this.burst_remaining[i];
            idx = i;
          }
          if (this.burst_remaining[i] === mn) {
            if (this.processes[i].arrivalTime < this.processes[idx].arrivalTime) {
              mn = this.burst_remaining[i];
              idx = i;
            }
          }
        }
      }

      if (idx !== -1) {
        if (this.burst_remaining[idx] === this.processes[idx].burstTime) {
          this.processes[idx].startTime = current_time;
          this.total_idle_time += this.processes[idx].startTime - prev;
        }
        this.burst_remaining[idx] -= 1;
        current_time++;
        prev = current_time;

        if (this.burst_remaining[idx] === 0) {
          this.processes[idx].completionTime = current_time;
          this.processes[idx].turnaroundTime =
            this.processes[idx].completionTime - this.processes[idx].arrivalTime;
          this.processes[idx].waitingTime =
            this.processes[idx].turnaroundTime - this.processes[idx].burstTime;
          this.processes[idx].responseTime =
            this.processes[idx].startTime - this.processes[idx].arrivalTime;

          this.total_turnaround_time += this.processes[idx].turnaroundTime;
          this.total_waiting_time += this.processes[idx].waitingTime;
          this.total_response_time += this.processes[idx].completionTime;

          this.is_completed[idx] = true;
          completed++;
        }
      } else {
        current_time++;
      }
    }

    this.total_turnaround_time /= this.processes.length;
    this.total_waiting_time /= this.processes.length;
    this.total_response_time /= this.processes.length;

    return this.processes; // return the updated processes
  }
}
