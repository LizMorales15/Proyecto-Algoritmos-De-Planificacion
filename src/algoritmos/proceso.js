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
  color
  constructor(name, burstTime, time, priority) {
    this.id = nextProcessId++;
    this.name = name;
    this.burstTime = burstTime;
    this.time = time;
    this.priority = priority;
    this.color = getRandomColor();

  }
}


