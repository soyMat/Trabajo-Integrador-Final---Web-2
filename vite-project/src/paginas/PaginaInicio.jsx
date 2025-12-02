import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import imagenBannerHombre from '../imagenes/banner-hombre.jpg'
import imagenBannerMujer from '../imagenes/banner-mujer.jpg'
import imagenBannerPrincipal from '../imagenes/banner-main.PNG'
import logosinfondo from '../imagenes/logo-sin-fondo.PNG'
import BotonCarrito from '../componentes/BotonCarrito.jsx'
import CarritoMini from '../componentes/CarritoMini.jsx'

function PaginaInicio() {
  // useNavigate permite navegar a otras rutas
  const navigate = useNavigate()
  // productos almacena todos los productos que devuelve la API
  const [productos, setProductos] = useState([])
  // loadingOfertas indica si todavia se estan cargando los productos para el carrusel
  const [loadingOfertas, setLoadingOfertas] = useState(true)
  // controla la apertura del panel lateral del carrito
  const [carritoAbierto, setCarritoAbierto] = useState(false)



  // al cargar la pagina pido los productos a la API
  useEffect(() => {
    async function cargarProductos() {
      try {
        const respuesta = await fetch('http://161.35.104.211:8000/products/', {
          headers: { Accept: 'application/json', Authorization: 'Bearer mat' }
        })

        if (!respuesta.ok) {
          console.error('Error al pedir productos inicio:', respuesta.status)
          setProductos([])
          return
        }

        const data = await respuesta.json()

        if (Array.isArray(data)) {
          setProductos(data)
        } else {
          console.error('La API no devolvio un array de productos', data)
          setProductos([])
        }
      } catch (error) {
        console.error('Error de red al cargar productos', error)
        setProductos([])
      } finally {
        // al terminar (con exito o error) dejo de mostrar el estado de carga
        setLoadingOfertas(false)
      }
    }

    cargarProductos()
  }, [])



  // filtro solo los productos que tengan tag "Oferta"
  const productosOferta = productos.filter((producto) => {
    if (!producto.tags || !Array.isArray(producto.tags)) return false
    return producto.tags.some((tag) => tag.title === 'Oferta')
  })



  // arma la URL completa de la imagen (para el carrusel)
  function obtenerImagen(producto) {
    if (producto.pictures && producto.pictures.length > 0) return 'http://161.35.104.211:8000' + producto.pictures[0]
    return null
  }

  return (
    <div className="min-h-screen flex justify-center">

      {/* panel lateral del carrito */}
      <CarritoMini abierto={carritoAbierto} onCerrar={() => setCarritoAbierto(false)} />

      <div className="w-full max-w-5xl px-6 py-6 flex flex-col gap-4">

        {/* logo y botones de sesion y carrito */}
        <header className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-4">

          {/* logo fijo */}
          <div className="flex items-center justify-center md:justify-start">
            <img src={logosinfondo} alt="Logo" className="h-20 w-auto" />
          </div>

          {/* botones de inicio de sesion admin y carrito */}
          <div className="flex items-center justify-center md:justify-end gap-2 w-full">
            <button type="button" onClick={() => navigate('/admin')}   //login admin
              className="px-3 py-1 rounded-full border border-white/20 text-xs md:text-sm hover:bg-white/10 transition" > Iniciar sesión admin </button>
            <BotonCarrito onClick={() => setCarritoAbierto(true)} />
          </div>
        </header>


        {/* botones que navegan a categoria Hombre o Mujer */}
        <nav aria-label="Categorias principales" className="flex justify-center gap-3 py-2">
          <button type="button" onClick={() => navigate('/categoria/hombre')} className="px-4 py-1 rounded-full border border-white/20 text-sm hover:bg-white/10 transition"> Hombre </button>
          <button type="button" onClick={() => navigate('/categoria/mujer')} className="px-4 py-1 rounded-full border border-white/20 text-sm hover:bg-white/10 transition" > Mujer </button>
        </nav>

        <main className="flex flex-col gap-4">



          {/* banner grande y texto */}
          <section className="flex flex-col gap-4 items-center text-center">
            <div className="w-full rounded-xl overflow-hidden flex justify-center">
              <img src={imagenBannerPrincipal} alt="BANNER" className="w-2/3 h-full object-cover" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-xl md:text-2xl font-semibold tracking-wide">SYSTEM UPDATE</h1>
              <p className="text-sm text-gray-300">Cargado calzado, indumentaria y accesorios...</p>
            </div>
          </section>



          {/* banner hombre y mujer, cada banner te lleva a su categoria */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* hombre */}
            <article className="flex flex-col gap-3 p-3">
              <div className="w-full rounded-2xl overflow-hidden border border-white/20 cursor-pointer" onClick={() => navigate('/categoria/hombre')}>
                <img src={imagenBannerHombre} alt="Categoria hombre" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <h2 className="text-lg font-semibold">System Failure: Him.</h2>
              </div>
            </article>



            {/* mujer */}
            <article className="flex flex-col gap-3 p-3">
              <div className="w-full rounded-2xl overflow-hidden border border-white/20 cursor-pointer" onClick={() => navigate('/categoria/mujer')}>
                <img src={imagenBannerMujer} alt="Categoria mujer" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <h2 className="text-lg font-semibold">Fatal Error: Her</h2>
              </div>
            </article>
          </section>



          {/* carrusel productos con tag Oferta */}
          <section className="rounded-2xl p-4 border border-white/15">
            <header className="mb-3 flex flex-col items-center text-center gap-2">
              <p className="text-xl text-gray-300">"THE ARCHIVE"</p>
            </header>

            {loadingOfertas ? (
              <p className="text-sm text-gray-300">Cargando ofertas...</p>
            ) : productosOferta.length === 0 ? (
              <p className="text-sm text-gray-300">No hay productos en descuento por ahora.</p>
            ) : (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {productosOferta.map((producto) => {
                  const tieneOferta = producto.tags && producto.tags.some((tag) => tag.title === 'Oferta')
                  const precioConDescuento = tieneOferta ? Math.round(producto.price * 0.8) : producto.price
                  const imagen = obtenerImagen(producto)

                  return (
                    <article key={producto.id} className="min-w-[220px] rounded-xl border border-white/20 bg-black/30 p-3 flex flex-col gap-2">
                      <div className="relative h-36 rounded-lg border border-white/25 overflow-hidden flex items-center justify-center bg-black/40">
                        {tieneOferta && <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-red-600 text-[10px] font-semibold uppercase">Descuento 20%</span>}
                        {imagen ? <img src={imagen} alt={producto.title} className="w-full h-full object-contain" /> : <span className="text-xs text-gray-300">Sin imagen</span>}
                      </div>

                      <h3 className="text-sm font-semibold mt-1 line-clamp-2">{producto.title}</h3>

                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-xs text-gray-400 line-through">${producto.price.toLocaleString('es-AR')}</span>
                        <span className="text-sm font-semibold">${precioConDescuento.toLocaleString('es-AR')}</span>
                      </div>

                      <button type="button" onClick={() => navigate(`/producto/${producto.id}`)} className="mt-2 w-full px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 text-xs transition">Ver detalle</button>
                    </article>
                  )
                })}
              </div>
            )}
          </section>
        </main>



        {/* datos de la tienda */}
        <footer className="mt-4 grid grid-cols-1 md:grid-cols-[2fr_1.2fr] gap-4 border-t border-white/10 pt-4">
          <section>
            <h2 className="text-lg font-semibold">Informacion de la tienda:</h2>
            <p className="text-sm text-gray-300 mt-1">Direccion: 1-23-4 Jinnan, Shibuya City, Tokyo 150-0041, Japan.</p>
            <p className="text-sm text-gray-300">Email: contact@mat-jp.co</p>
            <p className="text-sm text-gray-300">Telefono: +81 3-5555-0101</p>
            <p className="text-sm text-gray-300">Horario de Atencion: Never Sleep, 24/7.</p>
          </section>
        </footer>
      </div>
    </div>
  )
}

export default PaginaInicio
