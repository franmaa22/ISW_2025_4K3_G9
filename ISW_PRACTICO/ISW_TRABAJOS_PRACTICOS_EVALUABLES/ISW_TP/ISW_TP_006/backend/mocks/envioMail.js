
function envioMail(toEmail, resumen, mailer) {
  if (!toEmail || !resumen) return false;
  if (!mailer || typeof mailer.enviarConfirmacion !== 'function') return false;
  return !!mailer.enviarConfirmacion(toEmail, resumen);
}


export default envioMail;