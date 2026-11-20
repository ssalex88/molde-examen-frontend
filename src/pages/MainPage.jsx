// ✍️ MOLDE: CARGAR UNA LISTA (GET) + GUARDAR CREAR/EDITAR (POST/PUT)
// Lo mío: import de API_URL, cajita error, cargar + useEffect, guardarVideojuego y el <p> de error.
// 🔗 Back: app.get / app.post / app.put("/videojuegos...")
//
// Lo que venía (los TODO):
//   · useEffect vacío                → ahora llama a cargar() (GET)
//   · guardarVideojuego solo cambiaba la lista en memoria (se perdía al recargar)
//                                    → ahora la manda al backend (POST o PUT) y vuelve a cargar

import { useEffect, useState } from 'react'   // useEffect = "haz esto cuando la página aparezca"
import { useNavigate } from 'react-router-dom'
import VideojuegoTable from '../components/VideojuegoTable.jsx'
import VideojuegoModal from '../components/VideojuegoModal.jsx'
import { API_URL } from '../constants.js'      // ✍️

function MainPage() {
  const [videojuegos, setVideojuegos] = useState([])                         // la lista ([] = vacía al inicio)
  const [modalAbierto, setModalAbierto] = useState(false)                     // ¿se ve el modal?
  const [videojuegoSeleccionado, setVideojuegoSeleccionado] = useState(null)  // null = crear · un juego = editar
  const [error, setError] = useState('')                                     // mensaje rojo
  const navigate = useNavigate()

  // ── CARGAR (GET) ─────────────────────────────────────────
  // async porque adentro hay await (esperar al backend)
  const cargar = async () => {
    const resp = await fetch(`${API_URL}/videojuegos`)   // GET: sin method ni body (GET es el método por defecto)
    const data = await resp.json()                       // [ {id:1...}, ... ]  ← lo que mandó res.json(lista)
    setVideojuegos(data)                                 // la tabla se redibuja
  }

  // al abrir la página, una vez   ([] = una vez · [filtro] = cada vez que cambie el filtro)
  // useEffect(funcion, [dependencias]) → corre la función cuando la página aparece
  // y otra vez cada vez que cambie algo de la lista [ ].
  useEffect(() => {
    cargar()
  }, [])

  // (ya venían) los botones escriben en la cajita videojuegoSeleccionado
  const abrirModalNuevo = () => {             // "+ Nuevo" → null = crear
    setVideojuegoSeleccionado(null)
    setModalAbierto(true)
  }

  const abrirModalEditar = (videojuego) => {  // "Modificar" de una fila → ese juego = editar
    setVideojuegoSeleccionado(videojuego)     //   (la tabla le pasa el juego de esa fila)
    setModalAbierto(true)
  }

  const cerrarModal = () => {                 // cerrar → vuelve a null
    setModalAbierto(false)
    setVideojuegoSeleccionado(null)
  }

  // ── GUARDAR (POST o PUT) · lo llama el modal con lo que escribiste ─────
  // "videojuego" = el form del modal  →  { id, nombre, sinopsis, categoria, url_imagen }
  const guardarVideojuego = async (videojuego) => {
    // 1. ¿editando o creando? (mira la cajita)
    const editando = videojuegoSeleccionado !== null

    // 2. URL y método según el caso   (cond ? si : no)
    const url = editando
      ? `${API_URL}/videojuegos/${videojuegoSeleccionado.id}`   // editar: el id va EN LA URL → req.params.id
      : `${API_URL}/videojuegos`                                // crear: el id va en el body → req.body.id
    const metodo = editando ? 'PUT' : 'POST'

    // 3. mandar
    const resp = await fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(videojuego),                         // el objeto entero → texto JSON
    })
    const data = await resp.json()

    // 4. salió mal (400/404/409) → mensaje rojo, el modal sigue abierto
    if (!resp.ok) {
      return setError(data.message)
    }

    // 5. salió bien → limpiar error, volver a pedir la lista, cerrar
    setError('')
    cargar()         // pedir la lista de nuevo = la tabla muestra lo que REALMENTE hay en la BD
    cerrarModal()
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 💡 OTRAS FORMAS (comentadas: NO se ejecutan, son ejemplos para copiar si te piden algo así)
  // ─────────────────────────────────────────────────────────────────────────────
  //
  // ▸ A) FILTRAR (ej. por categoría) → el back recibe req.query.categoria
  //
  //   const [categoria, setCategoria] = useState('')            // cajita del filtro
  //
  //   const cargar = async () => {
  //     const resp = await fetch(`${API_URL}/videojuegos?categoria=${categoria}`)
  //     setVideojuegos(await resp.json())
  //   }
  //
  //   useEffect(() => { cargar() }, [categoria])                // [categoria] = recarga al cambiar el filtro
  //
  //   // en el return (JSX), arriba de la tabla:
  //   // <input value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Categoría" />
  //
  //   // varios filtros → arma la URL con URLSearchParams (solo agrega los que tienen valor):
  //   // const params = new URLSearchParams()
  //   // if (categoria) params.append('categoria', categoria)
  //   // if (nombre) params.append('nombre', nombre)
  //   // fetch(`${API_URL}/videojuegos?${params}`)
  //
  // ▸ B) "SOLO GET y POST" (no se permite PUT) → editar con POST a otra ruta
  //
  //   const url = editando
  //     ? `${API_URL}/videojuegos/${videojuegoSeleccionado.id}/editar`   // 🔗 app.post("/videojuegos/:id/editar")
  //     : `${API_URL}/videojuegos`
  //   const metodo = 'POST'                                            // siempre POST
  //
  // ▸ C) Dos funciones separadas en vez de una con "?" (más largo pero más fácil de leer)
  //
  //   const crear = async (videojuego) => {
  //     const resp = await fetch(`${API_URL}/videojuegos`, {
  //       method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(videojuego),
  //     })
  //     const data = await resp.json()
  //     if (!resp.ok) return setError(data.message)
  //     setError(''); cargar(); cerrarModal()
  //   }
  //   const editar = async (videojuego) => { /* igual pero con PUT y `${API_URL}/videojuegos/${videojuego.id}` */ }
  //   const guardarVideojuego = (videojuego) => (videojuegoSeleccionado ? editar(videojuego) : crear(videojuego))
  //
  // ▸ D) ELIMINAR (DELETE) → 🔗 app.delete("/videojuegos/:id")
  //
  //   const eliminar = async (id) => {
  //     if (!confirm('¿Seguro que quieres eliminarlo?')) return   // ventanita Aceptar / Cancelar
  //     const resp = await fetch(`${API_URL}/videojuegos/${id}`, { method: 'DELETE' })
  //     if (!resp.ok) return setError((await resp.json()).message)
  //     cargar()
  //   }
  //   // y se lo pasas a la tabla: <VideojuegoTable ... onEliminar={eliminar} />
  //
  // ▸ E) TRAER UNO por id (ej. una página de detalle) → 🔗 app.get("/videojuegos/:id")
  //
  //   const resp = await fetch(`${API_URL}/videojuegos/${id}`)
  //   if (resp.status === 404) return setError('No existe')
  //   const videojuego = await resp.json()
  //
  // ▸ F) Mostrar "Cargando..." mientras llega la lista
  //
  //   const [cargando, setCargando] = useState(true)
  //   // en cargar():  setCargando(true) al inicio  ·  setCargando(false) al final
  //   // en el JSX:    {cargando ? <p>Cargando...</p> : <VideojuegoTable ... />}
  //
  // ▸ G) Mensaje verde de éxito
  //
  //   const [exito, setExito] = useState('')
  //   // al guardar bien: setExito(editando ? 'Videojuego modificado' : 'Videojuego creado')
  //   // en el JSX: {exito && <p className="text-green-600">{exito}</p>}
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-slate-800">Videojuegos</h1>
          {/* onClick={() => navigate('/')}  → con flecha: se ejecuta AL HACER CLIC.
              ⚠️ onClick={navigate('/')} sin flecha se ejecutaría apenas se dibuja la página */}
          <button
            onClick={() => navigate('/')}
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 space-y-4">
        <div className="flex justify-end">
          {/* aquí sí va sin flecha: abrirModalNuevo es el NOMBRE de la función (no la llamo con ()) */}
          <button
            onClick={abrirModalNuevo}
            className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
          >
            + Nuevo videojuego
          </button>
        </div>

        {/* si hay error, se ve en rojo */}
        {error && <p className="text-red-600">{error}</p>}

        {/* props = datos que le paso al componente hijo:
              videojuegos → la lista para dibujar
              onEditar    → la función que la tabla llama al apretar "Modificar" */}
        <VideojuegoTable videojuegos={videojuegos} onEditar={abrirModalEditar} />
      </main>

      {/* el modal solo existe si modalAbierto es true
            videojuego = null (crear) o el juego (editar) · onGuardar = qué hacer al enviar */}
      {modalAbierto && (
        <VideojuegoModal
          videojuego={videojuegoSeleccionado}
          onGuardar={guardarVideojuego}
          onCerrar={cerrarModal}
        />
      )}
    </div>
  )
}

export default MainPage
