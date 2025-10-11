import React, { useState, useRef, useEffect } from "react";
import { useN8nChat } from "../hooks/useSendIAMessage";
import { Send, X } from 'lucide-react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useNavigate } from "react-router-dom";

const ChatComponent = ({handleClose}) => {
  const webhookUrl = "https://carloseduardo05.app.n8n.cloud/webhook/e094f018-1e1f-4542-995a-8bddbf53270e";
  const { sendMessage, loading, error } = useN8nChat(webhookUrl);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
   
      document.body.style.overflow = "hidden";
   
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [messages, setMessages] = useState([
    { id: 1, text: "Hola! Bienvenido a Nani Yamni. Soy Darío y te ayudaré a crear el mejor Tour, ¿Por dónde empezamos?", sender: 'agent' },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    const userInput = input;
    setInput("");
    const token = localStorage.getItem('token');
    // Llamada a n8n
    const gptResponse = await sendMessage(token, userInput);
    console.log(gptResponse)
    if (gptResponse) {
      const agentMessage = {
        id: Date.now() + 1,
        text: gptResponse.output, // guardamos el texto original
        sender: 'agent'
      };
    
      // Convertimos los saltos de línea a JSX para que se muestre correctamente
      const formattedText = gptResponse.output.split("\n").map((line, index) => (
        <span key={index}>{line}<br /></span>
      ));
    
      // Guardamos en el estado el objeto del mensaje, incluyendo la versión formateada
      setMessages(prev => [...prev, { ...agentMessage, formattedText }]);
    }}      

    const handleNavigate = (nombreProveedor) => {
      console.log("Proveedor clickeado:", nombreProveedor);
      // Usando navigate de react-router
      navigate(`/proveedor/${nombreProveedor}`, {
        state: {
          nombre: nombreProveedor,
        }
      });
    };

  return (
    <div className="md:w-120 max-w-120 h-[100dvh] md:h-[600px] dark:bg-[#181818]/90 md:rounded-lg shadow-2xl flex flex-col backdrop-blur-sm overflow-hidden fixed md:right-2 right-0 bottom-0 md:bottom-2 bg-[#F9FAFB]/90 z-99"> 
      <div className="flex justify-between items-center p-3  text-[#F9FAFB] shadow-md bg-[#2CA6A4]/60">
        <div className="flex items-center">
          <img className="w-8 h-8 rounded-full flex items-center justify-center mr-2 object-contain" src="/gueguense.png" />
            
          <span className="font-semibold">Darío</span>
        </div>
        <button onClick={handleClose} className="text-[#F9FAFB] hover:text-gray-200 transition" aria-label="Cerrar ventana de chat">
          <X size={20} />
        </button>
      </div>

      {/* MENSAJES */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
      {messages.map(msg => (
  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
    <div
      className={`
        max-w-[75%] px-3 py-2 text-sm rounded-xl shadow-sm
        ${msg.sender === 'user'
          ? 'bg-blue-100 text-gray-800 rounded-br-none'
          : 'bg-[#F9FAFB] text-gray-800 rounded-tl-none border border-gray-200'
        }
      `}
    >
      <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    img: ({ node, ...props }) => (
      <img {...props} className="my-2 rounded-md max-w-full" />
    ),
    li: ({ node, ...props }) => <li className="ml-4 list-disc" {...props} />,
    strong: ({ node, children, ...props }) => (
      <span
        {...props}
        className="font-bold"
        onClick={() => handleNavigate(children)}
      >
        {children}
      </span>
    ),
  }}
>
  {msg.text}
</ReactMarkdown>

    </div>
  </div>
))}

        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[75%] px-3 py-2 text-sm rounded-xl bg-white text-gray-800 rounded-tl-none border border-gray-200">
              <span className="text-gray-500 italic">Escribiendo...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-3 border-t border-[#AAAAAA]/30 flex items-center gap-3">
        {error && <p className="text-red-500 text-xs mb-1">{error}</p>}
        <div className="rounded-full flex-1 w-full bg-gradient-to-r p-[2px] dark:p-[1px] dark:bg-transparent to-[#2CA6A4] from-[#F4B731]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="w-full flex-1 p-4 border-none outline-none focus:ring-0 text-sm dark:bg-[#181818] bg-[#F9FAFB] rounded-full"
            disabled={loading}
            autoFocus
          />
        </div>
        <button
          type="submit"
          disabled={loading || input.trim() === ''}
          className="p-2 text-[#2CA6A4] hover:text-[#2CA6A4] transition disabled:text-gray-400 disabled:cursor-not-allowed"
          aria-label={loading ? "Enviando..." : "Enviar mensaje"}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-r-transparent border-[#2CA6A4] rounded-full animate-spin" />
          ) : (
            <Send size={25} fill="currentColor" className="transition-all duration-500 transform hover:scale-105" />
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;
