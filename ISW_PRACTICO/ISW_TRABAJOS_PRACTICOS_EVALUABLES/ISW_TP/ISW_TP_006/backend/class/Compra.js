class Compra {
    constructor({id, fecha, hora, formaPago, entradas =[] }){
        this.id = id;
        this.fecha = fecha;
        this.hora = hora;
        this.formaPago = formaPago;
        this.entradas = entradas; 
    }
    // cantidad de entradas?? Es calculable pero nos puede servir para el test
    validarFormaDePago(){}
    confirmarCompra(){}
    validarCantidadEntradas(){}
    calcularPrecioCompra(){}
    generarResumen(){}
    resumen({QR}= {}){}
}

export default Compra;