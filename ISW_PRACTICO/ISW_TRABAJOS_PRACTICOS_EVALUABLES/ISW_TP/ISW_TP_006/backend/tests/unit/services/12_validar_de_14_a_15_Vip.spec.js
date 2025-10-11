const {crearCompraEntradasService} = require('../../../services/comprarEntradasService');

describe('Servicio comprarEntradas - Validación edad 4 a 15 con entrada VIP', () => {
    
    test('testDe4a15Vip - Debe fallar cuando un participante entre 4 y 15 años tiene entrada VIP', () => {
        const mockDatosEntrada = {
            UsuarioId: 1, 
            fecha: "2024-06-20", 
            cantidad: 2, 
            participantes: [
                {edad: 10, tipoEntrada: "vip"},
                {edad: 25, tipoEntrada: "regular"}
            ], 
            formaPago: "tarjeta"
        };
        
        const resultado = crearCompraEntradasService(mockDatosEntrada);
        
        expect(resultado).toEqual({
            error: true,
            mensaje: "Los participantes entre 4 y 15 años no pueden tener entrada VIP"
        });
    });
});