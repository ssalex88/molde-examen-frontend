// 📋 COPIAR (🔴 no tocar) · lee el .env → "http://localhost:8000"
// uso: fetch(`${API_URL}/videojuegos`)
//   `...${variable}...` = texto con variables adentro (comillas invertidas ` , no ' )
//   import.meta.env.XXX = leer el .env del front (en Vite solo funcionan las que empiezan con VITE_)
//
// 💡 OTRA FORMA (comentada): sin .env, escrito directo (funciona igual, pero hay que cambiarlo a mano)
// export const API_URL = 'http://localhost:8000'
export const API_URL = import.meta.env.VITE_API_URL
