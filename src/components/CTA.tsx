"use client";

import { motion } from "motion/react";
import { InstagramLogo, WhatsappLogo } from "@phosphor-icons/react";

export function CTA() {
  return (
    <section className="py-20 sm:py-28 bg-hueso">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="font-[var(--font-dm-serif)] text-3xl sm:text-4xl md:text-5xl tracking-tight text-text mb-5">
            ¿Necesitás
            <br />
            <span className="text-terracota">algo?</span>
          </h2>
          <p className="text-base text-text-light leading-relaxed max-w-md mx-auto mb-8">
            Escribinos por Instagram o WhatsApp y te ayudamos a encontrar lo que necesitás.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.instagram.com/daninalanas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-terracota text-white text-sm font-medium rounded-full hover:bg-terracota-dark transition-all duration-200 active:scale-[0.97]"
            >
              <InstagramLogo size={18} weight="regular" />
              Instagram
            </a>
            <a
              href="https://wa.me/5493493456789"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-oliva text-white text-sm font-medium rounded-full hover:bg-oliva-dark transition-all duration-200 active:scale-[0.97]"
            >
              <WhatsappLogo size={18} weight="regular" />
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
