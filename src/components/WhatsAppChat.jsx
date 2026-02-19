import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { X } from "lucide-react";

export default function WhatsAppChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hola 👋, soy SYS-WIN. ¿Quieres información sobre nuestros servicios?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const services = [
    "Desarrollo de Software",
    "Aplicaciones Web",
    "Código Seguro",
  ];
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text }]);
    const phone = "573108556230";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank");
    setInput("");
  };

  return (
    <>
      {/* BOTÓN FLOTANTE */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setOpen(true)}
          className="w-20 h-20 rounded-full bg-green-400 flex items-center justify-center
                     shadow-2xl shadow-green-500/40
                     hover:scale-110 hover:shadow-green-400/60
                     transition-all duration-300"
        >
          <FaWhatsapp className="text-white text-5xl drop-shadow-lg" />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-24 right-6 w-[350px] bg-white rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col"
          >
            <div className="bg-green-600 text-white p-4 flex justify-between items-center">
              <div>
                <h4 className="font-semibold">SYS-WIN</h4>
                <span className="text-xs opacity-80">en línea</span>
              </div>
              <button onClick={() => setOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-100">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`px-3 py-2 rounded-xl max-w-[75%] text-sm break-words ${msg.from === "user"
                      ? "bg-green-500 text-white"
                      : "bg-white text-gray-700 shadow"
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {messages[messages.length - 1].from === "bot" && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {services.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="bg-green-500 text-white px-3 py-1 rounded-full text-xs hover:bg-green-600 transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
            <form
              className="p-4 flex gap-2 bg-gray-200"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
            >
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
              >
                Enviar
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
