import {useState} from 'react';
import {PRIORIDADES as prioridades} from '../algoritmos/PRIORIDADES.js';
import ProcessAdder from "./processAdder.jsx";
import {ProcessQueue} from "./processQueue.jsx";
import ProcessTimeline from "./ProcessTImeline.jsx";

const Prioridades = () => {
  const [enabled, setEnabled] = useState(false);
  const [processes, setProcesses] = useState([]);
  const [scheduler, setScheduler] = useState(null);

  const handleEnable = () => {
    const newScheduler = new prioridades(processes);
    newScheduler.schedule();
    setScheduler(newScheduler);
    setEnabled(prevState => !prevState);
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ProcessAdder setProcesses={setProcesses}/>
        {processes.length > 0 ? (
          <div>
            <h2>Procesos</h2>
            <table className="process-table">
              <thead>
              <tr>
                <th>PROCESO</th>
                <th>RÁFAGA CPU</th>
                <th>TIEMPO DE LLEGADA</th>
                <th>PRIORIDAD</th>
              </tr>
              </thead>
              <tbody>
              {processes.map((process) => (
                <tr
                  key={process.id}
                  style={{backgroundColor: process.color}}
                >
                  <td>{process.name}</td>
                  <td>{process.burstTime}</td>
                  <td>{process.time}</td>
                  <td>{process.priority}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        ) : null}
        {enabled && scheduler ? (
          <div>
            <h2>Procesos</h2>
            <table className="process-table">
              <thead>
              <tr>
                <th>Proceso</th>
                <th>Tiempo Espera (TE)</th>
                <th>Tiempo Respuesta (TR)</th>
                <th>Tiempo de Permanencia (TP)</th>
              </tr>
              </thead>
              <tbody>
              {scheduler.queue.map((process) => (
                <tr key={process.id} style={{backgroundColor: process.color}}>
                  <td>{process.name}</td>
                  <td>{process.TE}</td>
                  <td>{process.TR}</td>
                  <td>{process.TP}</td>
                </tr>
              ))}
              </tbody>
            </table>
            <h2>PROMEDIO</h2>
            <table className="process-table">
              <thead>
              <tr>
                <th>TE</th>
                <th>TR</th>
                <th>TP</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{scheduler.averageTE.toFixed(1)} u.t</td>
                <td>{scheduler.averageTR.toFixed(1)} u.t</td>
                <td>{scheduler.averageTP.toFixed(1)} u.t</td>
              </tr>
              </tbody>
            </table>
          </div>
        ) : null}

      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <h2 style={{
          textAlign: "center"
        }}>Algoritmo PRIORIDADES</h2>
        <button onClick={handleEnable} style={{
          display: enabled ? 'none' : 'block'
        }}>
          Start
        </button>
      </div>
      {enabled && scheduler ?
        <ProcessQueue processes={scheduler.queue} enabled={enabled}/>
        : null}
      {enabled && scheduler ?
        <ProcessTimeline processes={scheduler.queue}/>
        : null
      }
    </div>
  );
};

export default Prioridades;