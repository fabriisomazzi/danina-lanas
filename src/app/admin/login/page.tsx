"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Eye, EyeSlash } from "@phosphor-icons/react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setError("Usuario o contraseña incorrectos");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Error de conexión");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Danina" className="h-12 mx-auto mb-4" />
          <h1 className="font-[var(--font-dm-serif)] text-4xl text-text mb-2">
            Danina
          </h1>
          <p className="text-lg text-text-light">Panel de administración</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-lg font-medium text-text mb-2">
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-4 bg-white border-2 border-warm rounded-2xl text-lg text-text focus:outline-none focus:border-terracota focus:ring-1 focus:ring-terracota/20 transition-colors"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-text mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 pr-14 bg-white border-2 border-warm rounded-2xl text-lg text-text focus:outline-none focus:border-terracota focus:ring-1 focus:ring-terracota/20 transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-light transition-colors"
              >
                {showPass ? <EyeSlash size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-base text-red-500 bg-red-50 px-4 py-3 rounded-xl">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-terracota text-white text-lg font-semibold rounded-2xl hover:bg-terracota-dark transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="text-center text-sm text-text-muted mt-6">
          Solo personal autorizado
        </p>
      </motion.div>
    </div>
  );
}
