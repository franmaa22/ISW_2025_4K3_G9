import Compra from '../../../class/Compra.js';
import { compraMock } from '../../../mocks/compraMock.js';

describe('Validacion forma de pago', () => {

    test('Valida que la forma de pago sea valida (efectivo o tarjeta)', () => {
    // Casos válidos
        let compra = new Compra({ ...compraMock(), formaPago: 'tarjeta' });
        expect(compra.validarFormaDePago()).toBe(true);

        compra = new Compra({ ...compraMock(), formaPago: 'efectivo' });
        expect(compra.validarFormaDePago()).toBe(true);

        // Casos inválidos
        compra = new Compra({ ...compraMock(), formaPago: 'transferencia' });
        expect(compra.validarFormaDePago()).toBe(false);

        compra = new Compra({ ...compraMock(), formaPago: '' });
        expect(compra.validarFormaDePago()).toBe(false);

        compra = new Compra({ ...compraMock(), formaPago: null });
        expect(compra.validarFormaDePago()).toBe(false);

        compra = new Compra({ ...compraMock(), formaPago: 'mercado pago' });
        expect(compra.validarFormaDePago()).toBe(false);
    });

});
