// 📦 YA VENÍA (no se toca) · el formulario de crear/editar
// 🔍 AQUÍ SALEN LOS CAMPOS DEL SCHEMA: los name="..." de cada input (y su type / required)
//    🔗 schema.prisma (model Videojuego) · req.body del backend

import { useState } from 'react'

// el formulario vacío = la LISTA COMPLETA de campos en un solo lugar
// (todos empiezan en '' → por eso el id llega como TEXTO "5" y el back hace Number(id))
const VIDEOJUEGO_VACIO = {
  id: '',
  nombre: '',
  sinopsis: '',
  categoria: '',
  url_imagen: '',
}

// { videojuego, onGuardar, onCerrar } = las PROPS que le pasa MainPage:
//   videojuego → null (crear) o el juego de la fila (editar)
//   onGuardar  → guardarVideojuego de MainPage (ahí está el fetch)
//   onCerrar   → cerrarModal de MainPage
function VideojuegoModal({ videojuego, onGuardar, onCerrar }) {
  // ?? = "si lo de la izquierda es null, usa lo de la derecha"
  //      editar → el form empieza con los datos del juego · crear → empieza vacío
  const [form, setForm] = useState(videojuego ?? VIDEOJUEGO_VACIO)
  const esEdicion = videojuego !== null

  // UN solo handleChange para TODOS los inputs:
  //   e.target       = el input donde escribiste
  //   e.target.name  = su name  (ej. "nombre")
  //   e.target.value = lo escrito (ej. "Celeste")
  //   { ...form, [nombre]: valor } = copia el form y cambia SOLO ese campo
  //   (los [ ] significan "usa el valor de la variable como nombre del campo")
  // ⚠️ por eso el name del input tiene que ser IGUAL al campo del form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // al enviar: no recargar (e = el evento) y pasarle el form a MainPage
  const handleSubmit = (e) => {
    e.preventDefault()
    onGuardar(form)        // → guardarVideojuego(form) en MainPage
  }

  // 💡 OTRAS FORMAS (comentadas, NO se ejecutan)
  //
  // ▸ Mandar el id como NÚMERO desde el front (así el back no necesita Number()):
  //     onGuardar({ ...form, id: Number(form.id) })
  //
  // ▸ Un campo numérico (precio, año, stock…):
  //     <input name="precio" type="number" value={form.precio} onChange={handleChange} />
  //     ⚠️ igual llega como texto → Number(form.precio)   ·   schema: Int (o Float con decimales)
  //
  // ▸ Un checkbox (Boolean) → se lee "checked", no "value":
  //     const handleCheck = (e) => setForm({ ...form, [e.target.name]: e.target.checked })
  //     <input type="checkbox" name="disponible" checked={form.disponible} onChange={handleCheck} />
  //
  // ▸ Una lista de opciones (select) en vez de escribir la categoría:
  //     <select name="categoria" value={form.categoria} onChange={handleChange} required>
  //       <option value="">Elige…</option>
  //       <option value="RPG">RPG</option>
  //       <option value="Plataformas">Plataformas</option>
  //     </select>

  const inputClass =
    'w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-100'

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl space-y-4"
      >
        {/* título según el caso   (cond ? si : no) */}
        <h2 className="text-lg font-bold text-slate-800">
          {esEdicion ? 'Modificar videojuego' : 'Nuevo videojuego'}
        </h2>

        {/* disabled={esEdicion} → al editar no se puede cambiar el id (es el que identifica al juego) */}

        <div className="space-y-1">
          <label htmlFor="id" className="block text-sm font-medium text-slate-700">Id</label>
          <input
            id="id"
            name="id"
            value={form.id}
            onChange={handleChange}
            disabled={esEdicion}
            required
            className={inputClass}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="nombre" className="block text-sm font-medium text-slate-700">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="sinopsis" className="block text-sm font-medium text-slate-700">Sinopsis</label>
          <textarea
            id="sinopsis"
            name="sinopsis"
            rows={3}
            value={form.sinopsis}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="categoria" className="block text-sm font-medium text-slate-700">Categoría</label>
          <input
            id="categoria"
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="url_imagen" className="block text-sm font-medium text-slate-700">URL de imagen</label>
          <input
            id="url_imagen"
            name="url_imagen"
            type="url"
            value={form.url_imagen}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        {/* type="button" = solo cierra (NO envía) · type="submit" = envía el form → handleSubmit */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onCerrar}
            className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}

export default VideojuegoModal
