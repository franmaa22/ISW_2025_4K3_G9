import { useEffect, useMemo, useRef, useState } from 'react';
import ItemEntrada from './ItemEntrada';
import { calcularPrecioEntrada } from '../../api';

export default function ComprarEntradas() {
  const [cantidad, setCantidad] = useState(1);
  const [items, setItems] = useState([
    { edad: '', tipo: '', precio: null, loading: false },
  ]);

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
            onChange={(e) => handleCantidad(e.target.value)}
            className="w-full border border-hp-mint rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-hp-primary"
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
            />
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 border-t pt-4">
          <span className="text-hp-dark font-semibold">Total:</span>
          <span className="text-2xl font-bold text-hp-primary">${total}</span>
        </div>
      </div>
    </div>
  );
}
