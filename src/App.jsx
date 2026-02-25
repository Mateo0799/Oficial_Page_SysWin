import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import ServiceCard from "./components/ServiceCard";
import WhatsAppChat from "./components/WhatsAppChat";

export default function App() {

  // ================= FORM STATE =================
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        form,
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      )
      .then(() => {
        setLoading(false);
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });

        setTimeout(() => {
          setSuccess(false);
        }, 4000);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  // ================= SCROLL =================
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -80;
      const y =
        section.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const stats = [
    { number: 4, label: "Años de experiencia" },
    { number: 10, label: "Proyectos Entregados" },
    { number: 6, label: "Clientes Activos" },
    { number: 100, label: "% Enfoque en Innovación" },
    { number: 8, label: "Tecnologías Dominadas" }
  ];

  return (
    <div className="bg-slate-950 text-white overflow-hidden">

      {/* Glow background */}
      <div className="fixed top-0 left-1/2 w-[900px] h-[900px] bg-cyan-500/20 blur-[200px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      {/* ================= NAVBAR ================= */}
      <nav className="flex justify-between items-center px-10 py-6 backdrop-blur-2xl bg-white/5 border-b border-white/10 sticky top-0 z-50">

        <h1 className="text-2xl font-bold tracking-widest bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          SYSWIN
        </h1>

        <div className="space-x-8 text-gray-300 hidden md:flex">
          {[
            { label: "Nosotros", id: "about" },
            { label: "Servicios", id: "services" },
            { label: "Contacto", id: "contact" }
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => scrollToSection(item.id)}
              className="relative group"
            >
              <span className="group-hover:text-cyan-400 transition duration-300">
                {item.label}
              </span>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          Soluciones Digitales <br /> que Impulsan tu Empresa
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-6 max-w-2xl text-gray-400 text-lg"
        >
          Desarrollo de software, automatización inteligente y sistemas
          empresariales escalables.
        </motion.p>

        <motion.button
          onClick={() => scrollToSection("contact")}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-10 px-8 py-4 bg-cyan-500 rounded-xl font-semibold hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/30"
        >
          Comenzar Proyecto
        </motion.button>

      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="py-24 px-10 text-center">
        <h3 className="text-4xl font-bold mb-8 text-cyan-400">
          ¿Quiénes Somos?
        </h3>
        <p className="max-w-3xl mx-auto text-gray-400 text-lg">
          En SysWin desarrollamos soluciones tecnológicas modernas enfocadas en
          rendimiento, escalabilidad y automatización empresarial.
          Transformamos ideas en sistemas reales.
        </p>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="py-32 px-10 relative z-10">
        <h3 className="text-4xl font-bold text-center mb-20 text-cyan-400">
          Servicios Estratégicos
        </h3>

        <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-3">

          <ServiceCard title="Desarrollo de Software">
            <p>
              Creamos soluciones personalizadas basadas en la lógica de tu negocio,
              diseñadas para escalar y evolucionar con el crecimiento de tu empresa.
            </p>
          </ServiceCard>

          <ServiceCard title="Desarrollo de Aplicaciones Web">
            <p>
              Construimos aplicaciones modernas, seguras y optimizadas para alto
              rendimiento, enfocadas en experiencia de usuario y conversión.
            </p>
          </ServiceCard>

          <ServiceCard title="Desarrollo de Código Seguro">
            <p>
              Implementamos estándares avanzados de seguridad, protección de datos
              y arquitectura robusta para empresas que exigen confiabilidad.
            </p>
          </ServiceCard>

        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-24 px-10 bg-slate-900/40 backdrop-blur-xl relative z-10">

        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16 text-cyan-400"
        >
          Datos que respaldan nuestra experiencia
        </motion.h3>

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-10 text-center">
          {stats.map((item, index) => {
            const { ref, inView } = useInView({
              triggerOnce: true,
              threshold: 0.5,
            });

            return (
              <motion.div
                key={index}
                ref={ref}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg"
              >
                <div className="text-5xl font-bold text-cyan-400">
                  {inView && <CountUp end={item.number} duration={2} />}+
                </div>
                <p className="mt-4 text-gray-400">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="py-24 px-10 text-center">
        <h3 className="text-4xl font-bold mb-6 text-cyan-400">
          Contáctanos
        </h3>

        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto mt-10 space-y-6 bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-xl"
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            required
            className="w-full p-4 bg-slate-800 rounded-xl"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Tu email"
            required
            className="w-full p-4 bg-slate-800 rounded-xl"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Cuéntanos sobre tu proyecto"
            required
            rows="5"
            className="w-full p-4 bg-slate-800 rounded-xl"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full px-10 py-4 bg-cyan-500 rounded-xl font-semibold hover:bg-cyan-400 transition"
          >
            {loading ? "Enviando..." : "Enviar Mensaje"}
          </button>

          {success && (
            <p className="text-green-400 mt-4">
              ✅ Mensaje enviado correctamente. Te responderemos pronto.
            </p>
          )}
        </form>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-8 text-center border-t border-white/10 text-gray-500">
        © 2026 SysWin — Tecnología que impulsa el futuro.
      </footer>

      <WhatsAppChat />
    </div>
  );
}