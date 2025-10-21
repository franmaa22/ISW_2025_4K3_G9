import { useEffect, useState } from 'react';

export default function MercadoPagoMockModal({
  isOpen,
  onClose,
  durationMs = 2000,       
  onSuccess,               
}) {
  const [phase, setPhase] = useState('idle'); 

  useEffect(() => {
    let timer;
    if (isOpen) {
      setPhase('redirect');
      timer = setTimeout(() => {
        setPhase('success');
        onSuccess?.();
      }, durationMs);
    } else {
      setPhase('idle');
    }
    return () => clearTimeout(timer);
  }, [isOpen, durationMs, onSuccess]);

  if (!isOpen) return null;

  const canClose = phase === 'success';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      
      <div className="absolute inset-0 bg-black/80" />

      
      <div className="relative bg-white w-[90%] max-w-md rounded-2xl shadow-2xl border border-hp-soft p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-hp-light flex items-center justify-center">
            
            <span className="text-hp-primary font-bold">MP</span>
          </div>
          <h2 className="text-xl font-bold text-hp-primary">
            Mercado Pago
          </h2>
        </div>

        {phase === 'redirect' && (
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full border-2 border-hp-mint border-t-transparent animate-spin mb-4" />
            <p className="text-hp-dark font-medium">
              Redirigiendo a Mercado Pago…
            </p>
            <p className="text-hp-soft text-sm mt-1">
              No cierres esta ventana.
            </p>
          </div>
        )}

        {phase === 'success' && (
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500 flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" className="text-green-600">
                <path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/>
              </svg>
            </div>
            <p className="text-hp-dark font-semibold">
              Cobro realizado con éxito
            </p>
            <p className="text-hp-soft text-sm mt-1">
              ¡Gracias! Ya podés continuar.
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            disabled={!canClose}
            onClick={() => canClose && onClose?.()}
            className={`px-4 py-2 rounded-xl font-semibold transition
              ${canClose
                ? 'bg-hp-primary text-hp-light hover:bg-hp-mint'
                : 'bg-hp-soft text-white opacity-60 cursor-not-allowed'
              }`}
          >
            {canClose ? 'Continuar' : 'Procesando…'}
          </button>
        </div>
      </div>
    </div>
  );
}
