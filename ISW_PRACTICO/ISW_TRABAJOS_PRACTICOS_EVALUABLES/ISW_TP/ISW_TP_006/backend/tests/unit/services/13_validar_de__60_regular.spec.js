const {crearCompraEntradasService} = require('../../../services/comprarEntradasService');

describe('Servicio comprarEntradas - Validación edad 60 o más con entrada Regular', () => {
    
    test('testDe60Regular - Debe fallar cuando un participante de 60 años o más tiene entrada Regular', () => {
        const mockDatosEntrada = {
            UsuarioId: 1, 
            fecha: "2024-06-20", 
            cantidad: 2, 
            participantes: [
                {edad: 60, tipoEntrada: "regular"},
                {edad: 25, tipoEntrada: "vip"}
            ], 
            formaPago: "tarjeta"
        };
        
        const resultado = crearCompraEntradasService(mockDatosEntrada);
        
        expect(resultado).toEqual({
            error: true,
            mensaje: "Los participantes de 60 años o más no pueden tener entrada Regular"
        });
    });
});