"use client";

import { motion } from "motion/react";
import { Heart, Scissors, Handshake } from "@phosphor-icons/react";
import { TexturaTejido } from "./TexturaTejido";

const pilares = [
  {
    icono: Heart,
    titulo: "Para toda la familia",
    texto: "Lanas, medias, ropa y accesorios para chicos y grandes.",
  },
  {
    icono: Scissors,
    titulo: "Lo que buscás, lo tenés",
    texto: "Elegimos productos que duran y que van a querer usar todos los días.",
  },
  {
    icono: Handshake,
    titulo: "Te ayudamos a elegir",
    texto: "Sabemos lo que vendemos y nos gusta que te vayas contento.",
  },
];

export function Historia() {
  return (
    <section id="historia" className="relative py-20 sm:py-28 bg-hueso overflow-hidden">
      <TexturaTejido />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-terracota font-medium mb-3">
              Nuestra historia
            </p>
            <h2 className="font-[var(--font-dm-serif)] text-3xl sm:text-4xl md:text-5xl tracking-tight text-text mb-6">
              Un lugar
              <br />
              <span className="text-terracota">cercano a vos</span>
            </h2>
            <p className="text-base text-text-light leading-relaxed mb-4 max-w-lg">
              Danina es una tienda de barrio donde vas a encontrar todo lo que
              necesitás: desde madejas para ese proyecto que tenés en mente,
              hasta medias y ropa para regalar o para vos.
            </p>
            <p className="text-base text-text-light leading-relaxed max-w-lg">
              Pasá a vernos, tomate un mates y charlamos. Eso somos, un lugar
              para estar tranquilo y encontrar lo que buscás.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&h=600&fit=crop"
                alt="Tejido artesanal en Danina"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-terracota/10 to-transparent" />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 lg:mt-24">
          {pilares.map((pilar, i) => {
            const Icon = pilar.icono;
            return (
              <motion.div
                key={pilar.titulo}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cream border border-warm/50 mb-4">
                  <Icon size={22} weight="regular" className="text-terracota" />
                </div>
                <h3 className="font-[var(--font-dm-serif)] text-lg text-text mb-2">
                  {pilar.titulo}
                </h3>
                <p className="text-sm text-text-light leading-relaxed max-w-xs mx-auto">
                  {pilar.texto}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
