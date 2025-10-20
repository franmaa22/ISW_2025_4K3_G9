import express from 'express'   // Si usas ES Modules
import GestorCompra from './services/gestorCompra.js'
import cors from 'cors'

const app = express()
const PORT = 8888

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

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

app.post('/calcularPrecioEntrada', (req, res) =>{
  try {
    const {tipoEntrada, edad} = req.body;
    const precio = gestor.calculaPrecioEntrada({tipoEntrada,
       edad})
    res.status(201).json({
      message: `Precio calculado con éxito: $ ${precio}, Entrada tipo: ${tipoEntrada} Edad: ${edad}`
    })
  }
  catch(error){
    res.status(400).json({
      error: error.message
    })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
