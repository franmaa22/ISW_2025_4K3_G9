import envioMail from "../../../mocks/envioMail.js";
import { jest } from '@jest/globals';

describe('Sistema de Notificaciones', () => {

  describe('Envío de email de confirmación', () => {
    test('Debe enviar mail al usuario registrado con el resumen de la compra', () => {
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

      const resultado = envioMail('nico@mail.com', resumen, mailer);

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
      expect(resultado).toBe(true);
    });
  });

});
