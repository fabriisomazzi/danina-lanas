"use client";

import { motion } from "motion/react";
import { MapPin, Clock, Phone, InstagramLogo, WhatsappLogo } from "@phosphor-icons/react";

export function Ubicacion() {
  return (
    <section id="ubicacion" className="py-20 sm:py-28 bg-cream">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-terracota font-medium mb-3">
              Visitános
            </p>
            <h2 className="font-[var(--font-dm-serif)] text-3xl sm:text-4xl md:text-5xl tracking-tight text-text mb-8">
              Encontrános
            </h2>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-terracota/10 flex items-center justify-center mt-0.5">
                  <MapPin size={18} weight="regular" className="text-terracota" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-text mb-0.5">Dirección</h4>
                  <p className="text-sm text-text-light leading-relaxed">
                    Av. Independencia 295
                    <br />
                    Sunchales, Santa Fe
                    <br />
                    Argentina
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-terracota/10 flex items-center justify-center mt-0.5">
                  <Clock size={18} weight="regular" className="text-terracota" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-text mb-0.5">Horarios</h4>
                  <p className="text-sm text-text-light leading-relaxed">
                    Lunes a Viernes: 9:00 a 18:00
                    <br />
                    Sábados: 9:00 a 13:00
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-terracota/10 flex items-center justify-center mt-0.5">
                  <Phone size={18} weight="regular" className="text-terracota" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-text mb-0.5">Teléfono</h4>
                  <p className="text-sm text-text-light leading-relaxed">
                    (03493) 456-789
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-terracota/10 flex items-center justify-center mt-0.5">
                  <WhatsappLogo size={18} weight="regular" className="text-terracota" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-text mb-0.5">WhatsApp</h4>
                  <a
                    href="https://wa.me/5493493456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-terracota hover:text-terracota-dark transition-colors"
                  >
                    +54 9 (3493) 456-789
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-terracota/10 flex items-center justify-center mt-0.5">
                  <InstagramLogo size={18} weight="regular" className="text-terracota" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-text mb-0.5">Instagram</h4>
                  <a
                    href="https://www.instagram.com/daninalanas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-terracota hover:text-terracota-dark transition-colors"
                  >
                    @daninalanas
                  </a>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Av.+Independencia+295,+Sunchales,+Santa+Fe,+Argentina"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-terracota text-white text-sm font-medium rounded-full hover:bg-terracota-dark transition-all duration-200 active:scale-[0.97]"
            >
              Cómo llegar
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden aspect-square lg:aspect-auto lg:min-h-[480px] border border-warm/50"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3065.4506913616074!2d-61.5630025!3d-30.945400699999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x943545b55007ca37%3A0x1a23adabc55eb46f!2sDanina%20Lanas%20Y%20Medias!5e0!3m2!1ses!2sar!4v1789839964042!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "300px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Ubicación de Danina Lanas en Sunchales"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
