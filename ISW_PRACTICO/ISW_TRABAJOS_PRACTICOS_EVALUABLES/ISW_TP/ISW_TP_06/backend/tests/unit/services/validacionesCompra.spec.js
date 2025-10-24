import Compra from '../../../class/Compra.js';
import { compraMock } from '../../../mocks/compraMock.js';
import { 
  cantidadEntradasValida, 
  conjuntoEntradasCantidadValido,
  conjuntoCantidadEntradasTienenEdades 
} from '../../../services/comprarEntradasService.js';

describe('Validaciones de Compra', () => {

  describe('Cantidad de entradas - debe ser entre 1 y 10', () => {
    test('Cantidades válidas: 1, 5, 10 (enteros)', () => {
      expect(cantidadEntradasValida(1)).toBe(true);
      expect(cantidadEntradasValida(5)).toBe(true);
      expect(cantidadEntradasValida(10)).toBe(true);
    });

    test('Cantidades inválidas: 0, 11, negativos, no enteros, no numéricos', () => {
      expect(cantidadEntradasValida(0)).toBe(false);
      expect(cantidadEntradasValida(11)).toBe(false);
      expect(cantidadEntradasValida(-1)).toBe(false);
      expect(cantidadEntradasValida(3.5)).toBe(false);
      expect(cantidadEntradasValida('hola')).toBe(false);
    });
  });

  describe('Forma de pago - efectivo o tarjeta', () => {
    test('Formas de pago válidas: efectivo y tarjeta', () => {
      let compra = new Compra({ ...compraMock(), formaPago: 'tarjeta' });
      expect(compra.validarFormaDePago()).toBe(true);

      compra = new Compra({ ...compraMock(), formaPago: 'efectivo' });
      expect(compra.validarFormaDePago()).toBe(true);
    });

    test('Formas de pago inválidas: transferencia, vacío, null, otros', () => {
      let compra = new Compra({ ...compraMock(), formaPago: 'transferencia' });
      expect(compra.validarFormaDePago()).toBe(false);

      compra = new Compra({ ...compraMock(), formaPago: '' });
      expect(compra.validarFormaDePago()).toBe(false);

      compra = new Compra({ ...compraMock(), formaPago: null });
      expect(compra.validarFormaDePago()).toBe(false);

      compra = new Compra({ ...compraMock(), formaPago: 'mercado pago' });
      expect(compra.validarFormaDePago()).toBe(false);
    });
  });

  describe('Conjunto cantidad - debe coincidir cantidad con array de participantes', () => {
    test('Cantidades que coinciden con array de participantes', () => {
      expect(conjuntoEntradasCantidadValido(3, [{},{},{}])).toBe(true);
      expect(conjuntoEntradasCantidadValido(2, [{},{}])).toBe(true);
    });

    test('Cantidades que no coinciden o entradas inválidas', () => {
      expect(conjuntoEntradasCantidadValido(3, [{},{}])).toBe(false);
      expect(conjuntoEntradasCantidadValido(2, [{},{},{}])).toBe(false);
      expect(conjuntoEntradasCantidadValido(2, null)).toBe(false);
      expect(conjuntoEntradasCantidadValido('no-num', [{}])).toBe(false);
    });
  });

  describe('Edades válidas - debe estar entre 0 y 120', () => {
    test('Todas las edades válidas (0..120)', () => {
      const participantesValidos = [
        { edad: 0,  tipoEntrada: 'niño' },
        { edad: 16, tipoEntrada: 'regular' },
        { edad: 59, tipoEntrada: 'regular' },
        { edad: 75, tipoEntrada: 'vip' },
      ];
      expect(conjuntoCantidadEntradasTienenEdades(participantesValidos)).toBe(true);
    });

    test('Edades inválidas o faltantes', () => {
      const participantesInvalidos = [
        { edad: -1 },
        { edad: 200 },
        { sinEdad: true },
      ];
      expect(conjuntoCantidadEntradasTienenEdades(participantesInvalidos)).toBe(false);
      expect(conjuntoCantidadEntradasTienenEdades('no-array')).toBe(false);
    });
  });

});
