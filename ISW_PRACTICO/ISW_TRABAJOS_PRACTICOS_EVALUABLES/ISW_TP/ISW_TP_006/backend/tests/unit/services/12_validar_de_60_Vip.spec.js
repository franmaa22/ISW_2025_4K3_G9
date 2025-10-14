const { crearCompraEntradasService } = require('../../../services/comprarEntradasService');

describe('Servicio comprarEntradas - Descuento 50% mayores 60 años VIP', () => {
    test('Debe aplicar 50% de descuento para edad >= 60 con entrada VIP', () => {
        const mockDatosEntrada = {
            UsuarioId: 1, 
            fecha: "2024-06-20", 
            cantidad: 2, 
            participantes: [
                { edad: 65, tipoEntrada: "vip" },
                { edad: 72, tipoEntrada: "vip" }
            ], 
            formaPago: "tarjeta"
        };

        const resultado = crearCompraEntradasService(mockDatosEntrada);
        
        // Verificar que se aplique el descuento del 50%
        expect(resultado.descuentoAplicado).toBe(true);
        expect(resultado.porcentajeDescuento).toBe(50);
        expect(resultado.precioFinal).toBeLessThan(resultado.precioOriginal);
        expect(resultado.precioFinal).toBe(resultado.precioOriginal * 0.5);
    });

    test('Debe aplicar descuento solo a participantes mayores de 60 con VIP', () => {
        const mockDatosEntrada = {
            UsuarioId: 1, 
            fecha: "2024-06-20", 
            cantidad: 3, 
            participantes: [
                { edad: 65, tipoEntrada: "vip" },    // Con descuento
                { edad: 45, tipoEntrada: "vip" },    // Sin descuento
                { edad: 60, tipoEntrada: "vip" }     // Con descuento (límite)
            ], 
            formaPago: "tarjeta"
        };

        const resultado = crearCompraEntradasService(mockDatosEntrada);
        
        expect(resultado.participantesConDescuento).toBe(2);
        expect(resultado.participantesSinDescuento).toBe(1);
    });

    test('NO debe aplicar descuento si edad >= 60 pero tipo de entrada NO es VIP', () => {
        const mockDatosEntrada = {
            UsuarioId: 1, 
            fecha: "2024-06-20", 
            cantidad: 2, 
            participantes: [
                { edad: 65, tipoEntrada: "regular" },
                { edad: 70, tipoEntrada: "regular" }
            ], 
            formaPago: "tarjeta"
        };

        const resultado = crearCompraEntradasService(mockDatosEntrada);
        
        expect(resultado.descuentoAplicado).toBe(false);
        expect(resultado.precioFinal).toBe(resultado.precioOriginal);
    });
});