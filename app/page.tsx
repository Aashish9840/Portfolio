import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Project from "./components/Project";
import Skills from "./components/Skills";

export default function Home() {
  return (
    <div>
      <div className=" bg-primary-background h-screen ">
        <Header />
        <Hero />
      </div>
      <AboutUs />
      <Skills />
      <Project />
      <ContactUs />
      <Footer />
    </div>
  );
}
