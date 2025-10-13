// Service de la lógica para comprar entradas

// Caso feliz:
//Usuario logueado.
//Fecha ≥ hoy y parque abierto.
//Cantidad ≤ 10.
//Para cada participante: edad y tipo de entrada válidos.
//Forma de pago = tarjeta → se solicita redirección a MP.
//Al confirmar: se solicita enviar email y el resultado muestra resumen (cantidad y fecha).

// al terminar de hacer los unit test, integramos la función

// los datos de entrada =>fecha, usuario, cantidadEntradas, entradas{edad:, tipoEntrada: , ....} , formaPago
function comprarEntradas(){
    pass
}

function  confirmarCompra(){
    pass
}

function validarParticipantes(participantes) {
  const tiposValidos = ['regular', 'vip'];
  return participantes.every(p => p.tipoEntrada && tiposValidos.includes(p.tipoEntrada));
}

function calcularPrecioEntrada(edad, tipo) {
  if (tipo === 'regular' && edad <= 3) return 0;
  if (tipo === 'vip') return 2000;
  return 1000;
}

module.exports = { validarParticipantes, calcularPrecioEntrada };


