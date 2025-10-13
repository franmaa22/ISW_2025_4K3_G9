const { validarFormaDePago }= require('../../../services/comprarEntradasService');


describe('Valicacion forma de pago', () => {

    //Test forma de pago valida
    test('Valida que la forma de pago sea valida(efectivo o tarjeta)' , () => {
    //casos validos
        expect(validarFormaDePago('tarjeta')).toBe(true);
        expect(formaDePagoValida('efectivo')).toBe(true);

    //casos invalidos
        expect(formaDePagoValida('transferencia')).toBe(false);
        expect(formaDePagoValida('')).toBe(false);
        expect(formaDePagoValida(null)).toBe(false);
        expect(formaDePagoValida('mercado pago')).toBe(false);
    

});

});