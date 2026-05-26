export const pacientes = [
  { id: 1, nombre: "ALFONSINI DE DI PELINO DINA", ci: "925658", telefono: "04141111111", aseguradora: "SEGUROS CARACAS", plan: "SEGUROS CARACAS ELITE", asegurado: "Activo" },
  { id: 2, nombre: "ANTUNEZ BERMUDEZ OSCAR", ci: "7724355", telefono: "04129998877", aseguradora: "PSEM", plan: "PSEM PSEM", asegurado: "Activo" },
  { id: 3, nombre: "BAKERIAN BARJEKLIAN ZAVEN", ci: "6977653", telefono: "04241324133", aseguradora: "VENEMERGENCIA", plan: "VENEMERGENCIA FAM", asegurado: "Activo" },
  { id: 4, nombre: "BAKERIAN SCOVINO NATHALY", ci: "26055828", telefono: "04221111111", aseguradora: "SEGUROS CARACAS", plan: "SEGUROS CARACAS ELITE", asegurado: "Inactivo" },
  { id: 5, nombre: "CARLOS ALFREDO SANOJA AGUILERA", ci: "19986048", telefono: "\u2014", aseguradora: "MERCANTIL SEGUROS", plan: "MERCANTIL SEGUROS MEDICAGUDA", asegurado: "Activo" },
  { id: 6, nombre: "CASTRO DE ESTREMOR MARIA ONOFRE", ci: "17834379", telefono: "04129998877", aseguradora: "PSEM", plan: "PSEM PSEM", asegurado: "Activo" },
  { id: 7, nombre: "CHIRINOS ESCALONA JAVIER RAMON", ci: "7741072", telefono: "04141111111", aseguradora: "PSEM", plan: "PSEM PSEM", asegurado: "Activo" },
  { id: 8, nombre: "ESTREMOR HERNAN", ci: "10415584", telefono: "04129998877", aseguradora: "PSEM", plan: "PSEM PSEM", asegurado: "Activo" },
  { id: 9, nombre: "ESTREMOR RAMIREZ HERNAN GABRIEL", ci: "33651577", telefono: "04129998877", aseguradora: "PSEM", plan: "PSEM PSEM", asegurado: "Activo" },
  { id: 10, nombre: "LOPEZ ASCANIO MARY CARMEN", ci: "10061229", telefono: "04121111133", aseguradora: "PSEM", plan: "PSEM PSEM", asegurado: "Activo" },
  { id: 11, nombre: "MARTINEZ JOSE ANTONIO", ci: "8823441", telefono: "04122334455", aseguradora: "SEGUROS CARACAS", plan: "SEGUROS CARACAS PLUS", asegurado: "Activo" },
  { id: 12, nombre: "GONZALEZ PEREZ MARIA LUISA", ci: "12345678", telefono: "04161234567", aseguradora: "VENEMERGENCIA", plan: "VENEMERGENCIA FAM", asegurado: "Activo" },
  { id: 13, nombre: "RODRIGUEZ SANCHEZ PEDRO", ci: "9876543", telefono: "04249876543", aseguradora: "MERCANTIL SEGUROS", plan: "MERCANTIL SEGUROS MEDICAGUDA", asegurado: "Inactivo" },
  { id: 14, nombre: "FLORES RIVAS ANA CAROLINA", ci: "22334455", telefono: "04143344556", aseguradora: "PSEM", plan: "PSEM PSEM", asegurado: "Activo" },
  { id: 15, nombre: "TORRES MENDEZ LUIS ALBERTO", ci: "15667788", telefono: "04126677889", aseguradora: "SEGUROS CARACAS", plan: "SEGUROS CARACAS ELITE", asegurado: "Activo" },
  { id: 16, nombre: "VARGAS HENRIQUEZ CARMEN ELENA", ci: "18899001", telefono: "04168899012", aseguradora: "VENEMERGENCIA", plan: "VENEMERGENCIA PLUS", asegurado: "Activo" },
  { id: 17, nombre: "SILVA MONTOYA JORGE ENRIQUE", ci: "5432109", telefono: "04145432109", aseguradora: "PSEM", plan: "PSEM PSEM", asegurado: "Activo" },
  { id: 18, nombre: "HERRERA CALDERON BEATRIZ", ci: "30112233", telefono: "04120112233", aseguradora: "MERCANTIL SEGUROS", plan: "MERCANTIL SEGUROS MEDICAGUDA", asegurado: "Activo" },
];

