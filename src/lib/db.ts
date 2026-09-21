import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error(
        "Faltan las variables de entorno NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY. Configuralas en Netlify."
      );
    }
    _supabase = createClient(url, key);
  }
  return _supabase;
}

export interface Ingreso {
  id: string;
  fecha: string;
  descripcion: string;
  monto: number;
  categoria: string;
  creado: string;
}

export interface Gasto {
  id: string;
  fecha: string;
  descripcion: string;
  monto: number;
  categoria: string;
  creado: string;
}

export interface Encargo {
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

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
