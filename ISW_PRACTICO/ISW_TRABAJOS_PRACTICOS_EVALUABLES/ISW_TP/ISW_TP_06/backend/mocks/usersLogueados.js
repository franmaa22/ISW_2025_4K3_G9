// ESM: export por nombre
export const usuariosLogueados = [
  "mariano",
  "nicolas",
  "francisco",
  "mateo",
  "paz",
  "Lucas",
  "Micaela",
  "Juan"
];

export function usuarioLogueadoMock() {
  return {
    identificacion: 1,
    correo_electronico: "micaela@mail.com",
    nombre: "Micaela",
    apellido: "Arrigoni",
    logueado: true,
  };
}
