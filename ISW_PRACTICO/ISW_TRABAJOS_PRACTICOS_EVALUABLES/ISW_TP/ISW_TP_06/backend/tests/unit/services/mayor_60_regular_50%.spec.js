import Entrada from "../../../class/Entrada";

describe("Validar precio entrada", ()=>{
    test("deberia aplicar 50% para entradas vip con edad mayor o igual a 60",()=> {
        const entrada = new Entrada({edad:60,tipoEntrada:"estandar"})
        const resultadoEsperado = entrada.obtenerPrecioBase() * 0.5

        expect(entrada.calcularPrecioEntrada()).toBe(resultadoEsperado)
    })
})