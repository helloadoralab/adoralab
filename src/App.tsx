import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import WhyChoose from "./components/WhyChoose";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-navy-900 font-sans text-white">
      {/* film grain overlay */}
      <div
        aria-hidden="true"
        className="noise-layer pointer-events-none fixed inset-0 z-[80] opacity-[0.045] mix-blend-soft-light"
      />

      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Pricing />
        <WhyChoose />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
