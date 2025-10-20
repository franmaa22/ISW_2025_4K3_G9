import Entrada from "../../../class/Entrada";

describe('Servicio comprarEntradas - Precio 100% para edad 16-59 con entrada estandar', () => {
    test('Debe aplicar precio completo (100%) para edad entre 16 y 59 con entrada estandar', () => {
        const entrada = new Entrada({edad:16, tipoEntrada:"estandar"})
        const resultadoEsperado = (entrada.obtenerPrecioBase())
        expect(entrada.calcularPrecioEntrada(entrada.edad,entrada.tipo)).toBe(resultadoEsperado)
    });
});