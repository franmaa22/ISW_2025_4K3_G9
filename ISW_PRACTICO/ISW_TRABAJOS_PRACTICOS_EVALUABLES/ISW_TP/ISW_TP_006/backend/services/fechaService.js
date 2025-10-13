// valida si es una fecha posterior a la de hoy
//con este parametro "2025-10-14"
function fechaValida(fecha) {

  const hoy = new Date();
  const hoySinHora = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

  const f = new Date(fecha);
  if (isNaN(f.getTime())) return false;


  return f >= hoySinHora;
}

function parqueAbierto(fecha) {
  const f = new Date(fecha);


  const dia = f.getDay(); 
  const diaMes = f.getDate();
  const mes = f.getMonth() + 1;

  // los lunes cerrados
  if (dia === 1) return false;
  // cerrado 25 de diciembre
  if (diaMes === 25 && mes === 12) return false;
  // cerrado 1 de enero
  if (diaMes === 1 && mes === 1) return false;
  if (isNaN(f.getTime())) return false;


  return true;
}


module.exports = { fechaValida, parqueAbierto };