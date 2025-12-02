import { useEffect, useState } from 'react'
import logosinfondo from '../imagenes/logo-sin-fondo.PNG'

function RutaAdminProtegida({ children }) {
  const [logueado, setLogueado] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const guardado = localStorage.getItem('adminLogueado')
    if (guardado === 'true') {
      setLogueado(true)
    }
  }, [])

  function manejarSubmit(evento) {
    evento.preventDefault()
    if (password === 'mat') {
      localStorage.setItem('adminLogueado', 'true')
      setLogueado(true)
      setError('')
    } else {
      setError('Contraseña incorrecta')
    }
  }

  if (!logueado) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-sm px-6 py-6 rounded-2xl border border-white/10 bg-black/40 flex flex-col gap-4">
          <div className="flex flex-col items-center gap-2">
            <img src={logosinfondo} alt="Logo" className="h-16 w-auto" />
            <h1 className="text-lg font-semibold">Ingreso administrador</h1>
            <p className="text-xs text-gray-400 text-center"> Ingresá la contraseña de administrador para acceder al panel. </p>
          </div>

          <form onSubmit={manejarSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1 text-sm">
              <label className="text-gray-300">Contraseña</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-lg bg-black/40 border border-white/20 px-2 py-1 text-sm outline-none" placeholder="Ingresá la contraseña de admin" />
            </div>

            {error && (
              <p className="text-xs text-red-300"> {error} </p>
            )}

            <button type="submit" className="mt-1 px-4 py-2 rounded-full border border-white/20 text-sm bg-white/15 hover:bg-white/25 transition" > Ingresar </button>
          </form>

          <p className="text-[11px] text-gray-500 text-center"> * Login de ejemplo solo en el frontend (sandbox para el TP). </p>
        </div>
      </div>
    )
  }

  return children
}

export default RutaAdminProtegida
