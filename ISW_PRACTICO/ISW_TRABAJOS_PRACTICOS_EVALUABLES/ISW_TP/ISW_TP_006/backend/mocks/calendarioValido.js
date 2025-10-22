
const DIAS = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];


function fromYMD(ymd) {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(y, m - 1, d);
}


function descomponerFecha(ymd) {
  const date = fromYMD(ymd);
  return {
    dia: DIAS[date.getDay()],   
    numero: date.getDate(),     
    mes: MESES[date.getMonth()] 
  };
}

function esFechaDeParqueAbierto(ymd) {
  const date = fromYMD(ymd);
  const day = date.getDay();     
  const d = date.getDate();      
  const m = date.getMonth();     

  if (day === 1)   return { ok: false, codigo: 'Parque cerrado los lunes',  detalle: descomponerFecha(ymd) };
  if (d === 25 && m === 11) return { ok: false, codigo: 'Parque cerrado en navidad',     detalle: descomponerFecha(ymd) };
  if (d === 1  && m === 0)  return { ok: false, codigo: 'Parque cerrado por año nuevo',  detalle: descomponerFecha(ymd) };

  return { ok: true, detalle: descomponerFecha(ymd) };
}


export default esFechaDeParqueAbierto