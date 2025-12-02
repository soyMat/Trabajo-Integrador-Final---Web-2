function BuscadorProductos({ busqueda, onBusquedaChange, placeholder = 'Buscar productos...' }) {
  function manejarSubmit(event) {
    event.preventDefault()
    // no recarga la pagina, solo evita el submit
  }

  return (
    <div className="flex justify-center w-full">
      <form onSubmit={manejarSubmit} className="flex w-full max-w-md rounded-full bg-black/40 border border-white/20 px-3 py-1">
        <input type="search" placeholder={placeholder} value={busqueda} onChange={(event) => onBusquedaChange(event.target.value)} className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-gray-400" />
        <button type="submit" className="text-sm px-2 text-gray-200" > 🔎 </button>
      </form>
    </div>
  )
}

/*
 * Filtra una lista de productos por nombre, descripcion o categoria.
 * productos array que viene de la API
 * terminoBusqueda string que escribe el usuario  */
export function filtrarProductosPorBusqueda(productos, terminoBusqueda) {
  const termino = terminoBusqueda.trim().toLowerCase()
  if (!termino) return productos

  return productos.filter((producto) => {
    const titulo = producto.title?.toLowerCase() || ''
    const descripcion = producto.description?.toLowerCase() || ''
    const categoria = producto.category?.title?.toLowerCase() || ''

    return (
      titulo.includes(termino) ||
      descripcion.includes(termino) ||
      categoria.includes(termino)
    )
  })
}

export default BuscadorProductos
