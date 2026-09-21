"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendUp,
  TrendDown,
  CurrencyDollar,
  Plus,
  Trash,
  CheckCircle,
  Clock,
  XCircle,
  FilePdf,
  Calendar,
  ClipboardText,
  X,
} from "@phosphor-icons/react";
import { generarPDFMensual, generarPDFAnual } from "@/lib/pdf";

interface Registro {
  id: string;
  fecha: string;
  descripcion: string;
  monto: number;
  categoria?: string;
  creado: string;
}

interface Encargo {
  id: string;
  fecha: string;
  cliente: string;
  telefono: string;
  descripcion: string;
  monto: number;
  estado: "pendiente" | "en_curso" | "completado" | "cancelado";
  notas: string;
  creado: string;
}

const MESES = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
];

function formatMoney(n: number) {
  return "$" + n.toLocaleString("es-AR", { minimumFractionDigits: 0 });
}

function getMonthKey(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function getToday() {
  return new Date().toISOString().split("T")[0];
}

export default function AdminDashboard() {
  const [role, setRole] = useState<string | null>(null);
  const [ingresos, setIngresos] = useState<Registro[]>([]);
  const [gastos, setGastos] = useState<Registro[]>([]);
  const [encargos, setEncargos] = useState<Encargo[]>([]);
  const [mesActual, setMesActual] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  const [showIngreso, setShowIngreso] = useState(false);
  const [showGasto, setShowGasto] = useState(false);
  const [showEncargo, setShowEncargo] = useState(false);

  const [formIngreso, setFormIngreso] = useState({ fecha: "", descripcion: "", monto: "", categoria: "venta" });
  const [formGasto, setFormGasto] = useState({ fecha: "", descripcion: "", monto: "", categoria: "general" });
  const [formEncargo, setFormEncargo] = useState({ fecha: "", cliente: "", telefono: "", descripcion: "", monto: "", notas: "" });

  const [filtroEncargos, setFiltroEncargos] = useState<string>("todos");

  const isEmployee = role === "employee";
  const today = getToday();

  const cargarRol = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setRole(data.role);
      }
    } catch {
      // ignore
    }
  }, []);

  const cargarDatos = useCallback(async () => {
    const [i, g, e] = await Promise.all([
      fetch("/api/ingresos").then((r) => r.json()),
      fetch("/api/gastos").then((r) => r.json()),
      fetch("/api/encargos").then((r) => r.json()),
    ]);
    setIngresos(Array.isArray(i) ? i : []);
    setGastos(Array.isArray(g) ? g : []);
    setEncargos(Array.isArray(e) ? e : []);
  }, []);

  useEffect(() => {
    cargarRol();
  }, [cargarRol]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === "i") {
        e.preventDefault();
        setShowIngreso(true);
      }
      if (e.ctrlKey && e.key === "g") {
        e.preventDefault();
        setShowGasto(true);
      }
      if (e.ctrlKey && e.key === "e") {
        e.preventDefault();
        setShowEncargo(true);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const ingresosVisibles = isEmployee
    ? ingresos.filter((i) => i.fecha === today)
    : ingresos.filter((i) => getMonthKey(i.fecha) === mesActual);

  const gastosVisibles = isEmployee
    ? gastos.filter((g) => g.fecha === today)
    : gastos.filter((g) => getMonthKey(g.fecha) === mesActual);

  const totalIngresos = ingresosVisibles.reduce((s, i) => s + i.monto, 0);
  const totalGastos = gastosVisibles.reduce((s, g) => s + g.monto, 0);
  const ganancia = totalIngresos - totalGastos;

  async function addIngreso(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/ingresos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fecha: formIngreso.fecha || new Date().toISOString().split("T")[0],
        descripcion: formIngreso.descripcion,
        monto: formIngreso.monto,
        categoria: formIngreso.categoria,
      }),
    });
    setFormIngreso({ fecha: "", descripcion: "", monto: "", categoria: "venta" });
    setShowIngreso(false);
    cargarDatos();
  }

  async function addGasto(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/gastos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fecha: formGasto.fecha || new Date().toISOString().split("T")[0],
        descripcion: formGasto.descripcion,
        monto: formGasto.monto,
        categoria: formGasto.categoria,
      }),
    });
    setFormGasto({ fecha: "", descripcion: "", monto: "", categoria: "general" });
    setShowGasto(false);
    cargarDatos();
  }

  async function addEncargo(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/encargos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fecha: formEncargo.fecha || new Date().toISOString().split("T")[0],
        cliente: formEncargo.cliente,
        telefono: formEncargo.telefono,
        descripcion: formEncargo.descripcion,
        monto: formEncargo.monto,
        notas: formEncargo.notas,
      }),
    });
    setFormEncargo({ fecha: "", cliente: "", telefono: "", descripcion: "", monto: "", notas: "" });
    setShowEncargo(false);
    cargarDatos();
  }

  async function eliminarIngreso(id: string) {
    if (!confirm("¿Eliminar este ingreso?")) return;
    await fetch(`/api/ingresos?id=${id}`, { method: "DELETE" });
    cargarDatos();
  }

  async function eliminarGasto(id: string) {
    if (!confirm("¿Eliminar este gasto?")) return;
    await fetch(`/api/gastos?id=${id}`, { method: "DELETE" });
    cargarDatos();
  }

  async function eliminarEncargo(id: string) {
    if (!confirm("¿Eliminar este encargo?")) return;
    await fetch(`/api/encargos?id=${id}`, { method: "DELETE" });
    cargarDatos();
  }

  async function cambiarEstado(id: string, estado: Encargo["estado"]) {
    await fetch("/api/encargos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, estado }),
    });
    cargarDatos();
  }

  const meses = [...new Set([...ingresos, ...gastos].map((r) => getMonthKey(r.fecha)))].sort().reverse();

  const encargosVisibles = isEmployee
    ? encargos.filter((e) => e.fecha === today)
    : encargos;

  const encargosFiltrados = filtroEncargos === "todos"
    ? encargosVisibles
    : encargosVisibles.filter((e) => e.estado === filtroEncargos);

  const estadoBadge = (estado: string) => {
    const styles: Record<string, string> = {
      pendiente: "bg-yellow-100 text-yellow-700 border border-yellow-300",
      en_curso: "bg-blue-100 text-blue-700 border border-blue-300",
      completado: "bg-green-100 text-green-700 border border-green-300",
      cancelado: "bg-red-100 text-red-700 border border-red-300",
    };
    const labels: Record<string, string> = {
      pendiente: "Pendiente",
      en_curso: "En curso",
      completado: "Completado",
      cancelado: "Cancelado",
    };
    return (
      <span className={`text-sm px-3 py-1 rounded-full font-medium ${styles[estado] || ""}`}>
        {labels[estado] || estado}
      </span>
    );
  };

  const inputClass = "w-full px-4 py-3 bg-cream border-2 border-warm rounded-xl text-base text-text focus:outline-none focus:border-terracota";
  const modalInputClass = "w-full py-3 px-4 bg-cream border-2 border-warm rounded-xl text-base text-text focus:outline-none focus:border-terracota";

  return (
    <div className="max-w-7xl mx-auto px-5 py-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-[var(--font-dm-serif)] text-3xl sm:text-4xl text-text">
              {isEmployee ? "Panel de Empleada" : "Panel de Control"}
            </h1>
            <p className="text-lg text-text-light mt-1">
              {isEmployee ? "Registros de hoy" : "Resumen del mes seleccionado"}
            </p>
          </div>
          {!isEmployee && (
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <Calendar size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                <select
                  value={mesActual}
                  onChange={(e) => setMesActual(e.target.value)}
                  className="appearance-none pl-11 pr-8 py-3.5 bg-white border-2 border-warm rounded-2xl text-base text-text font-semibold shadow-sm hover:border-terracota/40 focus:outline-none focus:border-terracota focus:ring-2 focus:ring-terracota/10 transition-all cursor-pointer"
                >
                  {meses.length === 0 && (
                    <option value={mesActual}>
                      {MESES[new Date().getMonth()]} {new Date().getFullYear()}
                    </option>
                  )}
                  {meses.map((m) => {
                    const [y, mes] = m.split("-");
                    return (
                      <option key={m} value={m}>
                        {MESES[parseInt(mes) - 1]} {y}
                      </option>
                    );
                  })}
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted" width="14" height="14" viewBox="0 0 12 12" fill="none">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <button
                onClick={() => generarPDFMensual(mesActual, ingresos, gastos)}
                className="flex items-center gap-2 px-4 py-3.5 bg-red-500 text-white text-base font-semibold rounded-2xl shadow-sm hover:bg-red-600 hover:shadow-md transition-all"
              >
                <FilePdf size={20} />
                PDF Mes
              </button>
              <button
                onClick={() => generarPDFAnual(parseInt(mesActual.split("-")[0]), ingresos, gastos)}
                className="flex items-center gap-2 px-4 py-3.5 bg-red-500/80 text-white text-base font-semibold rounded-2xl shadow-sm hover:bg-red-600 hover:shadow-md transition-all"
              >
                <Calendar size={20} />
                PDF Anual
              </button>
            </div>
          )}
        </div>

        {/* Tarjetas resumen - admin only */}
        {!isEmployee && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-white rounded-3xl border-2 border-green-200 p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendUp size={24} className="text-green-600" />
                </div>
                <span className="text-base text-text-light">Ingresos</span>
              </div>
              <p className="text-3xl sm:text-4xl font-semibold text-green-600">{formatMoney(totalIngresos)}</p>
            </div>

            <div className="bg-white rounded-3xl border-2 border-red-200 p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <TrendDown size={24} className="text-red-500" />
                </div>
                <span className="text-base text-text-light">Gastos</span>
              </div>
              <p className="text-3xl sm:text-4xl font-semibold text-red-500">{formatMoney(totalGastos)}</p>
            </div>

            <div className="bg-white rounded-3xl border-2 border-terracota/30 p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-terracota/10 flex items-center justify-center">
                  <CurrencyDollar size={24} className="text-terracota" />
                </div>
                <span className="text-base text-text-light">Ganancia</span>
              </div>
              <p className={`text-3xl sm:text-4xl font-semibold ${ganancia >= 0 ? "text-terracota" : "text-red-500"}`}>
                {formatMoney(ganancia)}
              </p>
            </div>
          </div>
        )}

        {/* INGRESOS */}
        <section id="ingresos" className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <TrendUp size={24} className="text-green-600" />
              </div>
              <h2 className="font-[var(--font-dm-serif)] text-xl text-text">Ingresos</h2>
            </div>
            <button
              onClick={() => setShowIngreso(true)}
              className="flex items-center gap-2 text-base bg-terracota text-white px-5 py-3 rounded-2xl hover:bg-terracota-dark transition-colors"
            >
              <Plus size={20} /> Nuevo
            </button>
          </div>

          <div className="bg-white rounded-2xl border-2 border-warm/50 overflow-hidden">
            {ingresosVisibles.length === 0 ? (
              <p className="text-lg text-text-muted text-center py-8">{isEmployee ? "Sin ingresos hoy" : "Sin ingresos este mes"}</p>
            ) : (
              <div className="divide-y divide-warm/30">
                {ingresosVisibles.sort((a, b) => b.fecha.localeCompare(a.fecha)).map((ing) => (
                  <div key={ing.id} className="flex items-center justify-between px-5 py-4 hover:bg-cream/50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-base text-text truncate">{ing.descripcion}</p>
                      <p className="text-sm text-text-muted">{ing.fecha} · {ing.categoria}</p>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <span className="text-base font-medium text-green-600 whitespace-nowrap">+{formatMoney(ing.monto)}</span>
                      <button onClick={() => eliminarIngreso(ing.id)} className="p-2 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                        <Trash size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* GASTOS */}
        <section id="gastos" className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <TrendDown size={24} className="text-red-500" />
              </div>
              <h2 className="font-[var(--font-dm-serif)] text-xl text-text">Gastos</h2>
            </div>
            <button
              onClick={() => setShowGasto(true)}
              className="flex items-center gap-2 text-base bg-terracota text-white px-5 py-3 rounded-2xl hover:bg-terracota-dark transition-colors"
            >
              <Plus size={20} /> Nuevo
            </button>
          </div>

          <div className="bg-white rounded-2xl border-2 border-warm/50 overflow-hidden">
            {gastosVisibles.length === 0 ? (
              <p className="text-lg text-text-muted text-center py-8">{isEmployee ? "Sin gastos hoy" : "Sin gastos este mes"}</p>
            ) : (
              <div className="divide-y divide-warm/30">
                {gastosVisibles.sort((a, b) => b.fecha.localeCompare(a.fecha)).map((gas) => (
                  <div key={gas.id} className="flex items-center justify-between px-5 py-4 hover:bg-cream/50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-base text-text truncate">{gas.descripcion}</p>
                      <p className="text-sm text-text-muted">{gas.fecha} · {gas.categoria}</p>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <span className="text-base font-medium text-red-500 whitespace-nowrap">-{formatMoney(gas.monto)}</span>
                      <button onClick={() => eliminarGasto(gas.id)} className="p-2 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                        <Trash size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ENCARGOS */}
        <section id="encargos" className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-terracota/10 flex items-center justify-center">
                <ClipboardText size={24} className="text-terracota" />
              </div>
              <h2 className="font-[var(--font-dm-serif)] text-xl text-text">Encargos</h2>
            </div>
            <div className="flex items-center gap-3">
              {!isEmployee && (
                <div className="flex items-center gap-1 bg-white border-2 border-warm rounded-xl p-1">
                  {["todos", "pendiente", "en_curso", "completado", "cancelado"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFiltroEncargos(f)}
                      className={`text-sm px-3 py-2 rounded-lg transition-colors ${
                        filtroEncargos === f ? "bg-terracota text-white" : "text-text-light hover:bg-cream"
                      }`}
                    >
                      {f === "todos" ? "Todos" : f === "en_curso" ? "En curso" : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              )}
              <button
                onClick={() => setShowEncargo(true)}
                className="flex items-center gap-2 text-base bg-terracota text-white px-5 py-3 rounded-2xl hover:bg-terracota-dark transition-colors"
              >
                <Plus size={20} /> Nuevo
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-warm/50 overflow-hidden">
            {encargosFiltrados.length === 0 ? (
              <p className="text-lg text-text-muted text-center py-8">{isEmployee ? "Sin encargos hoy" : "Sin encargos"}</p>
            ) : (
              <div className="divide-y divide-warm/30">
                {encargosFiltrados.sort((a, b) => b.fecha.localeCompare(a.fecha)).map((enc) => (
                  <div key={enc.id} className="px-5 py-4 hover:bg-cream/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-base font-medium text-text">{enc.cliente}</p>
                          {estadoBadge(enc.estado)}
                        </div>
                        <p className="text-base text-text-light">{enc.descripcion}</p>
                        <div className="flex items-center gap-3 mt-1.5 text-sm text-text-muted">
                          <span>{enc.fecha}</span>
                          {enc.telefono && <span>Tel: {enc.telefono}</span>}
                          {enc.monto > 0 && <span className="text-terracota font-medium">{formatMoney(enc.monto)}</span>}
                        </div>
                        {enc.notas && <p className="text-sm text-text-muted mt-1 italic">{enc.notas}</p>}
                      </div>
                      <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                        {enc.estado !== "completado" && (
                          <button onClick={() => cambiarEstado(enc.id, "completado")} title="Marcar completado"
                            className="p-2 text-text-muted hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors">
                            <CheckCircle size={20} />
                          </button>
                        )}
                        {enc.estado === "completado" && (
                          <button onClick={() => cambiarEstado(enc.id, "pendiente")} title="Marcar pendiente"
                            className="p-2 text-text-muted hover:text-yellow-600 hover:bg-yellow-50 rounded-xl transition-colors">
                            <Clock size={20} />
                          </button>
                        )}
                        {enc.estado !== "cancelado" && (
                          <button onClick={() => cambiarEstado(enc.id, "cancelado")} title="Cancelar"
                            className="p-2 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                            <XCircle size={20} />
                          </button>
                        )}
                        <button onClick={() => eliminarEncargo(enc.id)} title="Eliminar"
                          className="p-2 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                          <Trash size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </motion.div>

      {/* MODAL: INGRESO */}
      <AnimatePresence>
        {showIngreso && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowIngreso(false)} />
            <motion.div
              className="relative bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <button onClick={() => setShowIngreso(false)} className="absolute top-4 right-4 p-2 text-text-muted hover:text-text rounded-xl hover:bg-warm/30 transition-colors">
                <X size={22} />
              </button>
              <h3 className="font-[var(--font-dm-serif)] text-xl text-text mb-5">Nuevo Ingreso</h3>
              <form onSubmit={addIngreso} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-base font-medium text-text mb-1.5">Fecha</label>
                    <input type="date" value={formIngreso.fecha} onChange={(e) => setFormIngreso({ ...formIngreso, fecha: e.target.value })}
                      className={modalInputClass} />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-text mb-1.5">Categoría</label>
                    <select value={formIngreso.categoria} onChange={(e) => setFormIngreso({ ...formIngreso, categoria: e.target.value })}
                      className={modalInputClass}>
                      <option value="venta">Venta</option>
                      <option value="encargo">Encargo</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-base font-medium text-text mb-1.5">Descripción</label>
                  <input type="text" value={formIngreso.descripcion} onChange={(e) => setFormIngreso({ ...formIngreso, descripcion: e.target.value })}
                    placeholder="Venta de lanas, medias, etc." required
                    className={modalInputClass} />
                </div>
                <div>
                  <label className="block text-base font-medium text-text mb-1.5">Monto ($)</label>
                  <input type="number" value={formIngreso.monto} onChange={(e) => setFormIngreso({ ...formIngreso, monto: e.target.value })}
                    placeholder="0" required min="0"
                    className={modalInputClass} />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="px-6 py-3 bg-terracota text-white text-base font-semibold rounded-xl hover:bg-terracota-dark transition-colors">
                    Guardar
                  </button>
                  <button type="button" onClick={() => setShowIngreso(false)} className="px-6 py-3 text-text-light text-base rounded-xl hover:bg-warm/30 transition-colors">
                    Cancelar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL: GASTO */}
      <AnimatePresence>
        {showGasto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowGasto(false)} />
            <motion.div
              className="relative bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <button onClick={() => setShowGasto(false)} className="absolute top-4 right-4 p-2 text-text-muted hover:text-text rounded-xl hover:bg-warm/30 transition-colors">
                <X size={22} />
              </button>
              <h3 className="font-[var(--font-dm-serif)] text-xl text-text mb-5">Nuevo Gasto</h3>
              <form onSubmit={addGasto} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-base font-medium text-text mb-1.5">Fecha</label>
                    <input type="date" value={formGasto.fecha} onChange={(e) => setFormGasto({ ...formGasto, fecha: e.target.value })}
                      className={modalInputClass} />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-text mb-1.5">Categoría</label>
                    <select value={formGasto.categoria} onChange={(e) => setFormGasto({ ...formGasto, categoria: e.target.value })}
                      className={modalInputClass}>
                      <option value="general">General</option>
                      <option value="alquiler">Alquiler</option>
                      <option value="servicios">Servicios</option>
                      <option value="mercadería">Mercadería</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-base font-medium text-text mb-1.5">Descripción</label>
                  <input type="text" value={formGasto.descripcion} onChange={(e) => setFormGasto({ ...formGasto, descripcion: e.target.value })}
                    placeholder="Alquiler, luz, mercadería, etc." required
                    className={modalInputClass} />
                </div>
                <div>
                  <label className="block text-base font-medium text-text mb-1.5">Monto ($)</label>
                  <input type="number" value={formGasto.monto} onChange={(e) => setFormGasto({ ...formGasto, monto: e.target.value })}
                    placeholder="0" required min="0"
                    className={modalInputClass} />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="px-6 py-3 bg-terracota text-white text-base font-semibold rounded-xl hover:bg-terracota-dark transition-colors">
                    Guardar
                  </button>
                  <button type="button" onClick={() => setShowGasto(false)} className="px-6 py-3 text-text-light text-base rounded-xl hover:bg-warm/30 transition-colors">
                    Cancelar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL: ENCARGO */}
      <AnimatePresence>
        {showEncargo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowEncargo(false)} />
            <motion.div
              className="relative bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <button onClick={() => setShowEncargo(false)} className="absolute top-4 right-4 p-2 text-text-muted hover:text-text rounded-xl hover:bg-warm/30 transition-colors">
                <X size={22} />
              </button>
              <h3 className="font-[var(--font-dm-serif)] text-xl text-text mb-5">Nuevo Encargo</h3>
              <form onSubmit={addEncargo} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-base font-medium text-text mb-1.5">Fecha</label>
                    <input type="date" value={formEncargo.fecha} onChange={(e) => setFormEncargo({ ...formEncargo, fecha: e.target.value })}
                      className={modalInputClass} />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-text mb-1.5">Cliente</label>
                    <input type="text" value={formEncargo.cliente} onChange={(e) => setFormEncargo({ ...formEncargo, cliente: e.target.value })}
                      placeholder="Nombre del cliente" required
                      className={modalInputClass} />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-text mb-1.5">Teléfono</label>
                    <input type="text" value={formEncargo.telefono} onChange={(e) => setFormEncargo({ ...formEncargo, telefono: e.target.value })}
                      placeholder="Opcional"
                      className={modalInputClass} />
                  </div>
                </div>
                <div>
                  <label className="block text-base font-medium text-text mb-1.5">Descripción del encargo</label>
                  <input type="text" value={formEncargo.descripcion} onChange={(e) => setFormEncargo({ ...formEncargo, descripcion: e.target.value })}
                    placeholder="Bufanda de lana roja, sweater infantil, etc." required
                    className={modalInputClass} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-base font-medium text-text mb-1.5">Monto ($)</label>
                    <input type="number" value={formEncargo.monto} onChange={(e) => setFormEncargo({ ...formEncargo, monto: e.target.value })}
                      placeholder="0" min="0"
                      className={modalInputClass} />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-text mb-1.5">Notas</label>
                    <input type="text" value={formEncargo.notas} onChange={(e) => setFormEncargo({ ...formEncargo, notas: e.target.value })}
                      placeholder="Color, tamaño, etc."
                      className={modalInputClass} />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="px-6 py-3 bg-terracota text-white text-base font-semibold rounded-xl hover:bg-terracota-dark transition-colors">
                    Guardar
                  </button>
                  <button type="button" onClick={() => setShowEncargo(false)} className="px-6 py-3 text-text-light text-base rounded-xl hover:bg-warm/30 transition-colors">
                    Cancelar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
