const { fechaValida, parqueAbierto } = require('../../../services/fechaService');

describe('FechaService Tests', () => {

  // TEST 1 
  test('test_fecha_valida(fecha)', () => {
    const hoy = new Date();
    const manana = new Date(hoy);
    manana.setDate(hoy.getDate() + 1);

    // camino feliz
    expect(fechaValida(hoy)).toBe(true);
    expect(fechaValida(manana)).toBe(true);

    // negativo
    const ayer = new Date(hoy);
    ayer.setDate(hoy.getDate() - 1);
    expect(fechaValida(ayer)).toBe(false);

    
  });

  // Test 2 - dias habiles y feriados
  test('test_parque_abierto(fecha)', () => {

    // lunes cerrado
    expect(parqueAbierto('10/13/2025')).toBe(false);

    // 25 de diciembre (cerrado)
    expect(parqueAbierto('12/25/2025')).toBe(false);

    // 1 de enero (cerrado)
    expect(parqueAbierto('01/01/2025')).toBe(false);

    // Martes (abierto)
    expect(parqueAbierto('10/14/2025')).toBe(true);

   
  });
});
