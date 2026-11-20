// 📦 YA VENÍA (🔴 no se toca) · el punto de arranque: mete <App /> dentro del <div id="root"> de index.html
//   BrowserRouter → permite usar Routes / navigate (páginas)
//   StrictMode    → en desarrollo corre los useEffect 2 VECES a propósito (por eso ves 2 GET en F12: es normal)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
