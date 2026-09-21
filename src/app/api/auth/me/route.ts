import { NextResponse } from "next/server";
import { getCurrentRole } from "@/lib/auth";

export async function GET() {
  const role = await getCurrentRole();
  if (!role) {
    return NextResponse.json({ role: null }, { status: 401 });
  }
  return NextResponse.json({ role });
}
