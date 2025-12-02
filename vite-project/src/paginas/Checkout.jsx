import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logosinfondo from '../imagenes/logo-sin-fondo.PNG'
import { useCarrito } from '../context/CarritoContext.jsx'

// pagina de simulacion de pago
function Checkout() {
  const navigate = useNavigate()
  const { items, total, vaciarCarrito } = useCarrito()

  // metodo de pago seleccionado: tarjeta o transferencia
  const [metodoPago, setMetodoPago] = useState('tarjeta')

  // campos de formulario
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [numeroTarjeta, setNumeroTarjeta] = useState('')
  const [codigoSeguridad, setCodigoSeguridad] = useState('')
  const [cbuAlias, setCbuAlias] = useState('')
  const [email, setEmail] = useState('')

  // estado de error y de exito
  const [errores, setErrores] = useState({})
  const [compraFinalizada, setCompraFinalizada] = useState(false)
  const [metodoUsado, setMetodoUsado] = useState(null)

  // valida los campos segun el metodo
  function validarFormulario() {
    const nuevosErrores = {}

    if (!nombre.trim()) nuevosErrores.nombre = 'Ingresar nombre'
    if (!apellido.trim()) nuevosErrores.apellido = 'Ingresar apellido'



    if (metodoPago === 'tarjeta') {
      const soloDigitos = numeroTarjeta.replace(/\D/g, '')
      if (soloDigitos.length !== 16) {
        nuevosErrores.numeroTarjeta = 'La tarjeta debe tener 16 digitos'
      }
      if (codigoSeguridad.length !== 3 || !/^\d{3}$/.test(codigoSeguridad)) {
        nuevosErrores.codigoSeguridad = 'Codigo de seguridad de 3 digitos'
      }
    }



    if (metodoPago === 'transferencia') {
      if (!cbuAlias.trim()) {
        nuevosErrores.cbuAlias = 'Ingresar CBU o alias utilizado'
      }
      if (!email.trim()) {
        nuevosErrores.email = 'Ingresar correo'
      } else if (!email.includes('@')) {
        nuevosErrores.email = 'Ingresar un correo valido'
      }
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  // manejador de envio del formulario
  function manejarSubmit(evento) {
    evento.preventDefault()

    if (items.length === 0) {
      alert('Tu carrito esta vacio.')
      return
    }

    if (!validarFormulario()) return

    // si todo esta ok, vacio el carrito y muestro mensaje de exito
    vaciarCarrito()
    setMetodoUsado(metodoPago)
    setCompraFinalizada(true)
  }

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-5xl px-6 py-6 flex flex-col gap-4">
        {/* encabezado */}
        <header className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] items-center gap-4">

          {/* logo que vuelve al inicio */}
          <button type="button" onClick={() => navigate('/')} className="flex items-center"> <img src={logosinfondo} alt="Logo" className="h-20 w-auto" /> </button>



          {/* boton de carrito */}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => navigate('/carrito')} className="px-3 py-1 rounded-full border border-white/20 text-xs md:text-sm hover:bg-white/10 transition">Carrito </button>
          </div>
        </header>

        {/* contenido principal del checkout */}
        <main className="flex flex-col gap-4">
          <h1 className="text-xl md:text-2xl font-semibold">Finalizar compra</h1>



          {/* resumen rapido del total */}
          <section className="rounded-2xl border border-white/20 bg-black/40 p-4 flex flex-col gap-2">
            <p className="text-sm text-gray-300">Productos en el carrito: {items.length}</p>
            <p className="text-sm"> Total a pagar{' '} <span className="text-lg font-semibold"> ${total.toLocaleString('es-AR')} </span> </p>
          </section>



          {/* si la compra ya se finalizo, muestro mensaje de exito */}
          {compraFinalizada ? (
            <section className="rounded-2xl border border-green-500/40 bg-black/40 p-6 flex flex-col gap-3 items-center text-center">
              {metodoUsado === 'transferencia' ? (
                <>
                  <p className="text-lg font-semibold text-green-400">La compra se finalizo con exito.</p>
                  <p className="text-sm text-gray-300">Banco: NEXUS PROTOCOL BANK</p>
                  <p className="text-sm text-gray-300">Alias: SYSTEM.MAT.CORE</p>
                  <p className="text-sm text-gray-300">Titular: Mat Archives Ltd.</p>
                  <p className="text-sm text-green-400 mt-2"> TRANSACTION VERIFIED - El pedido ya es tuyo - Revisa tu correo. </p>
                  {email && (
                    <p className="text-sm text-gray-300"> Enviamos un correo de confirmacon a: <span className="font-semibold">{email}</span> </p>
                  )}
                  <p className="text-sm text-gray-300 mt-2"> Retiro en: 1-23-4 Jinnan, Shibuya City, Tokyo 150-0041, Japan. </p>
                  <p className="text-sm text-gray-300">Horario de atencion: Never Sleep, 24/7.</p>
                </>
              ) : (
                <>
                  <p className="text-lg font-semibold text-green-400">La compra se finalizo con exito.</p>
                  <p className="text-sm text-gray-300"> Gracias por tu compra. Recibiras un comprobante ficticio en tu correo. </p>
                  <p className="text-sm text-gray-300 mt-2"> Retiro en: 1-23-4 Jinnan, Shibuya City, Tokyo 150-0041, Japan. </p>
                  <p className="text-sm text-gray-300">Horario de atencion: Never Sleep, 24/7.</p>
                </>
              )}

              <button type="button" onClick={() => navigate('/')} className="mt-3 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-xs md:text-sm transition">Volver al inicio </button>
            </section>
          ) : (
            // formulario de pago
            <section className="rounded-2xl border border-white/20 bg-black/40 p-4 flex flex-col gap-4">
              <h2 className="text-lg font-semibold">Datos de pago</h2>

              <form className="flex flex-col gap-4" onSubmit={manejarSubmit}>



                {/* datos personales */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-300">Nombre</label>
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="px-3 py-2 rounded-lg bg-black/60 border border-white/20 text-sm outline-none" />
                    {errores.nombre && (
                      <span className="text-[11px] text-red-400">{errores.nombre}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-300">Apellido</label>
                    <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} className="px-3 py-2 rounded-lg bg-black/60 border border-white/20 text-sm outline-none"/>
                    {errores.apellido && (
                      <span className="text-[11px] text-red-400">{errores.apellido}</span>
                    )}
                  </div>
                </div>



                {/* seleccion de metodo de pago */}
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-gray-300">Metodo de pago</p>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setMetodoPago('tarjeta')} className={`px-4 py-2 rounded-full border text-xs md:text-sm transition ${ metodoPago === 'tarjeta' ? 'bg-white/20 border-white/60' : 'border-white/20 hover:bg-white/10' }`} >Tarjeta </button>
                    <button type="button" onClick={() => setMetodoPago('transferencia')} className={`px-4 py-2 rounded-full border text-xs md:text-sm transition ${  metodoPago === 'transferencia' ? 'bg-white/20 border-white/60' : 'border-white/20 hover:bg-white/10' }`} > Transferencia </button>
                  </div>
                </div>



                {/* campos segun metodo */}
                {metodoPago === 'tarjeta' ? (
                  <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-300">Numero de tarjeta (16 digitos)</label>
                      <input type="text" value={numeroTarjeta} onChange={(e) => setNumeroTarjeta(e.target.value)} maxLength={19} placeholder="1111 2222 3333 4444" className="px-3 py-2 rounded-lg bg-black/60 border border-white/20 text-sm outline-none"/>
                      {errores.numeroTarjeta && (
                        <span className="text-[11px] text-red-400"> {errores.numeroTarjeta} </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-300">Codigo de seguridad (3 digitos)</label>
                      <input type="password" value={codigoSeguridad} onChange={(e) => setCodigoSeguridad(e.target.value)} maxLength={3} placeholder="123" className="px-3 py-2 rounded-lg bg-black/60 border border-white/20 text-sm outline-none"/>
                      {errores.codigoSeguridad && (
                        <span className="text-[11px] text-red-400"> {errores.codigoSeguridad}</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <>



                    {/* datos para transferir a la tienda */}
                    <div className="rounded-xl border border-white/20 bg-black/60 p-3 text-xs text-gray-300">
                      <p className="font-semibold text-white mb-1">Datos para transferir a la tienda</p>
                      <p>Banco: NEXUS PROTOCOL BANK</p>
                      <p>Alias: SYSTEM.MAT.CORE</p>
                      <p>Titular: Mat Archives Ltd.</p>
                      <p className="mt-2"> Realiza la transferencia a estos datos y completa tu correo para recibir el correo de confirmacion.</p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-300">CBU o alias que usaste para transferir</label>
                      <input type="text" value={cbuAlias} onChange={(e) => setCbuAlias(e.target.value)} placeholder="ej: SYSTEM.MAT.CORE" className="px-3 py-2 rounded-lg bg-black/60 border border-white/20 text-sm outline-none"/>
                      {errores.cbuAlias && (
                        <span className="text-[11px] text-red-400">{errores.cbuAlias}</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-300">Correo electronico para el aviso</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="usuario@ejemplo.com" className="px-3 py-2 rounded-lg bg-black/60 border border-white/20 text-sm outline-none"/>
                      {errores.email && (
                        <span className="text-[11px] text-red-400">{errores.email}</span>
                      )}
                    </div>
                  </>
                )}



                {/* botones finales */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <button type="submit" className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-xs md:text-sm transition">{metodoPago === 'tarjeta' ? 'Confirmar pago' : 'Transferir'}</button>
                  <button type="button" onClick={() => navigate('/carrito')} className="px-4 py-2 rounded-full border border-white/30 hover:bg-white/10 text-xs md:text-sm transition">Volver al carrito</button>
                </div>
              </form>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

export default Checkout
