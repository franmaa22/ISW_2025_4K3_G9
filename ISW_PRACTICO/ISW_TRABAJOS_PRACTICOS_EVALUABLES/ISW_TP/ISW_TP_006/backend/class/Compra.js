class Compra {
  constructor({ fecha, hora, formaPago, entradas = [] }) {
    this.fecha = fecha;
    this.hora = hora;
    this.formaPago = formaPago;
    this.entradas = entradas;
  }
  // cantidad de entradas?? Es calculable pero nos puede servir para el test
  validarFormaDePago() {}
  confirmarCompra() {}
  validarCantidadEntradas() {}
  calcularPrecioCompra() {}
  generarResumen() {
    const tickets = this.entradas.map((entrada, i) => ({
      numeroTicket: i + 1,
      tipo: entrada.tipoEntrada,
      edad: entrada.edad,
      precio: entrada.calcularPrecioEntrada(),
    }));

    const resumen = {
      fecha: this.fecha,
      hora: this.hora,
      formaPago: this.formaPago,
      cantidadEntradas: this.entradas.length,
      tickets,
    };
    return resumen;
  }
  resumen({ QR } = {}) {}
  fechaValida() {
    const fechaActual = new Date();
    const fechaSeleccionada = new Date(this.fecha);

    return fechaSeleccionada >= fechaActual;
  }
}

export default Compra;
