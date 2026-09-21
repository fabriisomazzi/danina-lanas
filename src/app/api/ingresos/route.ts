import { NextRequest, NextResponse } from "next/server";
import { getSupabase, generateId } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("ingresos")
    .select("*")
    .order("fecha", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const supabase = getSupabase();

  const nuevo = {
    id: generateId(),
    fecha: body.fecha || new Date().toISOString().split("T")[0],
    descripcion: body.descripcion,
    monto: Number(body.monto),
    categoria: body.categoria || "venta",
    creado: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("ingresos")
    .insert(nuevo)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID requerido" }, { status: 400 });
  }

  const supabase = getSupabase();
  const { error } = await supabase.from("ingresos").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
