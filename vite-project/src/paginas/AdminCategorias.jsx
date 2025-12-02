import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logosinfondo from '../imagenes/logo-sin-fondo.PNG'

const URL_API = 'http://161.35.104.211:8000'
const HEADERS_JSON = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: 'Bearer mat'
}
const HEADERS_AUTH = {
  Accept: 'application/json',
  Authorization: 'Bearer mat'
}

function AdminCategorias() {
  const navigate = useNavigate()

  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)

  const [form, setForm] = useState({
    title: '',
    description: ''
  })

  useEffect(() => {
    async function cargarCategorias() {
      try {
        const res = await fetch(`${URL_API}/categories/`, {
          headers: HEADERS_AUTH
        })
        if (!res.ok) throw new Error('Error al obtener categorías')
        const data = await res.json()
        setCategorias(data)
      } catch (e) {
        console.error(e)
        setError('No se pudieron cargar las categorías desde la API')
      } finally {
        setLoading(false)
      }
    }
    cargarCategorias()
  }, [])

  function resetForm() {
    setForm({ title: '', description: '' })
    setEditingId(null)
  }

  function onChangeForm(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function comenzarEdicion(cat) {
    setEditingId(cat.id)
    setForm({
      title: cat.title || '',
      description: cat.description || ''
    })
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')

    if (!form.title) {
      setError('El título es obligatorio')
      return
    }

    const payload = {
      title: form.title,
      description: form.description
    }

    try {
      let res
      if (editingId) {
        res = await fetch(`${URL_API}/categories/${editingId}/`, {
          method: 'PUT',
          headers: HEADERS_JSON,
          body: JSON.stringify(payload)
        })
      } else {
        res = await fetch(`${URL_API}/categories/`, {
          method: 'POST',
          headers: HEADERS_JSON,
          body: JSON.stringify(payload)
        })
      }

      if (!res.ok) {
        const texto = await res.text()
        console.error('Error API categorias', res.status, texto)
        setError('La API rechazó la operación (ver consola).')
        return
      }

      const catApi = await res.json()

      if (editingId) {
        setCategorias(prev =>
          prev.map(c => (c.id === catApi.id ? catApi : c))
        )
      } else {
        setCategorias(prev => [...prev, catApi])
      }

      resetForm()
    } catch (e2) {
      console.error(e2)
      setError('Error de red al hablar con la API')
    }
  }

  async function eliminarCategoria(id) {
    const ok = window.confirm('¿Eliminar esta categoría en la API?')
    if (!ok) return
    setError('')

    try {
      const res = await fetch(`${URL_API}/categories/${id}/`, {
        method: 'DELETE',
        headers: HEADERS_AUTH
      })
      if (!res.ok) {
        const texto = await res.text()
        console.error('Error DELETE cat', res.status, texto)
        setError('No se pudo eliminar la categoría (ver consola).')
        return
      }
      setCategorias(prev => prev.filter(c => c.id !== id))
    } catch (e) {
      console.error(e)
      setError('Error de red al eliminar categoría')
    }
  }

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-5xl px-6 py-6 flex flex-col gap-6">



        {/* encabezado */}
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <button type="button" onClick={() => navigate('/admin')} className="flex items-center gap-2" >
            <img src={logosinfondo} alt="Logo" className="h-16 w-auto" />
            <span className="text-sm text-gray-300">Volver al panel admin</span>
          </button>

          <div className="text-left md:text-right">
            <p className="text-xs uppercase tracking-wide text-gray-400"> Panel de administración </p>
            <h1 className="text-xl md:text-2xl font-semibold">Gestión de categorías</h1>
          </div>
        </header>



        {/* tabs */}
        <nav className="flex flex-wrap gap-3">
          <button type="button" onClick={() => navigate('/admin/productos')} className="px-4 py-2 rounded-full border border-white/20 text-sm hover:bg-white/10 transition" > Productos </button>
          <button type="button" onClick={() => navigate('/admin/categorias')} className="px-4 py-2 rounded-full border border-white/20 text-sm bg-white/10" > Categorías </button>
        </nav>

        {loading && <p className="text-sm text-gray-400">Cargando categorías...</p>}
        {error && (
          <p className="text-sm text-red-300 bg-red-900/40 border border-red-500/40 rounded-lg px-3 py-2"> {error} </p>
        )}



        {/* FORM */}
        <section className="rounded-xl border border-white/10 bg-black/30 p-4 flex flex-col gap-3">
          <h2 className="text-lg font-semibold"> {editingId ? 'Editar categoría (API)' : 'Crear categoría (API)'} </h2>

          <form onSubmit={onSubmit} className="grid gap-3 md:grid-cols-2">
            <div className="flex flex-col gap-1 text-sm">
              <label className="text-gray-300">Título</label>
              <input name="title" value={form.title} onChange={onChangeForm} className="rounded-lg bg-black/40 border border-white/20 px-2 py-1 text-sm outline-none" required />
            </div>

            <div className="flex flex-col gap-1 text-sm md:col-span-2">
              <label className="text-gray-300">Descripción</label>
              <textarea name="description" value={form.description} onChange={onChangeForm} className="rounded-lg bg-black/40 border border-white/20 px-2 py-1 text-sm outline-none min-h-[60px]" />
            </div>

            <div className="flex gap-2 md:col-span-2 mt-2">
              <button type="submit" className="px-4 py-2 rounded-full border border-white/20 text-sm bg-white/15 hover:bg-white/25 transition" > {editingId ? 'Guardar cambios' : 'Crear categoría'} </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="px-4 py-2 rounded-full border border-white/20 text-sm hover:bg-white/10 transition" > Cancelar edición </button>
              )}
            </div>
          </form>
        </section>



        {/* LISTADO */}
        <section className="rounded-xl border border-white/10 bg-black/30 p-4 flex flex-col gap-3">
          <h2 className="text-lg font-semibold">Listado de categorías (API)</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 pr-2">ID</th>
                  <th className="text-left py-2 pr-2">Título</th>
                  <th className="text-left py-2 pr-2">Descripción</th>
                  <th className="text-left py-2 pr-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map(c => (
                  <tr key={c.id} className="border-b border-white/10 align-top">
                    <td className="py-2 pr-2">{c.id}</td>
                    <td className="py-2 pr-2">{c.title}</td>
                    <td className="py-2 pr-2 text-xs text-gray-300">
                      {c.description || '-'}
                    </td>
                    <td className="py-2 pr-2">
                      <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={() => comenzarEdicion(c)} className="px-2 py-1 rounded-full border border-white/20 text-xs hover:bg-white/10 transition" > Editar </button>
                        <button type="button" onClick={() => eliminarCategoria(c.id)} className="px-2 py-1 rounded-full border border-red-400/60 text-xs text-red-200 hover:bg-red-900/40 transition" > Eliminar </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {categorias.length === 0 && !loading && (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-gray-400"> No hay categorías en la API. </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AdminCategorias
