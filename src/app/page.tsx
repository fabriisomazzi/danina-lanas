import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Productos } from "@/components/Productos";
import { Galeria } from "@/components/Galeria";
import { Historia } from "@/components/Historia";
import { Ubicacion } from "@/components/Ubicacion";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { DividerTejido } from "@/components/DividerTejido";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <DividerTejido />
        <Productos />
        <DividerTejido invertido />
        <Galeria />
        <DividerTejido />
        <Historia />
        <DividerTejido invertido />
        <Ubicacion />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
