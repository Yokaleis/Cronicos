import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ReportesModal from "./components/ReportesModal";
import Pacientes from "./pages/Pacientes";
import Alertas from "./pages/Alertas";
import Configuracion from "./pages/Configuracion";

export default function App() {
  const [reportesOpen, setReportesOpen] = useState(false);

  return (
    <BrowserRouter>
      <Sidebar onOpenReportes={() => setReportesOpen(true)} />
      <Routes>
        <Route path="/" element={<Navigate to="/pacientes" replace />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/alertas" element={<Alertas />} />
        <Route path="/configuracion" element={<Configuracion />} />
      </Routes>
      <ReportesModal open={reportesOpen} onClose={() => setReportesOpen(false)} />
    </BrowserRouter>
  );
}
