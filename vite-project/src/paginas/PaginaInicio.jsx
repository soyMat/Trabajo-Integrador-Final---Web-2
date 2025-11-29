import imagenBannerHombre from '../imagenes/banner-hombre.jpg'
import imagenBannerMujer from '../imagenes/banner-mujer.jpg'
import imagenBannerPrincipal from '../imagenes/banner-main.PNG'
import logosinfondo from '../imagenes/logo-sin-fondo.PNG'

function PaginaInicio() {
  return (
    <div className="pagina-inicio">
      {/* ENCABEZADO */}
      <header className="encabezado panel-cristal">
        <div className="encabezado__izquierda">
          <div className="logo">
            <img src={logosinfondo} alt="Logo" className="logo-imagen"/>
          </div>
        </div>

        <div className="encabezado__centro">
          <form className="barra-busqueda">
            <input
              type="search"
              placeholder="Buscar productos..."
              aria-label="Buscar productos"
            />
            <button type="submit" className="barra-busqueda__boton">
              🔍
            </button>
          </form>
        </div>

        <div className="encabezado__derecha">
          <button type="button" className="boton-icono">Iniciar sesion</button>
          <button type="button" className="boton-icono">Carrito</button>
        </div>
      </header>

      {/* CATEGORÍAS */}
      <nav
        className="barra-categorias panel-cristal"
        aria-label="Categorías principales"
      >
        <button type="button" className="chip-categoria">Hombre</button>
        <button type="button" className="chip-categoria">Mujer </button>
      </nav>

      <main className="contenido-principal">
        {/* BANNER PRINCIPAL */}
        <section className="banner-principal panel-cristal">
          <div className="banner-principal__imagen">
            <img src={imagenBannerPrincipal} alt="Promoción principal de la tienda" className="banner-principal__imagen-foto"/>
         </div>

        <div className="banner-principal__contenido">
          <h1 className="banner-principal__titulo">SYSTEM UPDATE</h1>
          <p className="banner-principal__subtitulo">Calzado, indumentaria y accesorios para hombre y mujer.</p>
          <button type="button" className="boton-primario">Ver productos en descuento</button>
        </div>
        </section>


        {/* BANNERS HOMBRE / MUJER */}
        <section className="banners-genero">
          <article className="banner-genero panel-cristal">
            <div className="banner-genero__imagen banner-genero__imagen--hombre">
              <img src={imagenBannerHombre} alt="Categoría hombre"className="banner-genero__imagen-foto"/>
            </div>
            <div className="banner-genero__contenido">
              <h2>System Failure: Him.</h2>
              <button type="button" className="boton-secundario">Ver categoria Hombre</button>
            </div>
          </article>

          <article className="banner-genero panel-cristal">
            <div className="banner-genero__imagen banner-genero__imagen--mujer">
              <img src={imagenBannerMujer} alt="Categoría mujer" className="banner-genero__imagen-foto"/>
            </div>
            <div className="banner-genero__contenido">
              <h2>Fatal Error: Her</h2>
              <button type="button" className="boton-secundario">Ver categoria Mujer</button>
            </div>
          </article>
        </section>

        {/* CARRUSEL DESCUENTOS */}
        <section className="carrusel-descuentos panel-cristal">
          <header className="carrusel-descuentos__encabezado">
            <h2>Productos en descuento</h2>
            <p>Una selección de ofertas especiales.</p>
          </header>

          <div className="carrusel-descuentos__pista">
            <article className="tarjeta-producto">
              <div className="tarjeta-producto__imagen">IMG</div>
              <div className="tarjeta-producto__cuerpo">
                <h3 className="tarjeta-producto__titulo">Producto ejemplo</h3>
                <p className="tarjeta-producto__precio">$0.000</p>
                <div className="tarjeta-producto__acciones">
                  <button type="button" className="boton-secundario">Ver detalle</button>
                  <button type="button" className="boton-primario">Agregar al carrito</button>
                </div>
              </div>
            </article>

            <article className="tarjeta-producto">
              <div className="tarjeta-producto__imagen">IMG</div>
              <div className="tarjeta-producto__cuerpo">
                <h3 className="tarjeta-producto__titulo">Producto ejemplo 2</h3>
                <p className="tarjeta-producto__precio">$0.000</p>
                <div className="tarjeta-producto__acciones">
                  <button type="button" className="boton-secundario">Ver detalle</button>
                  <button type="button" className="boton-primario">Agregar al carrito</button>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>

      {/* PIE DE PAGINA */}
      <footer className="pie panel-cristal">
        <section className="pie__info">
          <h2>Nombre de la tienda</h2>
          <p> Ecommerce ficticio para el Trabajo Final de Web 2. Envíos a todo el país.</p>
          <p> 742 Evergreen Terrace, Springfield · Horario: lunes a lunes, 24hs.</p>
        </section>

        <section className="pie__pagos">
          <h2>Métodos de pago</h2>
          <div className="pie__pagos-logoloop"> LOGO LOOP (Visa · Master · etc.)</div>
        </section>
      </footer>
    </div>
  )
}

export default PaginaInicio
