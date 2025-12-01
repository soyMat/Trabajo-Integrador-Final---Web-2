import { useCarrito } from '../context/CarritoContext.jsx'

// boton de carrito con badge que muestra la cantidad total de items
function BotonCarrito({ onClick }) {
  const { cantidadTotal } = useCarrito()

  return (
    <button type="button" onClick={onClick} className="relative px-3 py-1 rounded-full border border-white/20 text-xs md:text-sm hover:bg-white/10 transition"> Carrito {cantidadTotal > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-orange-500 text-[10px] font-semibold"> {cantidadTotal} </span>
      )}
    </button>
  )
}

export default BotonCarrito
