import { useState } from "react";
import { Download, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { serviciosOptions, aseguradorasOptions, contratantesOptions, estatusOptions, reportesData } from "../data/mockData";

const ROWS_PER_PAGE = 10;

export default function Reportes() {
  const [filters, setFilters] = useState({ servicio: "", fechaDesde: "", fechaHasta: "", aseguradora: "", contratante: "", estatus: "" });
  const [data, setData] = useState([]);
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handleChange = (key, value) => setFilters(f => ({ ...f, [key]: value }));

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      let result = [...reportesData];
      if (filters.aseguradora) result = result.filter(r => r.aseguradora.toLowerCase().includes(filters.aseguradora.toLowerCase().replace("_", " ")));
      if (filters.contratante) result = result.filter(r => r.contratante.toLowerCase().includes(filters.contratante.toLowerCase().replace("_", " ")));
      if (filters.estatus) result = result.filter(r => r.estatus === filters.estatus);
      if (filters.fechaDesde) result = result.filter(r => r.fechaFactura >= filters.fechaDesde);
      if (filters.fechaHasta) result = result.filter(r => r.fechaFactura <= filters.fechaHasta);
      setData(result);
      setGenerated(true);
      setPage(1);
      setLoading(false);
    }, 600);
  };

  const totalPages = Math.ceil(data.length / ROWS_PER_PAGE);
  const paginated = data.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const getEstatusBadge = (estatus) => {
    const map = { FACTURADO: "badge-facturado", PENDIENTE: "badge-pendiente", PROCESANDO: "badge-procesando", ANULADO: "badge-inactive" };
    return <span className={map[estatus] || "badge-pendiente"}>{estatus}</span>;
  };

  return (
    <div className="main-content">
      <div className="topbar">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <FileText size={18} color="#374151" />
          <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>Reportes</span>
        </div>
        <div className="avatar">AD</div>
      </div>

      <div className="page-content">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
          <FileText size={18} color="#e5173f" />
          <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700 }}>REPORTES</h2>
        </div>

        <div className="card" style={{ marginBottom: "1.25rem" }}>
          <div style={{ padding: "1.25rem" }}>
            {/* Row 1 */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.85rem", marginBottom: "0.85rem" }}>
              <div>
                <label className="form-label">Servicio</label>
                <select className="form-input" value={filters.servicio} onChange={e => handleChange("servicio", e.target.value)}>
                  {serviciosOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Fecha desde</label>
                <input type="date" className="form-input" value={filters.fechaDesde} onChange={e => handleChange("fechaDesde", e.target.value)} />
              </div>
              <div>
                <label className="form-label">Fecha hasta</label>
                <input type="date" className="form-input" value={filters.fechaHasta} onChange={e => handleChange("fechaHasta", e.target.value)} />
              </div>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <button className="btn-primary" style={{ width: "100%", justifyContent: "center", height: "36px" }} onClick={handleGenerate} disabled={loading}>
                  {loading ? "Generando..." : "Generar Reporte"}
                </button>
              </div>
            </div>
            {/* Row 2 */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.85rem", alignItems: "flex-end" }}>
              <div>
                <label className="form-label">Aseguradora</label>
                <select className="form-input" value={filters.aseguradora} onChange={e => handleChange("aseguradora", e.target.value)}>
                  {aseguradorasOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Contratante</label>
                <select className="form-input" value={filters.contratante} onChange={e => handleChange("contratante", e.target.value)}>
                  {contratantesOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Estatus</label>
                <select className="form-input" value={filters.estatus} onChange={e => handleChange("estatus", e.target.value)}>
                  {estatusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              {generated && data.length > 0 && (
                <div>
                  <button className="btn-secondary" style={{ width: "100%", justifyContent: "center", height: "36px" }}>
                    <Download size={14} />
                    Exportar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="card">
          {!generated ? (
            <div className="empty-state">
              <FileText size={40} color="#d1d5db" />
              <p style={{ marginTop: "0.75rem", fontWeight: 500 }}>Configure los filtros y pulse "Generar Reporte"</p>
              <p style={{ fontSize: "0.78rem", marginTop: "0.25rem" }}>Los resultados apareceran aqui</p>
            </div>
          ) : (
            <>
              <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #e8eaf0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>{data.length} resultado{data.length !== 1 ? "s" : ""} encontrado{data.length !== 1 ? "s" : ""}</span>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Principio Activo</th>
                      <th>No. Atencion</th>
                      <th>No. Fac. Externa</th>
                      <th>Fecha Fac. Externa</th>
                      <th>Fecha de Factura</th>
                      <th>Estatus</th>
                      <th>Delivery</th>
                      <th>No. Siniestro</th>
                      <th>No. Fact Profit</th>
                      <th>No. Pedido</th>
                      <th>Paciente</th>
                      <th>Cedula</th>
                      <th>Aseguradora</th>
                      <th>Contratante</th>
                      <th>Plan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.length === 0 ? (
                      <tr>
                        <td colSpan={15}>
                          <div className="empty-state">
                            <p>No se encontraron registros con los filtros aplicados</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      paginated.map(r => (
                        <tr key={r.id}>
                          <td style={{ fontWeight: 500 }}>{r.principioActivo}</td>
                          <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem" }}>{r.noAtencion}</td>
                          <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem" }}>{r.noFacExterna}</td>
                          <td style={{ color: "#6b7280" }}>{r.fechaFacExterna}</td>
                          <td style={{ color: "#6b7280" }}>{r.fechaFactura}</td>
                          <td>{getEstatusBadge(r.estatus)}</td>
                          <td style={{ color: "#6b7280" }}>{r.delivery}</td>
                          <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem" }}>{r.noSiniestro}</td>
                          <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem" }}>{r.noFactProfit}</td>
                          <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem" }}>{r.noPedido}</td>
                          <td style={{ fontWeight: 500, minWidth: 180 }}>{r.paciente}</td>
                          <td style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem" }}>{r.cedula}</td>
                          <td>{r.aseguradora}</td>
                          <td>{r.contratante}</td>
                          <td style={{ color: "#6b7280" }}>{r.plan}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {totalPages > 1 && (
                <div className="pagination">
                  <span>{(page - 1) * ROWS_PER_PAGE + 1}-{Math.min(page * ROWS_PER_PAGE, data.length)} de {data.length}</span>
                  <button onClick={() => setPage(p => p - 1)} disabled={page === 1}><ChevronLeft size={14} /></button>
                  <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}><ChevronRight size={14} /></button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
