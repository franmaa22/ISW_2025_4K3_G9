export default function ItemEntrada({ index, value, onChange, onRequestPrice, disabled = false }) {
  const { edad = '', tipo = '', precio = null, loading = false } = value ?? {};
  
  return (
    <div 
      className={`bg-white border border-hp-soft rounded-xl p-4 mb-4 shadow-sm w-full transition-opacity ${
        disabled ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      <h3 className="text-hp-primary font-semibold mb-3">
        Entrada #{index + 1}
      </h3>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Edad */}
        <div className="flex-1">
          <label className="block text-hp-dark font-medium mb-1">Edad</label>
          <input
            type="number"
            min={0}
            max={120}
            value={edad}
            onChange={(e) => onChange(index, { edad: e.target.value })}
            onBlur={() => onRequestPrice(index)}
            disabled={disabled}
            className="w-full border border-hp-mint rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hp-primary disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        {/* Tipo */}
        <div className="flex-1">
          <label className="block text-hp-dark font-medium mb-1">
            Tipo de entrada
          </label>
          <select
            value={tipo}
            onChange={(e) => onChange(index, { tipo: e.target.value })}
            onBlur={() => onRequestPrice(index)}
            disabled={disabled}
            className="w-full border border-hp-mint rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hp-primary disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">Seleccionar...</option>
            <option value="estandar">Estándar</option>
            <option value="vip">VIP</option>
          </select>
        </div>
      </div>

      <div className="mt-3 text-sm">
        {disabled ? (
          <span className="text-gray-400 flex items-center">
            <span className="mr-1">🔒</span>
            Selecciona una fecha válida primero
          </span>
        ) : loading ? (
          <span className="text-hp-primary flex items-center">
            <span className="animate-spin mr-2">⏳</span>
            Calculando precio...
          </span>
        ) : precio != null ? (
          <span className="text-hp-dark flex items-center justify-between">
            <span>Precio: <strong className="text-hp-primary">${precio}</strong></span>
            {precio === 0 && (
              <span className="text-green-600 text-xs font-semibold bg-green-50 px-2 py-1 rounded">
                ¡GRATIS! 🎉
              </span>
            )}
          </span>
        ) : (
          <span className="text-hp-soft">Completá edad y tipo para calcular</span>
        )}
      </div>
    </div>
  );
}