class Compra {
    constructor({fecha, hora, formaPago, entradas =[] }){
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