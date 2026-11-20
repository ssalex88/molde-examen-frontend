// 📦 YA VENÍA (no se toca) · las PÁGINAS del front (no confundir con las rutas del backend)
//   "/"     → LoginPage          (http://localhost:5173/)
//   "/main" → MainPage           (http://localhost:5173/main)  ← navigate('/main') viene aquí
//   "*"     → cualquier otra dirección vuelve al login
//
// 💡 OTRA FORMA (comentada): agregar una página nueva, ej. detalle de un juego
//   import DetallePage from './pages/DetallePage.jsx'
//   <Route path="/videojuegos/:id" element={<DetallePage />} />
//   // y dentro de DetallePage:  const { id } = useParams()   (de 'react-router-dom')

import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import MainPage from './pages/MainPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
