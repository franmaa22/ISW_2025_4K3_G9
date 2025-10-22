import express from 'express'   // Si usas ES Modules
import GestorCompra from './services/gestorCompra.js'
import cors from 'cors'
import esFechaDeParqueAbierto from './mocks/calendarioValido.js';

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
    const {fecha, hora, formaPago, entradasData} = req.body;
    
    const resumen = gestor.realizarCompra({
      fecha, hora, formaPago,
      entradasData
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
app.post('/api/parque/validar-fecha', (req, res) => {
  try {
    const { fecha } = req.body;
    
    if (!fecha) {
      return res.status(400).json({
        disponible: false,
        mensaje: 'Fecha no proporcionada'
      });
    }

    // Validar formato de fecha (YYYY-MM-DD)
    const formatoFecha = /^\d{4}-\d{2}-\d{2}$/.test(fecha);
    if (!formatoFecha) {
      return res.status(400).json({
        disponible: false,
        mensaje: 'Formato de fecha inválido. Use YYYY-MM-DD'
      });
    }

    const fechaSeleccionada = new Date(fecha);
    if (isNaN(fechaSeleccionada.getTime())) {
      return res.status(400).json({
        disponible: false,
        mensaje: 'Fecha inválida'
      });
    }


    // Usar la función del mock para validar disponibilidad del parque
    const resultadoValidacion = esFechaDeParqueAbierto(fecha);

    if (!resultadoValidacion.ok) {
      return res.status(200).json({
        disponible: false,
        mensaje: `El parque está cerrado: ${resultadoValidacion.codigo}`,
        detalle: resultadoValidacion.detalle
      });
    }

    res.status(200).json({
      disponible: true,
      mensaje: 'Fecha disponible',
      detalle: resultadoValidacion.detalle,
      horarios: ['09:00', '14:00', '18:00']
    });

  } catch (error) {
    res.status(500).json({
      disponible: false,
      mensaje: 'Error al validar la fecha',
      error: error.message
    });
  }
});

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
