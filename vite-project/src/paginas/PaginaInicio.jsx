import imagenBannerHombre from '../imagenes/banner-hombre.jpg'
import imagenBannerMujer from '../imagenes/banner-mujer.jpg'
import imagenBannerPrincipal from '../imagenes/banner-main.PNG'
import logosinfondo from '../imagenes/logo-sin-fondo.PNG'

function PaginaInicio() {
  return (
     <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-5xl px-6 py-6 flex flex-col gap-4">
        {/* ENCABEZADO */}
        <header className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] items-center gap-4">
          {/* Izquierda: logo */}
          <div className="flex items-center">
            <img src={logosinfondo} alt="Logo" className="h-17 w-auto"/>
          </div>

          {/* Centro: barra de búsqueda */}
          <div className="flex justify-center w-full">
            <form className="flex w-full max-w-md rounded-full bg-black/40 border border-white/20 px-3 py-1">
              <input type="search" placeholder="Buscar productos..." aria-label="Buscar productos" className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-gray-400"/>
              <button type="submit" className="text-sm px-2 text-gray-200">🔎</button>
            </form>
          </div>

          {/* Derecha: botones login / carrito */}
          <div className="flex justify-end gap-2">
            <button type="button" className= "px-3 py-1 rounded-full border border-white/20 text-xs md:text-sm hover:bg-white/10 transition">Iniciar sesion</button>
            <button type="button" className="px-3 py-1 rounded-full border border-white/20 text-xs md:text-sm hover:bg-white/10 transition">Carrito</button>
          </div>
        </header>

        {/* CATEGORÍAS */}
        <nav
          aria-label="Categorías principales"
          className="flex justify-center gap-3 py-2"
        >
          <button type="button" className="px-4 py-1 rounded-full border border-white/20 text-sm hover:bg-white/10 transition"> Hombre</button>
          <button type="button" className="px-4 py-1 rounded-full border border-white/20 text-sm hover:bg-white/10 transition">Mujer</button>
        </nav>

        <main className="flex flex-col gap-4">
          {/* BANNER PRINCIPAL */}
          <section className="flex flex-col gap-4 items-center text-center ">
            <div className="w-full rounded-xl overflow-hidden flex justify-center">
              <img src={imagenBannerPrincipal} alt="Promoción principal de la tienda" className= "w-2/3 h-full object-cover"/>
            </div>

            <div className="flex flex-col items-center gap-2">
              <h1 className="text-xl md:text-2xl font-semibold tracking-wide">SYSTEM UPDATE</h1>
              <p className="text-sm text-gray-300">Calzado, indumentaria y accesorios.</p>
              <button type="button" className="px-5 py-2 rounded-full bg-white/15 hover:bg-white/25 text-sm md:text-base transition">Ver productos en descuento</button>
            </div>
          </section>

          {/* BANNERS HOMBRE / MUJER */}

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hombre */}
            <article className="flex flex-col gap-3 p-3">
              <div className="w-full rounded-2xl overflow-hidden border border-white/20"> <img src={imagenBannerHombre} alt="Categoría hombre" className="w-full h-full object-cover"/> </div>
              <div className="flex flex-col items-center text-center gap-2">
                <h2 className="text-lg font-semibold">System Failure: Him.</h2>
                <button type="button" className="px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 text-sm transition">Ver categoria - Hombre</button>
              </div>
            </article>

            {/* Mujer */}
            <article className="flex flex-col gap-3 p-3">
              <div className="w-full rounded-2xl overflow-hidden border border-white/20">
                <img src={imagenBannerMujer} alt="Categoría mujer" className="w-full h-full object-cover"/>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <h2 className="text-lg font-semibold">Fatal Error: Her</h2>
                <button type="button" className="px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 text-sm transition">Ver categoria - Mujer</button>
              </div>
            </article>
          </section>

          {/* CARRUSEL DESCUENTOS */}
          <section className="rounded-2xl p-4 border border-white/15">
            <header className="mb-3">
              <h2 className="text-lg font-semibold">Productos en descuento</h2>
              <p className="text-sm text-gray-300">Una selección de ofertas especiales.</p>
            </header>

            <div className="flex gap-3 overflow-x-auto pb-1">

              {/* Tarjeta 1 */}
              <article className="min-w-[220px] rounded-xl border border-white/20 bg-black/30 p-3 flex flex-col gap-2">
                <div className="h-36 rounded-lg border border-dashed border-white/25 flex items-center justify-center text-xs text-gray-300">IMG</div>
                <h3 className="text-sm font-semibold mt-1">Producto ejemplo</h3>
                <p className="text-sm font-semibold">$0.000</p>
                <div className="flex gap-2 mt-2">
                  <button type="button" className="flex-1 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs transition">Ver detalle</button>
                  <button type="button" className="flex-1 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-xs transition">Agregar al carrito</button>
                </div>
              </article>

              {/* Tarjeta 2 */}
              <article className="min-w-[220px] rounded-xl border border-white/20 bg-black/30 p-3 flex flex-col gap-2">
                <div className="h-36 rounded-lg border border-dashed border-white/25 flex items-center justify-center text-xs text-gray-300">IMG</div>
                <h3 className="text-sm font-semibold mt-1">Producto ejemplo 2</h3>
                <p className="text-sm font-semibold">$0.000</p>
                <div className="flex gap-2 mt-2">
                  <button type="button" className="flex-1 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs transition">Ver detalle</button>
                  <button type="button" className="flex-1 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-xs transition">Agregar al carrito</button>
                </div>
              </article>
            </div>
          </section>
        </main>

        {/* PIE DE PAGINA */}
        <footer className="mt-4 grid grid-cols-1 md:grid-cols-[2fr_1.2fr] gap-4 border-t border-white/10 pt-4">
          <section>
            <h2 className="text-lg font-semibold">Nombre de la tienda</h2>
            <p className="text-sm text-gray-300 mt-1"> Ecommerce ficticio para el Trabajo Final de Web 2. Envíos a todo el país.</p>
            <p className="text-sm text-gray-300"> 742 Evergreen Terrace, Springfield · Horario: lunes a lunes, 24hs. </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Métodos de pago</h2>
            <div className="mt-2 min-h-[60px] rounded-lg border border-dashed border-white/25 flex items-center justify-center text-xs text-gray-300">LOGO LOOP (Visa · Master · etc.)</div>
          </section>
        </footer>
      </div>
    </div>
  )
}

export default PaginaInicio
