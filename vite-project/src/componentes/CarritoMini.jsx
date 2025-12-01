import { Link } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext.jsx'

const URL_API = 'http://161.35.104.211:8000'

// panel lateral que muestra el contenido del carrito
function CarritoMini({ abierto, onCerrar }) {
  const { items, agregarProducto, quitarUnidad, eliminarProducto, total } = useCarrito()

  if (!abierto) return null

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      {/* fondo oscuro, al clickear se cierra */}
      <div className="flex-1 bg-black/50" onClick={onCerrar} />

      <aside className="w-80 max-w-full bg-black/95 border-l border-white/20 p-4 flex flex-col gap-4">
        <header className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Carrito</h2>
          <button type="button" onClick={onCerrar} className="text-xs text-gray-300 hover:text-white">Cerrar ✕</button>
        </header>


        {items.length === 0 ? (
          <p className="text-xs text-gray-300">Todavia no agregaste productos.</p>
        ) : (
          <>
            <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1">
              {items.map(item => {
                const imagen = item.pictures && item.pictures.length > 0 ? `${URL_API}${item.pictures[0]}` : null


                return (
                  <article key={item.id} className="flex gap-2 border border-white/15 rounded-lg p-2 bg-black/40">
                    <div className="w-16 h-16 rounded-md overflow-hidden border border-white/15 flex items-center justify-center">
                      {imagen ? <img src={imagen} alt={item.title} className="w-full h-full object-cover" /> : <span className="text-[10px] text-gray-300">Sin imagen</span>}
                    </div>


                    <div className="flex-1 flex flex-col gap-1">
                      <p className="text-[11px] font-semibold line-clamp-2">{item.title}</p>
                      <p className="text-[11px] text-gray-300">${item.precioFinal.toLocaleString('es-AR')}</p>


                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2">
                          <button type="button" onClick={() => quitarUnidad(item.id)} className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center text-[11px]">-</button>
                          <span className="text-[11px]">{item.cantidad}</span>
                          <button type="button" onClick={() => agregarProducto(item)} className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center text-[11px]">+</button>
                        </div>


                        <button type="button" onClick={() => eliminarProducto(item.id)} className="text-[11px] text-gray-400 hover:text-red-400">Quitar</button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>


            <footer className="border-t border-white/15 pt-3 flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-xs text-gray-300">Total estimado</span>
                <span className="text-sm font-semibold">${total.toLocaleString('es-AR')}</span>
              </div>

              <Link to="/carrito" onClick={onCerrar} className="mt-1 w-full px-3 py-2 rounded-full bg-white/20 hover:bg-white/30 text-xs text-center transition">Ver detalle de compra</Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}

export default CarritoMini
