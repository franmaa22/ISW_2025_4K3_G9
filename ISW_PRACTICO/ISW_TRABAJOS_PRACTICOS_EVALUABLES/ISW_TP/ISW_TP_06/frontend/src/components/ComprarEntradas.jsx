import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom'; 
import ItemEntrada from './ItemEntrada';
import { calcularPrecioEntrada, comprarEntrada, validarFechaDisponible } from '../../api';
import MercadoPagoMockModal from './MercadoPago';
import CompraExitosaModal from './CompraConfirmada';
import EmailEnviado from './EmailEnviado';

export default function ComprarEntradas() {
  const [cantidad, setCantidad] = useState(1);
  const [items, setItems] = useState([
    { edad: '', tipo: '', precio: null, loading: false },
  ]);

  const [entradasData, setEntradasData] = useState([]);
  const [formaDePago, setFormaDePago] = useState('');
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [resumen, setResumen] = useState({});
  const [open, setOpen] = useState(false);
  const [dataSeteada, setDataSeteada] = useState(false);
  const [bloqueo, setBloqueo] = useState(false);
  const [pagoProcesado, setPagoProcesado] = useState(false);
  const [dataSuccess, setDataSuccess] = useState(false);
  const [finalizar, setFinalizar] = useState(false);
  
  // Nuevos estados para el modal de email
  const [mostrarModalEmail, setMostrarModalEmail] = useState(false);

  const [fecha, setFecha] = useState('');
  const [fechaValida, setFechaValida] = useState(null);
  const [validandoFecha, setValidandoFecha] = useState(false);
  const [errorFecha, setErrorFecha] = useState('');
  const debounceTimer = useRef(null);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (!fecha) {
      setFechaValida(null);
      setErrorFecha('');
      return;
    }

    const [year, month, day] = fecha.split('-').map(Number);
    const fechaSeleccionada = new Date(year, month - 1, day); 

    const hoy = new Date();
    const [hoyYear, hoyMonth, hoyDay] = [hoy.getFullYear(), hoy.getMonth() + 1, hoy.getDate()];
    const fechaHoy = new Date(hoyYear, hoyMonth - 1, hoyDay);

    if (fechaSeleccionada < fechaHoy) {
      setFechaValida(false);
      setErrorFecha('La fecha no puede ser anterior a hoy');
      return;
    }

    setErrorFecha('');
    debounceTimer.current = setTimeout(async () => {
      setValidandoFecha(true);
      setErrorFecha('');

      try {
        const data = await validarFechaDisponible(fecha);

        if (data.disponible) {
          setFechaValida(true);
        } else {
          setFechaValida(false);
          setErrorFecha(data.mensaje || 'Parque cerrado en esta fecha');
        }
      } catch (error) {
        setFechaValida(false);
        setErrorFecha('Error al validar fecha');
        console.error('Error validando fecha:', error);
      } finally {
        setValidandoFecha(false);
      }
    }, 500);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [fecha]);

  const ahora = new Date();
  const año = ahora.getFullYear();
  const mes = String(ahora.getMonth() + 1).padStart(2, '0');
  const dia = String(ahora.getDate()).padStart(2, '0');
  const fechaHoyFormateada = `${año}-${mes}-${dia}`;
  const hora = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');
  const segundos = String(ahora.getSeconds()).padStart(2, '0');
  const horaFormateada = `${hora}_${minutos}_${segundos}`;

  const pagar = () => {
    if (formaDePago === "tarjeta") {
      setOpen(true);
      return;
    }
    setFinalizar(true);
  };

  const handleCantidad = (n) => {
    const q = Math.max(1, Math.min(10, Number(n) || 1));
    setCantidad(q);
    setItems((prev) => {
      const next = [...prev];
      if (q > prev.length) while (next.length < q) next.push({ edad: '', tipo: '', precio: null, loading: false });
      if (q < prev.length) next.length = q;
      return next;
    });
  };

  const handleItemChange = (index, patch) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        ...patch,
        precio: ('edad' in patch || 'tipo' in patch) ? null : next[index].precio,
      };
      return next;
    });
  };

  const prevKeysRef = useRef([]);

  useEffect(() => {
    items.forEach((it, i) => {
      const prev = prevKeysRef.current[i];
      const changed =
        !prev ||
        prev.edad !== it.edad ||
        prev.tipo !== it.tipo;

      if (changed && it && it.edad !== '' && it.tipo !== '' && !it.loading) {
        requestPrice(i);
      }
    });

    prevKeysRef.current = items.map(it => ({ edad: it.edad, tipo: it.tipo }));
  }, [items]);

  useEffect(() => {
    setEntradasData(items);
  }, [items]);

  useEffect(() => {
    const validador = () => {
      if (entradasData != [] && fechaSeleccionada !== '' && formaDePago !== '') {
        setDataSeteada(true);
        console.log(entradasData, fechaSeleccionada, formaDePago);
      }
    };
    validador();
  }, [entradasData, fechaSeleccionada, formaDePago]);

  const handleEnvio = async (formaPago, entradas, fechaHoy, horaHoy) => {
    console.log("Enviando: ", entradas);
    const data = { 
      fechaData: fechaHoy, 
      horaData: horaHoy, 
      formaData: formaPago, 
      entradasData: entradas
    };
    
    try {
      const response = await comprarEntrada({ 
        fecha: data.fechaData, 
        hora: data.horaData, 
        formaPago: data.formaData, 
        entradasData: data.entradasData,
      });

      if (response) {
        console.log("Compra válida, proceda al pago");
        setResumen(response);
        setBloqueo(true);
        setDataSuccess(true);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const requestPrice = async (index) => {
    const it = items[index];
    if (!it || it.edad === "" || it.tipo === "") return;

    setItems((prev) => {
      const next = [...prev];
      if (next[index]) next[index] = { ...next[index], loading: true };
      return next;
    });

    try {
      console.log(it.tipo);
      const resp = await calcularPrecioEntrada({
        tipoEntrada: it.tipo,
        edad: Number(it.edad),
      });

      const precio =
        resp?.precio ??
        Number(String(resp?.message || '').match(/(\d+(?:[.,]\d+)?)/)?.[1]?.replace(',', '.') || 0);

      setItems((prev) => {
        const next = [...prev];
        if (next[index]) next[index] = { ...next[index], precio, loading: false };
        return next;
      });
    } catch (e) {
      console.error(e);
      setItems((prev) => {
        const next = [...prev];
        if (next[index]) next[index] = { ...next[index], loading: false };
        return next;
      });
    }
  };

  const total = useMemo(
    () => items.reduce((acc, it) => acc + (Number(it.precio) || 0), 0),
    [items]
  );

  const entradasCompletas = useMemo(() => {
    if (items.length !== cantidad) return false;

    return items.every((it) => {
      const edadOk = String(it.edad).trim() !== '' && !Number.isNaN(Number(it.edad));
      const tipoOk = String(it.tipo).trim() !== '';
      return edadOk && tipoOk;
    });
  }, [items, cantidad]);

  const puedeConfirmar = useMemo(() => {
    return Boolean(
      fecha &&
      fechaValida === true &&
      !errorFecha &&
      formaDePago &&
      entradasCompletas &&
      !validandoFecha
    );
  }, [fecha, fechaValida, errorFecha, formaDePago, entradasCompletas, validandoFecha]);

  // Función para cerrar modal de compra y mostrar modal de email (SIMULADO)
  const handleCerrarCompraExitosa = () => {
    setFinalizar(false);
    // Simular que siempre se envió el email exitosamente
    console.log('📧 Simulando envío de email...');
    setMostrarModalEmail(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-hp-light px-4 py-10">
      <h1 className="text-4xl font-bold text-hp-primary mb-6 text-center">Eco Harmony Park 🌿</h1>

      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xl border border-hp-soft">
        <div className="mb-6">
          <label className="block text-hp-dark font-semibold mb-2">Cantidad de entradas</label>
          <input
            type="number"
            min={1}
            max={10}
            value={cantidad}
            disabled={bloqueo}
            onChange={(e) => handleCantidad(e.target.value)}
            className="w-full border border-hp-mint rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-hp-primary"
          />
        </div>

        <div className="mb-6">
          <label className="block text-hp-dark font-semibold mb-2">
            Fecha de visita *
          </label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            disabled={bloqueo}
            min={fechaHoyFormateada}
            className="w-full border border-hp-mint rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-hp-primary"
          />

          {validandoFecha && (
            <p className="text-sm text-blue-600 mt-2 flex items-center">
              <span className="animate-spin mr-2">⏳</span>
              Verificando disponibilidad...
            </p>
          )}

          {fechaValida === true && !validandoFecha && (
            <p className="text-sm text-green-600 mt-2 flex items-center">
              <span className="mr-2">✅</span>
              Fecha disponible
            </p>
          )}

          {errorFecha && (
            <p className="text-sm text-red-600 mt-2 flex items-center">
              <span className="mr-2">❌</span>
              {errorFecha}
            </p>
          )}
        </div>

        <div className="mt-2">
          {items.map((it, i) => (
            <ItemEntrada
              key={i}
              index={i}
              value={it}
              disabled={bloqueo}
              onChange={handleItemChange}
              onRequestPrice={requestPrice}
            />
          ))}
        </div>

        <div className="flex-1">
          <label className="block text-hp-dark font-medium mb-1">
            Seleccione la forma de pago
          </label>
          <select
            value={formaDePago}
            disabled={bloqueo}
            onChange={(e) => setFormaDePago(e.target.value)}
            className="w-full border border-hp-mint rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hp-primary"
          >
            <option value="">Seleccionar...</option>
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta</option>
          </select>
        </div>

        <div className="p-6">
          <div className="flex-1">
            <button
              title={'Revise La información ingresada ya que se pregenerarán las entradas una vez confirmada la información. Este botón no se habilitará hasta completar todos los campos'}
              onClick={() => handleEnvio(formaDePago, entradasData, fechaHoyFormateada, horaFormateada)}
              disabled={!puedeConfirmar}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 transition-colors duration-200
                ${
                  !puedeConfirmar
                    ? 'border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'border-hp-mint bg-hp-mint/20 text-hp-dark hover:bg-hp-mint hover:text-white focus:ring-hp-primary'
                }`}
            >
              Confirmar Datos de Compra
            </button>
          </div>
          <div className="p-6"></div>
        </div>

        <div className="flex items-center justify-between mt-4 border-t pt-4">
          <span className="text-hp-dark font-semibold">Total:</span>
          <span className="text-2xl font-bold text-hp-primary">${total}</span>
        </div>

        {(dataSuccess) && (!pagoProcesado) &&
          <button
            onClick={pagar}
            className="bg-hp-primary text-hp-light px-4 py-2 rounded-xl w-full mt-4"
          >
            Continuar al Pago
          </button>
        }
      </div>

      {/* PORTALES - RENDERIZADO FUERA DEL FLUJO NORMAL */}
      {createPortal(
        <MercadoPagoMockModal
          isOpen={open}
          onClose={() => { setOpen(false); setFinalizar(true); }}
          durationMs={2200}
          onSuccess={() => {
            console.log('Pago OK');
            setPagoProcesado(true);
          }}
        />,
        document.body
      )}

      {createPortal(
        finalizar && <CompraExitosaModal
          isOpen={finalizar}
          onClose={handleCerrarCompraExitosa}
          resumen={resumen}
        />,
        document.body
      )}

      {createPortal(
        <EmailEnviado
          isOpen={mostrarModalEmail}
          onClose={() => location.reload()}
          email={resumen?.email || "user@user.com"}
        />,
        document.body
      )}
    </div>
  );
}