import calcularPrecio from "../priceStrategy/pricingPolicy";

class Entrada {
    constructor({id, edad, tipoEntrada, precioFinal})
    {
        this.id = id;
        this.edad = edad;
        this.tipoEntrada = tipoEntrada;
        this.precioFinal = undefinded;
    }
    calcularPrecioEntrada(calcularPrecio){
        this.precioFinal = calcularPrecio.precioDe({tipoEntrada: this.tipoEntrada, edad: this.edad});
        return this.precioFinal
    }
}


export default Entrada;