// Comportamiento a verificar: Una vez se confirma una compra válida debe enviarse un mail de confirmación al mail del usuario

// 1 planteamos comportamiento, 2 preparamos datos de entrada mockeamos, armamos el input minimo valido, 3ejecutamos

// Necesitamos => Confirmación de compra válida que genere un resumen de la compra y el mail del usuario
import envioMail from "../../../mocks/envioMail";
import { jest } from '@jest/globals';
describe('Envío de mail de confirmación', () => {
  test('envía mail al usuario registrado con el resumen', () => {
    const resumen = {
      fecha: new Date('2025-11-20'),
      hora: '11:00',
      formaPago: 'TARJETA',
      cantidadEntradas: 2,
      tickets: [
        { numeroTicket: 1, tipo: 'REGULAR', edad: 25, precio: 5000 },
        { numeroTicket: 2, tipo: 'VIP',     edad: 60, precio: 5000 }
      ]
    };

    const mailer = { enviarConfirmacion: jest.fn(() => true) };

    const ok = envioMail('nico@mail.com', resumen, mailer);

    expect(mailer.enviarConfirmacion).toHaveBeenCalledTimes(1);
    const [to, body] = mailer.enviarConfirmacion.mock.calls[0];
    expect(to).toBe('nico@mail.com');
    expect(body).toEqual(expect.objectContaining({
      fecha: resumen.fecha,
      hora: '11:00',
      formaPago: 'TARJETA',
      cantidadEntradas: 2,
      tickets: expect.arrayContaining([
        expect.objectContaining({ numeroTicket: 1, tipo: 'REGULAR', edad: 25, precio: 5000 }),
        expect.objectContaining({ numeroTicket: 2, tipo: 'VIP',     edad: 60, precio: 5000 })
      ])
    }));
    expect(ok).toBe(true);
  });
});