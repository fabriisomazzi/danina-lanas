"use client";

import { InstagramLogo, MapPin, Phone, WhatsappLogo } from "@phosphor-icons/react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-text text-cream/80">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/logo.png" alt="Danina" className="h-8 w-auto" />
              <span className="font-[var(--font-dm-serif)] text-xl text-cream tracking-tight">
                Danina
              </span>
            </div>
            <p className="text-sm text-cream/50 mt-3 leading-relaxed max-w-xs">
              Lanas, medias, ropa y accesorios. Un lugar para estar
              cómodo y encontrar lo que buscás.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] text-cream/40 font-medium mb-4">
              Contacto
            </h4>
            <div className="space-y-2.5">
              <a
                href="https://www.instagram.com/daninalanas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-cream/60 hover:text-terracota transition-colors"
              >
                <InstagramLogo size={15} weight="regular" />
                @daninalanas
              </a>
              <a
                href="https://wa.me/5493493456789"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-cream/60 hover:text-terracota transition-colors"
              >
                <WhatsappLogo size={15} weight="regular" />
                +54 9 (3493) 456-789
              </a>
              <div className="flex items-center gap-2 text-sm text-cream/60">
                <Phone size={15} weight="regular" />
                (03493) 456-789
              </div>
              <div className="flex items-center gap-2 text-sm text-cream/60">
                <MapPin size={15} weight="regular" />
                Av. Independencia 295, Sunchales
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] text-cream/40 font-medium mb-4">
              Horarios
            </h4>
            <div className="text-sm text-cream/60 space-y-1">
              <p>Lunes a Viernes: 9:00 - 18:00</p>
              <p>Sábados: 9:00 - 13:00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-cream/30">
            &copy; {year} Danina. Todos los derechos reservados.
          </p>
          <p className="text-xs text-cream/30">
            Desarrollado por{" "}
            <a
              href="https://fabdev.site"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-terracota transition-colors"
            >
              FABDEV
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
