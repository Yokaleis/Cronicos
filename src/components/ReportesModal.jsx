import { useState, useEffect, useRef } from "react";
import { X, FileDown, Loader2, FileSpreadsheet } from "lucide-react";
import * as XLSX from "xlsx";
import { aseguradorasOptions, contratantesOptions, reportesData } from "../data/dataModal";

// Nota: Asegúrate de tener COLS importado o definido en este archivo, 
// ya que se usa para mapear las columnas del Excel.

export default function ReportesModal({ open, onClose }) {
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [aseguradora, setAseguradora] = useState("");
  const [contratante, setContratante] = useState("");
  const [loading, setLoading] = useState(false);
  const overlayRef = useRef(null);

  // Cerrar con Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Resetear al cerrar
  useEffect(() => {
    if (!open) {
      setFechaDesde("");
      setFechaHasta("");
      setAseguradora("");
      setContratante("");
    }
  }, [open]);

  // Función unificada: Filtra y descarga el Excel inmediatamente
  const handleDownloadReport = () => {
    setLoading(true);
    
    // Mantenemos el setTimeout por UX (para que el botón muestre el estado de carga)
    setTimeout(() => {
      // 1. Aplicar los filtros
      let result = [...reportesData];
      if (aseguradora) {
        result = result.filter(r => 
          r.aseguradora === aseguradorasOptions.find(o => o.value === aseguradora)?.label || 
          r.aseguradora.includes(aseguradora)
        );
      }
      if (contratante) {
        result = result.filter(r => r.contratante.toLowerCase().includes(contratante.toLowerCase()));
      }
      if (fechaDesde) result = result.filter(r => r.fechaFactura >= fechaDesde);
      if (fechaHasta) result = result.filter(r => r.fechaFactura <= fechaHasta);

      // (Opcional) Validar si hay datos antes de descargar
      if (result.length === 0) {
        alert("No se encontraron registros con los filtros seleccionados.");
        setLoading(false);
        return;
      }

      // 2. Generar el documento Excel usando los resultados filtrados
      const wsData = [
        COLS.map(c => c.label),
        ...result.map(r => COLS.map(c => r[c.key] ?? "")),
      ];
      
      const ws = XLSX.utils.aoa_to_sheet(wsData);

      // Ajustar el ancho de las columnas
      ws["!cols"] = COLS.map(c => ({ wch: Math.max(c.label.length + 4, 18) }));

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Reporte");
      
      // 3. Descargar el archivo
      XLSX.writeFile(wb, `reporte_${new Date().toISOString().slice(0,10)}.xlsx`);
      
      setLoading(false);
    }, 600); // Reduje un poco el tiempo a 600ms para que se sienta más responsivo
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(13,15,20,0.65)", backdropFilter: "blur(4px)" }}
      onMouseDown={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full flex flex-col overflow-hidden"
        style={{ maxWidth: 860, maxHeight: "90vh" }}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center">
              <FileSpreadsheet size={18} className="text-slate-600" />
            </div>
            <div>
              <h2 className="font-display font-700 text-dark-900 text-base tracking-tight">
                Descargar Reporte
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Configure los filtros para exportar su Excel
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Filters ── */}
        <div className="px-6 py-4 shrink-0">
          <div className="grid grid-cols-2 gap-3 mb-3">
            {/* Fecha desde */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Fecha desde
              </label>
              <input
                type="date"
                value={fechaDesde}
                onChange={e => setFechaDesde(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all bg-white text-slate-700"
              />
            </div>
            {/* Fecha hasta */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Fecha hasta
              </label>
              <input
                type="date"
                value={fechaHasta}
                onChange={e => setFechaHasta(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all bg-white text-slate-700"
              />
            </div>
            {/* Aseguradora */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Aseguradora
              </label>
              <div className="relative">
                <select
                  value={aseguradora}
                  onChange={e => setAseguradora(e.target.value)}
                  className="w-full appearance-none border border-slate-200 rounded-xl px-3.5 py-2.5 pr-9 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all text-slate-700"
                >
                  {aseguradorasOptions.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
              </div>
            </div>
            {/* Contratante */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Contratante
              </label>
              <div className="relative">
                <select
                  value={contratante}
                  onChange={e => setContratante(e.target.value)}
                  className="w-full appearance-none border border-slate-200 rounded-xl px-3.5 py-2.5 pr-9 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all text-slate-700"
                >
                  {contratantesOptions.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 justify-end pt-3">
            <button
              onClick={handleDownloadReport}
              disabled={loading}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-emerald-600/25 active:scale-95 whitespace-nowrap"
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Procesando...</>
              ) : (
                <><FileDown size={16} /> Descargar Reporte Excel</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}