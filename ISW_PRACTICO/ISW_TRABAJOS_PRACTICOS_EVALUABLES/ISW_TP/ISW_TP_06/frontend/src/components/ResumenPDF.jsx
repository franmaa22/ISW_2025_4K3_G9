import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { 
    padding: 30, 
    fontSize: 11,
    backgroundColor: '#fafafa'
  },
  header: {
    borderBottomWidth: 3,
    borderBottomColor: '#2ecc71',
    paddingBottom: 16,
    marginBottom: 24
  },
  h1: { 
    fontSize: 28, 
    fontWeight: 800,
    color: '#1a472a',
    marginBottom: 4,
    letterSpacing: 0.5
  },
  numeroCompra: {
    fontSize: 12,
    fontWeight: 700,
    color: '#2ecc71',
    marginTop: 8,
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  subtitle: {
    fontSize: 10,
    color: '#7f8c8d',
    marginTop: 4
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 24,
    flexWrap: 'wrap'
  },
  infoBox: {
    flex: 1,
    minWidth: 150,
    backgroundColor: '#ecf8f0',
    padding: 12,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#2ecc71'
  },
  infoLabel: {
    fontSize: 9,
    color: '#7f8c8d',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
    fontWeight: 600
  },
  infoValue: {
    fontSize: 13,
    color: '#1a472a',
    fontWeight: 700
  },
  sectionTitle: { 
    fontSize: 14,
    fontWeight: 800,
    color: '#1a472a',
    marginBottom: 12,
    marginTop: 20,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  tableHeader: { 
    flexDirection: 'row', 
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 8,
    borderRadius: 4
  },
  th: { 
    fontSize: 10,
    fontWeight: 700,
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    textAlign: 'center'
  },
  thTicket: {
    width: '30%',
    textAlign: 'left'
  },
  thTipo: {
    width: '20%',
    textAlign: 'center'
  },
  thEdad: {
    width: '20%',
    textAlign: 'center'
  },
  thPrecio: {
    width: '30%',
    textAlign: 'right'
  },
  tr: { 
    flexDirection: 'row', 
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    backgroundColor: '#fff'
  },
  trAlt: {
    backgroundColor: '#f8fffe'
  },
  td: { 
    fontSize: 10,
    color: '#2c3e50'
  },
  tdTicket: {
    width: '30%',
    textAlign: 'left'
  },
  tdTipo: {
    width: '20%',
    textAlign: 'center',
    fontWeight: 700,
    color: '#1a472a'
  },
  tdEdad: {
    width: '20%',
    textAlign: 'center'
  },
  tdPrecio: {
    width: '30%',
    textAlign: 'right',
    fontWeight: 700,
    color: '#2ecc71'
  },
  totalSection: { 
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#2ecc71',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: '#7f8c8d',
    marginRight: 12
  },
  totalValue: { 
    fontSize: 18,
    fontWeight: 800,
    color: '#2ecc71'
  },
  footer: {
    marginTop: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    fontSize: 9,
    color: '#95a5a6',
    textAlign: 'center'
  }
});

const fmtTipo = (t) => (t || '').toUpperCase() === 'VIP' ? '⭐ VIP' : 'Estándar';
const fmtHora = (h) => (h || '').replaceAll('_', ':');
const fmtMon = (n) => `$ ${Number(n || 0).toLocaleString('es-AR')}`;

export default function ResumenPDF({ resumen }) {
  const total = (resumen?.tickets || []).reduce((acc, t) => acc + Number(t.precio || 0), 0);
  const tickets = resumen?.tickets || [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.h1}>Eco Harmony Park</Text>
          <Text style={styles.subtitle}>RESUMEN DE COMPRA</Text>
          <Text style={styles.numeroCompra}>N° {resumen?.numeroCompra}</Text>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Fecha</Text>
            <Text style={styles.infoValue}>{resumen?.fecha}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Hora</Text>
            <Text style={styles.infoValue}>{fmtHora(resumen?.hora)}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Forma de pago</Text>
            <Text style={styles.infoValue}>{(resumen?.formaPago || '').toUpperCase()}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Entradas</Text>
            <Text style={styles.infoValue}>{resumen?.cantidadEntradas}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Detalle de entradas</Text>
        
        <View style={styles.tableHeader}>
          <Text style={[styles.th, styles.thTicket]}>#</Text>
          <Text style={[styles.th, styles.thTipo]}>Tipo</Text>
          <Text style={[styles.th, styles.thEdad]}>Edad</Text>
          <Text style={[styles.th, styles.thPrecio]}>Precio</Text>
        </View>

        {tickets.map((t, i) => (
          <View key={t.numeroTicket} style={[styles.tr, i % 2 === 1 && styles.trAlt]}>
            <Text style={[styles.td, styles.tdTicket]}>{t.numeroTicket}</Text>
            <Text style={[styles.td, styles.tdTipo]}>{fmtTipo(t.tipo)}</Text>
            <Text style={[styles.td, styles.tdEdad]}>{t.edad} años</Text>
            <Text style={[styles.td, styles.tdPrecio]}>{fmtMon(t.precio)}</Text>
          </View>
        ))}

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>TOTAL:</Text>
          <Text style={styles.totalValue}>{fmtMon(total)}</Text>
        </View>

        <Text style={styles.footer}>
          Gracias por visitarnos • Eco Harmony Park © 2025 • www.ecoharmonypark.com
        </Text>
      </Page>
    </Document>
  );
}