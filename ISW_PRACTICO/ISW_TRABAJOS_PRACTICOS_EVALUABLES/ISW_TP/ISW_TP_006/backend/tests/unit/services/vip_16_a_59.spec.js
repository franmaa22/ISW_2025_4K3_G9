
import Entrada from '../../../class/Entrada.js';

describe('Validar precio entrada', () => {
        test('Se debe cobrar el 100% de las entrada (sin descuento)', () => {
        const entrada = new Entrada({edad:35, tipoEntrada:"vip"})
        const resultadoEsperado = entrada.obtenerPrecioBase() 

        expect(entrada.calcularPrecioEntrada()).toBe(resultadoEsperado)

});


});