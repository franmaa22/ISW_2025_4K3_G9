import { use, useEffect, useMemo, useRef, useState } from 'react';
import ItemEntrada from './ItemEntrada';
import { calcularPrecioEntrada, comprarEntrada, validarFechaDisponible } from '../../api';
import MercadoPagoMockModal from './MercadoPago';
import CompraExitosaModal from './CompraConfirmada';

export default function ComprarEntradas() {
  const [cantidad, setCantidad] = useState(1);
  const [items, setItems] = useState([
    { edad: '', tipo: '', precio: null, loading: false },
  ]);

  const [entradasData, setEntradasData] = useState([]);
  const [formaDePago, setFormaDePago] = useState('');
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [resumen, setResumen] = useState({});
  const [open, setOpen] = useState(false)
  const [dataSeteada, setDataSeteada] = useState(false);
  const [bloqueo, setBloqueo] = useState(false)
  const [pagoProcesado, setPagoProcesado] = useState(false)
  const [dataSuccess, setDataSuccess] = useState(false)
  const [finalizar, setFinalizar] = useState(false)

 


  // Agrego
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

   // Validar si se puede proceder con la compra
  const puedeComprar = fechaValida && items.every(it => it.precio !== null);



  const ahora= new Date()
  const año = ahora.getFullYear();
  const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // Mes es 0-11
  const dia = String(ahora.getDate()).padStart(2, '0');
  const fechaHoyFormateada= `${año}-${mes}-${dia}`;
  const hora  = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');
  const segundos = String(ahora.getSeconds()).padStart(2, '0');
  const horaFormateada = `${hora}_${minutos}_${segundos}`;
  const fechasBloqueadas = ['']
  
 
  const pagar = ()=>{
    if(formaDePago == "tarjeta"){
      setOpen(true)
      return
    }
    setFinalizar(true) 
  }
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
  useEffect(()=>{
    setEntradasData(items)
  }, [items])
  useEffect(()=>{
    const validador = ()=>{
      if (entradasData != [] && fechaSeleccionada != '' && formaDePago != ''){
        setDataSeteada(true)
        console.log(entradasData, fechaSeleccionada, formaDePago)
      }
    }
    validador();
  }, [entradasData, fechaSeleccionada, formaDePago])
 

  const prevKeysRef = useRef([]);

  //este para simular la compra y ver si sale bien el resumen => lo nutrimos despues con la funcionaldiad real



  const handleEnvio = async (formaPago, entradas, total, fechaVisita, fechaHoy, horaHoy)=>{
    console.log("Enviando: ", entradas)
    const data = {fechaData: fechaHoy, horaData: horaHoy, formaData: formaPago, entradasData:entradas}
//fecha, hora, formaPago, entradasData
      try{
         const response = await  comprarEntrada({fecha: data.fechaData, hora:data.horaData, formaPago: data.formaData, entradasData: data.entradasData})
         
         if (response){
           console.log("Compra válida, proceda al pago")
           setResumen(response)
           setBloqueo(true)
           setDataSuccess(true)
           console.log(response)
         }
      }
     catch(error){
       console.error(error.message)
     }

    }



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
  useEffect(()=>{
    setEntradasData(items)
  }, [items])
  useEffect(()=>{
    const validador = ()=>{
      if (entradasData != [] && fechaSeleccionada != '' && formaDePago != ''){
        setDataSeteada(true)
        console.log(entradasData, fechaSeleccionada, formaDePago)
      }
    }
    validador();
  }, [entradasData, fechaSeleccionada, formaDePago])
 
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
            disabled={bloqueo}
            onChange={(e) => handleCantidad(e.target.value)}
            className="w-full border border-hp-mint rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-hp-primary"
          />
        </div>
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
          ))
          }
        
        </div>
    
        <div className="flex-1">
          <label className="block text-hp-dark font-medium mb-1">
            Seleccione la forma de pago
          </label>
          <select
            value={formaDePago}
            disabled={bloqueo}
            onChange={(e) =>  setFormaDePago(e.target.value)}
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
            disabled={(dataSeteada != true) && (!bloqueo)}
            onClick={()=>handleEnvio(formaDePago, entradasData, total, fechaSeleccionada, fechaHoyFormateada, horaFormateada)}
            className="w-full border border-hp-mint rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hp-primary"
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
      {(dataSuccess)  && (!pagoProcesado) &&
      <button
        onClick={pagar}
        className="bg-hp-primary text-hp-light px-4 py-2 rounded-xl"
      >
        Continuar al Pago
      </button>  }
      

      <MercadoPagoMockModal
        isOpen={open}
        onClose={() => {setOpen(false), setFinalizar(true)}}
        durationMs={2200}
        onSuccess={() => {
          console.log('Pago OK');
          setPagoProcesado(true)
          
        }}
      />
      {(finalizar) &&
      <CompraExitosaModal
        isOpen={finalizar}
        onClose={() => {setOpen(false), location.reload()}}
        resumen={resumen}
      />}
      {(dataSuccess)  && (!pagoProcesado) &&
      <button
        onClick={pagar}
        className="bg-hp-primary text-hp-light px-4 py-2 rounded-xl"
      >
        Continuar al Pago
      </button>  }
      

      <MercadoPagoMockModal
        isOpen={open}
        onClose={() => {setOpen(false), setFinalizar(true)}}
        durationMs={2200}
        onSuccess={() => {
          console.log('Pago OK');
          setPagoProcesado(true)
          
        }}
      />
      {(finalizar) &&
      <CompraExitosaModal
        isOpen={finalizar}
        onClose={() => {setOpen(false), location.reload()}}
        resumen={resumen}
      />}
      </div>
      
      
    </div>
  );
}
