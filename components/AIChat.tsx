
import React, { useState, useRef, useEffect } from 'react';
import { aiService } from '../services/geminiService';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'أهلاً بك في السعودية! كيف يمكنني مساعدتك في رحلتك اليوم؟', isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const aiResponse = await aiService.sendMessage(inputValue);
    
    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      text: aiResponse,
      isUser: false
    }]);
    setIsTyping(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ backgroundColor: '#8B5E3C' }}
        className="fixed bottom-24 left-8 w-16 h-16 rounded-3xl shadow-[0_15px_35px_rgba(139,94,60,0.3)] flex items-center justify-center text-white text-3xl z-50 transition transform hover:scale-110 active:scale-95"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div className="fixed inset-0 sm:absolute sm:inset-auto sm:bottom-44 sm:left-8 sm:w-[22rem] sm:h-[30rem] bg-white z-50 flex flex-col shadow-2xl rounded-[3rem] overflow-hidden border border-gray-50 animate-slide-up">
          <div className="bg-[#8B5E3C] p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-[#C5A059] rounded-full animate-pulse shadow-[0_0_10px_rgba(197,160,89,0.5)]"></div>
              <span className="font-black text-sm uppercase tracking-widest">Tuwaiq Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white opacity-60 hover:opacity-100 transition-opacity">✕</button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-5 bg-[#FDFBFA]">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isUser ? 'justify-start' : 'justify-end'}`}>
                <div 
                  className={`max-w-[85%] p-4 rounded-[1.8rem] text-[13px] leading-relaxed font-bold shadow-sm ${
                    msg.isUser 
                    ? 'bg-[#8B5E3C] text-white rounded-tr-none' 
                    : 'bg-white text-[#4A2C2A] border border-[#F1E9DB] rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-end">
                <div className="bg-white p-4 rounded-[1.8rem] shadow-sm border border-[#F1E9DB] rounded-tl-none">
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce delay-150"></div>
                    <div className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce delay-300"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-5 border-t bg-white flex gap-3 items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="اكتب رسالتك هنا..."
              className="flex-1 bg-[#FDFBFA] rounded-full px-6 py-4 text-xs font-bold text-[#4A2C2A] focus:outline-none focus:ring-2 focus:ring-[#C5A059] border border-[#F1E9DB]"
            />
            <button 
              onClick={handleSend}
              className="bg-[#C5A059] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition hover:scale-105 active:scale-90"
            >
              ◀
            </button>
          </div>
        </div>
      )}
    </>
  );
};
