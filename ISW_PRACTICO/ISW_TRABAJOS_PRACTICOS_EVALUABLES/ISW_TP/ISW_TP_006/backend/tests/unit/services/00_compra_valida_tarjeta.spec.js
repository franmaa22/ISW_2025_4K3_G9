import { crearCompraEntradasService } from '../../../services/comprarEntradasService.js';

const mockDatosEntrada = {
  UsuarioId: 1,
  fecha: "2024-06-20",
  cantidad: 3,
  participantes: [
    { edad: 25, tipoEntrada: "vip" },
    { edad: 30, tipoEntrada: "vip" },
    { edad: 5,  tipoEntrada: "niño" }
  ],
  formaPago: "tarjeta"
};

describe('Servicio comprarEntradas - Caso Feliz', () => {
  test('Redirección a MP y resumen de compra', () => {
    const resultado = crearCompraEntradasService(mockDatosEntrada);
    expect(resultado).toEqual({
      redireccionMP: true,
      resumen: { cantidad: 3, fecha: "2024-06-20" }
    });
  });
});
