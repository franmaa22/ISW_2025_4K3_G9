const usuariosLogueados = [
  "mariano",
  "nicolas",
  "francisco",
  "mateo",
  "paz",
  "Lucas",
  "Micaela",
  "Juan"
];

module.exports = {
  usuariosLogueados,
  usuarioLogueadoMock: () => ({
    identificacion: 1,
    correo_electronico: "micaela@mail.com",
    nombre: "Micaela",
    apellido: "Arrigoni",
    logueado: true,
  }),
};

