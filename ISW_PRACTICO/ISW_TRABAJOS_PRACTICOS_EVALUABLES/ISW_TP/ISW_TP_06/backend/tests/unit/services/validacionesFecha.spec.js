import Compra from "../../../class/Compra.js";
import { compraMock } from "../../../mocks/compraMock.js";

describe("Validaciones de Fecha", () => {
  
  describe("Fecha válida - posterior o igual a fecha actual", () => {
    test("Debería retornar true si la fecha es posterior o igual a la fecha actual", () => {
      const compra = new Compra(compraMock());
      const resultado = compra.fechaValida();
      expect(resultado).toBe(true);
    });
  });

  describe("Fecha parque abierto - no 25/12, lunes o 01/01", () => {
    test("Debería retornar true si la fecha seleccionada no es 25/12, lunes o 01/01", () => {
      const compra = new Compra(compraMock());
      const resultado = compra.fechaValidaParqueAbierto();
      expect(resultado).toBe(true);
    });
  });

});
