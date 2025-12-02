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

// ids de tags segun la API
// Hombre: 107, Mujer: 108, Oferta: 115
const TAG_ID_HOMBRE = 107
const TAG_ID_MUJER = 108
const TAG_ID_OFERTA = 115

function AdminProductos() {
  const navigate = useNavigate()

  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category_id: '',
    genero: 'hombre',     // 'hombre' o 'mujer' |
    oferta: false   // true si queremos tag Oferta
  })



  // Cargar listado inicial desde la API
  useEffect(() => {
    async function cargarProductos() {
      try {
        const res = await fetch(`${URL_API}/products/`, {
          headers: HEADERS_AUTH
        })
        if (!res.ok) throw new Error('Error al obtener productos')
        const data = await res.json()
        setProductos(data)
      } catch (e) {
        console.error(e)
        setError('No se pudieron cargar los productos desde la API')
      } finally {
        setLoading(false)
      }
    }
    cargarProductos()
  }, [])

  function resetForm() {
    setForm({
      title: '',
      description: '',
      price: '',
      category_id: '',
      genero: 'hombre',
      oferta: false
    })
    setEditingId(null)
  }

  function onChangeForm(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function onChangeOferta(e) {
    const { checked } = e.target
    setForm(prev => ({ ...prev, oferta: checked }))
  }

  function onChangeGenero(valor) {
    setForm(prev => ({ ...prev, genero: valor }))
  }



  function comenzarEdicion(prod) {
    // detectar genero y oferta segun los tags actuales del producto
    let genero = ''
    let oferta = false

    if (Array.isArray(prod.tags)) {
      if (prod.tags.some(t => t.title === 'Hombre')) genero = 'hombre'
      if (prod.tags.some(t => t.title === 'Mujer')) genero = 'mujer'
      if (prod.tags.some(t => t.title === 'Oferta')) oferta = true
    }

    setEditingId(prod.id)
    setForm({
      title: prod.title || '',
      description: prod.description || '',
      price: prod.price != null ? String(prod.price) : '',
      category_id:
        prod.category_id != null
          ? String(prod.category_id)
          : prod.category?.id != null
            ? String(prod.category.id)
            : '',
      genero,
      oferta
    })
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')

    if (!form.title || !form.price) {
      setError('Título y precio son obligatorios')
      return
    }

    const priceNumber = Number(form.price)
    if (Number.isNaN(priceNumber)) {
      setError('El precio debe ser un número')
      return
    }



    // armamos tag_ids segun genero y oferta
    const tag_ids = []
    if (form.genero === 'hombre') tag_ids.push(TAG_ID_HOMBRE)
    if (form.genero === 'mujer') tag_ids.push(TAG_ID_MUJER)
    if (form.oferta) tag_ids.push(TAG_ID_OFERTA)

    const payload = {
      title: form.title,
      description: form.description,
      price: priceNumber,
      category_id: form.category_id ? Number(form.category_id) : 0,
      tag_ids
    }

    try {
      let res
      if (editingId) {
        // PUT /products/{id}/
        res = await fetch(`${URL_API}/products/${editingId}/`, {
          method: 'PUT',
          headers: HEADERS_JSON,
          body: JSON.stringify(payload)
        })
      } else {
        // POST /products/
        res = await fetch(`${URL_API}/products/`, {
          method: 'POST',
          headers: HEADERS_JSON,
          body: JSON.stringify(payload)
        })
      }

      if (!res.ok) {
        const texto = await res.text()
        console.error('Error API productos', res.status, texto)
        setError('La API rechazó la operación (ver consola).')
        return
      }

      const productoApi = await res.json()

      if (editingId) {
        setProductos(prev =>
          prev.map(p => (p.id === productoApi.id ? productoApi : p))
        )
      } else {
        setProductos(prev => [...prev, productoApi])
      }

      resetForm()
    } catch (e2) {
      console.error(e2)
      setError('Error de red al hablar con la API')
    }
  }

  async function eliminarProducto(id) {
    const ok = window.confirm('¿Eliminar este producto en la API?')
    if (!ok) return
    setError('')

    try {
      const res = await fetch(`${URL_API}/products/${id}/`, {
        method: 'DELETE',
        headers: HEADERS_AUTH
      })
      if (!res.ok) {
        const texto = await res.text()
        console.error('Error DELETE', res.status, texto)
        setError('No se pudo eliminar el producto (ver consola).')
        return
      }
      setProductos(prev => prev.filter(p => p.id !== id))
    } catch (e) {
      console.error(e)
      setError('Error de red al eliminar producto')
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
            <h1 className="text-xl md:text-2xl font-semibold">Gestión de productos</h1>
          </div>
        </header>



        {/* tabs admin */}
        <nav className="flex flex-wrap gap-3">
          <button type="button" onClick={() => navigate('/admin/productos')} className="px-4 py-2 rounded-full border border-white/20 text-sm bg-white/10" > Productos </button>
          <button type="button" onClick={() => navigate('/admin/categorias')} className="px-4 py-2 rounded-full border border-white/20 text-sm hover:bg-white/10 transition" > Categorías </button>
        </nav>

        {loading && <p className="text-sm text-gray-400">Cargando productos...</p>}
        {error && ( 
          <p className="text-sm text-red-300 bg-red-900/40 border border-red-500/40 rounded-lg px-3 py-2"> {error} </p>
        )}



        {/* FORM */}
        <section className="rounded-xl border border-white/10 bg-black/30 p-4 flex flex-col gap-3">
          <h2 className="text-lg font-semibold"> {editingId ? 'Editar producto (API)' : 'Crear producto (API)'} </h2>

          <form onSubmit={onSubmit} className="grid gap-3 md:grid-cols-2">
            <div className="flex flex-col gap-1 text-sm">
              <label className="text-gray-300">Título</label>
              <input name="title" value={form.title} onChange={onChangeForm} className="rounded-lg bg-black/40 border border-white/20 px-2 py-1 text-sm outline-none" required />
            </div>

            <div className="flex flex-col gap-1 text-sm">
              <label className="text-gray-300">Precio</label>
              <input type="number" step="0.01" name="price" value={form.price} onChange={onChangeForm} className="rounded-lg bg-black/40 border border-white/20 px-2 py-1 text-sm outline-none" required />
            </div>

            <div className="flex flex-col gap-1 text-sm md:col-span-2">
              <label className="text-gray-300">Descripción</label>
              <textarea name="description" value={form.description} onChange={onChangeForm} className="rounded-lg bg-black/40 border border-white/20 px-2 py-1 text-sm outline-none min-h-[60px]" />
            </div>

            <div className="flex flex-col gap-1 text-sm">
              <label className="text-gray-300">category_id (número)</label>
              <input type="number" name="category_id" value={form.category_id} onChange={onChangeForm} className="rounded-lg bg-black/40 border border-white/20 px-2 py-1 text-sm outline-none"  placeholder="Ej: 204 = Calzado" />
            </div>



            {/* genero: Hombre / Mujer */}
            <div className="flex flex-col gap-1 text-sm">
              <span className="text-gray-300">Género (tag)</span>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => onChangeGenero('hombre')} className={`px-3 py-1 rounded-full border text-xs ${ form.genero === 'hombre' ? 'border-emerald-400 bg-emerald-500/20' : 'border-white/25 bg-black/30' }`} > Hombre (tag 107) </button>
                <button type="button" onClick={() => onChangeGenero('mujer')} className={`px-3 py-1 rounded-full border text-xs ${ form.genero === 'mujer' ? 'border-emerald-400 bg-emerald-500/20' : 'border-white/25 bg-black/30' }`} > Mujer (tag 108) </button>
              </div>
            </div>



            {/* oferta */}
            <div className="flex items-center gap-2 text-sm">
              <input id="oferta" type="checkbox" checked={form.oferta} onChange={onChangeOferta} className="w-4 h-4" />
              <label htmlFor="oferta" className="text-gray-300"> Marcar como Oferta (tag 115) </label>
            </div>

            <div className="flex gap-2 md:col-span-2 mt-2">
              <button type="submit" className="px-4 py-2 rounded-full border border-white/20 text-sm bg-white/15 hover:bg-white/25 transition" > {editingId ? 'Guardar cambios' : 'Crear producto'} </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="px-4 py-2 rounded-full border border-white/20 text-sm hover:bg-white/10 transition"> Cancelar edición </button>
              )}
            </div>
          </form>
        </section>



        {/* LISTADO */}
        <section className="rounded-xl border border-white/10 bg-black/30 p-4 flex flex-col gap-3">
          <h2 className="text-lg font-semibold">Listado de productos (API)</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 pr-2">ID</th>
                  <th className="text-left py-2 pr-2">Título</th>
                  <th className="text-left py-2 pr-2">Precio</th>
                  <th className="text-left py-2 pr-2">category_id</th>
                  <th className="text-left py-2 pr-2">Tags</th>
                  <th className="text-left py-2 pr-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(p => (
                  <tr key={p.id} className="border-b border-white/10 align-top">
                    <td className="py-2 pr-2">{p.id}</td>
                    <td className="py-2 pr-2">
                      <div className="font-medium">{p.title}</div>
                      {p.description && (
                        <p className="text-xs text-gray-400 line-clamp-2"> {p.description} </p>
                      )}
                    </td>
                    <td className="py-2 pr-2">
                      {p.price != null ? `$ ${p.price}` : '-'}
                    </td>
                    <td className="py-2 pr-2">
                      {p.category_id ?? p.category?.id ?? '-'}
                    </td>
                    <td className="py-2 pr-2">
                      {Array.isArray(p.tags) && p.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {p.tags.map(t => (
                            <span key={t.id} className="px-2 py-0.5 rounded-full bg-white/10 text-[11px]" >
                              {t.title}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-500">Sin tags</span>
                      )}
                    </td>
                    <td className="py-2 pr-2">
                      <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={() => comenzarEdicion(p)} className="px-2 py-1 rounded-full border border-white/20 text-xs hover:bg-white/10 transition" > Editar </button>
                        <button type="button" onClick={() => eliminarProducto(p.id)} className="px-2 py-1 rounded-full border border-red-400/60 text-xs text-red-200 hover:bg-red-900/40 transition" > Eliminar </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {productos.length === 0 && !loading && (
                  <tr>
                    <td colSpan="6" className="py-4 text-center text-gray-400">  No hay productos en la API. </td>
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

export default AdminProductos
