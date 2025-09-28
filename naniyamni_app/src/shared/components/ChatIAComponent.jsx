import React, { useState, useRef, useEffect } from "react";
import { useN8nChat } from "../hooks/useSendIAMessage";
import { Send, X } from 'lucide-react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatComponent = ({handleClose}) => {
  const webhookUrl = "https://carloseduardo05.app.n8n.cloud/webhook/e094f018-1e1f-4542-995a-8bddbf53270e";
  const { sendMessage, loading, error } = useN8nChat(webhookUrl);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hola! Bienvenido a Naniyamni. Soy Dario y te ayudaré con tus reservas, ¿En qué puedo ayudarte?", sender: 'agent' },
  ]);

  const messagesEndRef = useRef(null);

  // Función para hacer scroll al final
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Agregar mensaje del usuario
    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    const userInput = input;
    setInput("");
    const token = localStorage.getItem('token');
    // Llamada a n8n
    const gptResponse = await sendMessage(token, userInput);

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

  console.log(messages)
  return (
    <div className="w-120 h-[600px] bg-[#181818]/90 rounded-lg shadow-2xl flex flex-col backdrop-blur-sm overflow-hidden fixed right-2 bottom-2">
      {/* HEADER */}
      <div className="flex justify-between items-center p-3 bg-[#AAAAAA]/30 text-white shadow-md">
        <div className="flex items-center">
          <img className="w-8 h-8 rounded-full flex items-center justify-center mr-2 bg-[#181818] object-contain" src="/gueguense.png" />
            
          <span className="font-semibold">Dario</span>
        </div>
        <button onClick={handleClose} className="text-white hover:text-gray-200 transition" aria-label="Cerrar ventana de chat">
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
          : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
        }
      `}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ node, ...props }) => (
            <img {...props} className="my-2 rounded-md max-w-full" />
          ),
          a: ({ node, ...props }) => (
            <a {...props} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer" />
          ),
          li: ({ node, ...props }) => <li className="ml-4 list-disc" {...props} />,
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

      {/* INPUT */}
      <form onSubmit={handleSend} className="p-3 border-t border-[#AAAAAA]/30 flex items-center">
        {error && <p className="text-red-500 text-xs mb-1">{error}</p>}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          className="flex-1 mx-2 p-4 border-none outline-none focus:ring-0 text-sm bg-[#AAAAAA]/30 rounded-full"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || input.trim() === ''}
          className="p-2 text-blue-600 hover:text-blue-700 transition disabled:text-gray-400 disabled:cursor-not-allowed"
          aria-label={loading ? "Enviando..." : "Enviar mensaje"}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-r-transparent border-blue-600 rounded-full animate-spin" />
          ) : (
            <Send size={20} fill="currentColor" />
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;
