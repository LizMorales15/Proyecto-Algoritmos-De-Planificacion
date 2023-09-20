import './App.css'
import Fcfs from "./components/FCFS.jsx";
import {Link, Route, Routes} from "react-router-dom";
import SRT from "./components/SRT.jsx";
import Srtf from "./components/SRTF.jsx";



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
        <Link to="/srtf"><button>PRIORIDADES</button></Link>
      </div>
      <Routes>
        <Route path="/" element={<Fcfs />}></Route>
        <Route path="/srt" element={<SRT />}></Route>
        <Route path="/srtf" element={<Srtf />}></Route>

      </Routes>
    </>
  )
}

export default App;
