import Compra from "../class/Compra.js";
import Entrada from "../class/Entrada.js"

class GestorCompra{

    calculaPrecioEntrada({tipoEntrada, edad}){
        console.log(tipoEntrada, edad);
        const entrada =new Entrada ({edad:edad,  tipoEntrada: tipoEntrada})
        const precio = entrada.calcularPrecioEntrada()

        return precio; 
    }

    realizarCompra({fecha, hora, formaPago, entradasData}) {
        console.log(entradasData)
        const entradas = entradasData.map(
            (e) => new Entrada({edad: e.edad, tipoEntrada: e.tipo})
        );

        const compra = new Compra({
            fecha, hora, formaPago, entradas,
        })

        const resumen = compra.generarResumen()
        
        return resumen

    }
}

export default GestorCompra