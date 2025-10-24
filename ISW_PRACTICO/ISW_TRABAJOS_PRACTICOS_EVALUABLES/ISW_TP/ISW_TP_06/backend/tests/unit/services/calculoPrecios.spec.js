import Entrada from "../../../class/Entrada.js";
import { validarParticipantes, calcularPrecioEntrada } from '../../../services/comprarEntradasService.js';

describe('Cálculo de Precios de Entradas', () => {

  describe('Validación de tipo de entrada', () => {
    test('Participantes con tipos válidos (vip, regular)', () => {
      const participantesValidos = [
        { edad: 25, tipoEntrada: 'vip' },
        { edad: 10, tipoEntrada: 'regular' },
      ];
      expect(validarParticipantes(participantesValidos)).toBe(true);
    });

    test('Participantes con tipos inválidos (null, gold)', () => {
      const participantesInvalidos = [
        { edad: 5, tipoEntrada: null },
        { edad: 15, tipoEntrada: 'gold' },
      ];
      expect(validarParticipantes(participantesInvalidos)).toBe(false);
    });
  });

  describe('Niños de 0 a 3 años', () => {
    test('VIP: gratis ($0) edad  2', () => {
      const entrada = new Entrada({ edad: 2, tipoEntrada: "vip" });
      const precioEsperado = entrada.obtenerPrecioBase() * 0;
      expect(entrada.calcularPrecioEntrada()).toBe(precioEsperado);
    });

    test('Estandar: gratis ($0) edad 0', () => {
      expect(calcularPrecioEntrada(0, 'regular')).toBe(0);
    });

    test('Estandar: gratis ($0) edad 3', () => {
      expect(calcularPrecioEntrada(3, 'regular')).toBe(0);
    });

    test('Estandar: precio mayor a 0 para edad 4', () => {
      expect(calcularPrecioEntrada(4, 'regular')).toBeGreaterThan(0);
    });
  });

  describe('Niños de 4 a 15 años', () => {
    test('Estandar: 50% descuento - edad 15', () => {
      const entrada = new Entrada({ edad: 15, tipoEntrada: "estandar" });
      const precioEsperado = entrada.obtenerPrecioBase() * 0.5;
      expect(entrada.calcularPrecioEntrada()).toBe(precioEsperado);
    });

    test('VIP: 50% descuento - edad 4', () => {
      const entrada = new Entrada({ edad: 4, tipoEntrada: "vip" });
      const precioEsperado = entrada.obtenerPrecioBase() * 0.5;
      expect(entrada.calcularPrecioEntrada(entrada.edad, entrada.tipo)).toBe(precioEsperado);
    });
  });

  describe('Adultos de 16 a 59 años', () => {
    test('Estándar: precio completo (100%) - edad 16', () => {
      const entrada = new Entrada({ edad: 16, tipoEntrada: "estandar" });
      const precioEsperado = entrada.obtenerPrecioBase();
      expect(entrada.calcularPrecioEntrada(entrada.edad, entrada.tipo)).toBe(precioEsperado);
    });

    test('VIP: precio completo (100%) - edad 35', () => {
      const entrada = new Entrada({ edad: 35, tipoEntrada: "vip" });
      const precioEsperado = entrada.obtenerPrecioBase();
      expect(entrada.calcularPrecioEntrada()).toBe(precioEsperado);
    });
  });

  describe('Adultos mayores (60+ años)', () => {
    test('VIP: 50% descuento - edad 60', () => {
      const entrada = new Entrada({ edad: 60, tipoEntrada: "vip" });
      const precioEsperado = entrada.obtenerPrecioBase() * 0.50;
      expect(entrada.calcularPrecioEntrada(entrada.edad, entrada.tipo)).toBe(precioEsperado);
    });

    test('Estándar/Regular: 50% descuento - edad 60', () => {
      const entrada = new Entrada({ edad: 60, tipoEntrada: "estandar" });
      const precioEsperado = entrada.obtenerPrecioBase() * 0.5;
      expect(entrada.calcularPrecioEntrada()).toBe(precioEsperado);
    });
  });
});
