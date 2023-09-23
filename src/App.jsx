import './App.css'
import Fcfs from "./components/FCFS.jsx";
import {Link, Route, Routes} from "react-router-dom";
import SRT from "./components/SRT.jsx";
import PRIORIDADES from "./components/PRIORIDADES.jsx";



function App() {

  return (
    <>
      <div>
        <p>Algoritmos de planificación de procesos</p>
        <Link to="/"><button>FCFS</button></Link>
        <Link to="/srt"><button style={{
          marginRight: "1rem",
          marginLeft: "1rem"
        }}>SRT</button></Link>
        <Link to="/prioridades"><button>PRIORIDADES</button></Link>
      </div>
      <Routes>
        <Route path="/" element={<Fcfs />}></Route>
        <Route path="/srt" element={<SRT />}></Route>
        <Route path="/prioridades" element={<PRIORIDADES />}></Route>

      </Routes>
    </>
  )
}

export default App;
