import Compra from "../class/Compra.js";
import Entrada from "../class/Entrada.js"

class GestorCompra{

    realizarCompra({fecha, hora, formaPago, entradasData}) {
        const entradas = entradasData.map(
            (e) => new Entrada({edad: e.edad, tipoEntrada: e.tipoEntrada})
        );

        const compra = new Compra({
            fecha, hora, formaPago, entradas,
        })

        const resumen = compra.generarResumen()
        
        return resumen

    }
}

export default GestorCompra