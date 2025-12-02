import { useNavigate } from 'react-router-dom'
import logosinfondo from '../imagenes/logo-sin-fondo.PNG'

function AdminInicio() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-5xl px-6 py-6 flex flex-col gap-6">

        {/* encabezado */}
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <button type="button" onClick={() => navigate('/')} className="flex items-center gap-2" >
            <img src={logosinfondo} alt="Logo" className="h-16 w-auto" />
            <span className="text-sm text-gray-300">Volver a la tienda</span>
          </button>

          <div className="text-left md:text-right">
            <p className="text-xs uppercase tracking-wide text-gray-400"> Panel de administración </p>
            <h1 className="text-xl md:text-2xl font-semibold">Sistema de Mat – Admin</h1>
          </div>
        </header>

        {/* navegación admin */}
        <nav className="flex flex-wrap gap-3">
          <button type="button" onClick={() => navigate('/admin/productos')} className="px-4 py-2 rounded-full border border-white/20 text-sm hover:bg-white/10 transition"> Gestionar productos (API) </button>
          <button type="button" onClick={() => navigate('/admin/categorias')} className="px-4 py-2 rounded-full border border-white/20 text-sm hover:bg-white/10 transition" > Gestionar categorías (API) </button>
        </nav>

        <section className="rounded-xl border border-white/10 bg-black/30 p-4 flex flex-col gap-2 text-sm text-gray-200">
          <p> Este panel utiliza la API{' '} <span className="font-mono text-xs">http://161.35.104.211:8000</span> {' '}para administrar productos y categorías. </p>
          <p className="text-gray-400"> Desde aquí se realizan operaciones CRUD reales usando los métodos
            <strong> GET / POST / PUT / DELETE</strong> sobre los endpoints
            <strong> /products/</strong> y <strong>/categories/</strong>
          </p>
        </section>
      </div>
    </div>
  )
}

export default AdminInicio
