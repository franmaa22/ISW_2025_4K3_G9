
function generarMail(mailUsuario, resumenCompra){
    const mensaje = `Mail enviado a ${mailUsuario} con la información de su compra: ${resumenCompra}`
    console.log(mensaje)
    return mensaje;
}

// recibe el mail del usuario y el resumen de la compra (cantidad, fecha, monto total, forma de pago) devuelve un mensaje, "Mail enviado a "@mail" "