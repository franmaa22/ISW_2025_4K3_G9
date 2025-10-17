class Entrada {
    constructor({edad, tipoEntrada })
    {
        this.edad = edad;
        this.tipoEntrada = tipoEntrada;
    }

    obtenerPrecioBase(){
        if (this.tipoEntrada === "vip") return 10000;
        if (this.tipoEntrada === "estandar") return 5000;
        throw new Error(`Tipo de entrada desconocido: ${this.tipoEntrada}`)
    }
    calcularPrecioEntrada(){
        if(this.edad >= 4 && this.edad <= 15 && this.tipoEntrada === "vip"){
            return this.obtenerPrecioBase() * 0.50
        }
    }
}


export default Entrada;