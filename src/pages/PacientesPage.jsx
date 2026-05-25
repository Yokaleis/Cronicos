import { useState, useMemo } from 'react';
import { Users, Plus, Search, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { patients } from '../data/mockData';

const PAGE_SIZE_OPTIONS = [10, 25, 50];

export default function PacientesPage() {
  const [searchName, setSearchName] = useState('');
  const [searchAseguradora, setSearchAseguradora] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showModal, setShowModal] = useState(false);

  const filtered = useMemo(() => {
    return patients.filter((p) => {
      const nameMatch =
        !searchName ||
        p.nombre.toLowerCase().includes(searchName.toLowerCase()) ||
        p.ci.includes(searchName);
      const asegMatch =
        !searchAseguradora ||
        p.aseguradora.toLowerCase().includes(searchAseguradora.toLowerCase());
      return nameMatch && asegMatch;
    });
  }, [searchName, searchAseguradora]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSearch = () => {
    setPage(1);
  };

  return (
    <div className="p-6 max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center">
            <Users size={18} className="text-slate-600" />
          </div>
          <h1 className="font-display text-xl font-700 text-dark-900 tracking-tight">
            PACIENTES
          </h1>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 shadow-lg shadow-brand-600/25 hover:shadow-brand-600/40 active:scale-95"
        >
          <Plus size={16} />
          Crear paciente
        </button>
      </div>

      {/* Search card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-5">
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-48">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Nombre o Cédula
            </label>
            <input
              type="text"
              placeholder="Nombre o cédula"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
            />
          </div>
          <div className="flex-1 min-w-48">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Aseguradora
            </label>
            <input
              type="text"
              placeholder="Aseguradora"
              value={searchAseguradora}
              onChange={(e) => setSearchAseguradora(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="w-10 h-10 bg-brand-600 hover:bg-brand-700 text-white rounded-xl flex items-center justify-center transition-all active:scale-95 shadow-md shadow-brand-600/30"
            >
              <Search size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                {['Nombre', 'C.I.', 'Teléfono', 'Aseguradora', 'Plan', 'Asegurado', 'Acciones'].map((col) => (
                  <th
                    key={col}
                    className="text-left px-4 py-3 text-xs font-700 text-slate-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400 text-sm">
                    No se encontraron pacientes
                  </td>
                </tr>
              ) : (
                paginated.map((p, idx) => (
                  <tr
                    key={p.id}
                    className={`border-b border-slate-50 hover:bg-brand-50/30 transition-colors ${
                      idx % 2 === 0 ? '' : 'bg-slate-50/30'
                    }`}
                  >
                    <td className="px-4 py-3 font-semibold text-dark-800 whitespace-nowrap">
                      {p.nombre}
                    </td>
                    <td className="px-4 py-3 text-slate-600 font-mono text-xs">{p.ci}</td>
                    <td className="px-4 py-3 text-slate-600">{p.telefono}</td>
                    <td className="px-4 py-3 text-slate-700 font-medium">{p.aseguradora}</td>
                    <td className="px-4 py-3 text-slate-600">{p.plan}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          p.asegurado === 'Activo'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            : 'bg-rose-50 text-rose-600 border border-rose-100'
                        }`}
                      >
                        {p.asegurado}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors text-slate-400 hover:text-slate-700">
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50/40">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Filas por página:</span>
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
              className="border border-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/30 bg-white"
            >
              {PAGE_SIZE_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>
              {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} de {filtered.length}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={13} />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || totalPages === 0}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create patient modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in">
            <h2 className="font-display text-lg font-700 text-dark-900 mb-4">Crear Paciente</h2>
            <div className="space-y-3">
              {['Nombre completo', 'Cédula de identidad', 'Teléfono', 'Aseguradora', 'Plan'].map((field) => (
                <div key={field}>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{field}</label>
                  <input
                    type="text"
                    placeholder={field}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-5 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700 transition-all shadow-md shadow-brand-600/30"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
