import { useEffect, useReducer } from 'react';
import { gsap } from 'gsap';

function processReducer(state, action) {
  switch (action.type) {
    case 'PROCESS_COMPLETED':
      if (state.completedProcesses.find((p) => p.id === action.process.id)) {
        return state;
      } else {
        return {
          ...state,
          uncompletedProcesses: state.uncompletedProcesses.filter((p) => p.id !== action.process.id),
          completedProcesses: [...state.completedProcesses, action.process],
        };
      }
    default:
      return state;
  }
}

// eslint-disable-next-line react/prop-types
export function ProcessQueue({ processes, enabled }) {
  const [state, dispatch] = useReducer(processReducer, {
    uncompletedProcesses: processes,
    completedProcesses: [],
  }, () => {
    // eslint-disable-next-line react/prop-types
    const uncompletedProcesses = processes?.map((p) => ({ ...p }));
    return { uncompletedProcesses, completedProcesses: [] };
  });



  useEffect(() => {
    if (!state.uncompletedProcesses || state.uncompletedProcesses.length === 0) {
      return;
    }
    if (state.uncompletedProcesses?.length > 0) {
      const process = state?.uncompletedProcesses[0];
      gsap.to(`.process-${process.id}`, {
        x: '100%',
        duration: process.burstTime / 2,
        onComplete: () => dispatch({ type: 'PROCESS_COMPLETED', process }),
      });
    }
  }, [state.uncompletedProcesses]);

// eslint-disable-next-line react/prop-types
  if (!enabled) {
    return null;
  }

  return (
    <div>
      <h2>Uncompleted Processes</h2>
      {state.uncompletedProcesses.map((process) => (
        <div key={process.id} className={`process process-${process.id}`} style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100px',
          backgroundColor: process.color,
          color: 'white',
          padding: '0 20px',
          marginBottom: '10px',

        }}>
          <div>
          <p>
            Proceso: {process.id}
          </p>
          </div>
          <div>
          <p>
            Tiempo Rafaga: {process.burstTime}
          </p>
          </div>
        </div>
      ))}

      <h2>Completed Processes</h2>
      {state.completedProcesses.map((process) => (
        <p key={process.id}>Process {process.id} Finished</p>
      ))}
    </div>
  );
}
