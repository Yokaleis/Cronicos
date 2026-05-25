import { useState } from "react";
import { Plus, Search, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { pacientes } from "../data/mockData";

const ROWS_PER_PAGE = 10;

export default function Pacientes() {
  const [searchNombre, setSearchNombre] = useState("");
  const [searchAseg, setSearchAseg] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [filtered, setFiltered] = useState(pacientes);

  const handleSearch = () => {
    const result = pacientes.filter(p => {
      const matchNombre = p.nombre.toLowerCase().includes(searchNombre.toLowerCase()) || p.ci.includes(searchNombre);
      const matchAseg = p.aseguradora.toLowerCase().includes(searchAseg.toLowerCase());
      return matchNombre && matchAseg;
    });
    setFiltered(result);
    setPage(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  return (
    <div className="main-content">
      <div className="topbar">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Users2Icon />
          <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>Pacientes</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div className="avatar">AD</div>
        </div>
      </div>

      <div className="page-content">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Users2Icon color="#e5173f" />
            <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#111827" }}>PACIENTES</h2>
          </div>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={15} />
            Crear paciente
          </button>
        </div>

        <div className="card">
          {/* Search bar */}
          <div style={{ padding: "1rem 1rem 0.75rem", borderBottom: "1px solid #e8eaf0", display: "flex", gap: "0.75rem", alignItems: "flex-end", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 200px" }}>
              <label className="form-label">Nombre o Cedula</label>
              <input
                className="form-input"
                placeholder="Nombre o cedula"
                value={searchNombre}
                onChange={e => setSearchNombre(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div style={{ flex: "1 1 200px" }}>
              <label className="form-label">Aseguradora</label>
              <input
                className="form-input"
                placeholder="Aseguradora"
                value={searchAseg}
                onChange={e => setSearchAseg(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button className="search-btn" onClick={handleSearch} title="Buscar">
              <Search size={16} />
            </button>
          </div>

          {/* Table */}
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>C.I.</th>
                  <th>Telefono</th>
                  <th>Aseguradora</th>
                  <th>Plan</th>
                  <th>Asegurado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <div className="empty-state">
                        <p>No se encontraron pacientes</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginated.map(p => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: 500 }}>{p.nombre}</td>
                      <td style={{ fontFamily: "'DM Mono', monospace", color: "#6b7280" }}>{p.ci}</td>
                      <td style={{ color: "#6b7280" }}>{p.telefono}</td>
                      <td>{p.aseguradora}</td>
                      <td style={{ color: "#6b7280" }}>{p.plan}</td>
                      <td>
                        <span className={p.asegurado === "Activo" ? "badge-active" : "badge-inactive"}>
                          {p.asegurado}
                        </span>
                      </td>
                      <td>
                        <button style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: "2px" }}>
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <span style={{ marginRight: "0.5rem" }}>Filas por pagina: <strong>{ROWS_PER_PAGE}</strong></span>
            <span style={{ marginRight: "0.5rem" }}>
              {filtered.length === 0 ? "0-0 de 0" : `${(page - 1) * ROWS_PER_PAGE + 1}-${Math.min(page * ROWS_PER_PAGE, filtered.length)} de ${filtered.length}`}
            </span>
            <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
              <ChevronLeft size={14} />
            </button>
            <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages || totalPages === 0}>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Create patient modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowModal(false)}>
          <div style={{ background: "white", borderRadius: 12, padding: "2rem", width: "100%", maxWidth: 480, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }} onClick={e => e.stopPropagation()}>
            <h3 style={{ margin: "0 0 1.25rem", fontSize: "1rem", fontWeight: 700 }}>Crear nuevo paciente</h3>
            <div style={{ display: "grid", gap: "0.85rem" }}>
              {["Nombre completo", "Cedula de identidad", "Telefono", "Aseguradora", "Plan"].map(label => (
                <div key={label}>
                  <label className="form-label">{label}</label>
                  <input className="form-input" placeholder={label} />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem", justifyContent: "flex-end" }}>
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btn-primary" onClick={() => setShowModal(false)}>
                <Plus size={14} />
                Crear paciente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Users2Icon({ color = "#374151" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}
