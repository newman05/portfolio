import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import Links from "@/components/Links";
import Profiles from "@/components/Profiles";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Projects />
        <Profiles/>
        <br />
      </main>
      <Footer />
    </>
  );
}