// ── Definición de Columnas para el Excel ──
// El componente usa COLS.map(c => c.label) y r[c.key]
export const COLS = [
  { key: "id", label: "ID Factura" },
  { key: "fechaFactura", label: "Fecha de Factura" },
  { key: "aseguradora", label: "Aseguradora" },
  { key: "contratante", label: "Contratante" },
  { key: "poliza", label: "N° Póliza" },
  { key: "monto", label: "Monto" },
  { key: "estado", label: "Estado" }
];

// ── Opciones para el Select de Aseguradoras ──
// Requiere 'value' (para el option) y 'label' (para mostrar al usuario y filtrar)
export const aseguradorasOptions = [
  { value: "", label: "Todas las aseguradoras" }, // Opción por defecto
  { value: "mapfre", label: "Mapfre" },
  { value: "allianz", label: "Allianz" },
  { value: "axa", label: "AXA Seguros" },
  { value: "gnp", label: "GNP Seguros" }
];

// ── Opciones para el Select de Contratantes ──
// Requiere 'value' y 'label'
export const contratantesOptions = [
  { value: "", label: "Todos los contratantes" }, // Opción por defecto
  { value: "empresa_x", label: "Empresa X S.A." },
  { value: "tecnologia_global", label: "Tecnología Global C.A." },
  { value: "logistica_sur", label: "Logística del Sur" }
];

// ── Datos de Prueba (Mock Data) ──
// Estos son los registros que se filtran y se imprimen en el Excel.
// Deben contener las propiedades (keys) que definiste en COLS.
export const reportesData = [
  {
    id: "FAC-001",
    fechaFactura: "2026-05-15",
    aseguradora: "Mapfre",
    contratante: "Empresa X S.A.",
    poliza: "POL-99381",
    monto: 1250.00,
    estado: "Pagada"
  },
  {
    id: "FAC-002",
    fechaFactura: "2026-05-18",
    aseguradora: "AXA Seguros",
    contratante: "Tecnología Global C.A.",
    poliza: "POL-11204",
    monto: 3400.50,
    estado: "Pendiente"
  },
  {
    id: "FAC-003",
    fechaFactura: "2026-05-20",
    aseguradora: "Allianz",
    contratante: "Logística del Sur",
    poliza: "POL-55410",
    monto: 890.00,
    estado: "Pagada"
  },
  {
    id: "FAC-004",
    fechaFactura: "2026-05-22",
    aseguradora: "GNP Seguros",
    contratante: "Empresa X S.A.",
    poliza: "POL-77299",
    monto: 5600.00,
    estado: "En revisión"
  }
];