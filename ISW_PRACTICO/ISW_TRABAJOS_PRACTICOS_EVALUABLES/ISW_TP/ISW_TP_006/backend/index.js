import express from 'express'   // Si usas ES Modules


const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('¡Hola desde Express!')
})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
