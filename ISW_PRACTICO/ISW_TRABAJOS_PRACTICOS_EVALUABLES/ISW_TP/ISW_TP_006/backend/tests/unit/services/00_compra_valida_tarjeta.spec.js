const {crearCompraEntradasService} = require('../../../services/comprarEntradasService');

// Test para el caso feliz de comprar entradas con tarjeta
// Usuario logueado
// Fecha >= hoy y parque abierto
// Cantidad <= 10
// Para cada participante: edad y tipo de entrada válidos
// Forma de pago = tarjeta -> se solicita redirección a MP
// Al confirmar: se solicita enviar email y el resultado muestra resumen (cantidad y fecha)

const mockDatosEntrada ={UsuarioId:1, fecha:"2024-06-20", cantidad:3, participantes:[{edad:25, tipoEntrada:"vip"},{edad:30, tipoEntrada:"vip"},
    {edad:5, tipoEntrada:"niño"}], formaPago:"tarjeta"}

decribe('Servicio comprarEntradas - Caso Feliz', () => {
    test('Reirección a MP y resumen de compra',()=>{
        const resultado = crearCompraEntradasService(mockDatosEntrada);
        expect(resultado).toEqual({redireccionMP:true, resumen:{cantidad:3, fecha:"2024-06-20"}})
    })
});