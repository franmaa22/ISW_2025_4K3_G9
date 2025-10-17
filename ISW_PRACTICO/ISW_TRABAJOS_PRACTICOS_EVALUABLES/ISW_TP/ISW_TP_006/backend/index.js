import express from 'express'   // Si usas ES Modules
import GestorCompra from './services/gestorCompra'


const app = express()
const PORT = 3000

app.use(express.json())

const gestor = new GestorCompra();

app.post('/comprarEntrada', (req, res) => {
  try {
    const {fecha, hora, formaPago, entradas} = req.body;
    const respuesta = gestor.realizarCompra({
      fecha, hora, formaPago,
      entradasData: entradas
    })
    res.status(201).json({
      message: "Compra realizada con exito",
      ...respuesta
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
