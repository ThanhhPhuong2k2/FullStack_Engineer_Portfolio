
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage, Language } from '../types';

interface AIChatProps {
  lang: Language;
}

const AIChat: React.FC<AIChatProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      { 
        role: 'model', 
        text: lang === 'vi' 
          ? 'Chào bạn! Tôi là trợ lý AI của Phương. Bạn có muốn hỏi gì về công việc của cậu ấy không?' 
          : 'Hi! I am Phuong\'s AI assistant. Ask me anything about his work!' 
      }
    ]);
  }, [lang]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getGeminiResponse(userMsg, lang);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-24 md:bottom-6 right-6 z-[100]">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 glass rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[400px] md:h-[500px] border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-semibold text-sm">{lang === 'vi' ? 'Trợ lý AI Portfolio' : 'AI Portfolio Assistant'}</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/40 no-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-sky-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-700">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-slate-700 bg-slate-800/30">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={lang === 'vi' ? 'Hỏi Phương...' : 'Ask about Phuong...'}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-sky-500 hover:bg-sky-400 p-2 rounded-lg transition-colors disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-sky-500 rounded-full shadow-lg shadow-sky-500/20 hover:scale-110 transition-all duration-300"
      >
        <span className="absolute -top-10 right-0 bg-slate-800 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-700">
          {lang === 'vi' ? 'Chat với AI' : 'Chat with AI'}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    </div>
  );
};

export default AIChat;
