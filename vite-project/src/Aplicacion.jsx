import { Routes, Route } from 'react-router-dom'
import PaginaInicio from './paginas/PaginaInicio.jsx'

function Aplicacion() {
  return (
    <div className="aplicacion">
      <Routes>
        <Route path="/" element={<PaginaInicio />} />
      </Routes>
    </div>
  )
}

export default Aplicacion
