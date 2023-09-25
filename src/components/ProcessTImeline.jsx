import './ProcessTimeline.css';
// eslint-disable-next-line react/prop-types
const ProcessTimeline = ({processes}) => {
  // Create an array to represent each quantum of time

  // Fill the timeline array with the processes
  // eslint-disable-next-line react/prop-types
  return (
    <table>
      <thead>
      <tr>
        <th>Time</th>
        {processes.map((process, i) => (
          <th key={i}>{i}</th>
        ))}
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Process</td>
        {/* eslint-disable-next-line react/prop-types */}
        {processes.map((process, i) => (
          <td key={i} style={{backgroundColor: process.color}}>
            {process.name}
          </td>
        ))}
      </tr>
      </tbody>
    </table>
  );
};

export default ProcessTimeline;
