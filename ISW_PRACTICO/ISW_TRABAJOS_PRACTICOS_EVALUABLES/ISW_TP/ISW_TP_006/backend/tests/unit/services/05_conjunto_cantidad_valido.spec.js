import { conjuntoEntradasCantidadValido } from '../../../services/comprarEntradasService.js';

describe('5) testConjuntoEntradasCantidadValido(cantidadEntradas, conjuntoEntradas[])', () => {
  test('coinciden cantidades', () => {
    expect(conjuntoEntradasCantidadValido(3, [{},{},{}])).toBe(true);
    expect(conjuntoEntradasCantidadValido(2, [{},{}])).toBe(true);
  });

  test('no coinciden o entradas inválidas', () => {
    expect(conjuntoEntradasCantidadValido(3, [{},{}])).toBe(false);
    expect(conjuntoEntradasCantidadValido(2, [{},{},{}])).toBe(false);
    expect(conjuntoEntradasCantidadValido(2, null)).toBe(false);
    expect(conjuntoEntradasCantidadValido('no-num', [{}])).toBe(false);
  });
});
