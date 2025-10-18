export default function ComprarEntradas() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-hp-light px-4 py-10">
      {/* Header */}
      <h1 className="text-5xl font-bold text-hp-primary mb-8 text-center">
        Eco Harmony Park 🌿
      </h1>

      {/* Card principal */}
      <form className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-hp-soft">
        {/* Fecha */}
        <div className="mb-6">
          <label className="block text-hp-dark font-semibold mb-2">
            Fecha del evento
          </label>
          <input
            type="date"
            className="w-full border border-hp-mint rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-hp-primary"
          />
        </div>

        {/* Cantidad de entradas */}
        <div className="mb-6">
          <label className="block text-hp-dark font-semibold mb-2">
            Cantidad de entradas
          </label>
          <input
            type="number"
            min={1}
            max={10}
            className="w-full border border-hp-mint rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-hp-primary"
            placeholder="Ej: 2"
          />
        </div>

        {/* Forma de pago */}
        <div className="mb-8">
          <label className="block text-hp-dark font-semibold mb-2">
            Forma de pago
          </label>
          <select className="w-full border border-hp-mint rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-hp-primary">
            <option value="">Seleccionar...</option>
            <option value="tarjeta">Tarjeta de crédito</option>
            <option value="debito">Tarjeta de débito</option>
            <option value="efectivo">Efectivo</option>
            <option value="mpago">Mercado Pago</option>
          </select>
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-hp-primary hover:bg-hp-mint text-hp-light font-semibold py-3 rounded-xl transition"
        >
          Confirmar compra
        </button>
      </form>
    </div>
  );
}
