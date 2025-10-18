class Usuario {
  constructor({ id, email, nombre, apellido, logueado = false }) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.logueado = logueado;
  }

  usuarioLogueado() {
    return this.logueado === true;
  }
}

module.exports = Usuario;
