function pasarelaMercadoPago(resumen, pasarela) {
  if (!resumen || resumen.formaPago !== 'TARJETA') return false;
  if (!pasarela || typeof pasarela.redirigir !== 'function') return false;

  const total = Array.isArray(resumen.tickets)
    ? resumen.tickets.reduce((acc, t) => acc + Number(t?.precio || 0), 0)
    : 0;

  const cantidadEntradas = typeof resumen.cantidadEntradas === 'number'
    ? resumen.cantidadEntradas
    : (Array.isArray(resumen.tickets) ? resumen.tickets.length : 0);

  const payload = {
    total,
    cantidadEntradas,
    formaPago: resumen.formaPago,
    fecha: resumen.fecha,
    hora: resumen.hora
  };

  return !!pasarela.redirigir(payload);
}


export default pasarelaMercadoPago;