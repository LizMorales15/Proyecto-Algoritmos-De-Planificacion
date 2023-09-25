function getRandomColor() {
  const letters = "89ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

let nextProcessId = 0;

export class Process {
  id;
  name;
  burstTime;
  time;
  priority;
  color;
  waitingTime;
  arrivalTime;
  startTime;
  completionTime;
  turnaroundTime;
  responseTime;

  constructor(name, burstTime, time, priority) {
    this.id = nextProcessId++;
    this.name = name;
    this.burstTime = burstTime;
    this.time = time; // This can be considered as arrival_time
    this.priority = priority;
    this.color = getRandomColor();
    this.waitingTime = 0; // This can be considered as waiting_time

    // Initialize the new fields
    this.arrivalTime = this.time;
    this.startTime = 0;
    this.completionTime = 0;
    this.turnaroundTime = 0; // completion_time - arrival_time
    this.responseTime = 0; // start_time - arrival_time
  }
}
