-- ============================================
-- SCRIPT DE SETUP PARA SUPABASE
-- Ejecutar esto en el SQL Editor de Supabase
-- ============================================

-- Tabla de Ingresos
CREATE TABLE IF NOT EXISTS ingresos (
  id TEXT PRIMARY KEY,
  fecha TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  monto NUMERIC NOT NULL DEFAULT 0,
  categoria TEXT DEFAULT 'venta',
  creado TEXT NOT NULL
);

-- Tabla de Gastos
CREATE TABLE IF NOT EXISTS gastos (
  id TEXT PRIMARY KEY,
  fecha TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  monto NUMERIC NOT NULL DEFAULT 0,
  categoria TEXT DEFAULT 'general',
  creado TEXT NOT NULL
);

-- Tabla de Encargos
CREATE TABLE IF NOT EXISTS encargos (
  id TEXT PRIMARY KEY,
  fecha TEXT NOT NULL,
  cliente TEXT NOT NULL,
  telefono TEXT DEFAULT '',
  descripcion TEXT NOT NULL,
  monto NUMERIC DEFAULT 0,
  estado TEXT DEFAULT 'pendiente',
  notas TEXT DEFAULT '',
  creado TEXT NOT NULL
);

-- Habilitar RLS (Row Level Security) pero sin restricciones
-- ya que las API routes manejan la autenticación
ALTER TABLE ingresos ENABLE ROW LEVEL SECURITY;
ALTER TABLE gastos ENABLE ROW LEVEL SECURITY;
ALTER TABLE encargos ENABLE ROW LEVEL SECURITY;

-- Políticas que permiten todo (la auth está en la API)
CREATE POLICY "Permitir todo en ingresos" ON ingresos FOR ALL USING (true);
CREATE POLICY "Permitir todo en gastos" ON gastos FOR ALL USING (true);
CREATE POLICY "Permitir todo en encargos" ON encargos FOR ALL USING (true);

-- Índices para búsquedas por fecha
CREATE INDEX IF NOT EXISTS idx_ingresos_fecha ON ingresos(fecha);
CREATE INDEX IF NOT EXISTS idx_gastos_fecha ON gastos(fecha);
CREATE INDEX IF NOT EXISTS idx_encargos_fecha ON encargos(fecha);
CREATE INDEX IF NOT EXISTS idx_encargos_estado ON encargos(estado);
