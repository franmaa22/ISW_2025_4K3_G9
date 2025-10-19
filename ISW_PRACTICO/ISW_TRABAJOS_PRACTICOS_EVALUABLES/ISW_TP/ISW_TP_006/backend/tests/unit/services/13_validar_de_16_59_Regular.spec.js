const { crearCompraEntradasService } = require('../../../services/comprarEntradasService');

describe('Servicio comprarEntradas - Precio 100% para edad 16-59 con entrada regular', () => {
    test('Debe aplicar precio completo (100%) para edad entre 16 y 59 con entrada regular', () => {
        const mockDatosEntrada = {
            UsuarioId: 1, 
            fecha: "2024-06-20", 
            cantidad: 3, 
            participantes: [
                { edad: 16, tipoEntrada: "regular" },  // Límite inferior (paga 100%)
                { edad: 30, tipoEntrada: "regular" },  // Edad media
                { edad: 59, tipoEntrada: "regular" }   // Límite superior (paga 100%)
            ], 
            formaPago: "tarjeta"
        };

        const resultado = crearCompraEntradasService(mockDatosEntrada);
        
        // Verificar que NO se aplique descuento
        expect(resultado.descuentoAplicado).toBe(false);
        expect(resultado.porcentajeDescuento).toBe(0);
        expect(resultado.precioFinal).toBe(resultado.precioOriginal);
    });

    test('Debe aplicar precio 100% en límites exactos (16 y 59 años)', () => {
        const mockDatosEntrada = {
            UsuarioId: 1, 
            fecha: "2024-06-20", 
            cantidad: 2, 
            participantes: [
                { edad: 16, tipoEntrada: "regular" },
                { edad: 59, tipoEntrada: "regular" }
            ], 
            formaPago: "tarjeta"
        };

        const resultado = crearCompraEntradasService(mockDatosEntrada);
        
        expect(resultado.descuentoAplicado).toBe(false);
        expect(resultado.precioFinal).toBe(resultado.precioOriginal);
        expect(resultado.participantesConDescuento).toBe(0);
    });

    test('NO debe aplicar precio 100% para edad 15 (paga 50% de descuento)', () => {
        const mockDatosEntrada = {
            UsuarioId: 1, 
            fecha: "2024-06-20", 
            cantidad: 1, 
            participantes: [
                { edad: 15, tipoEntrada: "regular" }
            ], 
            formaPago: "tarjeta"
        };

        const resultado = crearCompraEntradasService(mockDatosEntrada);
        
        // 15 años debe tener descuento del 50%
        expect(resultado.descuentoAplicado).toBe(true);
        expect(resultado.porcentajeDescuento).toBe(50);
        expect(resultado.precioFinal).toBe(resultado.precioOriginal * 0.5);
    });

    test('NO debe aplicar precio 100% para edad 60 (paga 50% de descuento)', () => {
        const mockDatosEntrada = {
            UsuarioId: 1, 
            fecha: "2024-06-20", 
            cantidad: 1, 
            participantes: [
                { edad: 60, tipoEntrada: "regular" }
            ], 
            formaPago: "tarjeta"
        };

        const resultado = crearCompraEntradasService(mockDatosEntrada);
        
        // 60 años debe tener descuento del 50%
        expect(resultado.descuentoAplicado).toBe(true);
        expect(resultado.porcentajeDescuento).toBe(50);
        expect(resultado.precioFinal).toBe(resultado.precioOriginal * 0.5);
    });

    test('Debe aplicar precios diferenciados según edad con entrada regular', () => {
        const mockDatosEntrada = {
            UsuarioId: 1, 
            fecha: "2024-06-20", 
            cantidad: 5, 
            participantes: [
                { edad: 15, tipoEntrada: "regular" },  // 50% descuento
                { edad: 16, tipoEntrada: "regular" },  // 100% precio completo
                { edad: 30, tipoEntrada: "regular" },  // 100% precio completo
                { edad: 59, tipoEntrada: "regular" },  // 100% precio completo
                { edad: 60, tipoEntrada: "regular" }   // 50% descuento
            ], 
            formaPago: "tarjeta"
        };

        const resultado = crearCompraEntradasService(mockDatosEntrada);
        
        expect(resultado.participantesConDescuento).toBe(2);  // 15 y 60 años
        expect(resultado.participantesSinDescuento).toBe(3);  // 16, 30 y 59 años
    });
});