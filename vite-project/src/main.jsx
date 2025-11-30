import React from 'react'
import ReactDOM from 'react-dom/client'
import PaginaInicio from './paginas/PaginaInicio.jsx'
import Beams from './componentes/Beams.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Contenedor general de la app */}
    <div className="relative min-h-screen text-white overflow-hidden">
      
      {/* Fondo Beams */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={0}
        />
      </div>

      {/* App */}
      <div className="relative z-10">
        <PaginaInicio />
      </div>
    </div>
  </React.StrictMode>,
  {/* cd "E:\universidad\web\TRABAJO FINAL WEB\vite-project" */}
)
