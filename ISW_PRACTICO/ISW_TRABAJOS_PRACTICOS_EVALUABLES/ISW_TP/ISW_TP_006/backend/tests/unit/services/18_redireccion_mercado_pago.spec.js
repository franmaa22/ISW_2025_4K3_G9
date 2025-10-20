import pasarelaMercadoPago from "../../../mocks/pasarelaMercadoPago";
import { jest } from '@jest/globals';
describe('Redirección a MercadoPago', () => {
  test('tipoPago TARJETA ⇒ solicita redirección y retorna true', () => {
    const resumen = {
      fecha: new Date('2025-11-20'),
      hora: '10:00',
      formaPago: 'TARJETA',
      cantidadEntradas: 1,
      tickets: [
        { numeroTicket: 1, tipo: 'REGULAR', edad: 25, precio: 5000 }
      ]
    };

    const pasarela = { redirigir: jest.fn(() => true) };

    const ok = pasarelaMercadoPago(resumen, pasarela);

    expect(pasarela.redirigir).toHaveBeenCalledTimes(1);
    expect(pasarela.redirigir).toHaveBeenCalledWith(
      expect.objectContaining({
        total: 5000,
        cantidadEntradas: 1,
        formaPago: 'TARJETA'
      })
    );
    expect(ok).toBe(true);
  });
});
