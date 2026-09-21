"use client";

import { motion } from "motion/react";

const todasFotos = [
  { src: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=600&h=450&fit=crop", alt: "Madejas de lana" },
  { src: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&h=450&fit=crop", alt: "Medias tejidas" },
  { src: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=450&fit=crop", alt: "Ropa tejida artesanal" },
  { src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=450&fit=crop", alt: " prendas de vestir" },
  { src: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=450&fit=crop", alt: "Tejido a mano" },
  { src: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=600&h=450&fit=crop", alt: "Accesorios tejidos" },
];

export function Galeria() {
  return (
    <section id="galeria" className="py-16 sm:py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 mb-10 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-terracota font-medium mb-3">
            Galería
          </p>
          <h2 className="font-[var(--font-dm-serif)] text-3xl sm:text-4xl md:text-5xl tracking-tight text-text">
            Nuestros Productos
          </h2>
        </motion.div>
      </div>

      {/* Carrusel en móvil */}
      <div className="sm:hidden">
        <div className="flex gap-3 px-5 overflow-x-auto snap-x snap-mandatory pb-4 hide-scrollbar">
          {todasFotos.map((foto, i) => (
            <motion.div
              key={foto.src}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
              className="flex-shrink-0 snap-center w-[85vw] max-w-[320px]"
            >
              <div className="rounded-2xl overflow-hidden bg-warm/30 aspect-[4/3]">
                <img
                  src={foto.src}
                  alt={foto.alt}
                  className="w-full h-full object-cover active:scale-[0.98] transition-transform duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center gap-1.5 mt-3">
          {todasFotos.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-warm" />
          ))}
        </div>
      </div>

      {/* Grid en desktop */}
      <div className="hidden sm:block mx-auto max-w-6xl px-5">
        <div className="grid grid-cols-3 gap-4">
          {todasFotos.map((foto, i) => (
            <motion.div
              key={foto.src}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
              className="rounded-2xl overflow-hidden bg-warm/30 aspect-[4/3]"
            >
              <img
                src={foto.src}
                alt={foto.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