export const serviciosOptions = [
  { value: "", label: "Todos los servicios" },
  { value: "EMD", label: "EMD - Entrega de Medicamentos" },
  { value: "CONS", label: "CONS - Consulta Medica" },
  { value: "LAB", label: "LAB - Laboratorio" },
  { value: "IMG", label: "IMG - Imagenologia" },
  { value: "HOSP", label: "HOSP - Hospitalizacion" },
  { value: "URG", label: "URG - Urgencias" },
];

export const aseguradorasOptions = [
  { value: "PSEM", label: "PSEM" },
  { value: "SEGUROS_CARACAS", label: "SEGUROS CARACAS" },
  { value: "VENEMERGENCIA", label: "VENEMERGENCIA" },
  { value: "MERCANTIL", label: "MERCANTIL SEGUROS" },
];

export const contratantesOptions = [
  { value: "PETRO_PIAR", label: "Petro Piar 1532697" },
  { value: "PDVSA", label: "PDVSA" },
  { value: "CANTV", label: "CANTV" },
  { value: "CORP_MED", label: "Corp Medical" },
];

export const estatusOptions = [
  { value: "", label: "Todos los estatus" },
  { value: "FACTURADO", label: "Facturado" },
  { value: "PENDIENTE", label: "Pendiente" },
  { value: "PROCESANDO", label: "Procesando" },
  { value: "ANULADO", label: "Anulado" },
];

