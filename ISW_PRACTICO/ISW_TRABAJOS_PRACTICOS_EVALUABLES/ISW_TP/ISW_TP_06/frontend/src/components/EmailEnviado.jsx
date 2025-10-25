export default function EmailEnviado({ isOpen, onClose, email }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative bg-hp-light w-[95%] max-w-md rounded-2xl shadow-2xl border border-hp-soft p-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <span className="text-5xl">📧</span>
          </div>

          <h2 className="text-2xl font-bold text-hp-primary mb-2">
            ¡Email enviado!
          </h2>

          <p className="text-hp-dark mb-6">
            Hemos enviado la confirmación de tu compra y tus entradas por correo electrónico.
          </p>

          {email && (
            <div className="bg-hp-light rounded-lg px-4 py-2 mb-6 w-full">
              <p className="text-sm text-hp-dark/70">Enviado a:</p>
              <p className="font-semibold text-hp-dark">{email}</p>
            </div>
          )}

          <div className="flex flex-col gap-2 w-full text-sm text-hp-dark/70 mb-6">
            <p className="flex items-center justify-center gap-2">
              <span>✅</span>
              <span>Revisa tu bandeja de entrada</span>
            </p>
            <p className="flex items-center justify-center gap-2">
              <span>📁</span>
              <span>Verifica la carpeta de spam si no lo encuentras</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full px-6 py-3 rounded-xl bg-hp-primary text-white hover:bg-hp-mint font-semibold transition"
          >
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
}