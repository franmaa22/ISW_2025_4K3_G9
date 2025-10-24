# ISW TP06 - Backend (TDD) – Comprar Entradas

Este backend implementa la HU "Comprar Entradas" aplicando TDD (Test-Driven Development) siguiendo el ciclo Red → Green → Refactor. Además, reorganizamos los tests con Jest en suites funcionales para facilitar el mantenimiento y la lectura.

## Objetivo funcional

Como Visitante quiero comprar una entrada para asegurar mi visita al parque.

Parámetros de compra:
- Fecha de visita
- Cantidad de entradas
- Participantes: edad y tipo de entrada (conjunto consistente)
- Forma de pago (tarjeta ⇒ redirección a Mercado Pago, efectivo ⇒ confirmación directa)

Salida esperada: al confirmar, se informa fecha y cantidad de entradas compradas y se ejecutan acciones asociadas (pago, mail, etc.).

## Estructura de tests (consolidada)

Agrupamos los tests por funcionalidad en 7 archivos principales usando `describe()` anidados:

```
backend/
├─ index.js
├─ package.json
├─ class/
├─ services/
├─ mocks/
├─ priceStrategy/
└─ tests/
	 └─ unit/
			└─ services/
				 ├─ autenticacion.spec.js          # Usuario logueado
				 ├─ validaciones-fecha.spec.js     # Fecha válida y parque abierto
				 ├─ validaciones-compra.spec.js    # Cantidad, forma de pago, participantes
				 ├─ calculo-precios.spec.js        # Reglas de precio por edad/tipo
				 ├─ integracion-pago.spec.js       # Redirección a Mercado Pago
				 ├─ notificaciones.spec.js         # Envío de mail de confirmación
				 └─ flujo-completo.spec.js         # Caso feliz y confirmación
```

Nota: durante la migración mantuvimos archivos históricos; la suite consolidada es la fuente de verdad actual.

## Cómo correr los tests

- Correr todas las suites:

```powershell
npm test
```

- Modo watch (útil para TDD):

```powershell
npm test -- --watch
```

- Ejecutar una sola suite (ejemplo, precios):

```powershell
npm test -- tests\unit\services\calculo-precios.spec.js
```

- Filtrar por nombre de test/suite:

```powershell
npm test -- -t "Cálculo de Precios"
```

- Ver cobertura (opcional):

```powershell
npm test -- --coverage
```

Jest está configurado para ES Modules; el script de `package.json` ya incluye el flag necesario (`--experimental-vm-modules`).

Sugerencia en PowerShell: si el doble guion no pasa los argumentos correctamente, probá alguna de estas alternativas equivalentes:

```powershell
# Opción A: pasar args con run
npm run test -- --coverage

# Opción B: invocar Jest directamente
node --experimental-vm-modules node_modules/jest/bin/jest.js --coverage
```

## Inicializar el backend en local

Requisitos:
- Node.js 18+ y npm

Pasos (Windows PowerShell):

```powershell
# 1) Instalar dependencias
npm install

# 2) Levantar el servidor en desarrollo (con nodemon)
npm run dev
```

El servidor expone por defecto `http://localhost:8888` y permite CORS desde `http://localhost:5173`.

### Endpoints principales

- POST `/comprarEntradas`
	- body: `{ fecha, hora, formaPago, entradasData }`
	- respuesta 201: `{ message, ...resumen }` o 400 con `{ error }`

- POST `/api/parque/validar-fecha`
	- body: `{ fecha: 'YYYY-MM-DD' }`
	- valida cierre por feriados/lunes y formato de fecha

- POST `/calcularPrecioEntrada`
	- body: `{ tipoEntrada, edad }`
	- respuesta 201 con mensaje de precio calculado

## Ciclo TDD aplicado

1) Red: escribir el test que falla (en alguna de las 7 suites)  
2) Green: implementar lo mínimo en `class/` o `services/` para pasar el test  
3) Refactor: mejorar diseño manteniendo los tests en verde

Ejecuta en watch mientras iteras para feedback rápido:

```powershell
npm test -- --watch
```

## Scripts disponibles

- `npm run dev`: inicia el servidor con nodemon (hot reload)
- `npm test`: ejecuta todas las suites Jest (ESM listo)

---

Última actualización: 23/10/2025


