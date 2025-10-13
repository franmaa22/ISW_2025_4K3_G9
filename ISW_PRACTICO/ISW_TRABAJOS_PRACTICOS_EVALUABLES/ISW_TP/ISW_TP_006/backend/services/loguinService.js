const usuariosLogueados = require("../mocks/usersLogueados");


function usuarioLogueado(usuario) {
  if (!usuario) return false;
  return usuariosLogueados.includes(usuario.toLowerCase());
}

module.exports = usuarioLogueado;
