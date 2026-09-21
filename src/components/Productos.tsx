"use client";

import { motion } from "motion/react";
import { Yarn, TShirt, Sock, ShoppingBag } from "@phosphor-icons/react";

const categorias = [
  {
    titulo: "Lanas",
    descripcion: "Madejas en todos los colores y grosores. Lanas de primera calidad para tejer a mano o máquina.",
    icono: Yarn,
    color: "bg-rosa/20",
    iconColor: "text-rosa",
    imagen: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=600&h=400&fit=crop",
  },
  {
    titulo: "Medias",
    descripcion: "Medias para toda la familia: deportivas, de vestir, infantiles y más.",
    icono: Sock,
    color: "bg-oliva/15",
    iconColor: "text-oliva",
    imagen: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&h=400&fit=crop",
  },
  {
    titulo: "Ropa",
    descripcion: "Ropa para vestirte con estilo: sweaters, bufandas, gorros y más.",
    icono: TShirt,
    color: "bg-terracota/15",
    iconColor: "text-terracota",
    imagen: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop",
  },
  {
    titulo: "Accesorios",
    descripcion: "Bolsos, guantes, tapabocas y todo lo que necesitás.",
    icono: ShoppingBag,
    color: "bg-warm/60",
    iconColor: "text-text-light",
    imagen: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=600&h=400&fit=crop",
  },
];

export function Productos() {
  return (
    <section id="productos" className="py-20 sm:py-28 bg-cream">
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-14"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-terracota font-medium mb-3">
            Nuestros productos
          </p>
          <h2 className="font-[var(--font-dm-serif)] text-3xl sm:text-4xl md:text-5xl tracking-tight text-text">
            Todo lo que Amás
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {categorias.map((cat, i) => {
            const Icon = cat.icono;
            return (
              <motion.div
                key={cat.titulo}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                className="group relative bg-white rounded-2xl overflow-hidden border border-warm/50 hover:border-terracota/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
              >
                <div className="relative h-32 sm:h-48 overflow-hidden">
                  <img
                    src={cat.imagen}
                    alt={cat.titulo}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <div className="p-3 sm:p-5">
                  <div className={`inline-flex items-center justify-center w-9 h-9 rounded-full ${cat.color} mb-3`}>
                    <Icon size={18} weight="regular" className={cat.iconColor} />
                  </div>
                  <h3 className="font-[var(--font-dm-serif)] text-base sm:text-xl text-text mb-1 sm:mb-1.5">
                    {cat.titulo}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-light leading-relaxed hidden sm:block">
                    {cat.descripcion}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
