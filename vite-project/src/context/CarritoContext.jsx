import { createContext, useContext, useState, useEffect } from 'react'

// contexto general del carrito
const CarritoContext = createContext(null)

// funcion para calcular precio final con descuento
function calcularPrecioFinal(producto) {
  const tieneOferta =
    producto.tags &&
    Array.isArray(producto.tags) &&
    producto.tags.some(tag => tag.title === 'Oferta')

  const precioBase = producto.price || 0
  const precioConDescuento = tieneOferta ? Math.round(precioBase * 0.8) : precioBase

  return { precioBase, precioConDescuento, tieneOferta }
}

export function CarritoProvider({ children }) {
  // cada item: { id, title, precioFinal, cantidad, ...producto }
  const [items, setItems] = useState(() => {
    try {
      const guardado = localStorage.getItem('carrito')
      return guardado ? JSON.parse(guardado) : []
    } catch (error) {
      console.error('Error leyendo carrito de localStorage', error)
      return []
    }
  })

  // sincronizar con localStorage cada vez que cambie el carrito
  useEffect(() => {
    try {
      localStorage.setItem('carrito', JSON.stringify(items))
    } catch (error) {
      console.error('Error guardando carrito en localStorage', error)
    }
  }, [items])

  // agregar un producto (si ya existe, suma 1 unidad)
  function agregarProducto(producto) {
    if (!producto || !producto.id) return

    const { precioConDescuento } = calcularPrecioFinal(producto)

    setItems(prevItems => {
      const existe = prevItems.find(item => item.id === producto.id)

      if (existe) {
        return prevItems.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }

      const nuevoItem = {
        id: producto.id,
        title: producto.title,
        precioFinal: precioConDescuento,
        cantidad: 1,
        ...producto
      }

      return [...prevItems, nuevoItem]
    })
  }

  // quitar una unidad del producto (si queda en 0, se elimina)
  function quitarUnidad(id) {
    setItems(prevItems =>
      prevItems
        .map(item =>
          item.id === id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter(item => item.cantidad > 0)
    )
  }

  // eliminar el producto por completo del carrito
  function eliminarProducto(id) {
    setItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  // vaciar todo el carrito
  function vaciarCarrito() {
    setItems([])
  }

  // cantidad total de unidades
  const cantidadTotal = items.reduce((acum, item) => acum + item.cantidad, 0)

  // total a pagar segun precioFinal * cantidad
  const total = items.reduce(
    (acum, item) => acum + item.precioFinal * item.cantidad,
    0
  )

  const valor = {
    items,
    agregarProducto,
    quitarUnidad,
    eliminarProducto,
    vaciarCarrito,
    cantidadTotal,
    total
  }

  return (
    <CarritoContext.Provider value={valor}>
      {children}
    </CarritoContext.Provider>
  )
}

// hook de ayuda para usar el contexto
export function useCarrito() {
  const ctx = useContext(CarritoContext)
  if (!ctx) throw new Error('useCarrito debe usarse dentro de CarritoProvider')
  return ctx
}
