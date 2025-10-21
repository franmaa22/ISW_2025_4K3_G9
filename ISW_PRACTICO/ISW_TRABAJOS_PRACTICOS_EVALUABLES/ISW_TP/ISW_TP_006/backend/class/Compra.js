class Compra {
  constructor({ fecha, hora, formaPago, entradas = [] }) {
    this.fecha = fecha;
    this.hora = hora;
    this.formaPago = formaPago;
    this.entradas = entradas;
  }
  // cantidad de entradas?? Es calculable pero nos puede servir para el test
  validarFormaDePago() {
    return ['tarjeta', 'efectivo'].includes(this.formaPago);
  }
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
  fechaValidaParqueAbierto() {
    const [anio, mes, dia] = this.fecha.split("-").map(Number);
    const fecha = new Date(anio, mes - 1, dia); // mes-1 porque Date usa 0-11

    const diaSemana = fecha.getDay();
    const diaMes = fecha.getDate();
    const mesNum = fecha.getMonth() + 1;

    const esLunes = diaSemana === 1;
    const esNavidad = diaMes === 25 && mesNum === 12;
    const esAnoNuevo = diaMes === 1 && mesNum === 1;

    return !(esLunes || esNavidad || esAnoNuevo);
  }
}

export default Compra;
