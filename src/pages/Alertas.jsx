import { Bell, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { alertasData } from "../data/mockData";

const prioridadConfig = {
  alta: { color: "#dc2626", bg: "#fee2e2", icon: AlertTriangle, label: "Alta" },
  media: { color: "#d97706", bg: "#fef9c3", icon: Info, label: "Media" },
  baja: { color: "#059669", bg: "#dcfce7", icon: CheckCircle, label: "Baja" },
};

export default function Alertas() {
  const alta = alertasData.filter(a => a.prioridad === "alta");
  const media = alertasData.filter(a => a.prioridad === "media");
  const baja = alertasData.filter(a => a.prioridad === "baja");

  return (
    <div className="main-content">
      <div className="topbar">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Bell size={18} color="#374151" />
          <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>Alertas</span>
        </div>
        <div className="avatar">AD</div>
      </div>

      <div className="page-content">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
          <Bell size={18} color="#e5173f" />
          <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700 }}>ALERTAS</h2>
          <span style={{ marginLeft: "0.5rem", background: "#e5173f", color: "white", fontSize: "0.7rem", fontWeight: 700, padding: "2px 8px", borderRadius: 999 }}>{alertasData.length}</span>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.85rem", marginBottom: "1.25rem" }}>
          {[
            { label: "Alta prioridad", count: alta.length, color: "#dc2626", bg: "#fee2e2" },
            { label: "Media prioridad", count: media.length, color: "#d97706", bg: "#fef9c3" },
            { label: "Baja prioridad", count: baja.length, color: "#059669", bg: "#dcfce7" },
          ].map(s => (
            <div key={s.label} className="card" style={{ padding: "1rem" }}>
              <div style={{ fontSize: "1.75rem", fontWeight: 800, color: s.color }}>{s.count}</div>
              <div style={{ fontSize: "0.78rem", color: "#6b7280", marginTop: "2px" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Alerts list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {alertasData.map(alerta => {
            const cfg = prioridadConfig[alerta.prioridad];
            const Icon = cfg.icon;
            return (
              <div key={alerta.id} className="card" style={{ padding: "0.85rem 1rem", display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={16} color={cfg.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2px" }}>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, color: cfg.color, textTransform: "uppercase", letterSpacing: "0.05em" }}>{alerta.tipo}</span>
                    <span style={{ fontSize: "0.68rem", background: cfg.bg, color: cfg.color, padding: "1px 7px", borderRadius: 999, fontWeight: 600 }}>{cfg.label}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "#111827", fontWeight: 500 }}>{alerta.mensaje}</p>
                  <span style={{ fontSize: "0.72rem", color: "#9ca3af" }}>{alerta.fecha}</span>
                </div>
                <button style={{ background: "none", border: "1px solid #e8eaf0", borderRadius: 6, padding: "4px 10px", fontSize: "0.72rem", cursor: "pointer", color: "#6b7280", flexShrink: 0 }}>
                  Resolver
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
