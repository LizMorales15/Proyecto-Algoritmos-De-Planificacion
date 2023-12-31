import {useState} from "react";
import {Process} from "../algoritmos/proceso.js";


// eslint-disable-next-line react/prop-types
const ProcessAdder = ({setProcesses}) => {
  const [process, setProcess] = useState({
    name: "",
    burstTime: 0,
    time: 0,
    priority: 0,
  });

  const addPrueba = () => {
    setProcesses((processes) => [...processes, new Process("A", 25, 0, 2)]);
    setProcesses((processes) => [...processes, new Process("B", 10, 4, 1)]);
    setProcesses((processes) => [...processes, new Process("C", 10, 3, 1)]);
    setProcesses((processes) => [...processes, new Process("D", 4, 2, 2)]);
    setProcesses((processes) => [...processes, new Process("E", 4, 1, 3)]);
  }

  const addProcess = () => {
    const validation = validateProcess();
    if (!validation) {
      return;
    }
    setProcesses((processes) => [...processes, new Process(process.name, Number(process.burstTime), Number(process.time), Number(process.priority))]);
    setProcess({
      name: "",
      burstTime: 0,
      time: 0,
      priority: 0,
    });
  }

  const validateProcess = () => {
    if (process.name === "") {
      alert("El nombre del proceso no puede estar vacío");
      return false;
    }
    if (process.burstTime < 0) {
      alert("El tiempo de ráfaga no puede ser negativo");
      return false;
    }
    if (process.time < 0) {
      alert("El tiempo de llegada no puede ser negativo");
      return false;
    }
    if (process.priority < 0) {
      alert("La prioridad no puede ser negativa");
      return false;
    }
    return true;
  }

  const handleProcess = (e) => {
    setProcess({
      ...process,
      [e.target.name]: e.target.value,
    });
  }

  return (

    <div style={
      {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }
    }>
      <h1>Añadir procesos</h1>
      <label htmlFor="name">Nombre del proceso</label>
      <input type="text" placeholder="Nombre del proceso..." name="name" onChange={handleProcess} value={process.name}
             style={{
               marginBottom: "1rem",
               padding: "0.5rem 1rem",
               border: "1px solid #ccc",
               borderRadius: "4px",
             }}/>
      <label htmlFor="burstTime">Tiempo de ráfaga</label>
      <input type="number" placeholder="Tiempo de rafaga..." name="burstTime" onChange={handleProcess}
             value={process.burstTime} min={0} style={{
        marginBottom: "1rem",
        padding: "0.5rem 1rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}/>
      <label htmlFor="time">Tiempo de llegada</label>
      <input type="number" placeholder="Tiempo de llegada" name="time" onChange={handleProcess} value={process.time}
             min={0} style={{
        marginBottom: "1rem",
        padding: "0.5rem 1rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}/>
      <label htmlFor="priority">Prioridad</label>
      <input type="number" placeholder="Prioridad" name="priority" onChange={handleProcess} value={process.priority}
             min={0} style={{
        marginBottom: "1rem",
        padding: "0.5rem 1rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}/>
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }
      }>
        <button onClick={addProcess} style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginRight: "1rem",
        }}>
          Añadir proceso
        </button>
        <button onClick={addPrueba} style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}>
          Pruebas
        </button>
      </div>


    </div>
  );
};

export default ProcessAdder;