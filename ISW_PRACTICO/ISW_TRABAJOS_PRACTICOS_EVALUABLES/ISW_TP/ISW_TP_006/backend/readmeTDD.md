Definir Test antes de desarrollar, patrón R - G -R => RED GREEN REFACTOR

HU a implementar: "Comprar Entradas" 
Como Visitante Quiero comprar una enttrada Para asegurar mi visita al parque.

Parámetros de compra:
Fecha de visita
Cantidad de Entradas
Edad de visitante y tipo de entrada => Van en conjunto 
Tipo de Pago (si es con tarjeta redirige mp, si es efectivo hace una confirmación de compra)
Salida:
Al confirmar la compra se informa la cantidad de entradas compradas y la fecha.


REUNION 10/10

Vamos a usar POO para hacer clases que cubran el dominio total, las clases van a ser:
Clase
Usuarios(nombreUsuario, mail, logueado)
Compra(entradas[]:Entrada, resumen, nro compra, usuario:Usuario, formaDePago:FormaDePago,estado:bool) =>Calcularpreciocompra, 
Entrada(nro, tipo, edad, …) =>calcular_precio_entrada
	Regular (super:Entrada, descripcion, precioBase)
	VIP (super:Entrada, descripcion, precioBase, )



Compra:
    entradas[]:Entradas
    resumenCompra:Resumen?
    nroCompra
    usuario:Usuario
    formaDePago:FormaDePago
    estado:Estado
metodos:
    calcularPrecioCompra(), validarFormaPago(), validarEstadoCompra(), confimarCompra(), validarCantidadEntradas(), validarConjuntoEntradaValido(), validarCOnjuntoEntradaEdades() ....

Entrada(ABC):
    nroOrden
    edad
de entrada:
metodos: calcularPrecioEntrada(), validarEd
    EntradaVip:
        tipo
        precioBase
        metodo: calcularPrecioEntrada()

    EntradaRegular:
         tipo
        precioBase
        metodo: calcularPrecioEntrada()


TODO ESO A REFINAR PERO ES LA BASE
 --------------------------------------------------------------------------------------------------------------------------------------------------------------
TEST PLANTEADOS BASADOS EN EL CASO FELIZ:

compravalidacontarjeta(usuario=logueado, feche >= hoy, parque = abierto, cantidad<=10, {entradas[] = valida}, formaPago = tarjeta,){
1test_usuario_logiueado_pasa(usuario);
2test_fecha_valida(fecha) hoy hacia adelante 
3test_parque_abierto(fecha)  que no sea lunes ni 25 de dici ni 1 de enero
4testCantidadEntradas() menor o igual a 10
5testConjuntoEntradasCantidadValido(cantidadEntradas, conjuntoEntradas[]) valida que haya la misma cantidad de entradas en el array que las pedidas en la compra 
6testConjuntoCantidadEntradasTienenEdades()
7testConjuntoCantidadEntradasTienenTipoEntrada()
8testValorEntrada(edad,tipo)
9testDe0a3Regular(edad,tipo)
10testDe0a3Vip(edad,tipo)
11testDe4a15Regular(edad,tipo)
12testDe4a15Vip(edad,tipo)
13testDe60Regular(edad,tipo) return valor;
14testDe60Vip(edad,tipo)
15testHorarioValido()
16testCuposHorario(cantidadEntradas, horario)
17testFormaDePagoValida()
18testRedireccionMercadoPago()
19testEnvioDeMail()


PUEDEN LLEGAR A AGREGARSE TEST DE CUPOS CUANDO RESPONDA LA PROFE
	
}
