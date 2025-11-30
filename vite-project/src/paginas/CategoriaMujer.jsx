import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logosinfondo from '../imagenes/logo-sin-fondo.PNG'

// HACE LO MISMO QUE CATEGORIA HOMBRE PERO PARA LA PAGINA DE CATEGORIA "MUJER"
function CategoriaMujer() {
  const navigate = useNavigate()


  const [productos, setProductos] = useState([])

  const [loading, setLoading] = useState(true)

  const [filtroCategoria, setFiltroCategoria] = useState('todos')

  useEffect(() => {
    async function cargarProductos() {
      try {
        const respuesta = await fetch('http://161.35.104.211:8000/products/', {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer mat',
          },
        })

        if (!respuesta.ok) {
          console.error('Error al pedir productos mujer:', respuesta.status)
          setProductos([])
          return
        }

        const data = await respuesta.json()
        console.log('Respuesta productos mujer:', data)

        if (Array.isArray(data)) {
          setProductos(data)
        } else {
          console.error('La API no devolvió un array de productos', data)
          setProductos([])
        }
      } catch (error) {
        console.error('Error de red al cargar productos mujer:', error)
        setProductos([])
      } finally {
        setLoading(false)
      }
    }

    cargarProductos()
  }, [])

  const productosMujer = productos.filter((producto) => {
    if (!producto.tags || !Array.isArray(producto.tags)) return false
    return producto.tags.some((tag) => tag.title === 'Mujer')
  })

  const productosFiltrados = productosMujer.filter((producto) => {
    if (filtroCategoria === 'todos') return true
    if (!producto.category) return false

    if (filtroCategoria === 'calzado') return producto.category.title === 'Calzado'
    if (filtroCategoria === 'indumentaria') return producto.category.title === 'Indumentaria'
    if (filtroCategoria === 'accesorios') return producto.category.title === 'Accesorios'
    return true
  })

  function obtenerImagen(producto) {
    if (producto.pictures && producto.pictures.length > 0) {
      return 'http://161.35.104.211:8000' + producto.pictures[0]
    }
    return null
  }

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-5xl px-6 py-6 flex flex-col gap-4">
        <header className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] items-center gap-4">
          <button type="button" onClick={() => navigate('/')} className="flex items-center">
            <img src={logosinfondo} alt="Logo" className="h-20 w-auto" />
          </button>

          <div className="flex justify-center w-full">
            <form className="flex w-full max-w-md rounded-full bg-black/40 border border-white/20 px-3 py-1">
              <input type="search" placeholder="Buscar productos..." aria-label="Buscar productos" className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-gray-400" />
              <button type="submit" className="text-sm px-2 text-gray-200" onClick={(e) => e.preventDefault()} > 🔎 </button>
            </form>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" className="px-3 py-1 rounded-full border border-white/20 text-xs md:text-sm hover:bg-white/10 transition" > Iniciar sesion </button>
            <button type="button" className="px-3 py-1 rounded-full border border-white/20 text-xs md:text-sm hover:bg-white/10 transition" > Carrito </button>
          </div>
        </header>

        <nav className="flex justify-center gap-3 py-2">
          <button type="button" onClick={() => setFiltroCategoria('todos')} className={`px-4 py-1 rounded-full border border-white/20 text-xs md:text-sm transition ${ filtroCategoria === 'todos' ? 'bg-white/20' : 'hover:bg-white/10' }`}>Todos</button>
          <button type="button" onClick={() => setFiltroCategoria('calzado')} className={`px-4 py-1 rounded-full border border-white/20 text-xs md:text-sm transition ${ filtroCategoria === 'calzado' ? 'bg-white/20' : 'hover:bg-white/10'}`}>Calzado</button>
          <button type="button" onClick={() => setFiltroCategoria('indumentaria')} className={`px-4 py-1 rounded-full border border-white/20 text-xs md:text-sm transition ${ filtroCategoria === 'indumentaria' ? 'bg-white/20' : 'hover:bg-white/10' }`}>Indumentaria </button>
          <button type="button" onClick={() => setFiltroCategoria('accesorios')} className={`px-4 py-1 rounded-full border border-white/20 text-xs md:text-sm transition ${ filtroCategoria === 'accesorios' ? 'bg-white/20' : 'hover:bg-white/10'}`}>Accesorios</button>
        </nav>

        <main className="flex flex-col gap-4">
          <h1 className="text-xl md:text-2xl font-semibold">Productos Mujer</h1>

          {loading ? (
            <p className="text-sm text-gray-300">Cargando productos...</p>
          ) : productosFiltrados.length === 0 ? (
            <p className="text-sm text-gray-300">No se encontraron productos para esta categoría.</p>
          ) : (

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {productosFiltrados.map((producto) => {
                const imagen = obtenerImagen(producto)
                const tieneOferta =
                  producto.tags && producto.tags.some((tag) => tag.title === 'Oferta')
                const precioConDescuento = tieneOferta
                  ? Math.round(producto.price * 0.8)
                  : producto.price

                return (
                  <article key={producto.id}className="rounded-2xl border border-white/20 bg-black/30 p-3 flex flex-col gap-2">
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-white/20 flex items-center justify-center">
                      {tieneOferta && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-red-600 text-[10px] font-semibold uppercase">Descuento 20%</span>
                      )}
                      {imagen ? (
                        <img src={imagen} alt={producto.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs text-gray-300">Sin imagen</span>
                      )}
                    </div>

                    <h2 className="text-sm font-semibold mt-1">{producto.title}</h2>
                    <p className="text-sm text-gray-300 line-clamp-2">{producto.description}</p>

                    {tieneOferta ? (
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-xs text-gray-400 line-through">${producto.price.toLocaleString('es-AR')}</span>
                        <span className="text-sm font-semibold">${precioConDescuento.toLocaleString('es-AR')}</span>
                      </div>
                    ) : (
                      <p className="text-sm font-semibold mt-1">${producto.price.toLocaleString('es-AR')}</p>
                    )}
                    <button type="button" onClick={() => navigate(`/producto/${producto.id}`)} className="mt-3 w-full px-3 py-2 rounded-full bg-white/15 hover:bg-white/25 text-xs md:text-sm transition">Ver detalle</button>
                  </article>
                )
              })}
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

export default CategoriaMujer
