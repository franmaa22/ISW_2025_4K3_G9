import { useMemo, useState, useEffect, useRef } from 'react';
import ItemEntrada from './ItemEntrada';
import { calcularPrecioEntrada, validarFechaDisponible } from '../../api';

export default function ComprarEntradas() {
  const [cantidad, setCantidad] = useState(1);
  const [items, setItems] = useState([
    { edad: '', tipo: '', precio: null, loading: false },
  ]);
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

    // Validación local inmediata
    const fechaSeleccionada = new Date(fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaSeleccionada < hoy) {
      setFechaValida(false);
      setErrorFecha('La fecha no puede ser anterior a hoy');
      return;
    }

    // Debounce para validación remota (espera 500ms)
    debounceTimer.current = setTimeout(async () => {
      setValidandoFecha(true);
      setErrorFecha('');

      try {
        // Usar la función de API correcta
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

    // Cleanup
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [fecha]);

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

  const requestPrice = async (index) => {
    const it = items[index];
    if (!it || it.edad == "" || it.tipo == "") return;

    setItems((prev) => {
      const next = [...prev];
      if (next[index]) next[index] = { ...next[index], loading: true };
      return next;
    });

    try {
      console.log(it.tipo)
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

  // Validar si se puede proceder con la compra
  const puedeComprar = fechaValida && items.every(it => it.precio !== null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-hp-light px-4 py-10">
      <h1 className="text-4xl font-bold text-hp-primary mb-6 text-center">Eco Harmony Park 🌿</h1>

      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xl border border-hp-soft">
        
        {/* SELECTOR DE FECHA */}
        <div className="mb-6">
          <label className="block text-hp-dark font-semibold mb-2">
            Fecha de visita *
          </label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full border border-hp-mint rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-hp-primary"
          />
          
          {/* Estados de validación */}
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

        <div className="mb-6">
          <label className="block text-hp-dark font-semibold mb-2">Cantidad de entradas</label>
          <input
            type="number"
            min={1}
            max={10}
            value={cantidad}
            onChange={(e) => handleCantidad(e.target.value)}
            disabled={!fechaValida}
            className="w-full border border-hp-mint rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-hp-primary disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <div className="mt-2">
          {items.map((it, i) => (
            <ItemEntrada
              key={i}
              index={i}
              value={it}
              onChange={handleItemChange}
              onRequestPrice={requestPrice}
              disabled={!fechaValida}
            />
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 border-t pt-4">
          <span className="text-hp-dark font-semibold">Total:</span>
          <span className="text-2xl font-bold text-hp-primary">${total}</span>
        </div>

        {/* Botón de compra */}
        <button
          disabled={!puedeComprar}
          className={`w-full mt-4 py-3 rounded-xl font-semibold transition-all ${
            puedeComprar
              ? 'bg-hp-primary text-white hover:opacity-90 cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {!fecha ? 'Selecciona una fecha' : !fechaValida ? 'Fecha no válida' : 'Proceder al pago'}
        </button>
      </div>
    </div>
  );
}