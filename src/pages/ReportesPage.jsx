import { useState } from 'react';
import {
  FileBarChart2,
  Download,
  Loader2,
  Search,
  X,
  CalendarDays,
} from 'lucide-react';
import {
  servicios,
  aseguradoras,
  contratantes,
  estatuses,
  reportesMock,
} from '../data/mockData';

const SelectField = ({ label, value, onChange, options, placeholder }) => (
  <div className="flex-1 min-w-44">
    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
      {label}
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none border border-slate-200 rounded-xl px-3.5 py-2.5 pr-9 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all text-slate-700"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
        ▾
      </span>
    </div>
  </div>
);

const DateField = ({ label, value, onChange }) => (
  <div className="flex-1 min-w-40">
    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
      {label}
    </label>
    <div className="relative">
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all text-slate-700 bg-white"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          <X size={14} />
        </button>
      )}
    </div>
  </div>
);

const COLS = [
  { key: 'principioActivo', label: 'Principio Activo' },
  { key: 'numeroAtencion', label: 'No. Atención' },
  { key: 'noFacExterna', label: 'No. Fac. Externa' },
  { key: 'fechaFacExterna', label: 'Fecha Fac. Externa' },
  { key: 'fechaFactura', label: 'Fecha de Factura' },
  { key: 'estatus', label: 'Estatus' },
  { key: 'delivery', label: 'Delivery' },
  { key: 'noSiniestro', label: 'No. Siniestro' },
  { key: 'noFactProfit', label: 'No. Fact. Profit' },
  { key: 'noPedido', label: 'No. de Pedido' },
  { key: 'paciente', label: 'Paciente' },
  { key: 'cedula', label: 'Cédula' },
  { key: 'aseguradora', label: 'Aseguradora' },
  { key: 'contratante', label: 'Contratante' },
  { key: 'plan', label: 'Plan' },
];

const statusColors = {
  FACTURADO: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  PENDIENTE: 'bg-amber-50 text-amber-700 border-amber-100',
  CANCELADO: 'bg-rose-50 text-rose-600 border-rose-100',
  'EN PROCESO': 'bg-blue-50 text-blue-700 border-blue-100',
};

export default function ReportesPage() {
  const [servicio, setServicio] = useState('');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [aseguradora, setAseguradora] = useState('');
  const [contratante, setContratante] = useState('');
  const [estatus, setEstatus] = useState('');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setGenerated(false);
    setTimeout(() => {
      // Filter mock data
      let result = [...reportesMock];
      if (aseguradora) result = result.filter((r) => r.aseguradora === aseguradora);
      if (contratante) result = result.filter((r) => r.contratante === contratante);
      if (estatus) result = result.filter((r) => r.estatus === estatus);
      if (fechaDesde) result = result.filter((r) => r.fechaFactura >= fechaDesde);
      if (fechaHasta) result = result.filter((r) => r.fechaFactura <= fechaHasta);
      setRows(result);
      setLoading(false);
      setGenerated(true);
    }, 1000);
  };

  const handleDownload = () => {
    const headers = COLS.map((c) => c.label).join(',');
    const csvRows = rows.map((r) =>
      COLS.map((c) => `"${r[c.key] ?? ''}"`).join(',')
    );
    const csv = [headers, ...csvRows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reporte.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 max-w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center">
          <FileBarChart2 size={18} className="text-slate-600" />
        </div>
        <h1 className="font-display text-xl font-700 text-dark-900 tracking-tight">
          REPORTES
        </h1>
      </div>

      {/* Filters card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-5">
        <div className="flex flex-wrap gap-3 mb-3">
          <SelectField
            label="Servicio"
            value={servicio}
            onChange={setServicio}
            options={servicios}
            placeholder="Seleccione servicio"
          />
          <DateField label="Fecha desde" value={fechaDesde} onChange={setFechaDesde} />
          <DateField label="Fecha hasta" value={fechaHasta} onChange={setFechaHasta} />

          <div className="flex items-end gap-2">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-70 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-brand-600/25 hover:shadow-brand-600/40 active:scale-95 whitespace-nowrap"
            >
              {loading ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Search size={15} />
              )}
              {loading ? 'Generando...' : 'Generar Reporte'}
            </button>
            {generated && rows.length > 0 && (
              <button
                onClick={handleDownload}
                className="w-10 h-10 border border-slate-200 hover:bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-700 transition-all"
                title="Descargar CSV"
              >
                <Download size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <SelectField
            label="Aseguradora"
            value={aseguradora}
            onChange={setAseguradora}
            options={aseguradoras}
            placeholder="Aseguradora"
          />
          <SelectField
            label="Contratante"
            value={contratante}
            onChange={setContratante}
            options={contratantes}
            placeholder="Contratante"
          />
          <SelectField
            label="Estatus"
            value={estatus}
            onChange={setEstatus}
            options={estatuses}
            placeholder="Estatus"
          />
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Table header */}
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-dark-800">
                {COLS.map((col) => (
                  <th
                    key={col.key}
                    className="text-left px-4 py-3 text-xs font-700 text-slate-300 uppercase tracking-wider whitespace-nowrap"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={COLS.length} className="text-center py-16">
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <Loader2 size={24} className="animate-spin text-brand-500" />
                      <span className="text-sm">Generando reporte...</span>
                    </div>
                  </td>
                </tr>
              )}
              {!loading && !generated && (
                <tr>
                  <td colSpan={COLS.length} className="text-center py-16">
                    <div className="flex flex-col items-center gap-3 text-slate-400">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                        <CalendarDays size={24} className="text-slate-300" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-500">Sin datos</p>
                        <p className="text-xs mt-0.5">
                          Configure los filtros y pulse <strong>"Generar Reporte"</strong>
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              {!loading && generated && rows.length === 0 && (
                <tr>
                  <td colSpan={COLS.length} className="text-center py-16 text-slate-400 text-sm">
                    No hay registros para los filtros seleccionados.
                  </td>
                </tr>
              )}
              {!loading &&
                rows.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`border-b border-slate-50 hover:bg-brand-50/20 transition-colors ${
                      idx % 2 === 0 ? '' : 'bg-slate-50/30'
                    }`}
                  >
                    {COLS.map((col) => (
                      <td key={col.key} className="px-4 py-3 whitespace-nowrap text-slate-700">
                        {col.key === 'estatus' ? (
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                              statusColors[row[col.key]] || 'bg-slate-50 text-slate-600 border-slate-100'
                            }`}
                          >
                            {row[col.key]}
                          </span>
                        ) : col.key === 'delivery' ? (
                          <span className={`text-xs font-semibold ${row[col.key] === 'Sí' ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {row[col.key]}
                          </span>
                        ) : col.key === 'paciente' ? (
                          <span className="font-semibold text-dark-800">{row[col.key]}</span>
                        ) : (
                          <span>{row[col.key] ?? '—'}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {generated && rows.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/40 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              {rows.length} registro{rows.length !== 1 ? 's' : ''} encontrado{rows.length !== 1 ? 's' : ''}
            </p>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors"
            >
              <Download size={13} /> Exportar CSV
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
