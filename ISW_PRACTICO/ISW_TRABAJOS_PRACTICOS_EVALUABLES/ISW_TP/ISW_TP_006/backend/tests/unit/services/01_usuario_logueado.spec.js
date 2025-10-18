const Usuario = require("../../../class/Usuario");
const { usuarioLogueadoMock } = require("../../../mocks/usersLogueados");

describe("Usuario - Verificar si el usuario está logueado", () => {
  test("Debería retornar true si el usuario está logueado", () => {
    // Arrange & Act
    const usuario = new Usuario(usuarioLogueadoMock());
    // Assert
    expect(usuario.usuarioLogueado()).toBe(true);
  });
});
