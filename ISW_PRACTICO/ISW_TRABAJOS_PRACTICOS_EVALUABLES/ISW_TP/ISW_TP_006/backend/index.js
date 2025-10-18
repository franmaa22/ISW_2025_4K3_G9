import express from 'express'   // Si usas ES Modules
import GestorCompra from './services/gestorCompra.js'


const app = express()
const PORT = 8888

app.use(express.json())

const gestor = new GestorCompra();

app.post('/comprarEntradas', (req, res) => {
  try {
    const {fecha, hora, formaPago, entradas} = req.body;
    const resumen = gestor.realizarCompra({
      fecha, hora, formaPago,
      entradasData: entradas
    })
    res.status(201).json({
      message: "Compra realizada con exito",
      ...resumen
    });
  }catch(error) {
    res.status(400).json({
      error: error.message
    })
  }

})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
