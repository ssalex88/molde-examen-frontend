# 🧩 Molde del examen · Frontend

React + Vite + Tailwind. Login + tabla de videojuegos + modal crear/editar, conectado al backend con `fetch`.

📖 **Las guías (README, DESDE-CERO, SECUENCIA) y el backend están en el otro repo** → https://github.com/ssalex88/molde-examen-backend

## Prender
1. Copia `.env.example` → `.env` (`VITE_API_URL` = puerto del backend)
2. Con el backend prendido:
```powershell
npm install
npm run dev
```
Entra con **admin / 123**.

## Dónde mirar
| Archivo | Qué es |
|---|---|
| `src/pages/LoginPage.jsx` | ✍️ molde de **POST** (formulario → `fetch` → error rojo o `navigate`) |
| `src/pages/MainPage.jsx` | ✍️ molde de **GET** (lista) + **POST/PUT** (guardar) · con ejemplos comentados (filtro, DELETE, solo GET/POST…) |
| `src/components/VideojuegoModal.jsx` | 📦 venía · los `name=` = **los campos del schema** |
| `src/components/VideojuegoTable.jsx` | 📦 venía · la tabla (`.map`) |
| `src/constants.js` | 📋 `API_URL` desde el `.env` |

Cada archivo tiene comentarios que explican línea por línea y, abajo, **otras formas** de hacerlo (comentadas, no se ejecutan).
