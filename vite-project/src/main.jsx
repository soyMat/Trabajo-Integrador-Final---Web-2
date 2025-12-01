import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Aplicacion from './Aplicacion.jsx'
import Beams from './componentes/Beams.jsx'
import { CarritoProvider } from './context/CarritoContext.jsx'
import './index.css'

// envuelvo toda la aplicacion con CarritoProvider para que useCarrito funcione en cualquier pagina
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CarritoProvider>
      {/* contenedor general con el fondo animado */}
      <div className="relative min-h-screen text-white overflow-hidden">
        {/* fondo con beams */}
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

        <div className="relative z-10">
          <BrowserRouter>
            <Aplicacion />
          </BrowserRouter>
        </div>
      </div>
    </CarritoProvider>
  </React.StrictMode>
)
