const BASE_URL = "http://localhost:8888"

async function request(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || data?.message || `HTTP ${res.status}`);
  return data;
}

export function calcularPrecioEntrada({tipoEntrada, edad}){
    return request('/calcularPrecioEntrada', {method: 'POST', body:{tipoEntrada, edad}})
}

export function comprarEntrada ({fecha, hora, formaPago, entradasData}){
    return request('/ComprarEntrada', {method:'POST', body:{fecha, hora, formaPago, entradasData}})
}

// NO LA ESTOY USANDO PREALMENTE LO SIMULO PARA PPROBAR EL ENVÍO.