export default function ItemEntrada({ index, value, onChange, disabled}) {
  const {edad ='', tipo = '', precio = null, loading = false}= value ?? {};
  return (
    <div className="bg-white border border-hp-soft rounded-xl p-4 mb-4 shadow-sm w-full">
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
            disabled={disabled}
            value={edad}
            onChange={(e) => onChange(index, { edad: e.target.value })}
            className="w-full border border-hp-mint rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hp-primary"
          />
        </div>

        {/* Tipo */}
        <div className="flex-1">
          <label className="block text-hp-dark font-medium mb-1">
            Tipo de entrada
          </label>
          <select
            value={tipo}
            disabled={disabled}
            onChange={(e) => onChange(index, { tipo: e.target.value })}
            className="w-full border border-hp-mint rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hp-primary"
          >
            <option value="">Seleccionar...</option>
            <option value="estandar">Estandar</option>
            <option value="vip">VIP</option>
          </select>
        </div>
      </div>
      <div className="mt-3 text-sm">
        {loading ? (
          <span className="text-hp-primary">Calculando...</span>
        ) : precio != null ? (
          <span className="text-hp-dark">Precio: <strong>${precio}</strong></span>
        ) : (
          <span className="text-hp-soft">Completá edad y tipo para calcular</span>
        )}
      </div>
    </div>
  );
}
