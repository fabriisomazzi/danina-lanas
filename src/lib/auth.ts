import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET = new TextEncoder().encode(
  process.env.ADMIN_SECRET || "danina-lanas-secret-key-super-segura-2024"
);

const USERS: Record<string, { password: string; role: "admin" | "employee" }> = {
  danina: { password: "Danina2024!", role: "admin" },
  empleada: { password: "Empleada2024!", role: "employee" },
};

export async function verifyCredentials(
  username: string,
  password: string
): Promise<{ valid: boolean; role?: "admin" | "employee" }> {
  const user = USERS[username];
  if (!user || user.password !== password) return { valid: false };
  return { valid: true, role: user.role };
}

export async function createToken(role: "admin" | "employee"): Promise<string> {
  return new SignJWT({ role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(SECRET);
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function getRoleFromToken(token: string): Promise<"admin" | "employee" | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return (payload.role as "admin" | "employee") || null;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return false;
  return verifyToken(token);
}

export async function getCurrentRole(): Promise<"admin" | "employee" | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return null;
  return getRoleFromToken(token);
}
