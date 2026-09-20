# LATAMesa — sitio + panel de administración, todo en uno

Este proyecto tiene dos partes que se publican juntas, en el mismo dominio:

- **El sitio público** (`/`, `/issue/[slug]`) — lo que ve cualquier visitante.
- **El panel de administración** (`/studio`) — Sanity Studio embebido adentro
  del propio sitio. Tu cliente entra a `https://tu-dominio.com/studio`,
  inicia sesión con su cuenta de Sanity, y carga el issue del mes ahí.
  No hay nada que instalar, no hay terminal, no hay "localhost".

Todo lo que sigue se hace desde el navegador, en tres sitios: **github.com**,
**sanity.io** y **vercel.com**.

---

## 1. Subir el proyecto a GitHub (sin terminal)

1. Entrá a [github.com](https://github.com) e iniciá sesión (o creá una cuenta).
2. Arriba a la derecha, tocá el **+** → **New repository**.
3. Ponele un nombre (ej: `latamesa-web`), dejalo en **Private** o **Public** como prefieras, y creá el repositorio vacío (sin README, sin .gitignore — ya vienen en este proyecto).
4. Entrá al repositorio recién creado y tocá el link **"uploading an existing file"** (aparece en la página de bienvenida del repo vacío).
5. Arrastrá **todo el contenido de esta carpeta** (no la carpeta en sí, sino lo que está adentro: `app`, `components`, `lib`, `sanity`, `styles`, `package.json`, etc.) a la zona de subida.
6. Abajo, escribí un mensaje de commit (ej: "Primera versión") y tocá **Commit changes**.

> Si el navegador te limita la cantidad de archivos por subida, subilos en un par de tandas — GitHub va agregando todo al mismo repositorio.

---

## 2. Crear el proyecto en Sanity (sin terminal)

1. Entrá a [sanity.io](https://www.sanity.io) → **Get started** / **Sign in**, iniciá sesión (podés usar Google o GitHub).
2. Te va a llevar a [sanity.io/manage](https://www.sanity.io/manage). Tocá **Create new project**.
3. Ponele un nombre (ej: "LATAMesa") y confirmá. Sanity te va a mostrar tu **Project ID** — copialo, lo vas a necesitar en el paso 3.
4. En la pestaña **Datasets** del proyecto, confirmá que exista uno llamado **production** (Sanity lo crea solo al iniciar el proyecto; si no está, tocá **Add dataset**, nombralo `production` y dejalo en modo **Public**).
5. Andá a la pestaña **API** del proyecto → sección **CORS Origins** → **Add CORS origin**. Por ahora dejá esta pestaña abierta — vas a volver acá en el paso 4 para agregar la URL real de tu sitio.

Si tu cliente va a cargar contenido y vos también, andá a la pestaña **Members** y agregalo por su email — así puede entrar a `/studio` con su propia cuenta.

---

## 3. Desplegar en Vercel (sin terminal)

1. Entrá a [vercel.com](https://vercel.com) e iniciá sesión (podés entrar directo con tu cuenta de GitHub).
2. Tocá **Add New...** → **Project**.
3. Elegí **Import Git Repository** y seleccioná el repositorio que subiste en el paso 1 (puede pedirte autorizar a Vercel a acceder a tu cuenta de GitHub la primera vez).
4. Antes de tocar Deploy, abrí **Environment Variables** y cargá estas tres, con los valores de tu proyecto Sanity (paso 2):

   | Nombre | Valor |
   |---|---|
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | el Project ID que copiaste en Sanity |
   | `NEXT_PUBLIC_SANITY_DATASET` | `production` |
   | `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-01-01` |

5. Tocá **Deploy** y esperá a que termine (un par de minutos).
6. Cuando termina, Vercel te da una URL (algo como `latamesa-web.vercel.app`, o tu dominio propio si ya lo conectaste). Copiala.

---

## 4. Conectar Sanity con tu dominio de Vercel (para que el login funcione)

1. Volvé a [sanity.io/manage](https://www.sanity.io/manage) → tu proyecto → pestaña **API** → **CORS Origins** → **Add CORS origin**.
2. Pegá la URL que te dio Vercel (ej: `https://latamesa-web.vercel.app`), con `https://` incluido.
3. Marcá la opción **"Allow credentials"** (es necesaria para que el login funcione dentro de `/studio`).
4. Guardá.

Si más adelante conectás un dominio propio en Vercel (ej: `latamesa.com`), repetí este paso agregando esa URL también.

---

## 5. Usar el panel de administración

Andá a:

```
https://tu-dominio-de-vercel.vercel.app/studio
```

Te va a pedir iniciar sesión — cualquier cuenta que hayas agregado como
**Member** del proyecto en Sanity (paso 2) puede entrar, con Google, GitHub
o email, sin instalar nada.

Una vez adentro:

1. Tocá **Issue** en el menú de la izquierda → **Create new**.
2. Completá los campos (número, tema, temporada, colores, foto de portada, colaboradores, piezas del índice).
3. Activá **"¿Es el issue actual?"** si querés que aparezca en la home.
4. Tocá **Publish**.

El sitio público (`/` y `/issue/[slug]`) va a mostrar ese contenido en menos
de 60 segundos, sin que nadie tenga que volver a hacer un deploy.

---

## Qué falta migrar

Esta base cubre la **home** y la **página de issue completo**, que es lo
que cambia todos los meses. El mismo patrón (agregar un tipo en
`sanity/schemaTypes`, agregar la query en `lib/queries.js`, agregar la
página en `app/`) sirve para el resto de las secciones: Archive,
Exhibitions, Events, Essay, Interview, Visual, About, Contact.

## Dónde está cada cosa

- `sanity.config.js` (en la raíz) — configuración del Studio embebido, con `basePath: '/studio'`
- `app/studio/[[...tool]]/page.jsx` — la ruta que sirve el Studio dentro de Next.js
- `sanity/schemaTypes/issue.js` — los campos que tu cliente completa cada mes
- `sanity/schemaTypes/piece.js` — los campos de cada pieza del índice del issue
- `app/page.js` — la home, lee el issue marcado como "actual"
- `app/issue/[slug]/page.js` — la página completa de un issue
- `components/Nav.jsx`, `Footer.jsx`, `Frame.jsx` — tus componentes de diseño, en React
- `styles/globals.css` — tu CSS actual, sin tocar

## Si en algún momento SÍ querés trabajar en tu computadora

Nada de esto lo requiere, pero si más adelante querés tocar código en local,
seguís pudiendo hacer `npm install` y `npm run dev` como cualquier proyecto
Next.js — el Studio en `/studio` funciona igual en `http://localhost:3000/studio`.
