import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Minimize2, Bot } from 'lucide-react';
import { generateResponse, isConfigured } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi there! I'm Devan AI. 👋 <br/>Tell me a bit about yourself or what you're looking for, and I'll help you find the perfect health package." }
  ]);
  const [connected, setConnected] = useState<boolean>(isConfigured());
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && isExpanded) scrollToBottom();
  }, [messages, isOpen, isExpanded]);

  // Re-check configuration on mount/open in case env changed
  useEffect(() => {
    setConnected(isConfigured());
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userText = input.trim();
    setInput('');
    
    const newHistory = [...messages, { role: 'user', text: userText } as ChatMessage];
    setMessages(newHistory);
    setIsLoading(true);

    const response = await generateResponse(userText, newHistory);
    setMessages([...newHistory, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-full shadow-2xl shadow-slate-900/20 z-50 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 group"
      >
        <div className="relative">
          <Sparkles className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span>
        </div>
        <span className="font-medium pr-1">Health Assistant</span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 bg-white rounded-3xl shadow-2xl shadow-slate-900/20 z-50 flex flex-col transition-all duration-500 ease-in-out overflow-hidden border border-slate-200 ${isExpanded ? 'w-[360px] sm:w-[400px] h-[600px] max-h-[80vh]' : 'w-[300px] h-[70px]'}`}>
      {/* Header */}
      <div 
        className="bg-white/80 backdrop-blur-md p-4 border-b border-slate-100 flex items-center justify-between shrink-0 cursor-pointer absolute top-0 left-0 w-full z-10"
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center text-white shadow-lg shadow-teal-500/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Devan AI</h3>
            <p className={`text-xs font-medium flex items-center gap-1 ${connected ? 'text-teal-600' : 'text-slate-500'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-teal-500 animate-pulse' : 'bg-slate-400'}`}></span>
              {connected ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
           {isExpanded && (
            <button 
              onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
           )}
          <button 
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 pt-20 pb-4 space-y-6 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-slate-900 text-white rounded-tr-sm' 
                      : 'bg-white text-slate-700 rounded-tl-sm border border-slate-100'
                  }`}
                >
                   <div dangerouslySetInnerHTML={{ 
                    __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br/>') 
                  }} />
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-sm border border-slate-100 shadow-sm flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about packages..."
                className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 rounded-xl pl-4 pr-12 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all border border-transparent focus:border-slate-200"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 bg-teal-600 text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIAssistant;