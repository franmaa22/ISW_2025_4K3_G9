import { calcularPrecioEntrada } from "../../../services/comprarEntradasService.js"


describe('Calculo de precios de entradas', () => {

    // Caso Edad <= 3 | Entrada VIP
    test('Deberia devolver 0 para edad <= 3 con entrada VIP', () => {
        expect(calcularPrecioEntrada(3, 'vip')).toBe(0);
    })

    // Caso  3 < Edad < 16 | Entrada Regular
    test('Deberia devolver 2500 para  3 < edad < 16 con entrada regular', () => {
        expect(calcularPrecioEntrada(12, 'regula')).toBe(2500)
    })
})