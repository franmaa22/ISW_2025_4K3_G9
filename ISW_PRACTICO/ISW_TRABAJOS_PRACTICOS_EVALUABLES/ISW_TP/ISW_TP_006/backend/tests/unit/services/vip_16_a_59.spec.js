const { calcularPrecioEntrada } = require('../../../services/comprarEntradasService');

describe('Calculo de precio para edades entre 15 y 60 años', () => {

    test('Se debe cobrar el 100% de las entrada (sin descuento', () =>
{
        const precioBaseRegular = calcularPrecioEntrada(30, 'regular');
        const precioBaseVip = calcularPrecioEntrada(40, 'vip');
 // Verifica que para edades dentro del rango (15-60) el precio sea mayor que 0
        expect(precioBaseRegular).toBeGreaterThan(0);
        expect(precioBaseVip).toBeGreaterThan(0);

// Verifica que el precio sea igual para todas las edades en ese rango
        expect(calcularPrecioEntrada(15, 'regular')).toBe(precioBaseRegular);
        expect(calcularPrecioEntrada(60, 'regular')).toBe(precioBaseRegular);
        expect(calcularPrecioEntrada(25, 'vip')).toBe(precioBaseVip);
        expect(calcularPrecioEntrada(55, 'vip')).toBe(precioBaseVip);

});


});