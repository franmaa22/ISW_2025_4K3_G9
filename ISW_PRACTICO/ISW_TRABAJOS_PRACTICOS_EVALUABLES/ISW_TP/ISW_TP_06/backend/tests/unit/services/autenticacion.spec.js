import Usuario from "../../../class/Usuario.js";
import { usuarioLogueadoMock } from "../../../mocks/usersLogueados.js";

describe("Autenticación de Usuario", () => {
  
  describe("Verificar usuario logueado", () => {
    test("Debería retornar true si el usuario está logueado", () => {
      const usuario = new Usuario(usuarioLogueadoMock());
      expect(usuario.usuarioLogueado()).toBe(true);
    });
  });

});
