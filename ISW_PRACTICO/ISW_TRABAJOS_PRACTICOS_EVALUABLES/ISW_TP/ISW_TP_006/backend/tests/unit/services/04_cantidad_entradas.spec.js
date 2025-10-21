import { cantidadEntradasValida } from '../../../services/comprarEntradasService.js';

describe('4) testCantidadEntradas() menor o igual a 10', () => {
  test('válidos 1..10 (enteros)', () => {
    expect(cantidadEntradasValida(1)).toBe(true);
    expect(cantidadEntradasValida(5)).toBe(true);
    expect(cantidadEntradasValida(10)).toBe(true);
  });

  test('inválidos: 0, 11, negativos, no enteros, no numéricos', () => {
    expect(cantidadEntradasValida(0)).toBe(false);
    expect(cantidadEntradasValida(11)).toBe(false);
    expect(cantidadEntradasValida(-1)).toBe(false);
    expect(cantidadEntradasValida(3.5)).toBe(false);
    expect(cantidadEntradasValida('hola')).toBe(false);
  });
});
