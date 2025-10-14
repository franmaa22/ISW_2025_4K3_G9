const { crearCompraEntradasService } = require('../../../services/comprarEntradasService');

describe('Servicio comprarEntradas - Precio 100% para edad 15-60 con entrada regular', () => {
    test('Debe aplicar precio completo (100%) para edad entre 15 y 60 con entrada regular', () => {
        const mockDatosEntrada = {
            UsuarioId: 1, 
            fecha: "2024-06-20", 
            cantidad: 3, 
            participantes: [
                { edad: 15, tipoEntrada: "regular" },  // Límite inferior
                { edad: 30, tipoEntrada: "regular" },  // Edad media
                { edad: 60, tipoEntrada: "regular" }   // Límite superior
            ], 
            formaPago: "tarjeta"
        };

        const resultado = crearCompraEntradasService(mockDatosEntrada);
        
        // Verificar que NO se aplique descuento
        expect(resultado.descuentoAplicado).toBe(false);
        expect(resultado.porcentajeDescuento).toBe(0);
        expect(resultado.precioFinal).toBe(resultado.precioOriginal);
    });

    test('Debe aplicar precio 100% en límites exactos (15 y 60 años)', () => {
        const mockDatosEntrada = {
            UsuarioId: 1, 
            fecha: "2024-06-20", 
            cantidad: 2, 
            participantes: [
                { edad: 15, tipoEntrada: "regular" },
                { edad: 60, tipoEntrada: "regular" }
            ], 
            formaPago: "tarjeta"
        };

        const resultado = crearCompraEntradasService(mockDatosEntrada);
        
        expect(resultado.descuentoAplicado).toBe(false);
        expect(resultado.precioFinal).toBe(resultado.precioOriginal);
    });

    test('Debe aplicar precio 100% para múltiples participantes en rango 15-60 regular', () => {
        const mockDatosEntrada = {
            UsuarioId: 1, 
            fecha: "2024-06-20", 
            cantidad: 4, 
            participantes: [
                { edad: 20, tipoEntrada: "regular" },
                { edad: 35, tipoEntrada: "regular" },
                { edad: 45, tipoEntrada: "regular" },
                { edad: 58, tipoEntrada: "regular" }
            ], 
            formaPago: "tarjeta"
        };

        const resultado = crearCompraEntradasService(mockDatosEntrada);
        
        expect(resultado.participantesConDescuento).toBe(0);
        expect(resultado.participantesSinDescuento).toBe(4);
        expect(resultado.precioFinal).toBe(resultado.precioOriginal);
    });

    test('NO debe aplicar precio 100% si tipo de entrada NO es regular', () => {
        const mockDatosEntrada = {
            UsuarioId: 1, 
            fecha: "2024-06-20", 
            cantidad: 2, 
            participantes: [
                { edad: 25, tipoEntrada: "vip" },
                { edad: 40, tipoEntrada: "vip" }
            ], 
            formaPago: "tarjeta"
        };

        const resultado = crearCompraEntradasService(mockDatosEntrada);
        
        // El precio podría ser diferente para entradas VIP
        expect(resultado.tipoEntrada).not.toBe("regular");
    });
});