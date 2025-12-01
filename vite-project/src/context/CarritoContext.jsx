import { createContext, useContext, useState } from 'react'

// contexto general del carrito
const CarritoContext = createContext(null)

// funcion para calcular precio final con descuento
function calcularPrecioFinal(producto) {
  const tieneOferta = producto.tags && Array.isArray(producto.tags) && producto.tags.some(tag => tag.title === 'Oferta')
  const precioBase = producto.price || 0
  const precioConDescuento = tieneOferta ? Math.round(precioBase * 0.8) : precioBase
  return { precioBase, precioConDescuento, tieneOferta }
}

export function CarritoProvider({ children }) {
  // cada item: { id, title, precioFinal, cantidad, ...producto }
  const [items, setItems] = useState([])


  // agrega producto, si ya existe suma 1 a cantidad
  function agregarProducto(producto) {
    const { precioConDescuento } = calcularPrecioFinal(producto)

    setItems(prev => {
      const existente = prev.find(item => item.id === producto.id)
      if (existente) {
        return prev.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item)
      }
      return [...prev, { ...producto, precioFinal: precioConDescuento, cantidad: 1 }]
    })
  }


  // resta una unidad, si queda en 0 lo saca del carrito
  function quitarUnidad(idProducto) {
    setItems(prev => {
      const encontrado = prev.find(item => item.id === idProducto)
      if (!encontrado) return prev
      if (encontrado.cantidad <= 1) return prev.filter(item => item.id !== idProducto)
      return prev.map(item => item.id === idProducto ? { ...item, cantidad: item.cantidad - 1 } : item)
    })
  }


  // elimina el item completo
  function eliminarProducto(idProducto) {
    setItems(prev => prev.filter(item => item.id !== idProducto))
  }


  // vacia todo el carrito
  function vaciarCarrito() {
    setItems([])
  }


  // cantidad total de unidades en el carrito
  const cantidadTotal = items.reduce((acum, item) => acum + item.cantidad, 0)


  // total a pagar segun precioFinal * cantidad
  const total = items.reduce((acum, item) => acum + item.precioFinal * item.cantidad, 0)

  const valor = { items, agregarProducto, quitarUnidad, eliminarProducto, vaciarCarrito, cantidadTotal, total }

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>
}

// hook de ayuda para usar el contexto
export function useCarrito() {
  const ctx = useContext(CarritoContext)
  if (!ctx) throw new Error('useCarrito debe usarse dentro de CarritoProvider')
  return ctx
}
