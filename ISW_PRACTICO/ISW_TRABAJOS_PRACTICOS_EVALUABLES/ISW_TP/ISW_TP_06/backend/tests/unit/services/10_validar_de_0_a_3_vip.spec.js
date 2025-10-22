import Entrada from "../../../class/Entrada"

describe('Validar calculo de precio de entradas', () => {

    // Caso Edad <= 3 | Entrada VIP
    test('Deberia devolver 0 para edad <= 3 con entrada VIP', () => {
        const entrada = new Entrada({edad: 2, tipoEntrada:"vip"})
        const resultadoEsperado = entrada.obtenerPrecioBase() * 0
        expect(entrada.calcularPrecioEntrada()).toBe(resultadoEsperado);
    })
})