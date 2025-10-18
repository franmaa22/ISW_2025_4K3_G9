const Compra = require("../../class/Compra");
const compraMock = require("../mocks/compraMock");

describe("Verificar si la fecha seleccionada es posterior o igual a la fecha actual", () => {
  test("Deberia retornar true la fehca es posterior o igual a la fecha actual", () => {
    //Arrange
    const compra = new Compra(compraMock());
    //Act
    const resultado = compra.fechaValida();

    //Assert
    expect(resultado).toBe(true);
  });
});
