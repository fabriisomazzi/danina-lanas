"use client";

import { motion } from "motion/react";
import { ArrowDown } from "@phosphor-icons/react";
import { OvilloDecorativo } from "./OvilloDecorativo";
import { HiloDecorativo } from "./HiloDecorativo";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Danina",
            description: "Lanas, medias, ropa y accesorios en Sunchales, Santa Fe",
            image: "/logo.png",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Av. Independencia 295",
              addressLocality: "Sunchales",
              addressRegion: "Santa Fe",
              addressCountry: "AR",
            },
            url: "https://danina.com.ar",
            telephone: "+54-3493-456-789",
            sameAs: ["https://www.instagram.com/daninalanas"],
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:00",
                closes: "18:00",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Saturday",
                opens: "09:00",
                closes: "13:00",
              },
            ],
            priceRange: "$",
            geo: {
              "@type": "GeoCoordinates",
              latitude: -30.9454,
              longitude: -61.563,
            },
          }),
        }}
      />
      <HiloDecorativo />
      <OvilloDecorativo />

      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center pt-24 sm:pt-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs uppercase tracking-[0.2em] text-terracota font-medium mb-4 sm:mb-6"
        >
          Bienvenidos a Danina
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-[var(--font-dm-serif)] text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-text mb-5 sm:mb-6"
        >
          Todo lo que
          <br />
          <span className="text-terracota">te gusta</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm sm:text-lg text-text-light max-w-md mx-auto mb-8 sm:mb-10 leading-relaxed px-2"
        >
          Lanas, medias, ropa y accesorios. Pasá a visitarnos y encontrá
          eso que estabas buscando. Te esperamos en Sunchales.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#productos"
            className="inline-flex items-center justify-center px-7 py-3.5 bg-terracota text-white text-sm font-medium rounded-full hover:bg-terracota-dark transition-all duration-200 active:scale-[0.97]"
          >
            Ver productos
          </a>
          <a
            href="https://www.instagram.com/daninalanas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-7 py-3.5 border border-warm text-text-light text-sm font-medium rounded-full hover:border-terracota hover:text-terracota transition-all duration-200 active:scale-[0.97]"
          >
            Seguinos en Instagram
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#productos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted hover:text-terracota transition-colors"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={20} weight="regular" />
        </motion.div>
      </motion.a>
    </section>
  );
}
