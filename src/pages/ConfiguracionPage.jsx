import { Settings, User, Shield, Bell, Database, Palette, ChevronRight } from 'lucide-react';

const sections = [
  { icon: User, label: 'Perfil de usuario', desc: 'Nombre, correo y datos personales' },
  { icon: Shield, label: 'Seguridad', desc: 'Contraseña y autenticación' },
  { icon: Bell, label: 'Notificaciones', desc: 'Preferencias de alertas y avisos' },
  { icon: Database, label: 'Datos y respaldos', desc: 'Exportar y respaldar información' },
  { icon: Palette, label: 'Apariencia', desc: 'Tema y preferencias visuales' },
];

export default function ConfiguracionPage() {
  return (
    <div className="p-6 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center">
          <Settings size={18} className="text-slate-600" />
        </div>
        <h1 className="font-display text-xl font-700 text-dark-900 tracking-tight">
          CONFIGURACIÓN
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-50 overflow-hidden">
        {sections.map(({ icon: Icon, label, desc }) => (
          <button
            key={label}
            className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-brand-50 flex items-center justify-center transition-colors">
              <Icon size={17} className="text-slate-500 group-hover:text-brand-600 transition-colors" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-dark-800">{label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
            </div>
            <ChevronRight size={15} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
          </button>
        ))}
      </div>

      <p className="text-center text-xs text-slate-400 mt-6">Vencare CRM v1.0.0</p>
    </div>
  );
}
