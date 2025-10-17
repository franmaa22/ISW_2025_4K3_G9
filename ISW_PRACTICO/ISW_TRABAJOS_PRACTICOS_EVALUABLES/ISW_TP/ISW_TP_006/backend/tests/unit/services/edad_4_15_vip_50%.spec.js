import { calcularPrecioEntrada } from "../../../services/comprarEntradasService";

describe('Validacion precio de entrada', () => {

    test("deberia aplicar 50% de descuento para tipo VIP y edad entre 4 y 15", ()=>{
        const entrada = {
            edad : 4,
            tipo: "vip"
        }
        expect(calcularPrecioEntrada(entrada.edad,entrada.tipo).toBe())
    })
})