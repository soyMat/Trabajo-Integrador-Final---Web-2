import { Routes, Route } from 'react-router-dom'
import PaginaInicio from './paginas/PaginaInicio.jsx'
import CategoriaHombre from './paginas/CategoriaHombre.jsx'
import CategoriaMujer from './paginas/CategoriaMujer.jsx'
import ProductoDetalle from './paginas/ProductoDetalle.jsx'
import Carrito from './paginas/Carrito.jsx'
import Checkout from './paginas/Checkout.jsx'
import AdminInicio from './paginas/AdminInicio.jsx'
import AdminProductos from './paginas/AdminProductos.jsx'
import AdminCategorias from './paginas/AdminCategorias.jsx'
import RutaAdminProtegida from './componentes/RutaAdminProtegida.jsx'

// rutas de la SPA
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

        {/* admin protegido por login LA CLAVE ES "mat" */}
        <Route path="/admin" element={
            <RutaAdminProtegida>
              <AdminInicio />
            </RutaAdminProtegida> }
        />
        <Route path="/admin/productos" element={
            <RutaAdminProtegida>
              <AdminProductos />
            </RutaAdminProtegida> }
        />
        <Route path="/admin/categorias" element={
            <RutaAdminProtegida>
              <AdminCategorias />
            </RutaAdminProtegida> } />
      </Routes>
    </div>
  )
}

export default Aplicacion
