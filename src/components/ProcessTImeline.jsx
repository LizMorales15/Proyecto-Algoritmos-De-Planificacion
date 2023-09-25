import './ProcessTimeline.css';
// eslint-disable-next-line react/prop-types
const ProcessTimeline = ({processes, srtf = false}) => {
  // Create an array to represent each quantum of time
  let timeline = [];

  // Fill the timeline array with the processes
  // eslint-disable-next-line react/prop-types
  processes.forEach((process) => {
    for (let i = 0; i < process.burstTime; i++) {
      timeline.push(process);
    }
  });
  timeline.map((process, i) => (
    <td key={i} style={{backgroundColor: process.color}}>
      {process.name}
    </td>
  ))
  return (
    <table>
      <thead>
      <tr>
        <th>Time</th>
        {/* eslint-disable-next-line react/prop-types */}
        {srtf ? processes.map((process, i) => (
          <th key={i}>{i}</th>
        )) : timeline.map((process, i) => (
          <th key={i}>{i}</th>
        ))}
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Process</td>
        {/* eslint-disable-next-line react/prop-types */}
        {srtf ? processes.map((process, i) => (
          <td key={i} style={{
            backgroundColor: process.color,
          }}>{process.name}</td>
        )) : timeline.map((process, i) => (
          <td key={i} style={{
            backgroundColor: process.color,
          }}>{process.name}</td>
        ))}
      </tr>
      </tbody>
    </table>
  );
};

export default ProcessTimeline;
