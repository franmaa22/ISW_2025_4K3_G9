class Entrada {
    constructor({edad, tipoEntrada })
    {
        this.edad = edad;
        this.tipoEntrada = tipoEntrada;
        this.precioBase = this.obtenerPrecioBase()
    }

    obtenerPrecioBase(){
        if (this.tipoEntrada === "vip") return 10000;
        if (this.tipoEntrada === "estandar") return 5000;
        throw new Error(`Tipo de entrada desconocido: ${this.tipoEntrada}`)
    }
    calcularPrecioEntrada(){
        if(this.edad >= 4 && this.edad <= 15 || this.edad >= 60){
            return this.precioBase * 0.50
        }
        if (this.edad <= 3){
            return 0
        }

        return this.precioBase
    }
}


export default Entrada;