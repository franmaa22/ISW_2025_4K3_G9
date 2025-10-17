import Entrada from "../../../class/Entrada";

describe('Validacion precio de entrada', () => {

    test("deberia aplicar 50% de descuento para tipo VIP y edad entre 4 y 15", ()=>{
        const entrada = new Entrada({edad:4, tipoEntrada:"vip"})
        const resultadoEsperado = (entrada.obtenerPrecioBase() * 0.5)
        console.log(resultadoEsperado)
        expect(entrada.calcularPrecioEntrada(entrada.edad,entrada.tipo)).toBe(resultadoEsperado)
    })
})