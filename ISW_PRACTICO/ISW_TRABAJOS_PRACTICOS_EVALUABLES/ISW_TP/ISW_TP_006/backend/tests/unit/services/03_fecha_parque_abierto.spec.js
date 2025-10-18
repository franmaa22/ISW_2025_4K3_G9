import Compra from "../../../class/Compra.js";
import { compraMock } from "../../../mocks/compraMock.js";

describe("Verificar si la fecha seleccionada no sea 25/12, lunes o 01/01", () => {
  test("Debería retornar true si las fechas seleccionadas no son 25/12, lunes o 01/01", () => {
    //Arrange
    const compra = new Compra(compraMock());
    //Act
    const resultado = compra.fechaValidaParqueAbierto();

    //Assert
    expect(resultado).toBe(true);
  });
});
