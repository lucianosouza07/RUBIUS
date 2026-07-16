import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { rubius_api } from "../../api/rubius";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatFeature() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState<{id: string, title: string, date: string}[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    // Load chat history from localStorage
    const saved = localStorage.getItem('rubius_chat_history');
    if (saved) {
      try {
        setChatHistory(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (initialQuery && messages.length === 0 && !hasInitialized.current) {
      hasInitialized.current = true;
      submitToApi(initialQuery);
    }
  }, [initialQuery]);

  const submitToApi = async (text: string) => {
    if (!text.trim()) return;
    if (isSubmittingRef.current) return;
    
    isSubmittingRef.current = true;
    
    // Save message locally
    const saveMessages = (newMsgs: {role: 'user' | 'ai', content: string}[], sId: string) => {
      localStorage.setItem(`rubius_chat_${sId}`, JSON.stringify(newMsgs));
    };

    let sId = currentSessionId;
    if (!sId) {
      // Create new session
      sId = Date.now().toString();
      setCurrentSessionId(sId);
      const newSession = { id: sId, title: text.substring(0, 30) + (text.length > 30 ? '...' : ''), date: new Date().toLocaleDateString() };
      setChatHistory(prev => {
        const updated = [newSession, ...prev];
        localStorage.setItem('rubius_chat_history', JSON.stringify(updated));
        return updated;
      });
    }

    const currentMessages = [...messages, { role: 'user', content: text }] as {role: 'user' | 'ai', content: string}[];
    setMessages(currentMessages);
    saveMessages(currentMessages, sId);
    
    setIsTyping(true);
    setQuery("");

    try {
      const response = await rubius_api.post("/chat", { message: text });
      const updatedMessages = [...currentMessages, { role: 'ai', content: response.data.response }] as {role: 'user' | 'ai', content: string}[];
      setMessages(updatedMessages);
      saveMessages(updatedMessages, sId);
    } catch (error) {
      console.error("Erro na API de Chat:", error);
      const updatedMessages = [...currentMessages, { role: 'ai', content: "Houve um erro ao processar sua requisição. Tente novamente." }] as {role: 'user' | 'ai', content: string}[];
      setMessages(updatedMessages);
      saveMessages(updatedMessages, sId);
    } finally {
      setIsTyping(false);
      isSubmittingRef.current = false;
    }
  };

  const loadChat = (id: string) => {
    setCurrentSessionId(id);
    const savedMsgs = localStorage.getItem(`rubius_chat_${id}`);
    if (savedMsgs) {
      try {
        setMessages(JSON.parse(savedMsgs));
      } catch (e) {
        setMessages([]);
      }
    } else {
      setMessages([]);
    }
  };

  const startNewChat = () => {
    setCurrentSessionId(null);
    setMessages([]);
  };

  const deleteChat = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta conversa?")) {
      const updated = chatHistory.filter(c => c.id !== id);
      setChatHistory(updated);
      localStorage.setItem('rubius_chat_history', JSON.stringify(updated));
      localStorage.removeItem(`rubius_chat_${id}`);
    }
  };

  const renameChat = (id: string) => {
    const chat = chatHistory.find(c => c.id === id);
    if (!chat) return;
    const newTitle = prompt("Novo nome para a conversa:", chat.title);
    if (newTitle && newTitle.trim()) {
      const updated = chatHistory.map(c => c.id === id ? { ...c, title: newTitle.trim() } : c);
      setChatHistory(updated);
      localStorage.setItem('rubius_chat_history', JSON.stringify(updated));
    }
  };

  const handleSend = () => {
    submitToApi(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAutoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  const submitQuery = (text: string) => {
    submitToApi(text);
  };

  return (
    <main className="flex-1 flex flex-col h-full relative bg-surface">
      <header className="w-full flex justify-between py-sm px-xl border-b border-border bg-surface/80 backdrop-blur-md z-10 sticky top-0 h-14 items-center">
        <div className="flex items-center gap-xs text-text-muted font-label-sm">
          <span className="material-symbols-outlined text-primary" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>history</span>
          <span className="uppercase tracking-widest text-on-surface font-semibold">Histórico de Consultas</span>
        </div>
        {currentSessionId && (
          <button onClick={startNewChat} className="flex items-center gap-1 bg-surface-variant hover:bg-border text-text-primary px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Nova Consulta
          </button>
        )}
      </header>
      
      {/* Chat Thread */}
      <section id="chat-container" className="flex-1 overflow-y-auto px-md py-lg scrollbar-hide flex flex-col items-center w-full">
        <div className="w-full max-w-5xl flex flex-col gap-xl pb-3xl">
          
          {messages.length === 0 && !isTyping ? (
            <div className="w-full mt-lg">
              <h3 className="font-headline text-headline-sm mb-md text-on-surface">Conversas Anteriores</h3>
              {chatHistory.length === 0 ? (
                <div className="bg-surface-variant/30 border border-border rounded-xl p-xl text-center">
                  <span className="material-symbols-outlined text-4xl mb-sm text-text-muted opacity-50">forum</span>
                  <p className="text-text-muted text-body-md">Você ainda não iniciou nenhuma conversa.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  {chatHistory.map((chat) => (
                    <div 
                      key={chat.id} 
                      className="flex flex-col text-left bg-surface border border-border p-md rounded-xl hover:bg-surface-variant hover:border-primary/50 transition-all group relative"
                    >
                      <button onClick={() => loadChat(chat.id)} className="flex-1 text-left pr-10 outline-none">
                        <span className="font-body text-body-md font-semibold text-on-surface line-clamp-1 group-hover:text-primary transition-colors">{chat.title}</span>
                        <div className="flex items-center gap-xs mt-2 text-text-muted">
                          <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                          <span className="text-label-sm">{chat.date}</span>
                        </div>
                      </button>

                      <div className="absolute top-2 right-2 flex opacity-0 group-hover:opacity-100 transition-opacity gap-1 bg-surface-variant rounded-md backdrop-blur-sm p-1 border border-border shadow-sm">
                        <button 
                          onClick={(e) => { e.stopPropagation(); renameChat(chat.id); }}
                          className="w-7 h-7 rounded hover:bg-surface flex items-center justify-center text-text-muted hover:text-primary transition-colors outline-none"
                          title="Renomear"
                        >
                          <span className="material-symbols-outlined text-[16px]">edit</span>
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); deleteChat(chat.id); }}
                          className="w-7 h-7 rounded hover:bg-surface flex items-center justify-center text-text-muted hover:text-error transition-colors outline-none"
                          title="Excluir"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Date Separator */}
              <div className="flex justify-center my-md">
                <span className="font-label-sm text-text-muted bg-surface-variant px-sm py-xs rounded-full border border-border">HOJE</span>
              </div>
              
              {messages.map((msg, idx) => (
                msg.role === 'user' ? (
                  <div key={idx} className="flex justify-end w-full">
                    <div className="bg-primary text-white p-md rounded-xl rounded-tr-sm max-w-[85%] lg:max-w-[70%] font-body text-body-md shadow-sm whitespace-pre-wrap">
                      {msg.content}
                    </div>
                  </div>
                ) : (
                  <div key={idx} className="flex justify-start w-full gap-md">
                    <div className="w-9 h-9 rounded-full bg-surface-variant border border-border flex items-center justify-center text-primary flex-shrink-0 mt-1">
                      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>smart_toy</span>
                    </div>
                    <div className="flex flex-col gap-sm max-w-[85%] lg:max-w-[75%]">
                      <div className="bg-surface-variant text-text-primary p-md rounded-xl rounded-tl-sm font-body text-body-md leading-relaxed border border-border/50 whitespace-pre-wrap prose prose-invert max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                )
              ))}

              {isTyping && (
                <div className="flex justify-start w-full gap-md">
                  <div className="w-9 h-9 rounded-full bg-surface-variant border border-border flex items-center justify-center text-primary flex-shrink-0 mt-1">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>smart_toy</span>
                  </div>
                  <div className="flex flex-col gap-sm">
                    <div className="bg-surface-variant text-text-primary p-md rounded-xl rounded-tl-sm border border-border/50 flex items-center gap-1.5 h-12">
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </>
          )}
        </div>
      </section>
      
      {/* Hero Input Area */}
      <footer className="w-full bg-surface border-t border-border/60 p-md lg:p-lg flex flex-col items-center flex-shrink-0 z-20">
        <div className="w-full max-w-5xl flex flex-col gap-sm relative">
          {/* Ask Input */}
          <div className="w-full min-h-[64px] bg-surface rounded-2xl border border-border relative flex flex-col focus-within:ring-2 focus-within:ring-primary/10 focus-within:border-primary transition-all shadow-sm group">
            <textarea 
              ref={textareaRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                handleAutoResize();
              }}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              className="w-full bg-transparent border-none focus:ring-0 resize-none font-body text-body-md text-text-primary p-md pr-24 placeholder:text-text-muted outline-none disabled:opacity-50" 
              placeholder="Pergunte qualquer coisa sobre a Copa..." 
              rows={1}
            ></textarea>
            <div className="absolute bottom-3 right-3 flex items-center gap-xs bg-surface rounded-full">
              <button disabled={isTyping} onClick={handleSend} className="w-11 h-11 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-hover transition-all shadow-md active:scale-95 disabled:opacity-50">
                <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>send</span>
              </button>
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="text-center w-full mt-2">
            <span className="font-label-sm text-text-muted">Rubius AI utiliza dados oficiais e LLMs de alta precisão. Considere verificar informações críticas.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
