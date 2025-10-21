import {validarParticipantes, calcularPrecioEntrada} from '../../../services/comprarEntradasService';
describe('Validaciones de compra de entradas', () => {

  //testConjuntoCantidadEntradasTienenTipoEntrada
  test('testConjuntoCantidadEntradasTienenTipoEntrada', () => {
    const participantesValidos = [
      { edad: 25, tipoEntrada: 'vip' },
      { edad: 10, tipoEntrada: 'regular' },
    ];

    const participantesInvalidos = [
      { edad: 5, tipoEntrada: null },
      { edad: 15, tipoEntrada: 'gold' },
    ];

    expect(validarParticipantes(participantesValidos)).toBe(true);
    expect(validarParticipantes(participantesInvalidos)).toBe(false);
  });

  // testDe0a3Regular
  describe('testDe0a3Regular', () => {
    test('edad = 0 y tipo regular → precio 0', () => {
      expect(calcularPrecioEntrada(0, 'regular')).toBe(0);
    });

    test('edad = 3 y tipo regular → precio 0', () => {
      expect(calcularPrecioEntrada(3, 'regular')).toBe(0);
    });

    test('edad = 4 y tipo regular → precio mayor que 0', () => {
      expect(calcularPrecioEntrada(4, 'regular')).toBeGreaterThan(0);
    });
  });
});
