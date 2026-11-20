// 📦 YA VENÍA (no se toca) · dibuja la lista que le pasa MainPage
// 🔍 Sirve para CONFIRMAR los campos: cada {videojuego.xxx} es un campo del schema
//
// props (las manda MainPage):
//   videojuegos → la lista (lo que trajo el GET)
//   onEditar    → abrirModalEditar de MainPage
//
// 💡 OTRAS FORMAS (comentadas, NO se ejecutan)
//
// ▸ Botón ELIMINAR en cada fila → agrega la prop onEliminar arriba: ({ videojuegos, onEditar, onEliminar })
//     <button onClick={() => onEliminar(videojuego.id)} className="text-red-600">Eliminar</button>
//
// ▸ Mostrar un número con formato (ej. precio):
//     <td>${videojuego.precio.toFixed(2)}</td>
//
// ▸ Mostrar una fecha legible (ej. createdAt):
//     <td>{new Date(videojuego.createdAt).toLocaleDateString()}</td>
//
// ▸ Filtrar en el front sin pedir al back (ej. buscador):
//     videojuegos.filter((v) => v.nombre.toLowerCase().includes(texto.toLowerCase())).map(...)

function VideojuegoTable({ videojuegos, onEditar }) {
  // lista vacía → mensaje en vez de la tabla
  if (videojuegos.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center text-slate-500 shadow">
        No hay videojuegos registrados.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Id</th>
            <th className="px-4 py-3">Imagen</th>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Sinopsis</th>
            <th className="px-4 py-3">Categoría</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        {/* .map = recorre la lista y por CADA juego dibuja una fila <tr>
            key = algo único por fila (el id) → React lo exige para saber qué fila es cuál */}
        <tbody className="divide-y divide-slate-100">
          {videojuegos.map((videojuego) => (
            <tr key={videojuego.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 text-slate-700">{videojuego.id}</td>
              <td className="px-4 py-3">
                <img
                  src={videojuego.url_imagen}
                  alt={videojuego.nombre}
                  className="h-16 w-12 rounded object-cover bg-slate-200"
                />
              </td>
              <td className="px-4 py-3 font-medium text-slate-800">{videojuego.nombre}</td>
              <td className="px-4 py-3 text-slate-600 max-w-md">{videojuego.sinopsis}</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700">
                  {videojuego.categoria}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                {/* con flecha: al hacer clic llama onEditar CON ESTE juego → MainPage abre el modal en modo editar */}
                <button
                  onClick={() => onEditar(videojuego)}
                  className="rounded-lg border border-slate-300 px-3 py-1 text-slate-700 hover:bg-slate-100"
                >
                  Modificar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default VideojuegoTable
