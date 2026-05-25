import { Bell, AlertTriangle, Info, Clock } from 'lucide-react';
import { alertas } from '../data/mockData';

const urgencyConfig = {
  alta: {
    label: 'Alta',
    classes: 'bg-rose-50 text-rose-700 border-rose-100',
    icon: AlertTriangle,
    iconClass: 'text-rose-500',
    rowClass: 'border-l-4 border-l-rose-400',
  },
  media: {
    label: 'Media',
    classes: 'bg-amber-50 text-amber-700 border-amber-100',
    icon: Clock,
    iconClass: 'text-amber-500',
    rowClass: 'border-l-4 border-l-amber-400',
  },
  baja: {
    label: 'Baja',
    classes: 'bg-blue-50 text-blue-700 border-blue-100',
    icon: Info,
    iconClass: 'text-blue-500',
    rowClass: 'border-l-4 border-l-blue-400',
  },
};

export default function AlertasPage() {
  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center">
            <Bell size={18} className="text-slate-600" />
          </div>
          <h1 className="font-display text-xl font-700 text-dark-900 tracking-tight">
            ALERTAS
          </h1>
        </div>
        <span className="bg-brand-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md shadow-brand-600/30">
          {alertas.length} pendientes
        </span>
      </div>

      <div className="space-y-3">
        {alertas.map((alerta) => {
          const cfg = urgencyConfig[alerta.urgencia];
          const Icon = cfg.icon;
          return (
            <div
              key={alerta.id}
              className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex items-start gap-4 hover:shadow-md transition-all ${cfg.rowClass}`}
            >
              <div className={`mt-0.5 ${cfg.iconClass}`}>
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {alerta.tipo}
                  </span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${cfg.classes}`}
                  >
                    {cfg.label}
                  </span>
                </div>
                <p className="text-sm font-semibold text-dark-800">{alerta.mensaje}</p>
                <p className="text-xs text-slate-400 mt-1">{alerta.fecha}</p>
              </div>
              <button className="text-xs font-semibold text-brand-600 hover:text-brand-700 whitespace-nowrap transition-colors">
                Ver más
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
