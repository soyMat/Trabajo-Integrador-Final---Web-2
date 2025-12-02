# E-commerce Web 2 – Trabajo Práctico Final

Aplicación web de e-commerce desarrollada como Trabajo Práctico Final de la materia Desarrollo Web 2.  
El objetivo es construir una Single Page Application (SPA) con React y Vite, consumiendo la API educativa provista por la cátedra y aplicando buenas prácticas de organización, diseño y usabilidad.

#Integrantes y roles

-Mateo Mazuela – Desarrollo frontend, maquetado de la interfaz, integración con la API y lógica de negocio.



#Descripción general

La aplicación simula una tienda de indumentaria con dos grandes categorías principales:

-Hombre
-Mujer

Dentro de cada categoría se agrupan productos en subcategorías como:

-Calzado  
-Indumentaria  
-Accesorios  

Cada producto cuenta con:

-Imagen  
-Precio  
-Descripción  
-Tags (por ejemplo: `Hombre`, `Mujer`, `Oferta`)  
-Posibilidad de ver el detalle del producto y agregarlo al carrito

También se implementa una sección de ofertas, donde se muestran productos con descuento según el tag `Oferta`.



#FUNCIONALIDADES PRINCIPALES


#Area cliente

-Visualización del catálogo de productos consumiendo la API de la cátedra.
-Navegación por categorías Hombre Y Mujer.
-Filtro por tags y subcategorías.
-Buscador de productos dentro de cada categoría.
-Vista de detalle de producto.
-Carrito de compras con:
  Agregar/eliminar productos.
  Modificar cantidades.
  Cálculo de totales y descuentos por oferta.
-Pantalla de Checkout (simulación de compra, sin pago real).



#Area administración

-Botón “Iniciar sesión admin” en la página de inicio que redirige a `/admin`.
-Login simple de administrador en frontend con contraseña: `mat`.
-Panel de administración con dos secciones:

  -Gestión de productos

-Listado de productos obtenidos desde la API (`GET /products/`).
-Crear producto usando `POST /products/`.
-Editar producto usando `PUT /products/{id}/`.
-Eliminar producto usando `DELETE /products/{id}/`.
    Asignación:
  `category_id` (número de categoría).
    Tags:
    `Hombre` (id 107)
    `Mujer` (id 108)
    `Oferta` (id 115)
-Los productos creados o editados con estos tags luego se reflejan en las páginas de Hombre/Mujer y en la sección de ofertas.

  -Gestión de categorías

-Listado de categorías desde `GET /categories/`.
-Crear categoría nueva con `POST /categories/`.
-Editar categoría existente con `PUT /categories/{id}/`.
-Eliminar categoría con `DELETE /categories/{id}/`.



#Tecnologías utilizadas

-React 18 – Biblioteca de JavaScript para construir interfaces de usuario.
-Vite – Herramienta de build y servidor de desarrollo rápido.
-React Router DOM – Enrutamiento para SPA.
-Context API – Gestión de estado global para el carrito de compras.
-Tailwind – Estilos y maquetado de la interfaz.
-React Bits (Beams)- Background animado.

(si quieres clonar el proyecto debes correr:
-git clone https://github.com/soyMat/Trabajo-Integrador-Final---Web-2.git.
-cd " ", debes pararte sobre vite-project.
-npm install, para instalar todas las dependecias del proyecto.
-npm install react-router-dom, en caso de que falte en algun entorno, instalar explicitamente.
-npm install three @react-three/fiber @react-three/drei, para el Background animado.)
