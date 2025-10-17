import Compra from "../class/Compra";
import Entrada from "../class/Entrada"

class GestorCompra{

    realizarCompra({fecha, hora, formaPago, entradasData}) {
        const entradas = entradasData.map(
            (e) => new Entrada({edad: e.edad, tipo: e.tipo})
        );

        const compra = new Compra({
            fecha, hora, formaPago, entradas,
        })

        // Ver que devolver cuando la compra se realiza con exito
        // tendria que ser un json para verlo en react
        
        console.log(compra.fecha)

    }
}

export default GestorCompra