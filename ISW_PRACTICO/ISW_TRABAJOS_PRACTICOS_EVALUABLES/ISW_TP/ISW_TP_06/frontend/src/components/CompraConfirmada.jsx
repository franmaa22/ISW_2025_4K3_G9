import { useMemo } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumenPDF from './ResumenPDF';

const fmtTipo = (t) => (t || '').toUpperCase() === 'VIP' ? 'VIP' : 'Estándar';
const fmtMon = (n) => `$ ${Number(n || 0).toLocaleString('es-AR')}`;
const fmtHora = (h) => (h || '').replaceAll('_', ':');

export default function CompraExitosaModal({ isOpen, onClose, resumen }) {
  const total = useMemo(
    () => (resumen?.tickets || []).reduce((acc, t) => acc + Number(t.precio || 0), 0),
    [resumen]
  );

  if (!isOpen) return null;

  const fileName = `resumen_${resumen?.fecha}_${(resumen?.hora || '').replaceAll('_', '-')}.pdf`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      <div className="absolute inset-0 bg-black" />

  
      <div className="relative bg-hp-light w-[95%] max-w-2xl rounded-2xl shadow-2xl border border-hp-soft p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-hp-light flex items-center justify-center">
              <span className="text-hp-primary font-bold">🎟️</span>
            </div>
            <h2 className="text-xl font-bold text-hp-primary">Compra realizada con éxito</h2>
          </div>
          <button
            onClick={onClose}
            className="text-hp-dark/70 hover:text-hp-primary font-semibold"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4">
          <div className="flex justify-between bg-hp-light rounded-xl px-3 py-2">
            <span className="text-hp-dark">Fecha</span>
            <span className="font-semibold">{resumen?.fecha}</span>
          </div>
          <div className="flex justify-between bg-hp-light rounded-xl px-3 py-2">
            <span className="text-hp-dark">Hora</span>
            <span className="font-semibold">{fmtHora(resumen?.hora)}</span>
          </div>
          <div className="flex justify-between bg-hp-light rounded-xl px-3 py-2">
            <span className="text-hp-dark">Forma de pago</span>
            <span className="font-semibold">{(resumen?.formaPago || '').toUpperCase()}</span>
          </div>
          <div className="flex justify-between bg-hp-light rounded-xl px-3 py-2">
            <span className="text-hp-dark">Entradas</span>
            <span className="font-semibold">{resumen?.cantidadEntradas}</span>
          </div>
        </div>

        <div className="mt-2 border rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 bg-hp-light px-4 py-2 text-sm font-semibold text-hp-dark">
            <div>#</div>
            <div>Tipo</div>
            <div>Edad</div>
            <div>Precio</div>
          </div>
          <div className="divide-y">
            {(resumen?.tickets || []).map((t) => (
              <div key={t.numeroTicket} className="grid grid-cols-4 px-4 py-2 text-sm">
                <div>{t.numeroTicket}</div>
                <div>{fmtTipo(t.tipo)}</div>
                <div>{t.edad}</div>
                <div className="font-semibold">{fmtMon(t.precio)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-lg font-bold text-hp-primary">
            Total: {fmtMon(total)}
          </div>

          <div className="flex gap-2">
            <PDFDownloadLink
              document={<ResumenPDF resumen={resumen} />}
              fileName={fileName}
              className="px-4 py-2 rounded-xl bg-hp-primary text-hp-light hover:bg-hp-mint font-semibold transition"
            >
              {({ loading }) => (loading ? 'Generando PDF…' : 'Descargar PDF')}
            </PDFDownloadLink>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-hp-soft text-hp-dark hover:bg-hp-light font-semibold transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
