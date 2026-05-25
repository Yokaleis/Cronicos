import { Settings, User, Shield, Bell, Database, ChevronRight } from "lucide-react";

const sections = [
  { icon: User, title: "Perfil de usuario", desc: "Datos personales y preferencias de cuenta" },
  { icon: Shield, title: "Seguridad", desc: "Contrasena, autenticacion y permisos" },
  { icon: Bell, title: "Notificaciones", desc: "Configurar alertas y notificaciones del sistema" },
  { icon: Database, title: "Datos del sistema", desc: "Gestion de aseguradoras, planes y contratantes" },
];

export default function Configuracion() {
  return (
    <div className="main-content">
      <div className="topbar">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Settings size={18} color="#374151" />
          <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>Configuracion</span>
        </div>
        <div className="avatar">AD</div>
      </div>

      <div className="page-content">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
          <Settings size={18} color="#e5173f" />
          <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700 }}>CONFIGURACION</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
          {sections.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card" style={{ padding: "1rem 1.25rem", display: "flex", alignItems: "center", gap: "1rem", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.background = "#f9fafb"}
              onMouseLeave={e => e.currentTarget.style.background = "white"}>
              <div style={{ width: 40, height: 40, background: "#f4f6fb", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={18} color="#6b7280" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{title}</div>
                <div style={{ fontSize: "0.78rem", color: "#9ca3af", marginTop: "1px" }}>{desc}</div>
              </div>
              <ChevronRight size={16} color="#9ca3af" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
