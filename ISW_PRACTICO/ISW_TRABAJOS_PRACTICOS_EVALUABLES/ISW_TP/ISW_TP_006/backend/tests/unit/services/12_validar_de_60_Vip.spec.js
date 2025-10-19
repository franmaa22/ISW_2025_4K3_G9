import Entrada from "../../../class/Entrada";

describe('Servicio comprarEntradas - Descuento 50% mayores 60 años VIP', () => {
    test('Debe aplicar 50% de descuento para edad >= 60 con entrada VIP', () => {
        const entrada = new Entrada({edad:60, tipoEntrada:"vip"})
        const resultadoEsperado = (entrada.obtenerPrecioBase() * 0.50)
        expect(entrada.calcularPrecioEntrada(entrada.edad, entrada.tipo)).toBe(resultadoEsperado)
    });
});