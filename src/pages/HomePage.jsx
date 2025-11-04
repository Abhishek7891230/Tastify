import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";
import { Showcase } from "../components/Showcase";

export function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Showcase />
      <Footer />
    </>
  );
}
