"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { List, X, MapPin, InstagramLogo } from "@phosphor-icons/react";

const navLinks = [
  { label: "Productos", href: "#productos" },
  { label: "Galería", href: "#galeria" },
  { label: "Historia", href: "#historia" },
  { label: "Ubicación", href: "#ubicacion" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-warm/50">
      <nav className="mx-auto max-w-6xl flex items-center justify-between h-16 px-5">
        <a href="#" className="flex items-center gap-2 group">
          <img src="/logo.png" alt="Danina" className="h-8 w-auto" />
          <span className="font-[var(--font-dm-serif)] text-2xl tracking-tight text-text font-normal italic">
            Danina
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-light hover:text-terracota transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.instagram.com/daninalanas"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-light hover:text-terracota transition-colors duration-200"
          >
            <InstagramLogo size={18} weight="regular" />
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-text-light hover:text-terracota transition-colors"
          aria-label="Menú"
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-cream border-b border-warm/50"
          >
            <div className="px-5 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-text-light hover:text-terracota transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://www.instagram.com/daninalanas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-light hover:text-terracota transition-colors py-1"
              >
                <InstagramLogo size={16} /> Instagram
              </a>
              <a
                href="https://maps.google.com/?q=Av.+Independencia+295,+Sunchales,+Santa+Fe,+Argentina"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-light hover:text-terracota transition-colors py-1"
              >
                <MapPin size={16} /> Cómo llegar
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
