import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 12 },
  h1: { fontSize: 18, marginBottom: 8 },
  h2: { fontSize: 14, marginTop: 12, marginBottom: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  tableHeader: { flexDirection: 'row', borderBottomWidth: 1, paddingBottom: 4, marginTop: 8 },
  th: { flex: 1, fontSize: 12, fontWeight: 700 },
  tr: { flexDirection: 'row', paddingVertical: 4, borderBottomWidth: 0.5 },
  td: { flex: 1 },
  total: { marginTop: 10, flexDirection: 'row', justifyContent: 'flex-end' },
});

const fmtTipo = (t) => (t || '').toUpperCase() === 'VIP' ? 'VIP' : 'Estándar';
const fmtHora = (h) => (h || '').replaceAll('_', ':');
const fmtMon = (n) => `$ ${Number(n || 0).toLocaleString('es-AR')}`;

export default function ResumenPDF({ resumen }) {
  const total = (resumen?.tickets || []).reduce((acc, t) => acc + Number(t.precio || 0), 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>Eco Harmony Park — Resumen de compra</Text>

        <View style={styles.row}>
          <Text>Fecha: {resumen?.fecha}</Text>
          <Text>Hora: {fmtHora(resumen?.hora)}</Text>
        </View>
        <View style={styles.row}>
          <Text>Forma de pago: {(resumen?.formaPago || '').toUpperCase()}</Text>
          <Text>Cantidad de entradas: {resumen?.cantidadEntradas}</Text>
        </View>

        <Text style={styles.h2}>Entradas</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.th}>#</Text>
          <Text style={styles.th}>Tipo</Text>
          <Text style={styles.th}>Edad</Text>
          <Text style={styles.th}>Precio</Text>
        </View>

        {(resumen?.tickets || []).map((t) => (
          <View key={t.numeroTicket} style={styles.tr}>
            <Text style={styles.td}>{t.numeroTicket}</Text>
            <Text style={styles.td}>{fmtTipo(t.tipo)}</Text>
            <Text style={styles.td}>{t.edad}</Text>
            <Text style={styles.td}>{fmtMon(t.precio)}</Text>
          </View>
        ))}

        <View style={styles.total}>
          <Text style={{ fontSize: 13, fontWeight: 700 }}>Total: {fmtMon(total)}</Text>
        </View>
      </Page>
    </Document>
  );
}
