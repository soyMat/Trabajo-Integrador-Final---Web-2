import { Routes, Route } from 'react-router-dom'
import PaginaInicio from './paginas/PaginaInicio.jsx'
import CategoriaHombre from './paginas/CategoriaHombre.jsx'
import CategoriaMujer from './paginas/CategoriaMujer.jsx'
import ProductoDetalle from './paginas/ProductoDetalle.jsx'

function Aplicacion() {
  return (
    <div className="aplicacion">
      <Routes>
        <Route path="/" element={<PaginaInicio />} />
        <Route path="/categoria/hombre" element={<CategoriaHombre />} />
        <Route path="/categoria/mujer" element={<CategoriaMujer />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
      </Routes>
    </div>
  )
}

export default Aplicacion
