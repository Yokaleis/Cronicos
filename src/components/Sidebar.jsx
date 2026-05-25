import { NavLink } from "react-router-dom";
import { Users, Bell, BarChart2, Settings, ChevronRight } from "lucide-react";
// Asegúrate de importar alertasData de tu mockData
import { alertasData } from "../data/mockData"; 

export default function Sidebar({ onOpenReportes }) {
  // Manejo de seguridad en caso de que alertasData no esté definido aún
  const alertCount = alertasData?.filter(a => a.prioridad === "alta").length || 0;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">V</div>
        <div>
          <h1>Vencare CRM</h1>
          <p>Gestion de pacientes cronicos</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/pacientes" className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}>
          <Users size={15} />
          Pacientes
        </NavLink>

        <NavLink to="/alertas" className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}>
          <Bell size={15} />
          Alertas
          {alertCount > 0 && <span className="nav-badge">{alertCount}</span>}
        </NavLink>

        {/* Botón que levanta el Modal en lugar de navegar a una ruta */}
        <button
          onClick={onOpenReportes}
          className="nav-item"
          style={{ width: "100%", textAlign: "left", cursor: "pointer", background: "none", border: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <BarChart2 size={15} />
          Reportes
        </button>

        <NavLink to="/configuracion" className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}>
          <Settings size={15} />
          Configuracion
          <ChevronRight size={13} style={{ marginLeft: "auto", opacity: 0.4 }} />
        </NavLink>
      </nav>

      <div style={{ padding: "1rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div className="avatar" style={{ width: 28, height: 28, fontSize: "0.65rem", display: "flex", alignItems: "center", justifyContent: "center", background: "#334155", borderRadius: "50%" }}>
            AD
          </div>
          <div>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.75rem", fontWeight: 600 }}>Admin</div>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.65rem" }}>admin@vencare.com</div>
          </div>
        </div>
      </div>
    </aside>
  );
}