export const reportesData = [
  { id: 1, principioActivo: "Bolsa de Clientes", noAtencion: "26041499959", noFacExterna: "108488", fechaFacExterna: "2026-04-01", fechaFactura: "2026-05-01", estatus: "FACTURADO", delivery: "No", noSiniestro: "1-533931429", noFactProfit: "A0000030482", noPedido: "139299", paciente: "CORONADO DE MARCANO ARELIS GRACIELA", cedula: "4184418", aseguradora: "PSEM", contratante: "Petro Piar 1532697", plan: "PSEM PSEM" },
  { id: 2, principioActivo: "Bromuro de Hioscina", noAtencion: "26041499959", noFacExterna: "108488", fechaFacExterna: "2026-04-01", fechaFactura: "2026-05-01", estatus: "FACTURADO", delivery: "No", noSiniestro: "1-533931429", noFactProfit: "A0000030482", noPedido: "139299", paciente: "CORONADO DE MARCANO ARELIS GRACIELA", cedula: "4184418", aseguradora: "PSEM", contratante: "Petro Piar 1532697", plan: "PSEM PSEM" },
  { id: 3, principioActivo: "Atorvastatina 40mg", noAtencion: "26041512344", noFacExterna: "108512", fechaFacExterna: "2026-04-05", fechaFactura: "2026-05-01", estatus: "PENDIENTE", delivery: "Si", noSiniestro: "1-534012345", noFactProfit: "A0000030540", noPedido: "139350", paciente: "MARTINEZ JOSE ANTONIO", cedula: "8823441", aseguradora: "SEGUROS CARACAS", contratante: "PDVSA", plan: "SEGUROS CARACAS ELITE" },
  { id: 4, principioActivo: "Metformina 850mg", noAtencion: "26041521100", noFacExterna: "108530", fechaFacExterna: "2026-04-08", fechaFactura: "2026-05-02", estatus: "FACTURADO", delivery: "No", noSiniestro: "1-534099876", noFactProfit: "A0000030600", noPedido: "139402", paciente: "GONZALEZ PEREZ MARIA LUISA", cedula: "12345678", aseguradora: "VENEMERGENCIA", contratante: "CANTV", plan: "VENEMERGENCIA FAM" },
  { id: 5, principioActivo: "Losartan 50mg", noAtencion: "26041530099", noFacExterna: "108545", fechaFacExterna: "2026-04-10", fechaFactura: "2026-05-02", estatus: "PROCESANDO", delivery: "Si", noSiniestro: "1-534188200", noFactProfit: "A0000030700", noPedido: "139455", paciente: "TORRES MENDEZ LUIS ALBERTO", cedula: "15667788", aseguradora: "SEGUROS CARACAS", contratante: "PDVSA", plan: "SEGUROS CARACAS ELITE" },
  { id: 6, principioActivo: "Omeprazol 20mg", noAtencion: "26041540077", noFacExterna: "108560", fechaFacExterna: "2026-04-12", fechaFactura: "2026-05-03", estatus: "FACTURADO", delivery: "No", noSiniestro: "1-534234567", noFactProfit: "A0000030800", noPedido: "139500", paciente: "SILVA MONTOYA JORGE ENRIQUE", cedula: "5432109", aseguradora: "PSEM", contratante: "Petro Piar 1532697", plan: "PSEM PSEM" },
  { id: 7, principioActivo: "Amlodipino 10mg", noAtencion: "26041550088", noFacExterna: "108571", fechaFacExterna: "2026-04-15", fechaFactura: "2026-05-03", estatus: "PENDIENTE", delivery: "Si", noSiniestro: "1-534310000", noFactProfit: "A0000030900", noPedido: "139550", paciente: "HERRERA CALDERON BEATRIZ", cedula: "30112233", aseguradora: "MERCANTIL SEGUROS", contratante: "Corp Medical", plan: "MERCANTIL SEGUROS MEDICAGUDA" },
  { id: 8, principioActivo: "Insulina Glargina", noAtencion: "26041561100", noFacExterna: "108582", fechaFacExterna: "2026-04-18", fechaFactura: "2026-05-04", estatus: "FACTURADO", delivery: "No", noSiniestro: "1-534400001", noFactProfit: "A0000031000", noPedido: "139600", paciente: "VARGAS HENRIQUEZ CARMEN ELENA", cedula: "18899001", aseguradora: "VENEMERGENCIA", contratante: "CANTV", plan: "VENEMERGENCIA PLUS" },
];

export const alertasData = [
  { id: 1, tipo: "Vencimiento", mensaje: "Poliza de ALFONSINI DE DI PELINO DINA vence en 5 dias", fecha: "2026-05-30", prioridad: "alta" },
  { id: 2, tipo: "Renovacion", mensaje: "ANTUNEZ BERMUDEZ OSCAR requiere renovacion de plan", fecha: "2026-06-01", prioridad: "media" },
  { id: 3, tipo: "Documentos", mensaje: "Documentos pendientes para BAKERIAN BARJEKLIAN ZAVEN", fecha: "2026-05-26", prioridad: "baja" },
  { id: 4, tipo: "Pago", mensaje: "Factura #108488 sin confirmar pago", fecha: "2026-05-25", prioridad: "alta" },
  { id: 5, tipo: "Vencimiento", mensaje: "Plan SEGUROS CARACAS ELITE de BAKERIAN SCOVINO NATHALY vence manana", fecha: "2026-05-26", prioridad: "alta" },
  { id: 6, tipo: "Renovacion", mensaje: "CHIRINOS ESCALONA requiere nueva autorizacion medica", fecha: "2026-06-05", prioridad: "media" },
  { id: 7, tipo: "Documentos", mensaje: "Historia clinica desactualizada para ESTREMOR HERNAN", fecha: "2026-05-28", prioridad: "baja" },
];
