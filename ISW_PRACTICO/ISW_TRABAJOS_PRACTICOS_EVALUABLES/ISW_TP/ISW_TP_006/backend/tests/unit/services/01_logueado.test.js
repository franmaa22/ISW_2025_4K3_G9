const usuarioLogueado = require('../../../services/loguinService');

describe('LoguinService Tests', () => {
  test('test_usuario_logueado_pasa(usuario)', () => {
    // camino feliz
    expect(usuarioLogueado("mariano")).toBe(true);

    // no esta el usuario logueado
    expect(usuarioLogueado("lucas")).toBe(false);

    expect(usuarioLogueado("")).toBe(false);

    expect(usuarioLogueado(null)).toBe(false);
  });
});
