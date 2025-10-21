import { conjuntoCantidadEntradasTienenEdades } from '../../../services/comprarEntradasService.js';

describe('6) testConjuntoCantidadEntradasTienenEdades()', () => {
  test('todas con edad válida (0..120)', () => {
    const ok = [
      { edad: 0,  tipoEntrada: 'niño' },
      { edad: 16, tipoEntrada: 'regular' },
      { edad: 59, tipoEntrada: 'regular' },
      { edad: 75, tipoEntrada: 'vip' },
    ];
    expect(conjuntoCantidadEntradasTienenEdades(ok)).toBe(true);
  });

  test('edades inválidas o faltantes', () => {
    const bad = [
      { edad: -1 },
      { edad: 200 },
      { sinEdad: true },
    ];
    expect(conjuntoCantidadEntradasTienenEdades(bad)).toBe(false);
    expect(conjuntoCantidadEntradasTienenEdades('no-array')).toBe(false);
  });
});
