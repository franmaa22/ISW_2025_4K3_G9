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


test propuestos:

compra_valida_tarjeta
compra_valida_efectivo
compra_invalida_supera_10
compra_invalida_user_no_logueado
compra_invalida_fecha_pasada
compra_invalida_dia_cerrado
compra_invalida_falta_edad_participante
compra_invalida_falta_tipo_entrada_participante
compra_muestra_resumen_cantidad_fecha


