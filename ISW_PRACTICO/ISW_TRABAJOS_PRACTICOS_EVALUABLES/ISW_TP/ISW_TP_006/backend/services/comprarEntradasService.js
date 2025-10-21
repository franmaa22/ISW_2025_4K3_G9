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

}

function  confirmarCompra(){

}
export function crearCompraEntradasService(datos) {
  // el test te pasa: { fecha, cantidad, participantes: [...], formaPago }
  const cantidad =
    Number.isInteger(datos?.cantidad)
      ? datos.cantidad
      : Array.isArray(datos?.participantes) ? datos.participantes.length : 0;

  const fecha = datos?.fecha ?? null;
  const redireccionMP = String(datos?.formaPago ?? '').toLowerCase() === 'tarjeta';

  return {
    redireccionMP,
    resumen: { cantidad, fecha }
  };
}

export  function validarParticipantes(participantes) {
  const tiposValidos = ['regular', 'vip'];
  return participantes.every(p => p.tipoEntrada && tiposValidos.includes(p.tipoEntrada));
}

export  function calcularPrecioEntrada(edad, tipo) {
  if (tipo === 'regular' && edad <= 3) return 0;
  if (tipo === 'vip') return 2000;
  return 1000;
}

function validarFormaDePago(){

}


export function cantidadEntradasValida(cantidad) {
  const n = Number(cantidad);
  return Number.isInteger(n) && n >= 1 && n <= 10;
}

export function conjuntoEntradasCantidadValido(cantidadEntradas, conjuntoEntradas) {
  if (!Array.isArray(conjuntoEntradas)) return false;
  const n = Number(cantidadEntradas);
  if (!Number.isInteger(n)) return false;
  return conjuntoEntradas.length === n;
}

export function conjuntoCantidadEntradasTienenEdades(conjuntoEntradas) {
  if (!Array.isArray(conjuntoEntradas)) return false;
  return conjuntoEntradas.every(e => Number.isInteger(e?.edad) && e.edad >= 0 && e.edad <= 120);
}

