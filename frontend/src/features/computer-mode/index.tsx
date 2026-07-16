import { useState, useRef, useEffect } from "react";
import { rubius_api } from "../../api/rubius";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ComputerModeFeature() {
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: React.ReactNode}[]>([]);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!query.trim()) return;
    
    const text = query;
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setQuery("");
    setIsTyping(true);
    
    try {
      const response = await rubius_api.post("/chat", { message: text });
      setMessages(prev => [...prev, { role: 'ai', content: response.data.response }]);
    } catch (error) {
      console.error("Erro na API de Chat:", error);
      setMessages(prev => [...prev, { role: 'ai', content: "Erro de processamento: Falha ao contatar a API da IA." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleAutoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <main className="flex-1 flex h-full overflow-hidden bg-surface">
      {/* Left: Chat Canvas (Full width now) */}
      <section className="flex-1 flex flex-col h-full min-w-0">
        {/* Header */}
        <header className="h-16 px-xl flex items-center border-b border-border bg-surface/80 backdrop-blur-sm z-20">
          <div className="flex items-center gap-sm">
            <span className="material-symbols-outlined text-text-muted">terminal</span>
            <h2 className="text-label-md font-semibold text-on-surface">Modo Computador - Terminal de Análise</h2>
          </div>
        </header>
        
        {/* Messages Scroll Area */}
        <div id="chat-scroll" className="flex-1 overflow-y-auto px-xl py-xl flex flex-col gap-xl">
          <div className="max-w-[800px] mx-auto w-full space-y-xl">
            {messages.length === 0 && !isTyping ? null : (
              <>
                {messages.map((msg, idx) => (
                  msg.role === 'user' ? (
                    <div key={idx} className="flex gap-md w-full">
                      <div className="w-8 h-8 rounded-full bg-surface-variant border border-border flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <span className="material-symbols-outlined text-text-muted text-[18px]">person</span>
                      </div>
                      <div className="pt-1">
                        <div className="text-body-md text-on-surface">{msg.content}</div>
                      </div>
                    </div>
                  ) : (
                    <div key={idx} className="flex gap-md w-full">
                      <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white shadow-none">
                        <span className="material-symbols-outlined text-[18px]">memory</span>
                      </div>
                      <div className="pt-1 flex-1">
                        <div className="text-body-md text-on-surface space-y-4 prose prose-invert max-w-none">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content as string}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  )
                ))}

                {isTyping && (
                  <div className="flex gap-md w-full">
                    <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white shadow-none">
                      <span className="material-symbols-outlined text-[18px]">memory</span>
                    </div>
                    <div className="pt-1 flex-1">
                      <div className="flex items-center gap-1.5 h-6">
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
        </div>
        
        {/* Ask Input Area */}
        <div className="p-xl bg-surface border-t border-border">
          <div className="max-w-[800px] mx-auto relative">
            <div className="w-full min-h-[64px] rounded-2xl bg-surface border border-border flex flex-col p-2 shadow-none focus-within:border-primary transition-all">
              <textarea 
                ref={textareaRef}
                value={query}
                disabled={isTyping}
                onChange={(e) => { setQuery(e.target.value); handleAutoResize(); }}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none focus:ring-0 resize-none font-body text-body-md p-2 placeholder:text-text-muted text-on-surface outline-none disabled:opacity-50" 
                placeholder="Insira um comando ou faça uma pergunta avançada..." 
                rows={1}
              ></textarea>
              <div className="flex justify-between items-center px-2 pb-1 mt-2">
                <div className="flex gap-2 text-text-muted">
                  <button className="p-2 rounded-md hover:bg-surface-variant transition-colors" title="Attach file">
                    <span className="material-symbols-outlined text-[20px]">attach_file</span>
                  </button>
                  <button className="p-2 rounded-md hover:bg-surface-variant transition-colors" title="Use data tool">
                    <span className="material-symbols-outlined text-[20px]">database</span>
                  </button>
                  <button className="p-2 rounded-md hover:bg-surface-variant transition-colors" title="Voice Input">
                    <span className="material-symbols-outlined text-[20px]">mic</span>
                  </button>
                </div>
                <button disabled={isTyping} onClick={handleSend} className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-hover transition-colors disabled:opacity-50">
                  <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
