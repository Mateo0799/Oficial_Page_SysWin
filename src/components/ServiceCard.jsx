import { motion } from "framer-motion";
import { useState } from "react";

export default function ServiceCard({ title, children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty(
          "--x",
          `${e.clientX - rect.left}px`
        );
        e.currentTarget.style.setProperty(
          "--y",
          `${e.clientY - rect.top}px`
        );
      }}
      className="relative group p-8 rounded-3xl border border-white/10 
                 bg-white/5 backdrop-blur-xl overflow-hidden 
                 transition-all duration-500"
    >
      {/* Glow effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
        style={{
          background: `radial-gradient(
            600px circle at var(--x) var(--y),
            rgba(0,255,255,0.15),
            transparent 40%
          )`,
        }}
      />

      <h4 className="text-xl font-semibold mb-4 text-cyan-400">
        {title}
      </h4>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: expanded ? "auto" : 0,
          opacity: expanded ? 1 : 0
        }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden text-gray-300 text-sm"
      >
        {children}
      </motion.div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-6 text-cyan-400 text-sm font-semibold hover:text-white transition"
      >
        {expanded ? "Cerrar" : "Ver más"}
      </button>
    </motion.div>
  );
}
