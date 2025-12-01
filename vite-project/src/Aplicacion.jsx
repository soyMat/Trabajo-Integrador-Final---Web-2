import { Routes, Route } from 'react-router-dom'
import PaginaInicio from './paginas/PaginaInicio.jsx'
import CategoriaHombre from './paginas/CategoriaHombre.jsx'
import CategoriaMujer from './paginas/CategoriaMujer.jsx'
import ProductoDetalle from './paginas/ProductoDetalle.jsx'
import Carrito from './paginas/Carrito.jsx'
import Checkout from './paginas/Checkout.jsx'

//rutas de la SPA
function Aplicacion() {
  return (
    <div className="aplicacion">
      <Routes>
        {/* inicio */}
        <Route path="/" element={<PaginaInicio />} />

        {/* categorias */}
        <Route path="/categoria/hombre" element={<CategoriaHombre />} />
        <Route path="/categoria/mujer" element={<CategoriaMujer />} />

        {/* detalle de producto por id */}
        <Route path="/producto/:id" element={<ProductoDetalle />} />

        {/* carrito */}
        <Route path="/carrito" element={<Carrito />} />

        {/* checkout, pago */}
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  )
}

export default Aplicacion
