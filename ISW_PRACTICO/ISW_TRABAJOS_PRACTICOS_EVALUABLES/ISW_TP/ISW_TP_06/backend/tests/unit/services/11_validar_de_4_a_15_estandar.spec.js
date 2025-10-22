import Entrada from "../../../class/Entrada"


describe('Validar calculo de precio de entradas', () => {
    
    // Caso  3 < Edad < 16 | Entrada estandar
    test('Deberia devolver 2500 para  3 < edad < 16 con entrada estandar', () => {
        const entrada = new Entrada({edad:15, tipoEntrada:"estandar"})
        const resultadoEsperado = (entrada.obtenerPrecioBase() * 0.5)
        expect(entrada.calcularPrecioEntrada()).toBe(resultadoEsperado)
    })
})