import { useNavigate } from 'react-router-dom'
import logosinfondo from '../imagenes/logo-sin-fondo.PNG'
import { useCarrito } from '../context/CarritoContext.jsx'

const URL_API = 'http://161.35.104.211:8000'

// pagina que muestra el contenido completo del carrito y el total
function Carrito() {
  const navigate = useNavigate()
  const { items, quitarUnidad, eliminarProducto, vaciarCarrito, total } = useCarrito()

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-5xl px-6 py-6 flex flex-col gap-4">
        {/* encabezado */}
        <header className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] items-center gap-4">
          <button type="button" onClick={() => navigate('/')} className="flex items-center"> <img src={logosinfondo} alt="Logo" className="h-20 w-auto" /> </button>

          <div className="flex justify-center w-full">
            <form className="flex w-full max-w-md rounded-full bg-black/40 border border-white/20 px-3 py-1">
              <input type="search" placeholder="Buscar productos..." aria-label="Buscar productos" className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-gray-400" />
              <button type="submit" className="text-sm px-2 text-gray-200" onClick={(e) => e.preventDefault()}>🔎</button>
            </form>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" className="px-3 py-1 rounded-full border border-white/20 text-xs md:text-sm hover:bg-white/10 transition">Iniciar sesion</button>
            <button type="button" className="px-3 py-1 rounded-full border border-white/20 text-xs md:text-sm opacity-60 cursor-default">Carrito</button>
          </div>
        </header>


        {/* contenido principal */}
        <main className="flex flex-col gap-4">
          <h1 className="text-xl md:text-2xl font-semibold">Carrito de compras</h1>

          {items.length === 0 ? (
            <div className="text-sm text-gray-300">
              <p>Tu carrito esta vacio.</p>
              <button type="button" onClick={() => navigate('/')} className="mt-3 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 text-sm transition">Volver a la tienda</button>
            </div>
          ) : (
            <>
              {/* lista de productos en el carrito */}
              <section className="flex flex-col gap-3">
                {items.map((item) => {
                  const imagen = item.pictures && item.pictures.length > 0 ? `${URL_API}${item.pictures[0]}` : null


                  return (
                    <article key={item.id} className="rounded-2xl border border-white/20 bg-black/30 p-3 flex gap-3">
                      <div className="w-24 h-24 rounded-xl overflow-hidden border border-white/20 flex items-center justify-center">
                        {imagen ? <img src={imagen} alt={item.title} className="w-full h-full object-cover" /> : <span className="text-xs text-gray-300">Sin imagen</span>}
                      </div>

                      <div className="flex-1 flex flex-col gap-1">
                        <h2 className="text-sm font-semibold">{item.title}</h2>
                        <p className="text-xs text-gray-300 line-clamp-2">{item.description}</p>

                        <div className="mt-1 flex items-center gap-3">
                          <span className="text-sm font-semibold">${item.precioFinal.toLocaleString('es-AR')}</span>
                          <span className="text-xs text-gray-300">x {item.cantidad}</span>
                        </div>

                        <div className="mt-2 flex gap-2">
                          <button type="button" onClick={() => quitarUnidad(item.id)} className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs transition">Quitar uno</button>
                          <button type="button" onClick={() => eliminarProducto(item.id)} className="px-3 py-1 rounded-full border border-white/30 hover:bg-white/10 text-xs transition">Eliminar producto</button>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </section>



              {/* resumen del carrito */}
              <section className="mt-3 rounded-2xl border border-white/20 bg-black/40 p-4 flex flex-col gap-2">
                <p className="text-sm">Total a pagar: <span className="text-lg font-semibold">${total.toLocaleString('es-AR')}</span></p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <button type="button" onClick={vaciarCarrito} className="px-4 py-2 rounded-full border border-white/30 hover:bg-white/10 text-xs md:text-sm transition">Vaciar carrito</button>
                  <button type="button" onClick={() => navigate('/checkout')} className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-xs md:text-sm transition"> Finalizar compra </button>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default Carrito
