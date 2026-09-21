"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  House,
  TrendUp,
  TrendDown,
  ClipboardText,
} from "@phosphor-icons/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-cream">
      {!isLogin && (
        <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-warm/50">
          <nav className="max-w-7xl mx-auto flex items-center justify-between h-16 px-5">
            <div className="flex items-center gap-6">
              <Link
                href="/admin"
                className="flex items-center gap-3"
              >
                <img src="/logo.png" alt="Danina" className="h-8" />
                <span className="font-[var(--font-dm-serif)] text-xl text-text">
                  Danina
                </span>
              </Link>
              <span className="text-sm bg-terracota/10 text-terracota px-3 py-1 rounded-full font-medium">
                Admin
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="text-base text-text-muted hover:text-terracota transition-colors px-4 py-2 rounded-xl hover:bg-warm/30"
              >
                Salir
              </button>
            </div>
          </nav>
        </header>
      )}

      <main className={isLogin ? "" : "pt-16"}>{children}</main>
    </div>
  );
}
