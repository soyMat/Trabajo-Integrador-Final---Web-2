// src/paginas/ProductoDetalle.jsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import logosinfondo from '../imagenes/logo-sin-fondo.PNG'
import BotonCarrito from '../componentes/BotonCarrito.jsx'
import CarritoMini from '../componentes/CarritoMini.jsx'
import { useCarrito } from '../context/CarritoContext.jsx'

const URL_API = 'http://161.35.104.211:8000'

// pagina de detalle del producto individual
function ProductoDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { agregarProducto } = useCarrito()
  const [producto, setProducto] = useState(null)
  const [estado, setEstado] = useState('cargando') // cargando, error, no-encontrado, listo
  const [carritoAbierto, setCarritoAbierto] = useState(false)



  useEffect(() => {
    async function cargarProducto() {
      try {
        const respuesta = await fetch(`${URL_API}/products/`, {
          headers: { Accept: 'application/json', Authorization: 'Bearer mat' }
        })

        if (!respuesta.ok) throw new Error('Error HTTP ' + respuesta.status)

        const datos = await respuesta.json()
        const encontrado = datos.find((p) => p.id === Number(id))

        if (!encontrado) setEstado('no-encontrado')
        else {
          setProducto(encontrado)
          setEstado('listo')
        }
      } catch (error) {
        console.error('Error al cargar producto:', error)
        setEstado('error')
      }
    }

    cargarProducto()
  }, [id])



  if (estado === 'cargando') {
    return (
      <div className="min-h-screen flex justify-center">
        <div className="w-full max-w-5xl px-6 py-6">
          <p className="text-sm text-gray-300">Cargando producto...</p>
        </div>
      </div>
    )
  }


  if (estado === 'error') {
    return (
      <div className="min-h-screen flex justify-center">
        <div className="w-full max-w-5xl px-6 py-6">
          <p className="text-sm text-red-400">Ocurrio un error al cargar el producto. Intenta nuevamente.</p>
        </div>
      </div>
    )
  }


  if (estado === 'no-encontrado' || !producto) {
    return (
      <div className="min-h-screen flex justify-center">
        <div className="w-full max-w-5xl px-6 py-6">
          <p className="text-sm text-gray-300">Producto no encontrado.</p>
          <button type="button" onClick={() => navigate(-1)} className="mt-4 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 text-sm transition">Volver</button>
        </div>
      </div>
    )
  }

  const imagenPrincipal = producto.pictures && producto.pictures.length > 0 ? `${URL_API}${producto.pictures[0]}` : null
  const tieneOferta = producto.tags && producto.tags.some((tag) => tag.title === 'Oferta')
  const precioConDescuento = tieneOferta ? Math.round(producto.price * 0.8) : producto.price

  return (
    <div className="min-h-screen flex justify-center">
      <CarritoMini abierto={carritoAbierto} onCerrar={() => setCarritoAbierto(false)} />
      <div className="w-full max-w-5xl px-6 py-6 flex flex-col gap-6">

        {/* encabezado */}
        <header className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] items-center gap-4">
          <button type="button" onClick={() => navigate('/')} className="flex items-center">
            <img src={logosinfondo} alt="Logo" className="h-16 w-auto" />
          </button>

          <div className="flex justify-center w-full">
            <form className="flex w-full max-w-md rounded-full bg-black/40 border border-white/20 px-3 py-1">
              <input type="search" placeholder="Buscar productos..." aria-label="Buscar productos" className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-gray-400" />
              <button type="submit" className="text-sm px-2 text-gray-200" onClick={(event) => event.preventDefault()}>🔎</button>
            </form>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" className="px-3 py-1 rounded-full border border-white/20 text-xs md:text-sm hover:bg-white/10 transition">Iniciar sesion</button>
            <BotonCarrito onClick={() => setCarritoAbierto(true)} />
          </div>
        </header>

        {/* contenido principal */}
        <main className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-6">

          {/* imagen grande */}
          <section className="rounded-2xl border border-white/20 bg-black/30 p-4 flex items-center justify-center">
            {imagenPrincipal ? (
              <img src={imagenPrincipal} alt={producto.title} className="max-h-[420px] w-auto object-contain" />
            ) : (
              <div className="h-64 w-full rounded-xl border border-dashed border-white/30 flex items-center justify-center text-xs text-gray-300">Sin imagen</div>
            )}
          </section>



          {/* info del producto */}
          <section className="flex flex-col gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">{producto.category?.title}</p>
              <h1 className="text-xl md:text-2xl font-semibold">{producto.title}</h1>
            </div>

            <p className="text-sm text-gray-200 leading-relaxed">{producto.description}</p>

            <div className="mt-2 flex flex-col gap-1">
              {tieneOferta && <span className="self-start px-3 py-1 rounded-full bg-red-600 text-xs font-semibold uppercase">Descuento 20%</span>}
              <div className="flex items-baseline gap-3">
                {tieneOferta && <span className="text-sm text-gray-400 line-through">${producto.price.toLocaleString('es-AR')}</span>}
                <span className="text-2xl font-semibold">${precioConDescuento.toLocaleString('es-AR')}</span>
              </div>
            </div>

            {producto.tags && producto.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {producto.tags.map((tag) => (
                  <span key={tag.id} className="px-3 py-1 rounded-full bg-white/10 text-xs">{tag.title}</span>
                ))}
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" onClick={() => agregarProducto(producto)} className="px-5 py-2 rounded-full bg-white/20 hover:bg-white/30 text-sm transition">Agregar al carrito</button>
              <button type="button" onClick={() => navigate(-1)} className="px-5 py-2 rounded-full border border-white/30 hover:bg-white/10 text-sm transition">Volver a la lista</button>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default ProductoDetalle
