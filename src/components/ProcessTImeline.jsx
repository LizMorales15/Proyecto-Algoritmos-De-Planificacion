import './ProcessTimeline.css';
// eslint-disable-next-line react/prop-types
const ProcessTimeline = ({ processes }) => {
  // Create an array to represent each quantum of time
  let timeline = [];

  // Fill the timeline array with the processes
  // eslint-disable-next-line react/prop-types
  processes.forEach((process) => {
    for (let i = 0; i < process.burstTime; i++) {
      timeline.push(process);
    }
  });

  return (
    <table>
      <thead>
      <tr>
        <th>Time</th>
        {timeline.map((process, i) => (
          <th key={i}>{i}</th>
        ))}
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Process</td>
        {timeline.map((process, i) => (
          <td key={i} style={{ backgroundColor: process.color }}>
            {process.name}
          </td>
        ))}
      </tr>
      </tbody>
    </table>
  );
};

export default ProcessTimeline;
