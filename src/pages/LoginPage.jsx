// ✍️ MOLDE: MANDAR UN FORMULARIO (POST)
// Lo mío: el import de API_URL + handleSubmit. Lo demás ya venía.
// 🔗 Back: app.post("/login")
//
// Lo que venía (el TODO): un if fijo  →  if (usuario === 'admin' && password === '123')
// Lo que hice: cambiar ese if por un fetch que le pregunta al backend.

import { useState } from 'react'               // useState = crear "cajitas" que guardan valores
import { useNavigate } from 'react-router-dom' // useNavigate = cambiar de página por código
import { API_URL } from '../constants.js'      // ✍️ "http://localhost:8000" (sale del .env)

function LoginPage() {
  // cajitas: [valor, cambiarValor] = useState(inicial)  ·  set...() cambia y React redibuja
  const [usuario, setUsuario] = useState('')    // lo que se escribe en el input Usuario
  const [password, setPassword] = useState('')  // lo que se escribe en el input Password
  const [error, setError] = useState('')        // '' = sin error · 'texto' = se ve en rojo
  const navigate = useNavigate()                // navigate('/main') → ir a esa página

  // se ejecuta al enviar el form: <form onSubmit={handleSubmit}>
  //
  // ¿Qué es "e"?  → el EVENTO. React se lo pasa solo a la función cuando pasa algo
  //                 (aquí: "se envió el formulario"). Trae info y métodos, por ejemplo:
  //                   e.preventDefault()  → cancelar lo que el navegador haría por defecto
  //                   e.target            → el elemento que causó el evento (el form, un input…)
  //                 Se puede llamar como quieras (e, evento, ev), pero todos usan "e".
  //
  // ¿Por qué "async"? → porque adentro uso "await" (esperar al backend). Van siempre juntos.
  const handleSubmit = async (e) => {
    // 1. que la página no se recargue
    //    (un <form> por defecto recarga la página al enviarse → se perdería todo lo escrito)
    e.preventDefault()

    // 2. preguntar al backend          🟢 ruta y datos · 🔴 method/headers/body siempre juntos
    //    await = "espera la respuesta antes de seguir a la línea de abajo"
    const resp = await fetch(`${API_URL}/login`, {
      method: 'POST',                                    // POST = mandar datos
      headers: { 'Content-Type': 'application/json' },   // "te mando JSON" (sin esto el back recibe vacío → 400)
      body: JSON.stringify({ usuario, password }),       // { usuario } = { usuario: usuario } · stringify = objeto → texto
    })

    // 3. abrir la respuesta: resp = el paquete (¿ok?) · data = lo de adentro
    //    resp.ok     → true si el código es 200-299, false si es 400/401/404/409…
    //    resp.status → el número (200, 401…)
    //    data        → lo que mandó el back con res.json(...)  ej. { message: "Login correcto" }
    const data = await resp.json()

    // 4. salió mal (400/401) → mensaje rojo
    //    "return" corta la función aquí: no sigue al navigate
    if (!resp.ok) {
      return setError(data.message)
    }

    // 5. salió bien → otra página
    navigate('/main')
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 💡 OTRAS FORMAS (comentadas: NO se ejecutan, son ejemplos para copiar si te piden algo así)
  // ─────────────────────────────────────────────────────────────────────────────
  //
  // ▸ A) Con try/catch → si el BACKEND ESTÁ APAGADO, fetch lanza un error y sin esto la página no muestra nada
  //
  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const resp = await fetch(`${API_URL}/login`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ usuario, password }),
  //     })
  //     const data = await resp.json()
  //     if (!resp.ok) return setError(data.message)
  //     navigate('/main')
  //   } catch {
  //     setError('No se pudo conectar con el servidor')
  //   }
  // }
  //
  // ▸ B) Validar en el front ANTES de mandar (ej. "la password debe tener 3 letras o más")
  //
  //   if (password.length < 3) {
  //     return setError('La password debe tener al menos 3 caracteres')
  //   }
  //   (va después del e.preventDefault() y antes del fetch)
  //
  // ▸ C) Elegir el mensaje según el código (si el back no manda "message")
  //
  //   if (resp.status === 401) return setError('Credenciales incorrectas')
  //   if (resp.status === 400) return setError('Completa todos los campos')
  //
  // ▸ D) Guardar quién entró (para mostrar "Hola, admin" en otra página)
  //
  //   localStorage.setItem('usuario', usuario)        // guardar (antes del navigate)
  //   localStorage.getItem('usuario')                 // leer en la otra página
  //   localStorage.removeItem('usuario')              // al cerrar sesión
  //
  // ▸ E) Lo mismo con .then (forma vieja, sin async/await — hace exactamente lo mismo)
  //
  //   fetch(`${API_URL}/login`, { method: 'POST', headers: {...}, body: JSON.stringify({ usuario, password }) })
  //     .then((resp) => resp.json().then((data) => ({ resp, data })))
  //     .then(({ resp, data }) => (resp.ok ? navigate('/main') : setError(data.message)))
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      {/* onSubmit = cuando se envía (botón type="submit" o Enter) → llama a handleSubmit(e) */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-xl shadow-md p-8 space-y-5"
      >
        <h1 className="text-2xl font-bold text-center text-slate-800">Iniciar sesión</h1>

        <div className="space-y-1">
          <label htmlFor="usuario" className="block text-sm font-medium text-slate-700">
            Usuario
          </label>
          {/* input "controlado":
                value    = muestra lo que hay en la cajita
                onChange = cada tecla → e.target.value (lo escrito) → setUsuario lo guarda */}
          <input
            id="usuario"
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium text-slate-700">
            Password
          </label>
          {/* type="password" = se ve con puntitos · required = el navegador no deja enviar vacío */}
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* si hay error, se ve en rojo
            {cond && <algo/>} = "si cond es verdadero, muestra <algo/>"  ('' cuenta como falso) */}
        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 py-2 font-semibold text-white hover:bg-indigo-700"
        >
          Ingresar
        </button>
      </form>
    </div>
  )
}

export default LoginPage
