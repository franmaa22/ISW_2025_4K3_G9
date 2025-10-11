

const usuariosLogueados = [{id:1, nombre:"Nicolas", email:"nicolas@gmail.com"}. {id:2, nombre:"Mariano", email:"Mariano@gmail.com"}]


function esUsuarioLogueado(idUsuario){
    return usuariosLogueados.some(u => u.id === idUsuario);
}
// modificar si es necesario, valida que el usuario esté logueado por su id